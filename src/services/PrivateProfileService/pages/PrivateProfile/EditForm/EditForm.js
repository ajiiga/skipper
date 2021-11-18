import React, {useState} from 'react';
import s from '../../../styles/PrivateProfileService.module.css'
import default_img from '../../../../../static/img/PrivateProfile/profile.svg'
import CustomSelect from "../../../../../components/UI/CustomSelect/CustomSelect";
import CustomMiniSelect from "../../../../../components/UI/CustomMiniSelect/CusomMiniSelect";
import publicStore from "../../../../../store/publicStore";
import authStore from "../../../../../store/authStore";
import {API_URL} from "../../../../../api/api_setting";
import {Formik} from "formik";
import TextInput from "../../../../../components/UI/TextInput/TextInput";
import privateProfileStore from "../../../../../store/privateProfileStore";
import Preloader from "../../../../../components/UI/Preloader/Preloader";

function range(start, stop, step) {
    if (typeof stop == 'undefined') {
        // one param defined
        stop = start;
        start = 0;
    }

    if (typeof step == 'undefined') {
        step = 1;
    }

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return [];
    }

    var result = [];
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i);
    }

    return result;
}

const EditForm = () => {
    let days = range(1, 32)
    let months = [
        {name: 'Январь', num: 1},
        {name: 'Февраль', num: 2},
        {name: 'Март', num: 3},
        {name: 'Апрель', num: 4},
        {name: 'Май', num: 5},
        {name: 'Июнь', num: 6},
        {name: 'Июль', num: 7},
        {name: 'Август', num: 8},
        {name: 'Сентябрь', num: 9},
        {name: 'Октябрь', num: 10},
        {name: 'Ноябрь', num: 11},
        {name: 'Декабрь', num: 12},
    ]
    let years = range(1900, 2007)
    let [day, setDay] = useState(authStore.user.date_of_birthday.split('.')[0])
    let [month, setMonth] = useState(months.filter(x => x.num == authStore.user.date_of_birthday.split('.')[1])[0].name)
    let [year, setYear] = useState(authStore.user.date_of_birthday.split('.')[2])
    let [timezone, setTimezone] = useState('(GMT+5) Екатеринбург')
    let [isFetching, setIsFetching] = useState(false)
    let [status, setStatus] = useState('')
    return (
        <Formik
            initialValues={
                {
                    first_name: authStore.user.first_name,
                    second_name: authStore.user.second_name,
                    patronymic: authStore.user?.patronymic ? authStore.user.patronymic : '',
                    description: authStore.user?.description ? authStore.user.description : ''
                }
            }
            onSubmit={(values) => {
                privateProfileStore.UpdateProfileData(values.first_name, values.second_name, values.patronymic, [day, month, year].join('.'), timezone,values.description).then(
                    (r) => {
                        setIsFetching(false)
                        setStatus('Данные успешно изменены')
                    }
                )
            }}>
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
              }) => (<div className={s.form_container}>
                    <div className={s.set_photo_display}>
                        {/*<img src={default_img} alt=""/>*/}
                        <img src={`${API_URL}${authStore.user.profile_picture}`} className={s.profile_img} alt=""/>
                        <div className={s.btn_container}>
                            <div className={s.btn}>Загрузить</div>
                        </div>
                        <div className={s.description}>
                            Размер фотографии не должен превышать 20Мб
                        </div>
                    </div>


                    <form className={s.form}>
                        <div className={s.block}>
                            <div className={s.block_title}>Ваше полное имя</div>
                            <div className={s.block_input_display}>
                                <input
                                    type="text"
                                    name="second_name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.second_name}
                                    placeholder={'Фамилия'}
                                />
                                <input
                                    type="text"
                                    name="first_name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder={'Имя'}
                                    value={values.first_name}
                                />
                                <input
                                    type="text"
                                    name="patronymic"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.patronymic}
                                    placeholder={'Отчество'}
                                />
                            </div>
                        </div>

                        <div className={s.block}>
                            <div className={s.block_title}>Дата рождения</div>
                            <div className={s.block_select_date_container}>
                                <CustomMiniSelect list={days} setSelected={setDay} selected={day}/>
                            </div>
                            <div className={s.block_select_date_container}>
                                <CustomMiniSelect list={months.map(x => x.name)} setSelected={setMonth} selected={month}/>
                            </div>
                            <div className={s.block_select_date_container}>
                                <CustomMiniSelect list={years} setSelected={setYear} selected={year}/>
                            </div>
                        </div>

                        <div className={s.block}>
                            <div className={s.block_title}>Часовой пояс</div>
                            <div className={s.block_select_timezone_container}>
                                <CustomMiniSelect list={[1, 2, 3, 4]} setSelected={setTimezone} selected={timezone}/>
                            </div>
                        </div>

                        <div className={s.block} style={{alignItems: 'flex-start'}}>
                            <div className={s.block_title}>Обо мне</div>
                            <div className={s.block_description}>
                        <textarea placeholder={'Расскажите о себе'} className={s.textarea}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  name="description"
                        >
                            {values.description}
                        </textarea>
                                <div className={s.description_counter}>
                                    {values.description.length}/400
                                </div>
                            </div>
                        </div>
                        {isFetching && <div className={s.preloader_container}><Preloader /></div>}
                        {!isFetching && <div className={`${s.preloader_container} ${s.good_status}`}>{status}</div>}
                        <button disabled={isFetching} className={`${s.btn} ${s.submit_btn}`} onClick={() => {
                            setIsFetching(true)
                            handleSubmit()
                        }}>Подтвердить изменения</button>

                        <div className={s.block}>
                            <div className={s.block_title}>Email</div>
                            <div className={s.email_input_display}>
                                <input type="text" placeholder={'Адрес электронной почты'}/>
                                <div className={s.btn}>Подтвердить</div>
                            </div>
                        </div>

                        <div className={s.block}>
                            <div className={s.block_title}>Пароль</div>
                            <div className={s.btn}>Сменить пароль</div>
                        </div>

                        <div className={s.block}>
                            <div className={s.block_title}>Удаление аккаунта</div>
                            <div className={s.btn}>Удалить аккаунт</div>
                        </div>

                    </form>
                </div>
            )}
        </Formik>
    );
};

export default EditForm;
import React, {useState} from 'react';
import s from '../../../styles/PrivateProfileService.module.css'
import default_img from '../../../../../static/img/PrivateProfile/profile.svg'
import CustomSelect from "../../../../../components/UI/CustomSelect/CustomSelect";
import CustomMiniSelect from "../../../../../components/UI/CustomMiniSelect/CusomMiniSelect";

const EditForm = () => {
    let [day, setDay] = useState('День')
    let [month, setMonth] = useState('Месяц')
    let [year, setYear] = useState('Год')
    let [timezone, setTimezone] = useState('(GMT+5) Екатеринбург')
    let [description, setDescription] = useState('')


    return (
        <div className={s.form_container}>
            <div className={s.set_photo_display}>
                <img src={default_img} alt=""/>
                <div className={s.btn_container}>
                    <div className={s.btn}>Загрузить</div>
                </div>
                <div className={s.description}>
                    Размер фотографии не должен превышать 20Мб
                </div>
            </div>


            <div className={s.form}>
                <div className={s.block}>
                    <div className={s.block_title}>Ваше полное имя</div>
                    <div className={s.block_input_display}>
                        <input type="text" placeholder={'Фамилия'}/>
                        <input type="text" placeholder={'Имя'}/>
                        <input type="text" placeholder={'Отчество'}/>
                    </div>
                </div>

                <div className={s.block}>
                    <div className={s.block_title}>Дата рождения</div>
                    <div className={s.block_select_date_container}>
                        <CustomMiniSelect list={[1, 2, 3, 4]} setSelected={setDay} selected={day}/>
                    </div>
                    <div className={s.block_select_date_container}>
                        <CustomMiniSelect list={[1, 2, 3, 4]} setSelected={setMonth} selected={month}/>
                    </div>
                    <div className={s.block_select_date_container}>
                        <CustomMiniSelect list={[1, 2, 3, 4]} setSelected={setYear} selected={year}/>
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
                                  onChange={(event) => setDescription(event.target.value)}>
                            {description}
                        </textarea>
                        <div className={s.description_counter}>
                            {description.length}/400
                        </div>
                    </div>
                </div>

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

            </div>
        </div>
    );
};

export default EditForm;
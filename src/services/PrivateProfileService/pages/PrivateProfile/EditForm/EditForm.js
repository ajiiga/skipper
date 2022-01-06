import React, {useState} from 'react';
import s from '../../../styles/PrivateProfileService.module.css'
import CustomMiniSelect from "../../../../../components/UI/CustomMiniSelect/CusomMiniSelect";
import authStore from "../../../../../store/authStore";
import {API_URL} from "../../../../../api/api_setting";
import {FieldArray, Formik} from "formik";
import privateProfileStore from "../../../../../store/privateProfileStore";
import Preloader from "../../../../../components/UI/Preloader/Preloader";
import * as yup from "yup";

function range(start, stop, step) {
    if (typeof stop == 'undefined') {
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
    let [day, setDay] = useState(authStore.user.date_of_birthday ? authStore.user.date_of_birthday.split('.')[0] : 'День')
    let [month, setMonth] = useState(authStore.user.date_of_birthday ? months.filter(x => x.num == authStore.user.date_of_birthday?.split('.')[1])[0]?.name : 'Месяц')
    let [year, setYear] = useState(authStore.user.date_of_birthday ? authStore.user.date_of_birthday.split('.')[2] : 'Год')
    let [timezone, setTimezone] = useState('(GMT+5) Екатеринбург')
    let [isFetching, setIsFetching] = useState(false)
    let [status, setStatus] = useState('')
    let [error, setError] = useState('')

    const validationSchema = yup.object({
        first_name: yup.string().required('Поле "Имя" не заполнено'),
        second_name: yup.string().required('Поле "Фамилия" не заполнено'),
        patronymic: yup.string().required('Поле "Отчество" не заполнено'),
        description: yup.string().max(400, 'Не много ли о себе рассказали? Для кого 400 символов написано'),
    })

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
            validationSchema={validationSchema}
            onSubmit={(values) => {
                setIsFetching(true)
                privateProfileStore.UpdateProfileData(values.first_name,
                    values.second_name,
                    values.patronymic,
                    [day, months.filter(x => x.name === month)[0].num, year].join('.'),
                    timezone,
                    values.description).then(
                    (r) => {
                        setIsFetching(false)
                        if (r.response)
                            setStatus('Данные успешно изменены')
                        if (!r.response) {
                            setError(r.message)
                        }
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
                    <SetPhoto/>
                    <div className={s.form}>
                        <form onSubmit={handleSubmit}>
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
                                    <CustomMiniSelect list={months.map(x => x.name)} setSelected={setMonth}
                                                      selected={month}/>
                                </div>
                                <div className={s.block_select_date_container}>
                                    <CustomMiniSelect list={years} setSelected={setYear} selected={year}/>
                                </div>
                            </div>

                            <div className={s.block}>
                                <div className={s.block_title}>Часовой пояс</div>
                                <div className={s.block_select_timezone_container}>
                                    <CustomMiniSelect list={[1, 2, 3, 4]} setSelected={setTimezone}
                                                      selected={timezone}/>
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
                            {errors.first_name && touched.first_name && <div
                                className={`${s.preloader_container} ${s.error_status}`}>{errors.first_name && touched.first_name && errors.first_name}</div>}
                            {errors.second_name && touched.second_name && <div
                                className={`${s.preloader_container} ${s.error_status}`}>{errors.second_name && touched.second_name && errors.second_name}</div>}
                            {errors.patronymic && touched.patronymic && <div
                                className={`${s.preloader_container} ${s.error_status}`}>{errors.patronymic && touched.patronymic && errors.patronymic}</div>}
                            {errors.description && touched.description && <div
                                className={`${s.preloader_container} ${s.error_status}`}>{errors.description && touched.description && errors.description}</div>}
                            {isFetching && <div className={s.preloader_container}><Preloader/></div>}
                            {status && <div className={`${s.preloader_container} ${s.good_status}`}>{status}</div>}
                            {error && <div className={`${s.preloader_container} ${s.error_status}`}>{error}</div>}
                            <button disabled={isFetching} className={`${s.btn} ${s.submit_btn}`} onClick={() => {
                                setStatus('')
                                setError('')
                                if (day === 'День' || month === 'Месяц' || year === 'Год') {
                                    setError('Неправильная форма даты рождения')
                                } else
                                    handleSubmit()
                            }}>Подтвердить изменения
                            </button>
                        </form>


                        <EmailConfirm/>
                        <ChangeSpecialization />

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
            )}
        </Formik>
    );
};


const EmailConfirm = () => {
    let [status, setStatus] = useState('')
    const validationSchema = yup.object({
        email: yup.string().required('Заполните поле с почтой').email('Неправильная форма почты'),
    })
    return (
        <Formik
            initialValues={{
                email: ''
            }}
            onSubmit={(values) => {
                setStatus('')
                privateProfileStore.makeVerifyEmail(values.email).then(x => setStatus('Письмо отправлено на почту'))
            }}
            validationSchema={validationSchema}>
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
              }) => <form onSubmit={handleSubmit}>
                <div className={s.block}>
                    <div className={s.block_title}>Email</div>
                    <div className={s.email_input_display}>
                        <input type="text" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur}
                               placeholder={'Адрес электронной почты'}/>
                        <div className={s.btn} onClick={handleSubmit}>Подтвердить</div>
                    </div>
                </div>
                {errors.email && <div
                    className={`${s.error_status} ${s.email_error}`}>{errors.email && touched.email && errors.email}</div>}
                {status && <div className={`${s.good_status} ${s.email_error}`}>{status}</div>}
            </form>

            }
        </Formik>)
}

const ChangeSpecialization = ({specialization}) => {
    let [status, setStatus] = useState('')
    const validationSchema = yup.object({
        specialization: yup.string().required('Заполните поле с специализацией'),
    })
    return (
        <Formik
            initialValues={{
                specialization: ''
            }}
            onSubmit={(values) => {
                setStatus('')
                privateProfileStore.changeSpecialization(values.specialization).then(x => setStatus('Специализация изменена'))
            }}
            validationSchema={validationSchema}>
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
              }) => <form onSubmit={handleSubmit}>
                <div className={s.block}>
                    <div className={s.block_title}>Специализация</div>
                    <div className={s.email_input_display}>
                        <input type="text" name="specialization" value={values.specialization} onChange={handleChange} onBlur={handleBlur}
                               placeholder={'Ваша специализация'}/>
                        <div className={s.btn} onClick={handleSubmit}>Подтвердить</div>
                    </div>
                </div>
                {errors.specialization && <div
                    className={`${s.error_status} ${s.email_error}`}>{errors.specialization && touched.specialization && errors.specialization}</div>}
                {status && <div className={`${s.good_status} ${s.email_error}`}>{status}</div>}
            </form>

            }
        </Formik>)
}


const SetPhoto = () => {
    const validationSchema = yup.object({
        file: yup.array().of(yup.object().shape({
            file: yup.mixed().test('fileSize', 'Размер файла больше 5 мбайт', (value) => {
                if (!value) return false
                return value.size < 5000000
            }).required(),
            type: yup.string().oneOf(['image/png', 'image/jpeg'], 'Добавьте файл с правильным форматом').required(),
            name: yup.string().required()
        }).typeError('Добавьте файл'))
    })

    let [preview, setPreview] = useState(null)

    const getFileSchema = (file) => (file && {
        file: file,
        type: file.type,
        name: file.name
    })

    const getArrErrorsMessages = (errors) => {
        const result = []
        errors && Array.isArray(errors) && errors.forEach((value) => {
            if (typeof value === 'string') {
                result.push(value)
            } else {
                Object.values(value).forEach((error) => {
                    result.push(error)
                })
            }
        })
        return result
    }

    const getError = (touched, error) => {
        return touched && error && <p key={error} className={s.error_image}>{error}</p>
    }

    let setImage = (file) => {
        let reader = new FileReader();

        reader.onloadend = function () {
            setPreview(reader.result);
        }

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    let sendForm = (file) => {
        if (['image/png', 'image/jpeg'].includes(file.type) && file.file.size < 5000000) {
            privateProfileStore.changeProfileImage(file.file)
        }
    }
    return (
        <Formik
            initialValues={{
            file: undefined
        }}
                onSubmit={(values) => {

                }}
        validationSchema={validationSchema}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
            }) => <div className={s.set_photo_display}>
                {!preview || errors.file?.length > 0 ? <img src={`${API_URL}${authStore.user.profile_picture}`} className={s.profile_img} alt=""/>:<img src={preview} alt="" className={s.profile_img}/>}
                {getArrErrorsMessages(errors.file).map((error) => <div key={getError(true, error)}
                                                                       className={s.error}>{getError(true, error)}</div>)}
                <FieldArray name={'file'}>
                    {
                        (arrayHelper) => (
                            <input
                                style={{display: 'none'}}
                                type="file"
                                id={'file'}
                                onChange={(event => {
                                    let preview_image = event.target.files[0]
                                    const {files} = event.target
                                    const file = getFileSchema(files.item(0))
                                    if (!file) {
                                        arrayHelper.remove(0)
                                        setPreview(null)
                                    }
                                    if (Array.isArray(values.file)) {
                                        arrayHelper.replace(0, file)
                                        if (file) {
                                            setImage(file.file)
                                            sendForm(file)
                                        }
                                    } else {
                                        arrayHelper.push(file)
                                        setImage(file.file)
                                        sendForm(file)
                                    }
                                })}/>)
                    }
                </FieldArray>
                {!Array.isArray(errors.file) && errors.file && touched.file && errors.file}
                <div className={s.btn_container}>
                    <label htmlFor={'file'} className={s.btn}>Загрузить</label>
                </div>

                <div className={s.description}>
                    Размер фотографии не должен превышать 5Мб
                </div>
            </div>}
        </Formik>)
}

export default EditForm;
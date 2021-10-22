import React, {useEffect, useState} from 'react';
import * as yup from "yup";
import {FieldArray, Formik} from "formik";
import authStore from "../../../../../store/authStore";
import s from "../../../styles/Forms.module.css";
import TextInput from "../../../../../components/UI/TextInput/TextInput";
import Button from "../../../../../components/UI/Button/Button";
import {Link} from "react-router-dom";
import photo from '../../../../../static/img/Login/photo.svg'
import TextArea from "../../../../../components/UI/TextArea/TextArea";
import CustomSelect from "../../../../../components/UI/CustomSelect/CustomSelect";


const MentorRegistrationForm = () => {

    let [preview, setPreview] = useState(null)

    const validationSchema = yup.object({
        tel: yup.number().typeError('Неправильная форма').required('Обязательное поле'),
        firstName: yup.string().required('Обязательное поле'),
        secondName: yup.string().required('Обязательное поле'),
        specialization: yup.string().required('Обязательное поле'),
        password: yup.string().required('Обязательное поле'),
        secondPassword: yup.string().oneOf([yup.ref('password')], 'Пароли не совпадают').required('Обязательное поле'),
        description: yup.string().required('Обязательное поле'),
        file: yup.array().of(yup.object().shape({
            file: yup.mixed().test('fileSize', 'Размер файла больше 5 мбайт', (value) => {
                if (!value) return false
                return value.size < 5000000
            }).required(),
            type: yup.string().oneOf(['image/png', 'image/jpeg'], 'Добавьте файл с правильным форматов').required(),
            name: yup.string().required()
        }).typeError('Добавьте файл')).required('Добавьте файл')
    })

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
        return touched && error && <p key={error} className={'error'}>{error}</p>
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

    const [selected, setSelected] = useState("(GMT+5) Екатеринбург");

    return (
        <Formik
            initialValues={{
                tel: '',
                email: '',
                firstName: '',
                secondName: '',
                specialization: '',
                password: '',
                secondPassword: '',
                description: '',
                file: undefined,
                saveMe: false
            }}
            onSubmit={(values) => {
                console.log(values)
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
              }) => (
                <form onSubmit={handleSubmit} className={s.form}>
                    <div className={s.input_container}>
                        <div className={s.input_tel}>
                            <div className={s.num_in_input}>+7</div>
                            <TextInput
                                type="text"
                                name="tel"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.tel}
                                placeholder={'Номер телефона'}
                                error={errors.tel && touched.tel && errors.tel}
                            />
                        </div>
                        <div className={s.error}>{errors.tel && touched.tel && errors.tel}</div>
                    </div>

                    <div className={s.input_container}>
                        <TextInput
                            type="text"
                            name="secondName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.secondName}
                            placeholder={'Фамилия'}
                        />
                        <div className={s.error}>{errors.secondName && touched.secondName && errors.secondName}</div>
                    </div>

                    <div className={s.input_container}>
                        <TextInput
                            type="text"
                            name="firstName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.firstName}
                            placeholder={'Имя'}
                        />
                        <div className={s.error}>{errors.firstName && touched.firstName && errors.firstName}</div>
                    </div>

                    <div className={s.input_container}>
                        <div className={s.input_tel}>
                            <label>
                                <FieldArray name={'file'}>

                                    {
                                        (arrayHelper) => (
                                            <input
                                                style={{display: 'none'}}
                                                type="file"
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
                                                        if (file)
                                                            setImage(file.file)
                                                    } else {
                                                        arrayHelper.push(file)
                                                        setImage(file.file)
                                                    }
                                                })}/>)
                                    }
                                </FieldArray>

                                {!preview || errors.file?.length > 0 ?
                                    (<div className={s.photo}>
                                        <img className={s.photo_img} src={photo} alt=""/>
                                    </div>) :
                                    <img src={preview} alt="" className={s.preview_image}/>}
                            </label>
                            <div className={s.photo_description}>
                                {values.file && (Array.isArray(values.file) && values.file[0] !== null) ? values.file[0]?.name : 'Помогите пользователю выбрать именно Вас'}
                            </div>
                        </div>
                        {getArrErrorsMessages(errors.file).map((error) => <div key={getError(true, error)}
                                                                               className={s.error}>{getError(true, error)}</div>)}
                        {<div
                            className={s.error}>{!Array.isArray(errors.file) && errors.file && touched.file && errors.file}</div>}

                    </div>

                    <div className={s.input_container}>
                        <TextInput
                            type="text"
                            name="specialization"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.specialization}
                            placeholder={'Ваша специализация'}
                        />
                        <div
                            className={s.error}>{errors.specialization && touched.specialization && errors.specialization}</div>
                    </div>

                    <div className={s.input_container}>
                        <TextArea
                            name={'description'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.description}
                            placeholder={'Расскажите о себе'}
                        />
                        <div className={s.error}>{errors.description && touched.description && errors.description}</div>
                    </div>

                    <div className={s.input_container}>
                        <CustomSelect
                            selected={selected}
                            setSelected={setSelected}
                            list={['(GMT+5) Екатеринбург', '(GMT-3) Лондон', '(GMT+2) Сидней', '(GMT+4) Москва', '(GMT-10) Манчестер']}/>
                    </div>
                    <div className={s.input_container}>
                        <TextInput
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            placeholder={'Пароль'}
                        />
                        <div className={s.error}>{errors.password && touched.password && errors.password}</div>
                    </div>

                    <div className={s.input_container}>
                        <TextInput
                            type="password"
                            name="secondPassword"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.secondPassword}
                            placeholder={'Повторите пароль'}
                        />
                        <div
                            className={s.error}>{errors.secondPassword && touched.secondPassword && errors.secondPassword}</div>
                    </div>
                    <div className={s.low_container}>
                        <div>
                            <label>
                                <input
                                    name="saveMe"
                                    type="checkbox"
                                    onChange={handleChange}
                                    value={values.saveMe}/>
                                Оставаться в системе</label>
                        </div>
                        <span className={s.lost_password}>Забыли пароль?</span>
                    </div>
                    <div className={s.btn_container}>
                        <Button title={'Зарегистрироваться'} onClick={handleSubmit}
                                disabled={isSubmitting}/>
                    </div>
                    <Link to={'/login'}>
                        <div className={s.to_reg}>
                            Войти
                        </div>
                    </Link>
                </form>
            )}
        </Formik>
    );
};

export default MentorRegistrationForm;
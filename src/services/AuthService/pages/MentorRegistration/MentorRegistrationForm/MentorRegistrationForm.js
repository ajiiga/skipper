import React, {useEffect, useState} from 'react';
import * as yup from "yup";
import {FieldArray, Formik} from "formik";
import authStore from "../../../../../store/authStore";
import s from "../../../styles/Forms.module.css";
import TextInput from "../../../../../components/UI/TextInput/TextInput";
import Button from "../../../../../components/UI/Button/Button";
import {Link} from "react-router-dom";
import photo from '../../../../../static/img/Login/photo.svg'


const MentorRegistrationForm = () => {


    const validationSchema = yup.object({
        tel: yup.number().typeError('Неправильная форма').required('Обязательное поле'),
        firstName: yup.string().required('Обязательное поле'),
        secondName: yup.string().required('Обязательное поле'),
        specialization: yup.string().required('Обязательное поле'),
        password: yup.string().required('Обязательное поле'),
        secondPassword: yup.string().oneOf([yup.ref('password')], 'Пароли не совпадают').required('Обязательное поле'),
        file: yup.array().of(yup.object().shape({
            file: yup.mixed().test('fileSize', 'Размер файла больше 5 мбайт', (value) => {
                if (!value) return false
                return value.size < 5000000
            }).required(),
            type: yup.string().oneOf(['image/png', 'image/jpeg'], 'Добавьте файл с правильным форматов').required(),
            name: yup.string().required()
        }).typeError('Добавьте файл')).required()
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
                Object.values(value).forEach((error) => { result.push(error) })
            }
        })
        return result
    }

    const getError = (touched, error) => {
        return touched && error && <p key={error} className={'error'}>{error}</p>
    }

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
                                            const {files} = event.target
                                            const file = getFileSchema(files.item(0))
                                            if (!file) {
                                                arrayHelper.remove(0)
                                            }
                                            if (Array.isArray(values.file)) {
                                                arrayHelper.replace(0, file)
                                            } else {
                                                arrayHelper.push(file)
                                            }
                                        })}/>)
                                    }
                                </FieldArray>

                                <div className={s.photo}>
                                    <img className={s.photo_img} src={photo} alt=""/>
                                </div>
                            </label>
                            <div className={s.photo_description}>
                                {values.file && (Array.isArray(values.file) && values.file[0] !== null) ?  values.file[0]?.name : 'Помогите пользователю выбрать именно Вас'}
                                {console.log(values.file)}
                            </div>
                        </div>
                        {getArrErrorsMessages(errors.file).map((error) => <div key={getError(true, error)} className={s.error}>{getError(true, error)}</div>)}
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
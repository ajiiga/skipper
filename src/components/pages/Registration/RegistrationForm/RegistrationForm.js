import React from 'react';
import {Formik} from "formik";
import s from '../../Login/EmailForm/EmailForm.module.css'
import Button from "../../../UI/Button/Button";
import {Link} from "react-router-dom";
import TextInput from "../../../UI/TextInput/TextInput";
import * as yup from "yup";

const RegistrationForm = () => {
    const validationSchema = yup.object({
        tel: yup.number().typeError('Неправильная форма').required('Обязательное поле'),
        firstName: yup.string().required('Обязательное поле'),
        secondName: yup.string().required('Обязательное поле'),
        password: yup.string().required('Обязательное поле'),
        secondPassword: yup.string().oneOf([yup.ref('password')], 'Пароли не совпадают').required('Обязательное поле') ,
    })
    return (
        <Formik
            initialValues={{
                tel: '',
                firstName: '',
                secondName: '',
                password: '',
                secondPassword: '',
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
                            name="firstName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.firstName}
                            placeholder={'Имя'}
                        />
                        <div className={s.error}>{errors.firstName && touched.firstName && errors.firstName}</div>
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
                        <div className={s.error}>{errors.secondPassword && touched.secondPassword && errors.secondPassword}</div>
                    </div>
                    <div className={s.low_container}>
                        <div>
                            <input
                                name="saveMe"
                                type="checkbox"
                                onChange={handleChange}
                                value={values.saveMe}/>
                            <label>Оставаться в системе</label>
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

export default RegistrationForm;
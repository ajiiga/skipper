import React from 'react';
import {Formik} from "formik";
import s from '../../Login/EmailForm/EmailForm.module.css'
import Button from "../../../UI/Button/Button";
import {Link} from "react-router-dom";

const RegistrationForm = () => {
    return (
        <Formik
            initialValues={{
                firstName: '',
                secondName: '',
                password: '',
                secondPassword: '',
                saveMe: false
            }}
            onSubmit={(values) => {
                console.log(values)
            }}
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
                    <input
                        type="text"
                        name="firstName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.firstName}
                        className={s.input}
                        placeholder={'Имя'}
                    />
                    <input
                        type="text"
                        name="secondName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.secondName}
                        className={s.input}
                        placeholder={'Фамилия'}
                    />
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        className={s.input}
                        placeholder={'Пароль'}
                    />
                    <input
                        type="password"
                        name="secondPassword"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.secondPassword}
                        className={s.input}
                        placeholder={'Повторите пароль'}
                    />
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
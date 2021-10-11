import React from 'react';
import * as yup from "yup";
import {Formik} from "formik";
import s from "../EmailForm/EmailForm.module.css";
import TextInput from "../../../UI/TextInput/TextInput";
import Button from "../../../UI/Button/Button";
import {Link} from "react-router-dom";

const TelForm = () => {
    const validationSchema = yup.object({
        tel: yup.number().typeError('Неправильная форма').required('Обязательное поле'),
        password: yup.string().required('Обязательное поле')
    })

    return (
        <Formik
            initialValues={{
                tel: '',
                password: '',
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
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            placeholder={'Password'}
                        />
                        <div className={s.error}>{errors.password && touched.password && errors.password}</div>
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
                        <Button title={'Войти'} onClick={handleSubmit}
                                disabled={isSubmitting}/>
                    </div>
                    <Link to={'/registration'}>
                        <div className={s.to_reg}>
                            Зарегистрироваться
                        </div>
                    </Link>
                </form>
            )}
        </Formik>
    );
};

export default TelForm;
import React, {useState} from 'react';
import {Formik} from "formik";
import s from '../../../styles/Forms.module.css'
import Button from "../../../../../components/UI/Button/Button";
import {Link} from "react-router-dom";
import * as yup from 'yup'
import TextInput from "../../../../../components/UI/TextInput/TextInput";
import {observer} from "mobx-react-lite";
import authStore from "../../../../../store/authStore";
import Preloader from "../../../../../components/UI/Preloader/Preloader";

const EmailForm = ({isFetching, setIsFetching}) => {
    let [status, setStatus] = useState('')

    const validationSchema = yup.object({
        email: yup.string().required('Обязательное поле').email('Неправильная форма почты'),
        password: yup.string().required('Обязательное поле')
    })

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
                saveMe: false
            }}
            onSubmit={(values) => {
                setIsFetching(true)
                authStore.login(values.email, values.password, values.saveMe).then(x => {
                    setIsFetching(false)
                    if (!x.response) {
                        setStatus(x.message)
                    }

                    if (x.response) {
                        authStore.checkStatus()
                    }
                })
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
                <form
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSubmit();
                        }
                    }}
                    onSubmit={handleSubmit} className={s.form}>
                    {status && <div className={s.status_error}>{status}</div>}
                    <div className={s.input_container}>
                        <TextInput
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            placeholder={'Email'}
                        />
                        <div className={s.error}>{errors.email && touched.email && errors.email}</div>
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
                    {isFetching && <Preloader/>}

                    <div className={s.btn_container}>
                        <Button title={'Войти'} onClick={handleSubmit}
                                disabled={isFetching}/>
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

export default observer(EmailForm);
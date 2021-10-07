import React from 'react';
import {Formik} from "formik";
import s from './EmailForm.module.css'

const EmailForm = () => {
    return (
        <Formik
        initialValues={{
            email: '',
            password: ''
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
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        className={s.input}
                        placeholder={'Email'}
                    />
                    {errors.email && touched.email && errors.email}
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        className={s.input}
                        placeholder={'Password'}
                    />
                    <div>
                        <input type="checkbox"/>
                        <label>Оставаться в системе</label>

                    </div>
                    {errors.password && touched.password && errors.password}
                    <button type="submit"
                            disabled={isSubmitting}
                            className={s.submit}>
                        ВОЙТИ
                    </button>
                </form>
            )}
        </Formik>
    );
};

export default EmailForm;
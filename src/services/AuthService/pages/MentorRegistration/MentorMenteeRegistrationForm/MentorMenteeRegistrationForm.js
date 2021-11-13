import React, {useState} from 'react';
import * as yup from "yup";
import {FieldArray, Formik} from "formik";
import s from "../../../styles/Forms.module.css";
import TextInput from "../../../../../components/UI/TextInput/TextInput";
import photo from "../../../../../static/img/Login/photo.svg";
import TextArea from "../../../../../components/UI/TextArea/TextArea";
import CustomSelect from "../../../../../components/UI/CustomSelect/CustomSelect";
import Button from "../../../../../components/UI/Button/Button";
import {Link} from "react-router-dom";
import publicStore from "../../../../../store/publicStore";
import authStore from "../../../../../store/authStore";
import Preloader from "../../../../../components/UI/Preloader/Preloader";

const MentorMenteeRegistrationForm = ({isFetching, setIsFetching}) => {
    let [preview, setPreview] = useState(null)
    let [status, setStatus] = useState('')


    const validationSchema = yup.object({
        specialization: yup.string().required('Обязательное поле'),
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
                specialization: '',
                description: '',
                file: undefined,
                saveMe: false
            }}
            onSubmit={(values) => {
                setIsFetching(true)
                authStore.registrationMenteeMentor(values.specialization, values.description, selected, values.file[0].file).then(x => {
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
                <form onSubmit={handleSubmit} className={s.form}>
                    {status && <div className={s.status_error}>{status}</div>}
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
                    {isFetching && <Preloader />}
                    <div className={s.btn_container}>
                        <Button title={'Стать ментором'} onClick={handleSubmit}
                                disabled={isFetching}/>
                    </div>
                </form>
            )}
        </Formik>
    );
};

export default MentorMenteeRegistrationForm;
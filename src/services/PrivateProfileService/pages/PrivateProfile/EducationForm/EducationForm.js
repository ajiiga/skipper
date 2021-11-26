import React, {useEffect, useState} from 'react';
import s from "../../../styles/PrivateProfileService.module.css";
import default_img from "../../../../../static/img/PrivateProfile/education.svg";
import certificate from "../../../../../static/img/PrivateProfile/certif.png";
import privateProfileStore from "../../../../../store/privateProfileStore";
import ModalContainer from "../../../../../components/UI/ModalContainer/ModalContainer";
import CustomMiniSelect from "../../../../../components/UI/CustomMiniSelect/CusomMiniSelect";
import Button from "../../../../../components/UI/Button/Button";
import {Formik, FormikConsumer} from "formik";
import Preloader from "../../../../../components/UI/Preloader/Preloader";

const EducationForm = () => {


    let [isFetching, setIsFetching] = useState(false)
    let [error, setError] = useState('')

    useEffect(() => {
        privateProfileStore.getMyEducations()
    }, [])

    let [active, setActive] = useState(false)

    let [selectedFirstYear, setSelectedFirstYear] = useState('Начало')
    let [selectedSecondYear, setSelectedSecondYear] = useState('Конец')

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


    return (
        <div className={s.form_container}>
            <div className={s.set_photo_display}>
                <img src={default_img} alt=""/>
                <div className={s.btn_container}>
                    <div className={s.btn} onClick={() => setActive(true)}>Добавить</div>
                </div>
                <div className={s.description}>
                    Добавить новую информацию об образовании
                </div>
            </div>
            <div style={{width: '100%'}}>
                <div className={s.education_title}>Мое образование</div>
                <div className={s.education_items}>
                    <div className={s.education_item}>
                        <span className={s.education_name_title}>
                            2001 - 2005 <br/>
                            Магистр, Уральский Юридический Институт
                        </span>
                        <div className={s.delete}>Удалить</div>
                    </div>
                </div>
            </div>
            <ModalContainer title={'Добавление опыта работы'} setActive={setActive} active={active}>
                <Formik
                    initialValues={{name: ''}}
                    onSubmit={(values) => {
                        setIsFetching(true)
                        setTimeout(() => {
                            setIsFetching(false)
                            setActive(false)
                        }, 3000)
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
                      }) => <form>
                        <div className={s.form_content}>
                            <div className={s.form_block}><div className={s.error_status}>{error}</div></div>
                            {isFetching && <div className={s.form_block}><Preloader /></div>}
                            <div className={s.form_blocks}>
                                <div className={s.form_block}>
                                    <div className={s.form_block_title}>
                                        Название организации
                                    </div>
                                    <input type="text" name={'name'} className={s.form_input} value={values.name} onChange={handleChange} onBlur={handleBlur}/>
                                </div>

                                <div className={s.form_block}>
                                    <div className={s.form_block_title}>
                                        Годы работы
                                    </div>
                                    <div className={s.select_container}><CustomMiniSelect selected={selectedFirstYear}
                                                                                          setSelected={setSelectedFirstYear}
                                                                                          list={range(1950, 2021, 1)}/>
                                    </div>
                                    <div className={s.select_container}><CustomMiniSelect selected={selectedSecondYear}
                                                                                          setSelected={setSelectedSecondYear}
                                                                                          list={range(1950, 2021, 1)}/>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <Button title={'Сохранить'} onClick={() => {
                            setError('')
                            debugger
                            if (selectedFirstYear === 'Начало' || selectedSecondYear === 'Конец' || selectedFirstYear > selectedSecondYear || values.name === '') {
                                setError('Правильно заполните форму')
                            }
                            else {
                                handleSubmit()
                            }
                        }}/>
                    </form>}
                </Formik>
            </ModalContainer>
        </div>
    );
};

export default EducationForm;
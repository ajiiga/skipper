import React, {useEffect, useState} from 'react';
import s from "../../../styles/PrivateProfileService.module.css";
import default_img from "../../../../../static/img/PrivateProfile/work.svg";
import ModalContainer from "../../../../../components/UI/ModalContainer/ModalContainer";
import privateProfileStore from "../../../../../store/privateProfileStore";
import Preloader from "../../../../../components/UI/Preloader/Preloader";
import CustomMiniSelect from "../../../../../components/UI/CustomMiniSelect/CusomMiniSelect";
import Button from "../../../../../components/UI/Button/Button";
import {Formik} from "formik";

const WorkExperienceForm = () => {

    let [isFetching, setIsFetching] = useState(false)
    let [error, setError] = useState('')
    let [works, setWorks] = useState([])
    useEffect(() => {
        privateProfileStore.getMyWorkExperience().then(x => {
            let json_data = JSON.parse(x)
            setWorks(json_data)
        })
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
        <div>
            <div className={`${s.form_container} ${s.com_container}`}>
                <div className={s.set_photo_display}>
                    <img src={default_img} alt=""/>
                    <div className={s.btn_container}>
                        <div className={s.btn} onClick={() => setActive(true)}>Добавить</div>
                    </div>
                    <div className={s.description}>
                        Добавить новый опыт работы
                    </div>
                </div>
                <div style={{width: '100%'}}>
                    <div className={s.education_title}>Мой опыт работы</div>
                    <div className={s.com_items}>
                        {works.length > 0 ? works.map(x => <div className={s.education_item}>
                            <div className={s.work_title}>{x.StartYear} - {x.EndYear}</div>
                            <div>{x.Organization}</div>
                            <div className={s.delete} onClick={() => {
                                privateProfileStore.deleteWorkExperience(x.ID).then(r => {
                                    setWorks([...works].filter(el => el.ID !== x.ID))
                                })
                            }}>Удалить</div>
                        </div>) : <div className={s.zero_status}>Нет данных об опыте работы</div>}
                    </div>
                </div>
            </div>
            <ModalContainer setActive={setActive} active={active} title={'Добавление опыта работы'}>
                <Formik
                    initialValues={{name: ''}}
                    onSubmit={(values) => {
                        setIsFetching(true)
                        privateProfileStore.addWorkExperience(values.name, selectedFirstYear.toString(), selectedSecondYear.toString()).then(x => {
                            setWorks([...works, {
                                ID: x,
                                Organization: values.name,
                                StartYear: selectedFirstYear.toString(),
                                EndYear: selectedSecondYear.toString()
                            }])
                            values.name = ''
                            setSelectedFirstYear('Начало')
                            setSelectedSecondYear('Конец')
                            setIsFetching(false)
                            setActive(false)
                        })
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
                            <div className={s.form_block}>
                                <div className={s.error_status}>{error}</div>
                            </div>
                            {isFetching && <div className={s.form_block}><Preloader/></div>}
                            <div className={s.form_blocks}>
                                <div className={s.form_block}>
                                    <div className={s.form_block_title}>
                                        Название организации
                                    </div>
                                    <input placeholder={'Введите название'} type="text" name={'name'}
                                           className={s.form_input} value={values.name} onChange={handleChange}
                                           onBlur={handleBlur}/>
                                </div>

                                <div className={s.form_block}>
                                    <div className={s.form_block_title}>
                                        Годы работы
                                    </div>
                                    <div className={s.select_container_work}><CustomMiniSelect selected={selectedFirstYear}
                                                                                          setSelected={setSelectedFirstYear}
                                                                                          list={range(1950, 2021, 1).reverse()}/>
                                    </div>
                                    <div className={s.select_container_work}><CustomMiniSelect selected={selectedSecondYear}
                                                                                          setSelected={setSelectedSecondYear}
                                                                                          list={['По настоящее время', ...range(1950, 2021, 1).reverse()]}/>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <Button title={'Сохранить'} onClick={() => {
                            setError('')
                            if (selectedFirstYear === 'Начало' || selectedSecondYear === 'Конец' || (selectedSecondYear !== 'По настоящее время' && selectedFirstYear > selectedSecondYear) || values.name === '' || values.degree === '') {
                                setError('Правильно заполните форму')
                            } else {
                                handleSubmit()
                            }
                        }}/>
                    </form>}
                </Formik>
            </ModalContainer>
        </div>
    );
};

export default WorkExperienceForm;
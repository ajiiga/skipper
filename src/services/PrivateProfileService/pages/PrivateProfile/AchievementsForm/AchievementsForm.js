import React, {useEffect, useState} from 'react';
import s from "../../../styles/PrivateProfileService.module.css";
import default_img from "../../../../../static/img/PrivateProfile/achievements.svg";
import {Formik} from "formik";
import privateProfileStore from "../../../../../store/privateProfileStore";
import Preloader from "../../../../../components/UI/Preloader/Preloader";
import CustomMiniSelect from "../../../../../components/UI/CustomMiniSelect/CusomMiniSelect";
import Button from "../../../../../components/UI/Button/Button";
import ModalContainer from "../../../../../components/UI/ModalContainer/ModalContainer";

const AchievementsForm = () => {

    let [active, setActive] = useState(false)
    let [isFetching, setIsFetching] = useState(false)

    let [error, setError] = useState('')

    let [achievements, setAchievements] = useState([])

    useEffect(() => {
        privateProfileStore.getMyOtherInfo().then(x => setAchievements(x))
    }, [])

    return (
        <div>
            <div className={`${s.form_container} ${s.com_container}`}>
                <div className={s.set_photo_display}>
                    <img src={default_img} alt=""/>
                    <div className={s.btn_container}>
                        <div className={s.btn} onClick={() => setActive(true)}>Добавить</div>
                    </div>
                    <div className={s.description}>
                        Добавить новые достижения
                    </div>
                </div>
                <div style={{width: '100%'}}>
                    <div className={s.education_title}>Мой достижения</div>
                    <div className={s.com_items}>
                        {achievements.length > 0 ? achievements.map(x => <div className={s.achievement_item}>
                            <div className={s.achievement_title}>{x.Data}</div>
                            <div className={s.delete}>Удалить</div>
                        </div>) : <div className={s.zero_status}>У вас нет достижений</div>}
                    </div>
                </div>
            </div>
            <ModalContainer setActive={setActive} active={active} title={'Добавление прочей информации'}>
                <Formik
                    initialValues={{name: ''}}
                    onSubmit={(values) => {
                        setIsFetching(true)
                        privateProfileStore.addOtherInfo(values.name).then(x => {
                            setAchievements([...achievements, {Data: values.name}])
                            values.name = ''
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
                                {error && <div className={s.error_status}>{error}</div>}
                            </div>
                            {isFetching && <div className={s.form_block}><Preloader/></div>}
                            <div className={s.form_blocks}>
                                <div className={s.form_block}>
                                    <div className={s.form_block_title}>
                                        Поделитесь вашими достижениями
                                    </div>
                                    <textarea name="name" onChange={handleChange} onBlur={handleBlur} className={s.textarea_dop_info}>
                                        {values.name}
                                    </textarea>
                                </div>

                            </div>

                        </div>
                        <Button title={'Сохранить'} onClick={() => {
                            if (values.name !== '')
                                handleSubmit()
                            else
                                setError('Заполните форму')
                        }}/>
                    </form>}
                </Formik>
            </ModalContainer>
        </div>
    );
};

export default AchievementsForm;
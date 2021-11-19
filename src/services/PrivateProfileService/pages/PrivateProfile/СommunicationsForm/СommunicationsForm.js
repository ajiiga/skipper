import React, {useState} from 'react';
import s from '../../../styles/PrivateProfileService.module.css'
import default_img from "../../../../../static/img/PrivateProfile/communications.svg";
import ModalContainer from "../../../../../components/UI/ModalContainer/ModalContainer";
import {set} from "mobx";
import {Formik} from "formik";
import CustomMiniSelect from "../../../../../components/UI/CustomMiniSelect/CusomMiniSelect";
import Button from "../../../../../components/UI/Button/Button";
import * as yup from "yup";
import Preloader from "../../../../../components/UI/Preloader/Preloader";
import privateProfileStore from "../../../../../store/privateProfileStore";

const CommunicationsForm = ({listMessengers, listMyCommunications, setListMyCommunications}) => {
    let [active, setActive] = useState(false)
    let [selected, setSelected] = useState(listMessengers[0].Name)
    let [isFetching, setIsFetching] = useState(false)

    const validationSchema = yup.object({
        login: yup.string().required('Заполните все поля'),
    })
    return (
        <div className={`${s.form_container} ${s.com_container}`}>
            <div className={s.set_photo_display}>
                <img src={default_img} alt=""/>
                <div className={s.btn_container}>
                    <div className={s.btn} onClick={() => setActive(true)}>Добавить</div>
                </div>
                <div className={s.description}>
                    Добавить новый способ связи
                </div>
            </div>

            <div className={s.com_items}>
                {listMyCommunications.length !== 0 && listMyCommunications.map(x => <div className={s.com_block}>
                    <div className={s.block_title}>{x.messenger}</div>
                    <input type="text" value={x.login}/>
                    <div className={s.delete}>Удалить</div>
                </div>)}
            </div>
            <ModalContainer active={active} setActive={setActive}>
                <Formik
                    initialValues={{
                        login: ''
                    }}
                    onSubmit={(values) => {
                        setIsFetching(true)
                        let messenger_id = listMessengers.filter(x => x.Name === selected)[0].ID
                        privateProfileStore.AddCommunication(messenger_id, values.login).then(x =>{
                            setIsFetching(false)
                            setListMyCommunications([...listMyCommunications, {login: values.login, messenger: selected}])
                            setActive(false)
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
                        <form onSubmit={handleSubmit}>
                            <div className={s.form_content}>
                                {<div className={s.form_block}><div className={s.error_status}>{errors.login && touched.login && errors.login}</div></div>}
                                {isFetching && <div className={s.form_block}><Preloader /></div>}
                                <div className={s.form_blocks}>
                                    <div className={s.form_block}>
                                        <div className={s.form_block_title}>Мессенджер / Почта / Соц. сеть</div>
                                        <div className={s.form_custom_select_container}>
                                            <CustomMiniSelect list={listMessengers.map(x => x.Name)} selected={selected} setSelected={setSelected}/>
                                        </div>
                                    </div>
                                    <div className={s.form_block}>
                                        <div className={s.form_block_title}>Номер телефона / Почта / Никнейм</div>
                                        <input type="text" name="login" onChange={handleChange} onBlur={handleBlur}
                                               value={values.login} className={s.form_input}/>
                                    </div>
                                </div>
                            </div>

                            <Button title={'Сохранить'} disabled={false} onClick={handleSubmit}/>
                        </form>)
                    }
                </Formik>
            </ModalContainer>
        </div>
    );
};

export default CommunicationsForm;
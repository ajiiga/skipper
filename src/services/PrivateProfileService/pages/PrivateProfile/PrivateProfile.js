import React, {useEffect, useState} from 'react';
import MiniNavBar from "../../../../components/UI/MiniNavBar/MiniNavBar";
import s from '../../styles/PrivateProfileService.module.css'
import EditForm from "./EditForm/EditForm";
import CommunicationsForm from "./СommunicationsForm/СommunicationsForm";
import PurseForm from "./PurseForm/PurseForm";
import NotificationsForm from "./NotificationsForm/NotificationsForm";
import EducationForm from "./EducationForm/EducationForm";
import authStore from "../../../../store/authStore";
import Footer from "../../../../components/Footer/Footer";
import WorkExperienceForm from "./WorkExperienceForm/WorkExperienceForm";
import AchievementsForm from "./AchievementsForm/AchievementsForm";
import privateProfileStore from "../../../../store/privateProfileStore";
import Preloader from "../../../../components/UI/Preloader/Preloader";

const PrivateProfile = () => {
    let [isFetching, setIsFetching] = useState(true)
    let [listMessengers, setListMessengers] = useState([])
    let [listMyCommunications, setListMyCommunications] = useState([])
    useEffect(() => {
        privateProfileStore.initializationPrivateProfile().then(r => {
            setListMessengers(r.messengers)
            let deltaMyCommunications = r.myCommunications.map(x => {
                return {
                    ID: x.ID,
                    login: x.Login,
                    messenger: x.Messenger[0].Name
                }
            })

            setListMyCommunications(deltaMyCommunications)
            setIsFetching(false)
        })
    }, [])

    if (isFetching) {
        return <Preloader />
    }

    return (
        <div className={s.container}>
            <MiniNavBar child={'Личный кабинет'}/>
            <div className={s.content}>
                <div className={s.title}>Общая информация</div>
                <EditForm />
                <div className={s.title}>Способы коммуникации</div>
                <CommunicationsForm listMessengers={listMessengers} listMyCommunications={listMyCommunications} setListMyCommunications={setListMyCommunications}/>
                <div className={s.title}>Кошелёк</div>
                <PurseForm />
                <div className={s.title}>Уведомления</div>
                <NotificationsForm />
                {authStore.user?.is_mentor && (
                    <>
                        <div className={s.title}>Образование</div>
                        <EducationForm />
                        <div className={s.title}>Опыт работы</div>
                        <WorkExperienceForm/>
                        <div className={s.title}>Мои достижения</div>
                        <AchievementsForm />
                    </>
                )
                }

            </div>
            <Footer />
        </div>
    );
};

export default PrivateProfile;
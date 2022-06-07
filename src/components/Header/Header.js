import React, { useState } from "react";
import s from "./Header.module.css";
import profileImg from "../../static/img/profile-img.jpg";
import { Link } from "react-router-dom";
import ProfileModal from "./ProfileModal/ProfileModal";
import { observer } from "mobx-react-lite";
import { API_URL } from "../../api/api_setting";
import profile_img from "../../static/img/header_icons/profile.svg";
import message from "../../static/img/header_icons/message.svg";
import menu_img from "../../static/img/header_icons/menu.svg";
import search_img from "../../static/img/header_icons/search.svg";
import star_img from "../../../src/static/img/header_icons/star.svg";
import bell_img from "../../static/img/header_icons/bell.svg";
import authStore from "../../store/authStore";
import MyLessonsButton from "../UI/MyLessonsButton/MyLessonsButton";
import MobileMenu from "./MobileMenu/MobileMenu";
import messagesStore from "../../store/messagesStore";
import NotificationModal from "./NotificationModal/NotificationModal";

const Header = ({ isAuth, profile }) => {
  let [openModal, setOpenModal] = useState(false);
  let [openNotification, setOpenNotification] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  //Хэдэр для не аутенфицированных пользователей
  if (!isAuth)
    return (
      <>
        <header className={`${s.header} ${s.header_fixed}`}>
          <div className={s.header_container}>
            <Link to={"/"}>
              <span className={s.logo}>Skipper</span>
            </Link>
            <div className={s.right_container}>
              <Link to={"/registration"}>
                <div className={s.to_auth}>Регистрация</div>
              </Link>
              <Link to={"/login"}>
                <div className={s.to_auth}>Войти</div>
              </Link>
            </div>
          </div>
        </header>
        <div className={s.hidden_block}></div>
      </>
    );

  // Хэдэр для аутенфицированных пользователей
  return (
    <>
      {openMobileMenu && (
        <MobileMenu setOpenMobileMenu={setOpenMobileMenu} profile={profile} />
      )}
      <header className={`${s.header} ${s.header_fixed}`}>
        <div className={s.header_container}>
          <div className={s.left_container}>
            <Link to={"/"}>
              <span className={s.logo}>Skipper</span>
            </Link>
            <div className={s.icons}>
              <Link
                to={
                  profile.is_mentor
                    ? `/mentor-profile/${profile.id}`
                    : `/mentee-profile/${profile.id}`
                }
              >
                <div className={s.icon}>
                  <img src={profile_img} alt="" />
                </div>
              </Link>
              <Link to={"/messages"}>
                <div className={s.icon}>
                  <img src={message} alt="" />
                  {messagesStore.newMessage && (
                    <div className={s.notification_circle} />
                  )}
                </div>
              </Link>
              <Link to={"/search"}>
                <div className={s.icon}>
                  <img src={search_img} alt="" />
                </div>
              </Link>
              <Link to={"/favorites"}>
                <div className={s.icon}>
                  <img src={star_img} alt="" />
                </div>
              </Link>
              {width >= 500 && (
                <MyLessonsButton
                  isMentor={profile.is_mentor}
                  setOpenMobileMenu={setOpenMobileMenu}
                  className={s.hidden_on_mobile}
                />
              )}
            </div>
          </div>
          <div className={`${s.right_container} ${s.right_container_is_auth}`}>
            <div className={s.icon}>
              <img
                style={{ cursor: "pointer" }}
                onClick={() => setOpenNotification(true)}
                src={bell_img}
                alt=""
              />
              {openNotification && (
                <NotificationModal setOpen={setOpenNotification} />
              )}
            </div>
            {width <= 500 && (
              <div className={s.icon} onClick={() => setOpenMobileMenu(true)}>
                <img src={menu_img} alt="" />
              </div>
            )}
            <div>
              <div
                className={s.profile_block}
                onClick={() => setOpenModal(true)}
              >
                <div className={s.profile_content}>
                  <div>
                    {profile.first_name} {profile.second_name}
                  </div>
                  <div className={s.status}>
                    {profile?.is_mentor ? "ментор" : "менти"}
                  </div>
                </div>
                <img
                  src={`${API_URL}${profile.profile_picture}`}
                  alt=""
                  className={s.profile_img}
                />
              </div>
              {openModal && <ProfileModal setOpen={setOpenModal} />}
            </div>
          </div>
        </div>
      </header>
      <div className={s.hidden_block}></div>
    </>
  );
};

export default observer(Header);

import React, { useEffect, useState } from "react";
import s from "../styles/PublicProfile.module.css";
import { useHistory, useParams } from "react-router-dom";
import MiniNavBar from "../../../components/UI/MiniNavBar/MiniNavBar";
import publicProfileStore from "../../../store/publicProfileStore";
import Preloader from "../../../components/UI/Preloader/Preloader";
import { API_URL } from "../../../api/api_setting";
import RateDisplay from "../../../components/UI/RateDisplay/RateDisplay";
import FollowButton from "../../../components/UI/FollowButton/FollowButton";
import ChatButton from "../../../components/UI/ChatButton/ChatButton";
import LessonStatistics from "../../../components/UI/LessonStatistics/LessonStatistics";
import Tag from "../../../components/UI/Tag/Tag";
import FreeTimeCalendar from "./FreeTimeCalendar/FreeTimeCalendar";
import SearchService from "../../PublicService/pages/Search/SearchItem/SearchService/SearchService";
import Footer from "../../../components/Footer/Footer";
import Reviews from "../../../components/UI/Reviews/Reviews";
import ComplainModal from "../../../components/UI/ComplainModal/ComplainModal";
import { Route } from "react-router-dom";
import ModalRegistrationLesson from "./ModalRegistrationLesson/ModalRegistartionLesson";
import authStore from "../../../store/authStore";

const MentorProfile = () => {
  let params = useParams();
  let id = params.id;

  let [isFetching, setIsFetching] = useState(true);
  let [user, setUser] = useState({});
  let [active, setActive] = useState(false);
  let [tags, setTags] = useState([]);

  let history = useHistory();

  useEffect(() => {
    publicProfileStore.initializeMentorInfo(id).then((x) => {
      setIsFetching(true);
      if (!x.user.response) history.push("/");
      setUser(x.user.data);
      setTags(x.tags);
      setIsFetching(false);
    });
  }, [id]);

  useEffect(() => {
    if (active) {
      document.body.style.position = "fixed";
    } else {
      document.body.style.position = "static";
    }
  }, [active]);

  if (isFetching) {
    return <Preloader />;
  }

  let monthName = {
    1: "????????????",
    2: "??????????????",
    3: "??????????",
    4: "????????????",
    5: "??????",
    6: "????????",
    7: "????????",
    8: "??????????????",
    9: "????????????????",
    10: "??????????????",
    11: "????????????",
    12: "??????????????",
  };

  const width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  return (
    <>
      <div className={s.container}>
        <MiniNavBar child={"?????????????? ??????????????"} />
        <div className={s.content_container}>
          <div className={s.left_side}>
            <div className={s.head_container}>
              <div className={` ${width <= 500 ? s.title_mobile : s.title}`}>
                <div className={` ${width <= 500 ? s.title : ""}`}>????????????</div>
                {width <= 500 && (
                  <div className={s.mentor_skills}>
                    {user.tags.map((tag) => (
                      <div className={s.tag_container}>
                        <Tag title={tag} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className={s.rate_info}>
                {width <= 500 && (
                  <img
                    src={`${API_URL}${user.profile_picture}`}
                    className={s.profile_img}
                    alt=""
                  />
                )}
                <div className={s.img_name}>
                  {width > 500 && (
                    <img
                      src={`${API_URL}${user.profile_picture}`}
                      className={s.profile_img}
                      alt=""
                    />
                  )}

                  <div
                    className={s.name}
                  >{`${user.first_name} ${user.second_name}`}</div>
                  <div className={s.specialisation}>{user.specialization}</div>

                  {width <= 500 && (
                    <div className={s.mentor_info}>
                      <div className={s.mentor_description}>
                        {user.description}
                      </div>
                    </div>
                  )}
                </div>
                <div className={s.rate}>
                  <RateDisplay rate={user.rating} />
                  <div className={s.date}>
                    ???? Skipper ?? {user.day} {monthName[parseInt(user.month)]}{" "}
                    {user.year}
                  </div>
                  <div className={s.stat_count}>217 ?????????????? 40 ????????????????</div>
                </div>
              </div>
              {width > 500 && (
                <div className={s.mentor_info}>
                  <div className={s.mentor_description}>{user.description}</div>
                  {width > 500 && (
                    <div className={s.mentor_skills}>
                      {user.tags.map((tag) => (
                        <div className={s.tag_container}>
                          <Tag title={tag} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className={s.buttons}>
                <div className={s.timezone}>?????????? ???????????????????????? {user.time}</div>
                <div className={s.btns}>
                  <div className={s.btn_container}>
                    <FollowButton />
                  </div>
                  <div className={s.btn_container}>
                    <ChatButton id={id} />
                  </div>
                </div>
              </div>
            </div>
            {width <= 500 && (
              <div className={`${s.info_container} ${s.service_list}`}>
                <div className={s.title}>??????????????</div>
                <div>
                  {JSON.parse(user.classes).map((x, index) => (
                    <div className={s.service_container} key={index}>
                      <SearchService
                        id={id}
                        service_id={x.ID}
                        name={x.ClassName}
                        description={x.Description}
                        tags={x.Tags.map(
                          (x) => tags.filter((y) => y.ID === x.ID)[0].name3
                        )}
                        blocked={id == authStore.user.id}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {width <= 500 && (
              <div className={s.right_side}>
                <div className={s.free_time_block}>
                  <div className={s.title}>?????????????????? ??????????</div>
                  <FreeTimeCalendar classes={JSON.parse(user.classes)} />
                </div>
              </div>
            )}

            <div className={s.info_container}>
              <div className={s.title}>???????????????????? ??????????????</div>
              <LessonStatistics />
            </div>
          </div>
          {width > 500 && (
            <div className={s.right_side}>
              <div className={s.free_time_block}>
                <div className={s.title}>?????????????????? ??????????</div>
                <FreeTimeCalendar classes={JSON.parse(user.classes)} />
              </div>
            </div>
          )}
        </div>
        {width > 500 && (
          <div className={`${s.info_container} ${s.service_list}`}>
            <div className={s.title}>??????????????</div>
            <div>
              {JSON.parse(user.classes).map((x, index) => (
                <div className={s.service_container} key={index}>
                  <SearchService
                    id={id}
                    service_id={x.ID}
                    name={x.ClassName}
                    description={x.Description}
                    tags={x.Tags.map(
                      (x) => tags.filter((y) => y.ID === x.ID)[0].name3
                    )}
                    blocked={id == authStore.user.id}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={s.content_container}>
          <div className={s.left_side}>
            <div className={s.head_container}>
              <div className={s.title}>????????????</div>
              <div className={s.summary_title}>
                <div>???????? ????????????</div>
                <div>??????????????????????</div>
                <div>?????? ????????????????????</div>
              </div>

              <div className={s.summary_content}>
                <div>
                  {user.work_experience &&
                    JSON.parse(user.work_experience).map((x, index) => (
                      <main className={s.summary_block} key={index}>
                        <span className={s.year}>
                          {x.StartYear} - {x.EndYear}
                        </span>
                        <br />
                        <span>{x.Organization}</span>
                      </main>
                    ))}
                </div>
                <div>
                  {JSON.parse(user.education).map((x, index) => (
                    <main className={s.summary_block} key={index}>
                      <span className={s.year}>
                        {x.StartYear} - {x.EndYear}
                      </span>
                      <br />
                      <span>
                        {x.Degree}, {x.Institution}
                      </span>
                    </main>
                  ))}
                </div>
                <div>
                  {JSON.parse(user.other_info).map((x) => (
                    <main className={s.summary_block}>{x.Data}</main>
                  ))}
                </div>
              </div>
            </div>
            {width > 500 && (
              <div className={s.hate_buttons}>
                <div className={s.btn} onClick={() => setActive(true)}>
                  ????????????????????????
                </div>
                <div className={s.btn}>?????????????????????????? ??????????????</div>
              </div>
            )}
          </div>
          <div className={s.right_side}>
            <div className={s.reviews_block}>
              <div className={s.title}>????????????</div>
              <Reviews n={2} allReviews={JSON.parse(user.comments)} />
            </div>
            {width <= 500 && (
              <div className={s.hate_buttons}>
                <div className={s.btn} onClick={() => setActive(true)}>
                  ????????????????????????
                </div>
                <div className={s.btn}>?????????????????????????? ??????????????</div>
              </div>
            )}
          </div>
        </div>
        <ComplainModal active={active} setActive={setActive} />
        {
          <Route path={`/mentor-profile/${id}/:service_id`}>
            <ModalRegistrationLesson
              classes={JSON.parse(user.classes)}
              communications={user.communications}
            />
          </Route>
        }
      </div>
      <Footer />
    </>
  );
};

export default MentorProfile;

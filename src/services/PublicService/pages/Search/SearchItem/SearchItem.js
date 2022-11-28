import React, {useEffect, useState} from 'react';
import s from './SearchItem.module.css'
import profile_img from '../../../../../static/img/profile-img.jpg'
import black_heart from '../../../../../static/img/Search/black_heart.svg'
import SearchService from "./SearchService/SearchService";
import FollowButton from "../../../../../components/UI/FollowButton/FollowButton";
import ChatButton from "../../../../../components/UI/ChatButton/ChatButton";
import Rating from "../../../../../components/UI/Rating/Rating";
import {API_URL} from "../../../../../api/api_setting";
import {Link} from "react-router-dom";
import authStore from "../../../../../store/authStore";

const SearchItem = ({id, first_name, second_name, specialization, description, picture, classes, tags, rating, averagePrice}) => {
    return (
        <div className={s.container}>
            <div className={s.profile}>
                <Link to={`/mentor-profile/${id}`}><img src={`${API_URL}/public-api/user/profile-picture/${picture}`}
                                                        alt="" className={s.profile_img}/></Link>
                <Link  className={s.profile_info} to={`/mentor-profile/${id}`}>
                    <div>
                        <div className={s.title}>{first_name} {second_name}</div>
                        <div className={s.status}>{specialization}</div>
                        <div className={s.description}>
                            {description}
                        </div>
                    </div>
                </Link>
                <div className={s.display}>
                    <Rating num={rating}/>
                    <div className={s.price_display}>
                        <div className={s.price}>{averagePrice}₽</div>
                        <div className={s.price_description}>средняя цена занятия</div>
                    </div>
                    <FollowButton user_id={parseInt(id)} status={'mentor'}/>
                    <ChatButton id={id}/>
                </div>
            </div>
            <div className={s.services}>
                {
                    classes.filter(x => {
                        return x.Tags.length !== 0
                    }).map((x, index) => <SearchService key={index} id={id} name={x.ClassName} description={x.Description}
                                               tags={x.Tags.map(x => tags.filter(y => y.ID === x.ID)[0]?.name3)} service_id={x.ID}
                                                blocked={id == authStore.user.id} />
                                               )
                }
            </div>
        </div>
    );
};

export default SearchItem;
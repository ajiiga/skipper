import React, {useState} from 'react';
import MiniNavBar from "../../../../components/UI/MiniNavBar/MiniNavBar";
import s from '../../styles/MyClasses.module.css'
import img from '../../../../static/img/Favorites/empty_favorites.svg'
import FavoritesBlock from "./FavoritesBlock/FavoritesBlock";

const Favorites = () => {
    let [favoriteMentors, setFavoriteMentors] = useState(true)

    return (
        <div className={s.container}>
            <MiniNavBar child={'Избранное'} />
            <div className={s.content_container}>
                <div className={s.favorites_title_container}>
                    <div className={s.favorites_title}>Избранное</div>
                    <div className={s.status_buttons}>
                        <div onClick={() => setFavoriteMentors(true)} className={`${s.status_button} ${favoriteMentors ? s.status_button_active : ''}`}>Менторы</div>
                        <div onClick={() => setFavoriteMentors(false)} className={`${s.status_button} ${!favoriteMentors ? s.status_button_active : ''}`}>Менти</div>
                    </div>
                </div>
                <div className={s.list_container}>
                    {/*<img src={img} className={s.img_empty_favorites} alt=""/>*/}
                    <FavoritesBlock />
                </div>
            </div>
        </div>
    );
};

export default Favorites;
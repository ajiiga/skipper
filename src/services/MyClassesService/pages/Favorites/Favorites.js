import React, {useEffect, useState} from 'react';
import MiniNavBar from "../../../../components/UI/MiniNavBar/MiniNavBar";
import s from '../../styles/MyClasses.module.css'
import img from '../../../../static/img/Favorites/empty_favorites.svg'
import FavoritesBlock from "./FavoritesBlock/FavoritesBlock";
import myClassesStore from "../../../../store/myClassesStore";

const Favorites = () => {
    let [favoriteMentors, setFavoriteMentors] = useState(true)
    let [isLoading, setIsLoading] = useState(true)

    let [items, setItems] = useState([])

    useEffect(() => {
        let requestKey = favoriteMentors ? 'mentor' : 'menti'
        setIsLoading(true)
        myClassesStore.getFavorites(requestKey).then((items) => {
            setItems(items)
            setIsLoading(false)

        })
    }, [favoriteMentors])

    const deleteBlock = (id) => {
        setItems(items => items.filter(x => x.id !== id))
    }

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
                {!isLoading && <div className={s.list_container}>
                    {items.length === 0 && <img src={img} className={s.img_empty_favorites} alt=""/>}
                    {items.map(x => <FavoritesBlock data={x} isMentor={favoriteMentors} deleteBlock={() => deleteBlock(x.id)}/>)}
                </div>}
            </div>
        </div>
    );
};

export default Favorites;
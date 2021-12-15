import React, {useEffect, useState} from 'react';
import s from "../EditWorkPlace.module.css";
import publicStore from "../../../../../../store/publicStore";
import Tag from "../../../../../../components/UI/Tag/Tag";

const TextareaCompetence = ({value, changeValue, tags, setTags, list, setValue}) => {
    let [show, setShow] = useState(false)
    let [canAddTag, setCanAddTag] = useState(false)



    let showList = list.filter(x => x.name3.toLowerCase().includes(value.toLowerCase()) && !tags.includes(x.ID))

    let _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (show)
                setCanAddTag(true)
        }
    }

    let addTag = (tag) => {
        let deltaTags = [...tags]
        let id = list.filter(x => x.name3 === tag)[0].ID
        deltaTags.push(id)
        setTags(deltaTags)
    }

    let deleteTag = (tagID) => {
        let deltaTags = tags.filter(x => x !== tagID)
        setTags(deltaTags)
    }





    return (
        <div className={s.relative}>
            <label htmlFor="competence">
            <div className={s.textarea_container}>
                <div className={s.tags}>{tags.map(x => <Tag key={x} title={list.filter(y => y.ID === x)[0].name3} onClick={() => deleteTag(x)} />)}</div>
                {tags.length < 3 && <input id={'competence'} className={s.textarea} placeholder={'Выберите то, чему будете учить'}
                           onChange={(event => {
                               changeValue(event.target.value)
                               setShow(true)
                           })}
                           onClick={() => setShow(true)} onKeyDown={_handleKeyDown} value={value}
                />

                        }
                <div className={s.count_tag}>{tags.length} / 3</div>
            </div>
            </label>
            {show && <DropDownCompetence list={showList} setShow={setShow} addTag={addTag} canAddTag={canAddTag} setCanAddTag={setCanAddTag} setValue={setValue}/>}
        </div>
    );
};


let DropDownCompetence = ({list, setShow, addTag, canAddTag, setCanAddTag, setValue}) => {
    let [activeItem, setActiveItem] = useState(0)
    let closeModal = () => setShow(false)
    useEffect(() => {
        window.addEventListener('click', closeModal)
        return () => {
            window.removeEventListener('click', closeModal)
            setShow(false)
        }
    }, [])

    useEffect(() => {
        if (list.length !== 0)
            setActiveItem(0)

    }, [list])

    useEffect(() => {
        if (canAddTag) {
            addTag(list[activeItem])
            setShow(false)
            setValue('')
        }
        setCanAddTag(false)
    }, [canAddTag])



    return (
        <div className={s.dropdown_container}>
            {list.map((x, i) => <div key={x.name3} className={`${s.dropdown_item} ${i === activeItem? s.active : ''}`} onMouseEnter={() => setActiveItem(i)} onClick={() => addTag(x.name3)}>{x.name3}</div>)}
        </div>
    )
}

export default TextareaCompetence;
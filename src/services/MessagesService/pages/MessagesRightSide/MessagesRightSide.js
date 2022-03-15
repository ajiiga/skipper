import React, {useEffect, useRef} from 'react';
import s from '../../styles/MessagesRightSide.module.css'
import profile from '../../../../static/img/profile.jfif'
import arrow from '../../../../static/img/Messages/send_message_arrow.svg'

const MessagesRightSide = () => {
    return (
        <div className={s.container}>
            <MessagesRightSideTitle/>
            <MessagesRightSideContent/>
            <MessagesRightSideInput/>
        </div>
    );
};

export default MessagesRightSide;


const MessagesRightSideTitle = () => {
    return (
        <div className={s.title_container}>
            <img src={profile} className={s.profile_img} alt=""/>
            <div className={s.name}>Сергей Иванов</div>
        </div>
    )
}

const MessagesRightSideContent = () => {

    let el = useRef()

    useEffect(() => {
        el.current.scrollTo(0, el.current.scrollHeight)
    }, [])

    return (
        <div className={s.scroll_container} ref={el}>
            <div className={s.content_container}>
                <MyMessage text={'Давайте обсудим сегодня React'}/>
                <CompanionMessage text={'Хорошо, давайте обсудим его'}/>
                <CompanionMessage text={'Установите его тогда заранее'}/>
                <MyMessage text={'Хорошо'}/>
                <CompanionMessage text={'А какие есть особенности этих блоков?'}/>
                <MyMessage text={'Да, их максимальная и минимальная ширина составляет 400 и 150 соответственно. \n' +
                'Минимальная высота 50. \n' +
                'Отступы от текста сверху и снизу по 15, слева и справа по 10 \n' +
                'potenti pretium. Sed maecenas integer scelerisque cras in tortor fringilla. Libero, quis '}/>
                <MyMessage text={'Хорошо'}/>
                <MyMessage text={'Хорошо'}/>
                <MyMessage text={'Хорошо'}/>
            </div>
        </div>
    )
}

const MyMessage = ({text}) => {
    return (
        <>
            <div className={s.my_message_container}>
                <div className={s.my_message}>{text}</div>
                <div className={s.my_message_triangle}/>
            </div>
            <div className={s.my_time}>Сегодня, 19:46</div>
        </>
    )
}

const CompanionMessage = ({text}) => {
    return (
        <>
            <div className={s.companion_message_container}>
                <div className={s.companion_message}>{text}</div>
                <div className={s.companion_message_triangle}/>
            </div>
            <div className={s.companion_time}>Сегодня, 19:46</div>
        </>
    )
}

const MessagesRightSideInput = () => {
    return (
        <div className={s.input_container}>
            <input type="text" className={s.input} placeholder={'Напишите сообщение...'}/>
            <img src={arrow} alt="" className={s.arrow_image}/>
        </div>
    )
}
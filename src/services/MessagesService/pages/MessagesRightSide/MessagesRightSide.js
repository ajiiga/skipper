import React, {useCallback, useEffect, useRef, useState} from 'react';
import s from '../../styles/MessagesRightSide.module.css'
import profile from '../../../../static/img/profile.jfif'
import arrow from '../../../../static/img/Messages/send_message_arrow.svg'
import navigator from '../../../../static/img/Messages/navigator.svg'
import set_review from '../../../../static/img/Messages/set_review.svg'
import {API_URL} from "../../../../api/api_setting";
import {useParams, Switch, Route, Redirect, Link} from "react-router-dom";
import messagesStore from "../../../../store/messagesStore";
import Preloader from "../../../../components/UI/Preloader/Preloader";
import authStore from "../../../../store/authStore";
import myClassesStore from "../../../../store/myClassesStore";
import SendReviewModal from "./SendReviewModal/SendReviewModal";
import ChangeLessonsDatesModal from "./ChangeLessonsDatesModal/ChangeLessonsDatesModal";

const io = require("socket.io-client");

const MessagesRightSide = ({value, setValue, setActiveUser, chatList, setChatList}) => {
    const socket = useRef()
    let params = useParams()

    let [id, setId] = useState(params.id)

    let [chatInfo, setChatInfo] = useState({})

    let [isLoading, setIsLoading] = useState(true)

    const connect = (info) => {
        socket.current = io('http://152.70.189.77:8000', {
            transports: ['websocket'],
            query: {
                roomId: info?.chat?.roomID,
                token: `${localStorage.getItem('token')}`
            },
        })

        socket.current.on("connect", () => {
            console.log('connect')
        });

        socket.current.on("connect_error", (err) => {
            console.log(`connect_error ${err?.data}`)
        });

        socket.current.on("disconnect", (reason) => {
            console.log('disconnect')
        });

        socket.current.on("message", (data) => {
            setChatInfo((chatInfo) => {
                let newMessages = [...chatInfo['messages'], {
                    ...JSON.parse(data),
                    stringDateAndTime: messagesStore.refactorDate((new Date()).toString())
                }]
                return {chat: chatInfo.chat, messages: newMessages}
            })

        });
    }

    let sendMessage = (text) => {
        if (text !== '') {
            socket.current.emit('message', JSON.stringify({
                senderId: authStore.user.id.toString(),
                receiverID: id,
                message: text,
                chatId: chatInfo?.chat?.roomID.toString()
            }))
            setValue('')
        }
    }


    useEffect(() => {
        socket.current?.close()
        messagesStore.getCurrentChat(params.id).then(x => {
            setChatInfo(x)
            connect(x)
            if (chatList.filter(chats => chats.ID === x.chat.ID).length === 0) {
                setChatList([...chatList, x.chat])
            }
            setIsLoading(false)
        })
        setActiveUser(parseInt(params.id))
        return () => {
            socket.current?.close()
            setActiveUser(-1)
        }
    }, [params.id])


    if (isLoading) {
        return <Preloader/>
    }

    return (
        <div className={s.container}>
            <MessagesRightSideTitle firstName={chatInfo.chat.FirstName} secondName={chatInfo.chat.SecondName}
                                    img={chatInfo.chat.ProfilePicture} id={chatInfo.chat.ID}/>
            <MessagesRightSideContent messages={chatInfo.messages}/>
            <MessagesRightSideInput value={value} setValue={setValue} sendMessage={sendMessage}/>
            <Switch>
                <Route path={`/messages/${params.id}/review`}>
                    <SendReviewModal id={params.id}/>
                </Route>
                <Route path={`/messages/${params.id}/change-lessons-dates`}>
                    <ChangeLessonsDatesModal id={params.id} />
                </Route>
                <Redirect to={`/messages/${params.id}`}/>
            </Switch>
        </div>
    );
};

export default MessagesRightSide;


const MessagesRightSideTitle = ({firstName, secondName, img, id}) => {
    return (
        <div className={s.title_container}>
            <Link to={`/mentor-profile/${id}`} className={s.link_container}>
                <img src={`${API_URL}/public-api/user/profile-picture/${img}`} className={s.profile_img} alt=""/>
                <div className={s.name}>{firstName} {secondName}</div>
            </Link>
        </div>
    )
}

const MessagesRightSideContent = ({messages}) => {

    let el = useRef()

    useEffect(() => {
        el.current.scrollTo(0, el.current.scrollHeight)
    }, [messages])

    let today = new Date()
    let yesterday = new Date(today.valueOf() - 86400000);

    return (
        <div className={s.scroll_container} ref={el}>
            <div className={s.content_container}>
                {messages.map(x => {


                    if (authStore.user.id == x.SenderID) {
                        return <MyMessage text={x.Body} time={x.stringDateAndTime}/>
                    }
                    return <CompanionMessage text={x.Body} time={x.stringDateAndTime}/>
                })}
            </div>
        </div>
    )
}

const MyMessage = ({text, time}) => {
    return (
        <>
            <div className={s.my_message_container}>
                <div className={s.my_message}>{text}</div>
                <div className={s.my_message_triangle}/>
            </div>
            {/*<div className={s.my_time}>Сегодня, 19:46</div>*/}
            <div className={s.my_time}>{time}</div>
        </>
    )
}

const CompanionMessage = ({text, time}) => {
    return (
        <>
            <div className={s.companion_message_container}>
                <div className={s.companion_message}>{text}</div>
                <div className={s.companion_message_triangle}/>
            </div>
            <div className={s.companion_time}>{time}</div>
        </>
    )
}

const MessagesRightSideInput = ({value, setValue, sendMessage}) => {

    let [messageIsReady, setMessageIsReady] = useState(false)

    let _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setMessageIsReady(true)
        }
    }

    useEffect(() => {
        if (messageIsReady) {
            sendMessage(value)
        }
        setMessageIsReady(false)
    }, [messageIsReady])

    return (
        <div className={s.input_container}>
            <MessagesNavigator/>
            <input type="text" value={value} onChange={e => setValue(e.target.value)} onKeyDown={_handleKeyDown}
                   className={s.input} placeholder={'Напишите сообщение...'}/>
            <img onClick={() => sendMessage(value)} src={arrow} alt="" className={s.arrow_image}/>
        </div>
    )
}

const MessagesNavigator = () => {

    let emptyNavigator = <img src={navigator} alt=""/>

    let navigatorWithNotification = (
        <div className={s.navigator_with_notification}>
            {emptyNavigator}
            <div className={s.navigator_notification}/>
        </div>
    )

    let setReview = (
        <img src={set_review} alt=""/>
    )


    return (
        navigatorWithNotification
    )
}
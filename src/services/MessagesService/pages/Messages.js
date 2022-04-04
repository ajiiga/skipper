import React, {useEffect, useRef, useState} from 'react';
import MiniNavBar from "../../../components/UI/MiniNavBar/MiniNavBar";
import s from '../styles/Messages.module.css'
import MessagesLeftSide from "./MessagesLeftSide/MessagesLeftSide";
import MessagesRightSide from "./MessagesRightSide/MessagesRightSide";
import {Switch, Route} from "react-router-dom";
import MessagesRightSideEmpty from "./MessagesRightSideEmpty/MessagesRightSideEmpty";
import {API_URL} from "../../../api/api_setting";

const io = require("socket.io-client");

const Messages = () => {
    //Значение в инпуте в левом меню
    let [query, setQuery] = useState('')

    //текст сообщения
    let [valueMessage, setValueMessage] = useState('')

    const socket = useRef()

    //websocket connect
    const connect = () => {
        socket.current = io(API_URL, {
            transports: ['websocket'],
            query: {
                roomId: 5
            }
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


    }

    //Функция отправки сообщения
    const sendMessage = async () => {
        const message = {
            message: valueMessage,
            id: Date.now(),
            event: 'message'
        }
        socket.current.send(JSON.stringify(message));
        setValueMessage('')
    }


    useEffect(() => {
        connect()
    }, [])


    return (
        <div className={s.container}>
            <MiniNavBar child={'Сообщения'}/>
            <div className={s.content_container}>
                <MessagesLeftSide query={query} setQuery={setQuery}/>
                <Switch>
                    <Route path={'/messages/:id'}>
                        <MessagesRightSide/>
                    </Route>
                    <Route path={'/messages'} exact={true}>
                        <MessagesRightSideEmpty/>
                    </Route>
                </Switch>
            </div>
        </div>
    );
};

export default Messages;
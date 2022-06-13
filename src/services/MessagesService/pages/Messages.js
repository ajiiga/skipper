import React, { useEffect, useRef, useState } from 'react';
import MiniNavBar from '../../../components/UI/MiniNavBar/MiniNavBar';
import s from '../styles/Messages.module.css';
import MessagesLeftSide from './MessagesLeftSide/MessagesLeftSide';
import MessagesRightSide from './MessagesRightSide/MessagesRightSide';
import { Switch, Route } from 'react-router-dom';
import MessagesRightSideEmpty from './MessagesRightSideEmpty/MessagesRightSideEmpty';
import { API_URL } from '../../../api/api_setting';
import messagesStore from '../../../store/messagesStore';
import Preloader from '../../../components/UI/Preloader/Preloader';
import MessagesMobile from './MessagesMobile';

const Messages = () => {
    //Значение в инпуте в левом меню
    let [query, setQuery] = useState('');

    //текст сообщения
    let [valueMessage, setValueMessage] = useState('');

    let [chatList, setChatList] = useState([]);

    let [isLoading, setIsLoading] = useState(true);

    let [activeUser, setActiveUser] = useState(-1);

    useEffect(() => {
        messagesStore.getChatList().then((x) => {
            setChatList(x);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return <Preloader />;
    }

    const width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;

    return (
        <div className={s.container}>
            <MiniNavBar child={'Сообщения'} />
            {width > 500 ? (
                <div className={s.content_container}>
                    <MessagesLeftSide
                        query={query}
                        setQuery={setQuery}
                        users={chatList}
                        setUsers={setChatList}
                        activeUser={activeUser}
                    />
                    <Switch>
                        <Route path={'/messages/:id'}>
                            <MessagesRightSide
                                value={valueMessage}
                                setValue={setValueMessage}
                                setActiveUser={setActiveUser}
                                chatList={chatList}
                                setChatList={setChatList}
                            />
                        </Route>
                        <Route path={'/messages'} exact={true}>
                            <MessagesRightSideEmpty />
                        </Route>
                    </Switch>
                </div>
            ) : (
                <MessagesMobile
                    query={query}
                    setQuery={setQuery}
                    chatList={chatList}
                    setChatList={setChatList}
                    activeUser={activeUser}
                    valueMessage={valueMessage}
                    setValueMessage={setValueMessage}
                    setActiveUser={setActiveUser}
                />
            )}
        </div>
    );
};

export default Messages;

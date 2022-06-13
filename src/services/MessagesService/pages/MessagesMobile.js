import React, { useState } from 'react';
import s from '../styles/Messages.module.css';
import MessagesLeftSide from './MessagesLeftSide/MessagesLeftSide';
import MessagesRightSide from './MessagesRightSide/MessagesRightSide';
import { Switch, Route } from 'react-router-dom';
import MessagesRightSideEmpty from './MessagesRightSideEmpty/MessagesRightSideEmpty';

const MessagesMobile = ({
    query,
    setQuery,
    chatList,
    setChatList,
    activeUser,
    valueMessage,
    setValueMessage,
    setActiveUser,
}) => {
    return (
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
                <MessagesLeftSide
                    query={query}
                    setQuery={setQuery}
                    users={chatList}
                    setUsers={setChatList}
                    activeUser={activeUser}
                />
            </Route>
        </Switch>
    );
};

export default MessagesMobile;

import React, {useEffect, useMemo} from 'react';
import s from "../../styles/MessagesLeftSide.module.css";
import SearchBar from "../../../../components/UI/SearchBar/SearchBar";
import MessagesBlock from "./MessagesBlock/MessagesBlock";
import messagesStore from "../../../../store/messagesStore";
import {useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";

const MessagesLeftSide = ({query, setQuery, users, setUsers, activeUser}) => {

    let params = useParams()

    let sortedUser = useMemo(() => {
        let lowCaseQuery = query.toLowerCase()
        return users.filter(x => x.FirstName.toLowerCase().includes(lowCaseQuery) || x.SecondName.toLowerCase().includes(lowCaseQuery))
    }, [query, users])

    const changeCountUnreadMessages = (roomId, count) => {
        let newUsers = users.map(user => {
            if (user.ID === roomId) {
                return {...user, count_unread_messages: count}
            }
            return user
        })
        setUsers(newUsers)
    }

    useEffect(() => {
        for (let user of users) {
            let unreadMessages = messagesStore.newMessages.filter(message => {
                return message.SenderID == user.ID
            })
            let countUnreadMessage = unreadMessages.length
            if (user.ID == activeUser) {
                messagesStore.clearReadMessages(activeUser)
            }
            else {
                changeCountUnreadMessages(user.ID, user.count_unread_messages + countUnreadMessage)
            }
        }
    }, [messagesStore.newMessages])

    return (
        <div className={s.container}>
            <SearchBar query={query} setQuery={setQuery}/>
            <div className={s.content_container}>
                <div className={s.messengers_items}>
                    {sortedUser.length > 0 ? sortedUser.map(x => <MessagesBlock key={x.ID} data={x} isActive={x.ID === activeUser} changeCountUnreadMessages={changeCountUnreadMessages}/>) : (
                        <div className={s.empty_messages_items}>У вас еще нет диалогов</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default observer(MessagesLeftSide);
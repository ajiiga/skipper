import React from 'react';
import s from "../../styles/MessagesLeftSide.module.css";
import SearchBar from "../../../../components/UI/SearchBar/SearchBar";
import MessagesBlock from "./MessagesBlock/MessagesBlock";

const MessagesLeftSide = ({query, setQuery}) => {
    let statusSent = {
        code: 0
    }

    let statusRead = {
        code: 1
    }

    let statusNoRead = {
        code: 2,
        count: 3
    }

    return (
        <div className={s.container}>
            <SearchBar query={query} setQuery={setQuery}/>
            <div className={s.content_container}>
                <div className={s.messengers_items}>
                    <MessagesBlock status={statusRead}/>
                    <MessagesBlock status={statusNoRead}/>
                    <MessagesBlock status={statusRead}/>
                    <MessagesBlock status={statusRead}/>
                    <MessagesBlock status={statusRead}/>
                    <MessagesBlock status={statusSent}/>
                </div>
            </div>
        </div>
    );
};

export default MessagesLeftSide;
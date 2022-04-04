import React from 'react';
import s from "../../styles/MessagesLeftSide.module.css";
import SearchBar from "../../../../components/UI/SearchBar/SearchBar";
import MessagesBlock from "./MessagesBlock/MessagesBlock";

const MessagesLeftSide = ({query, setQuery}) => {


    let statusRead = {
        count: 0
    }

    let statusNoRead = {
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
                    <MessagesBlock status={statusRead}/>
                </div>
            </div>
        </div>
    );
};

export default MessagesLeftSide;
import React, {useState} from 'react';
import MiniNavBar from "../../../components/UI/MiniNavBar/MiniNavBar";
import s from '../styles/Messages.module.css'
import MessagesLeftSide from "./MessagesLeftSide/MessagesLeftSide";
import MessagesRightSide from "./MessagesRightSide/MessagesRightSide";

const Messages = () => {
    let [query, setQuery] = useState('')
    return (
        <div className={s.container}>
            <MiniNavBar child={'Сообщения'}/>
            <div className={s.content_container}>
                <MessagesLeftSide query={query} setQuery={setQuery} />
                <MessagesRightSide />
            </div>
        </div>
    );
};

export default Messages;
import React, {useMemo} from 'react';
import s from "../../styles/MessagesLeftSide.module.css";
import SearchBar from "../../../../components/UI/SearchBar/SearchBar";
import MessagesBlock from "./MessagesBlock/MessagesBlock";

const MessagesLeftSide = ({query, setQuery, users, activeUser}) => {


    let statusRead = {
        count: 0
    }

    let statusNoRead = {
        count: 3
    }

    let sortedUser = useMemo(() => {
        let lowCaseQuery = query.toLowerCase()
        return users.filter(x => x.FirstName.toLowerCase().includes(lowCaseQuery) || x.SecondName.toLowerCase().includes(lowCaseQuery))
    }, [query])


    return (
        <div className={s.container}>
            <SearchBar query={query} setQuery={setQuery}/>
            <div className={s.content_container}>
                <div className={s.messengers_items}>
                    {sortedUser.map(x => <MessagesBlock key={x.ID} status={statusRead} data={x} isActive={x.ID === activeUser}/>)}
                </div>
            </div>
        </div>
    );
};

export default MessagesLeftSide;
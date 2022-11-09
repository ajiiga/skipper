import React, { useEffect, useMemo } from "react";
import s from "../../styles/MessagesLeftSide.module.css";
import SearchBar from "../../../../components/UI/SearchBar/SearchBar";
import MessagesBlock from "./MessagesBlock/MessagesBlock";
import messagesStore from "../../../../store/messagesStore";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";

const MessagesLeftSide = ({
  query,
  setQuery,
  users,
  setUsers,
  activeUser,
  setShowRightSide,
}) => {
  let params = useParams();

  let sortedUser = useMemo(() => {
    let lowCaseQuery = query.toLowerCase();
    return users.filter(
      (x) =>
        x.FirstName.toLowerCase().includes(lowCaseQuery) ||
        x.SecondName.toLowerCase().includes(lowCaseQuery)
    );
  }, [query, users]);

  useEffect(() => {
    messagesStore.getChatList().then((chats) =>
      setUsers(
        chats.map((chat) => {
          return {
            ...chat,
            count_unread_messages:
              chat.ID == activeUser ? 0 : chat.count_unread_messages,
          };
        })
      )
    );
  }, [messagesStore.newMessages, activeUser]);

  // useEffect(() => {
  //
  // }, [activeUser])

  return (
    <div className={s.container}>
      <SearchBar query={query} setQuery={setQuery} />
        {sortedUser.length > 0 && <div className={s.content_container}>
            <div className={s.messengers_items}>
                {sortedUser.length > 0 ? (
                    sortedUser.map((x) => (
                        <MessagesBlock
                            setShowRightSide={setShowRightSide}
                            key={x.ID}
                            data={x}
                            isActive={x.ID === activeUser}
                        />
                    ))
                ) : (
                    <div className={s.empty_messages_items}>У вас еще нет диалогов</div>
                )}
            </div>
        </div>}
    </div>
  );
};

export default observer(MessagesLeftSide);

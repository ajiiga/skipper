import {makeAutoObservable} from "mobx";
import {getChatListRequest, getCurrentChatInfoRequest} from "../api/api_messages";
import authStore from "./authStore";


class MessagesStore {
    constructor() {
        makeAutoObservable(this)
    }

    async getChatList() {
        let r = await getChatListRequest()
        let jsonData = JSON.parse(r.data)
        let myId = authStore.user.id
        let result = jsonData.map(x => {
            if (x.ReceiverID != myId) {
                return x.Receiver
            } else {
                return x.Sender
            }
        })
        console.log(result)
        return result
    }

    async getCurrentChat(id) {
        let r = await getCurrentChatInfoRequest(id)
        let data = r.data
        let myId = authStore.user.id
        let chat = JSON.parse(data.chat)

        if (chat.ReceiverID != myId) {
            chat = chat.Receiver
        } else {
            chat = chat.Sender
        }

        return {chat: chat, messages: JSON.parse(data.messages)}
    }
}

export default new MessagesStore()
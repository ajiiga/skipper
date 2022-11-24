import {makeAutoObservable} from "mobx";
import {
    changeCommunicationRequest,
    changeDateRequest,
    getChatListRequest,
    getCurrentChatInfoRequest, getDataForChangeDateRequest, getNotificationsClassUrl,
    getNotificationsRequest,
    getNotificationsUrl, lessonDidNotRequest, sendReviewUrl
} from "../api/api_messages";
import authStore from "./authStore";
import myClassesStore from "./myClassesStore";


class MessagesStore {
    constructor() {
        makeAutoObservable(this)
    }

    eventSource = {}

    newMessage = false;

    countUnreadMessages = 0

    newMessages = []

    notificationTypes = {
        consideration: 'на рассмотрении',
        planned: 'запланированное',
        completed: 'завершенное',
        canceled: 'отмененное'
    }

    setNewMessage = (status) => {
        this.newMessage = status
    }

    setCountMessage = (count) => {
        this.countUnreadMessages = count
    }

    setNewMessages = (messages) => {
        this.newMessages = messages
    }

    async getChatList() {
        let r = await getChatListRequest()
        let jsonData = JSON.parse(r.data)
        let myId = authStore.user.id

        let result = jsonData.map(x => {

            let refactoredDate = x.LastMessage.CreatedAt === '0001-01-01T00:00:00Z'? '' : this.refactorDate(x.LastMessage.CreatedAt)
            if (x.ReceiverID != myId) {
                let delta = x.Receiver
                delta.lastMessageDate = refactoredDate
                delta.count_unread_messages = x.count_unread_messages
                return delta
            } else {
                let delta = x.Sender
                delta.lastMessageDate = refactoredDate
                delta.count_unread_messages = x.count_unread_messages
                return delta
            }
        })
        console.log('chat list', result)
        return result
    }

    async getCurrentChat(id) {
        let r = await getCurrentChatInfoRequest(id)
        let data = r.data
        let myId = authStore.user.id
        let chat = JSON.parse(data.chat)
        let roomId = chat.ID
        if (chat.ReceiverID != myId) {
            chat = chat.Receiver
        } else {
            chat = chat.Sender
        }

        chat.roomID = roomId
        chat.stringDateAndTime = ''

        let jsonMessages = JSON.parse(data.messages)


        jsonMessages = jsonMessages.map(x => {
            return {...x, stringDateAndTime: this.refactorDate(x.CreatedAt)}
        })

        console.log('messages', jsonMessages)
        return {chat: chat, messages: jsonMessages}
    }

    async sendReview(sender_id, recipien_id, text, rating, anonymous, lessons_count) {
        try {
            let r = await sendReviewUrl(sender_id, recipien_id, text, rating, anonymous, lessons_count)
        }
        catch (e) {
            console.log(e)
        }
    }

    async getDataForChangeDate(id) {
        try {
            let r = await getDataForChangeDateRequest(id)
            let result = {class_time: JSON.parse(r.data.class_time), class_time_mask: r.data.class_time_mask}
            return result
        }
        catch (e) {

        }
    }

    async changeDate(class_id, time, receiver_id) {
        try {
            let r = await changeDateRequest(class_id, time, receiver_id)
        }
        catch (e) {
            console.log(e)
        }
    }

    async changeCommunication(class_id, communication_id) {
        try {
            let r = await changeCommunicationRequest(class_id, communication_id)
        }
        catch (e) {
            console.log(e)
        }
    }

    async lessonDidNot(booking_id) {
        try {
            let r = await lessonDidNotRequest(class_id)
        }
        catch (e) {

        }
    }

    refactorDate(strDate) {
        let today = new Date()
        let yesterday = new Date(today.valueOf() - 86400000);

        let messageDate = new Date(strDate)
        let stringDate = ''

        if (messageDate.getDate() === today.getDate() && messageDate.getMonth() === today.getMonth() && messageDate.getFullYear() === today.getFullYear()) {
            stringDate = 'Сегодня'
        } else if (messageDate.getDate() === (today.getDate() - 1) && messageDate.getMonth() === yesterday.getMonth() && messageDate.getFullYear() === yesterday.getFullYear()) {
            stringDate = 'Вчера'
        } else
            stringDate = `${messageDate.getDate()} ${myClassesStore.monthNames[messageDate.getMonth()]}`

        let hours = messageDate.getHours().toString().length > 1 ? messageDate.getHours().toString() : `0${messageDate.getHours().toString()}`
        let minutes = messageDate.getMinutes().toString().length > 1 ? messageDate.getMinutes().toString() : `0${messageDate.getMinutes().toString()}`

        let stringDateAndTime = `${stringDate}, ${hours}:${minutes}`

        return stringDateAndTime
    }

    clearReadMessages(id) {
        let deltaMessages = this.newMessages.filter(message => {
            return message.SenderID != id
        })
        this.setNewMessages(deltaMessages)
    }


    changeDisplay() {

    }

    startEvents() {
        // создаем экземпляр для получения данных по запросу на указанный адрес
        this.eventSource = new EventSource(getNotificationsUrl(authStore.user.id))

        this.eventSourceClass = new EventSource(getNotificationsClassUrl(authStore.user.id))


        this.eventSource.addEventListener('message', e => {
            let newMessage = JSON.parse(e.data)
            this.setNewMessage(true)
            this.setNewMessages([...this.newMessages, newMessage])
            this.setCountMessage(this.countUnreadMessages + 1)
        })

        this.eventSourceClass.addEventListener('message', e => {
            authStore.notifications = [JSON.parse(e.data), ...authStore.notifications]
        })
    }

    stopEvents() {
        this.eventSource.close()
        this.eventSourceClass.close()
    }


}

export default new MessagesStore()
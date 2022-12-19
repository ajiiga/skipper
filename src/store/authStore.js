import {makeAutoObservable} from "mobx";
import {
    deleteNotificationRequest,
    getNotificationsClassRequest,
    getStatusRequest,
    loginRequest, newPasswordRequest, readNotificationRequest,
    registrationMenteeMentorRequest,
    registrationMentorRequest,
    registrationRequest, resetPasswordRequest
} from "../api/api_auth";
import axios from "axios";
import {API_URL} from "../api/api_setting";
import messagesStore from "./messagesStore";

class AuthService {
    isAuth = false
    isInitialisation = true

    get token(): string {
        return !this.saveMe ? sessionStorage.getItem('token') : localStorage.getItem('token')
    }

    get saveMe(): boolean {
        return localStorage.getItem('saveMe') === 'true'
    }

    user = {}

    notifications = []

    async deleteNotification(id) {

        try {
            let r = await deleteNotificationRequest(id)
            this.notifications = this.notifications.filter(notification => notification.ID !== id)
        } catch (e) {

        }
    }

    async readNotification(id) {
        try {
            let r = await readNotificationRequest(id)
            this.notifications = this.notifications.map(n => {
                if (n.ID === id) {
                    return {...n, IsRead: true}
                }
                return n
            })
        } catch (e) {

        }
    }

    constructor() {
        makeAutoObservable(this)
    }

    setAuth = (status) => {
        this.isAuth = status
    }

    setUser = (user) => {
        if (user.unread_messages_count > 0) {
            messagesStore.setNewMessage(true)
            messagesStore.setCountMessage(user.unread_messages_count)
        }
        this.user = user
    }

    setIsInitialisation = (status) => {
        this.isInitialisation = status
    }

    async checkStatus() {
        try {
            let r = await getStatusRequest()
            this.setUser(r.data)
        } catch (e) {
            this.logout()
        }
    }

    setTokensAndUser = (response, saveMe: boolean) => {
        localStorage.setItem('saveMe', saveMe)
        if (!saveMe) {
            sessionStorage.setItem('token', response.data.token)
            sessionStorage.setItem('refreshToken', response.data.refreshToken)
        } else {
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('refreshToken', response.data.refreshToken)
        }
        this.setAuth(true)
        this.getNotificationClass()
        return {response: true}
    }

    async login(login, password, saveMe) {
        try {
            let r = await loginRequest(login, password)
            return this.setTokensAndUser(r, saveMe)
        } catch (e) {
            return {response: false, message: e.response.data['error']}
        }

    }


    async registration(first_name, second_name, phone, password, saveMe: boolean) {
        try {
            let r = await registrationRequest(first_name, second_name, phone, password)
            return this.setTokensAndUser(r, saveMe)
        } catch (e) {
            return {response: false, message: e.response.data.error}
        }
    }

    async registrationMentor(phone, second_name, first_name, specialization, description, time, password, file, saveMe: boolean) {
        try {
            let r = await registrationMentorRequest(phone, second_name, first_name, specialization, description, time, password, file)
            return this.setTokensAndUser(r, saveMe)
        } catch (e) {
            return {response: false, message: e?.response?.data?.error}
        }
    }

    async registrationMenteeMentor(specialization, description, time, file, saveMe: boolean) {
        try {
            let r = await registrationMenteeMentorRequest(specialization, description, time, file)
            this.setTokensAndUser(r, saveMe)
            return {response: true}
        } catch (e) {
            return {response: false, message: e?.response?.data?.error}
        }
    }

    logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('refreshToken')
        messagesStore.setNewMessage(false)
        this.notifications = []
        this.setAuth(false)
        this.setUser({})
    }

    async checkAuth() {
        try {
            await axios.post(`${API_URL}/auth/refresh-token`,
                {refreshToken: sessionStorage.getItem('refreshToken') || localStorage.getItem('refreshToken')}).then(r => {
                localStorage.setItem('token', r.data.token)
                this.setAuth(true)
            })
        } catch (e) {
            this.logout()
        }
    }

    async getNotificationClass() {
        try {
            let r = await getNotificationsClassRequest()
            this.notifications = JSON.parse(r.data)
        } catch (e) {
            console.log(e)
        }
    }

    async resetPassword(login) {
        try {
            let r = await resetPasswordRequest(login)
            return r.data
        } catch (e) {
            console.log(e)
        }
    }

    async newPassword(password, token) {
        try {
            let r = await newPasswordRequest(password, token)
            return r.data
        } catch (e) {

        }
    }

    async initializationApp() {
        let res = await Promise.all([
            await this.checkAuth(),
            await this.checkStatus(),
            await this.getNotificationClass()
        ]).then((x) => {
            this.setIsInitialisation(false)
        })
    }

    getUser = () => {
        return this.user
    }

}

export default new AuthService()
import {makeAutoObservable} from "mobx";
import {
    getStatusRequest,
    loginRequest,
    registrationMenteeMentorRequest,
    registrationMentorRequest,
    registrationRequest
} from "../api/api_auth";
import axios from "axios";
import {API_URL} from "../api/api_setting";

class AuthService {
    isAuth = false
    isInitialisation = true

    user = {}

    constructor() {
        makeAutoObservable(this)
    }

    setAuth = (status) => {
        this.isAuth = status
    }

    setUser = (user) => {
        this.user = user
    }

    setIsInitialisation = (status) => {
        this.isInitialisation = status
    }

    async checkStatus() {
        let r = await getStatusRequest()
        this.setUser(r.data)
    }

    setTokensAndUser = (response) => {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('refreshToken', response.data.refreshToken)
        this.setAuth(true)
        return {response: true}
    }

    async login(login, password) {
        try {
            let r = await loginRequest(login, password)
            return this.setTokensAndUser(r)
        } catch (e) {
            return {response: false, message: e.response.data['error']}
        }

    }


    async registration(first_name, second_name, phone, password) {
        try {
            let r = await registrationRequest(first_name, second_name, phone, password)
            return this.setTokensAndUser(r)
        } catch (e) {
            return {response: false, message: e.response.data.error}
        }
    }

    async registrationMentor(phone, second_name, first_name, specialization, description, time, password, file) {
        try {
            let r = await registrationMentorRequest(phone, second_name, first_name, specialization, description, time, password, file)
            return this.setTokensAndUser(r)
        } catch (e) {
            return {response: false, message: e?.response?.data?.error}
        }
    }

    async registrationMenteeMentor(specialization, description, time, file) {
        try {
            let r = await registrationMenteeMentorRequest(specialization, description, time, file)
            this.setTokensAndUser(r)
            return {response: true}
        } catch (e) {
            return {response: false, message: e?.response?.data?.error}
        }
    }

    logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        this.setAuth(false)
        this.setUser({})
    }

    async checkAuth() {
        try {
            await axios.post(`${API_URL}/auth/refresh-token`, {refreshToken: localStorage.getItem('refreshToken')}).then(r => {
                localStorage.setItem('token', r.data.token)
                this.setAuth(true)
            })
        } catch (e) {
            this.logout()
        }
    }

    async initializationApp() {
        let res = await Promise.all([
            await this.checkAuth(),
            await this.checkStatus()
        ]).then((x) => {
            this.setIsInitialisation(false)
        })
    }

    getUser = () => {
        return this.user
    }

}

export default new AuthService()
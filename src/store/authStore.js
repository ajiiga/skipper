import {makeAutoObservable} from "mobx";
import {getStatusRequest, loginRequest, registrationRequest} from "../api/api_auth";
import axios from "axios";
import {API_URL} from "../api/api_setting";

class AuthService {
    isAuth = false
    isInitialisation = true

    user = {}

    mentor = false

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

    checkStatus = () => {
        getStatusRequest().then(r => {
            this.setIsInitialisation(false)
        })
    }

    async login(login, password) {
        try {
            let r = await loginRequest(login, password)
            localStorage.setItem('token', r.data.accessToken)
            localStorage.setItem('refreshToken', r.data.refreshToken)
            this.setUser(r.data)
            this.setAuth(true)
            return {response: true}
        } catch (e) {
            return {response: false, message: e.response.data['error generate token']}
        }

    }


    async registration(first_name, second_name, phone, password) {
        try {
            let r = await registrationRequest(first_name, second_name, phone, password)
            localStorage.setItem('token', r.data.accessToken)
            localStorage.setItem('refreshToken', r.data.refreshToken)
            this.setUser(r.data)
            this.setAuth(true)
            return {response: true}
        }
        catch (e) {
            return {response: false, message: e.response.data.error}
        }
    }

    logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        this.setAuth(false)
        this.setUser({})
    }

    checkAuth = () => {
        try {
            axios.post(`${API_URL}/auth/refresh-token`, {refreshToken: localStorage.getItem('refreshToken')}).then(r => {
                localStorage.setItem('token', r.data.token)
                this.setUser(r.data)
                this.setAuth(true)
                this.setIsInitialisation(false)
                console.log(this.isAuth)
            })
        } catch (e) {

        }
    }

    getUser = () => {
        return this.user
    }

}

export default new AuthService()
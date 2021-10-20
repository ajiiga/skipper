import {makeAutoObservable} from "mobx";
import {getStatusRequest, loginRequest} from "../api/api_auth";

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

    setInitialisation = (status) => {
        this.isInitialisation = status
    }

    checkStatus = () => {
        getStatusRequest().then(r => {
            console.log(r)
            this.setInitialisation(false)
        })
    }

    login = (login, password) => {
        loginRequest(login, password).then(r => {
            this.setUser(r.data)
            console.log(r.data)
        })
    }

    logout = () => {

    }

    getUser = () => {
        return this.user
    }

}

export default new AuthService()
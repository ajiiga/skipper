import {makeAutoObservable} from "mobx";
import {getStatusRequest, loginRequest, registrationRequest} from "../api/api_auth";

class AuthService {
    isAuth = false
    isInitialisation = false

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
            this.setAuth(true)
        })
    }

    registration = (first_name, second_name, email, password) => {
        registrationRequest(first_name, second_name, email, password).then(r => {
            this.setAuth(true)
        })
    }

    logout = () => {

    }

    getUser = () => {
        return this.user
    }

}

export default new AuthService()
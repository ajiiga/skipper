import {makeAutoObservable} from "mobx";

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

    checkAuth = () => {

    }

    login = (login, password) => {

    }

    logout = () => {

    }

    getUser = () => {
        return this.user
    }

}

export default new AuthService()
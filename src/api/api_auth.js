import $api from "./api_setting";

export let getStatusRequest = () => {
    return $api.get('/api/status/')
}

export let loginRequest = (email, password) => {
    return $api.post('/auth/sign-in/', {email: email, password: password})
}

export let logoutRequest = () => {
    return $api.delete('/auth/login/')
}
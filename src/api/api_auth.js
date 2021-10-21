import $api from "./api_setting";

export let getStatusRequest = () => {
    return $api.get('/api/status/')
}

export let loginRequest = (email, password) => {
    return $api.post('/auth/sign-in', {email: email, password: password})
}

export let logoutRequest = () => {
    return $api.delete('/auth/login/')
}

export let registrationRequest = (first_name, second_name,  email, password) => {
    return $api.post('/auth/sign-up', {first_name: first_name, second_name:second_name, email: email, password: password})
}
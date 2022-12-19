import $api, {API_URL} from "./api_setting";
import axios from "axios";

export let getStatusRequest = () => {
    return $api.get('/api/user/user-data')
}

export let loginRequest = (email, password) => {
    return axios.post(`${API_URL}/auth/sign-in`, {login: email, password: password})
}

export let registrationRequest = (first_name, second_name, phone, password) => {
    return $api.post('/auth/user-sign-up', {
        phone: phone,
        first_name: first_name,
        second_name: second_name,
        password: password
    })
}

export let registrationMentorRequest = (phone, second_name, first_name, specialization, description, time, password, file) => {

    let bodyFormData = new FormData()
    bodyFormData.set('phone', phone)
    bodyFormData.set('second_name', second_name)
    bodyFormData.set('first_name', first_name)
    bodyFormData.set('specialization', specialization)
    bodyFormData.set('description', description)
    bodyFormData.set('time', time)
    bodyFormData.set('password', password)
    bodyFormData.set('file', file)

    return axios({
        method: 'post',
        url: `${API_URL}/auth/mentor-sign-up`,
        data: bodyFormData,
        headers: {'Content-Type': 'multipart/form-data'}
    })
}


export let registrationMenteeMentorRequest = (specialization, description, time, file) => {

    let bodyFormData = new FormData()
    bodyFormData.set('specialization', specialization)
    bodyFormData.set('description', description)
    bodyFormData.set('time', time)
    bodyFormData.set('file', file)

    return axios({
        method: 'post',
        url: `${API_URL}/api/user/user-mentor-sign-up`,
        data: bodyFormData,
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
}

export let getNotificationsClassRequest = () => {
    return $api.get('/notifications/class/')
}

export let deleteNotificationRequest = (id) => {
    return $api.delete(`/notifications/?notification_id=${id}`)
}

export let readNotificationRequest = (id) => {
    return $api.put(`/notifications/?notification_id=${id}`)
}

export let resetPasswordRequest = (login) => {
    return $api.post('auth/reset-password', {login: login})
}

export let newPasswordRequest = (password, token) => {
    return $api.post('/auth/new-password', {password: password, token: token})
}
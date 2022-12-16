import $api, {API_URL} from "./api_setting";
import axios from "axios";

export let UpdateProfileDataRequest = (first_name, second_name, patronymic, date_of_birthday, time, description) => {
    return $api.post('/api/user/update-base-profile-data', {
        first_name: first_name,
        second_name: second_name,
        patronymic: patronymic,
        date_of_birthday: date_of_birthday,
        time: time,
        description: description
    })
}


export let makeVerifyEmailRequest = (email) => {
    return $api.post('/api/user/user-verify-email', {email: email})
}

export let AddCommunicationRequest = (messenger_id, login) => {
    return $api.post('/api/communication/create-user-communication', {messenger_id: messenger_id, login: login})
}

export let deleteCommunicationRequest = (id) => {
    return $api.delete(`/api/communication/user-communication/${id}`)
}

export let getMessengerListRequest = () => $api.get('api/communication/messenger-list')

export let getMyCommunicationsRequest = () => $api.get('api/communication/user-communications')

export let getMyEducationRequest = () => $api.get('/api/education/user-education')

export let getMyWorkExperienceRequest = () => $api.get('/api/work-experience/user-work-experience')

export let getMyOtherInfoRequest = () => $api.get('/api/other-info/user-other-info')

export let changeProfileImageRequest = (file) => {
    let bodyFormData = new FormData()
    bodyFormData.set('file', file)

    return $api({
        method: 'post',
        url: `${API_URL}/api/user/update-profile-picture`,
        data: bodyFormData,
        headers: {'Content-Type': 'multipart/form-data'},
    })
}

export let changeSpecializationRequest = (specialization) => {
    return $api.post('/api/user/update-specialization', {specialization: specialization})
}

export let addEducationRequest = (name, first_year, second_year, degree) => $api.post('/api/education/add-user-education', {institution: name, start_year: first_year, end_year: second_year, degree: degree})

export let deleteEducationRequest = (id) => $api.delete(`/api/education/user-education/${id}`)

export let addWorkExperienceRequest = (name, first_year, second_year) => $api.post('/api/work-experience/add-user-work-experience', {organization: name, start_year: first_year, end_year: second_year})

export let deleteWorkExperienceRequest = (id) => $api.delete(`/api/work-experience/user-work-experience/${id}`)

export let addOtherInfoRequest = (data) => $api.post('/api/other-info/add-user-other-info', {data: data})

export let deleteOtherInfoRequest = (id) => $api.delete(`/api/other-info/user-other-info/${id}`)

export let newPasswordRequest = (old_password, new_password) => $api.post('/api/user/change-password', {old_password: old_password, new_password: new_password})
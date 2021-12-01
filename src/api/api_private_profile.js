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
    return $api.get('api/user/user-verify-email', {data: {email: email}})
}

export let AddCommunicationRequest = (messenger_id, login) => {
    return $api.post('/api/communication/create-user-communication', {messenger_id: messenger_id, login: login})
}

export let getMessengerListRequest = () => $api.get('api/communication/messenger-list')

export let getMyCommunicationsRequest = () => $api.get('api/communication/user-communications')

export let getMyEducationRequest = () => $api.get('/api/education/user-education')

export let getMyWorkExperienceRequest = () => $api.get('/api/work-experience/user-work-experience')

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

export let addEducationRequest = (name, first_year, second_year, degree) => $api.post('/api/education/add-user-education', {institution: name, start_year: first_year, end_year: second_year, degree: degree})

export let addWorkExperienceRequest = (name, first_year, second_year) => $api.post('/api/work-experience/add-user-work-experience', {organization: name, start_year: first_year, end_year: second_year})
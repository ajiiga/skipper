import $api from "./api_setting";

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

export let getMyCommunicationsRequest = () => $api.get('api/user/user-communications')
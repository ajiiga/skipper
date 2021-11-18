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


export let makeVerifyEmail = (email) => {
    return $api.get('/verify-email', {data: {email: email}})
}
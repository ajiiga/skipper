import $api, {API_URL} from "./api_setting";

export let getMenteeInfoRequest = (id) => {
    return $api.get(`/public-api/public-user/menti/${id}`)
}


export let getMentorInfoRequest = (id) => {
    return $api.get(`/public-api/public-user/mentor/${id}`)
}

export let getBookingListRequest = (status) => {
    return $api.get('/api/class/booking/to-me', {params: {status: status}})
}

export let registrationLessonRequest = (data) => {
    return $api.post('/api/class/booking', {...data})
}
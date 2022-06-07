import $api, {API_URL} from "./api_setting";


export let getChatListRequest = () => $api.get('/api/chat/')

export let getCurrentChatInfoRequest = (id) => $api.get(`/api/chat/${id}`)

export let getNotificationsUrl = (myId) => `${API_URL}/notifications/message/${myId}`
export let getNotificationsClassUrl = (myId) => `${API_URL}/notifications/class/${myId}`

export let sendReviewUrl = (sender_id, recipien_id, text, rating, anonymous, lessons_count) => $api.post(`/api/comments/`, {
    sender_id: sender_id,
    recipien_id: recipien_id,
    text: text,
    rating: rating,
    anonymous: anonymous,
    lessons_count: lessons_count
})

export let getDataForChangeDateRequest = (id) => $api.get(`/api/class/booking/change-time/${id}`)

export let changeDateRequest = (class_id, time, receiver_id) => $api.put(`/api/class/booking/change-time/`, {class_id: class_id, time: time, receiver: receiver_id})
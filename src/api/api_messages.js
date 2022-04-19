import $api, {API_URL} from "./api_setting";


export let getChatListRequest = () => $api.get('/api/chat/')

export let getCurrentChatInfoRequest = (id) => $api.get(`/api/chat/${id}`)

export let getNotificationsUrl = (myId) => `${API_URL}/notifications/message/${myId}`
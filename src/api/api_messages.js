import $api from "./api_setting";


let getChatListRequest = () => $api.get('/api/chat')

let getCurrentChatInfo = (id) => $api.get(`/api/chat/${id}`)
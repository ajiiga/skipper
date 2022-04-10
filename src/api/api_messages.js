import $api from "./api_setting";


export let getChatListRequest = () => $api.get('/api/chat/')

export let getCurrentChatInfoRequest = (id) => $api.get(`/api/chat/${id}`)
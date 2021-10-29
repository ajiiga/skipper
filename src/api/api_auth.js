import $api, {API_URL} from "./api_setting";
import axios from "axios";

export let getStatusRequest = () => {
    return $api.get('/api/status')
}

export let loginRequest = (email, password) => {
    return axios.post(`${API_URL}/auth/sign-in`, {login: email, password: password})
}

export let registrationRequest = (first_name, second_name,  phone, password) => {
    return $api.post('/auth/user-sign-up', {phone: phone, first_name: first_name, second_name:second_name, password: password})
}
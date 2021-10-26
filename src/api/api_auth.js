import $api, {API_URL} from "./api_setting";
import axios from "axios";

export let getStatusRequest = () => {
    return $api.get('/api/status')
}

export let loginRequest = (email, password) => {
    return axios.post(`${API_URL}/auth/sign-in`, {email: email, password: password})
}

export let registrationRequest = (first_name, second_name,  email, password) => {
    return $api.post('/auth/sign-up', {first_name: first_name, second_name:second_name, email: email, password: password})
}
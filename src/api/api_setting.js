import axios from "axios";

let BASE_URL = 'http://152.70.189.77:8000'

let $api = axios.create({
    withCredentials: true,
    baseURL: BASE_URL
})

export default $api
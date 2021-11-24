import $api, {API_URL} from "./api_setting";

export let getMenteeInfoRequest = (id) => {
    return $api.get(`/api/public-user/menti/${id}`)
}
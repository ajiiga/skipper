import $api, {API_URL} from "./api_setting";

export let getServices = (params) => {
    return $api.get('/search', {...params})
}

export let getCategoriesRequest = async () => {
    return $api.get('/catalog')
}
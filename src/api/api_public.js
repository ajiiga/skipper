import $api, {API_URL} from "./api_setting";

export let getServices = (params) => {
    return $api.get('/search', {...params})
}

export let getCategoriesRequest = async () => {
    return $api.get('/public-api/catalog/')
}

export let getMainSectionsRequest = async () => {
    return $api.get('/public-api/catalog/main-section')
}

export let getChildTagsRequest = () => {
    return $api.get('/public-api/catalog/child')
}

export let getSearchClassesRequest = (search, page, limit) => $api.get('/public-api/catalog/classes', {params: {search: search, page: page, limit: limit}})
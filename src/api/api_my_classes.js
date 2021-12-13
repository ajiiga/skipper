import $api from "./api_setting";


export let createClassRequest = (class_name, description, tags) => {
    return $api.post('/api/class/create-class', {class_name: class_name, description: description, tags: tags})
}

export let createTheoreticClassRequest = (parent_id, time, durations) => {
    return $api.post('/api/class/create-theoretic-class', {...durations, parent_id: parent_id, time: time})
}

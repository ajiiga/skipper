import $api from "./api_setting";


export let getClassesRequest = () => $api.get('/api/class/user-classes')


export let createClassRequest = (class_name, description, tags) => {
    return $api.post('/api/class/create-class', {class_name: class_name, description: description, tags: tags})
}

export let createTheoreticClassRequest = (parent_id, time, duration_15, price_15, duration_30, price_30, duration_60, price_60, duration_90, price_90) => {
    return $api.post('/api/class/create-theoretic-class', {
        duration_15: duration_15,
        price_15: duration_15 ? parseInt(price_15) : 0,
        duration_30: duration_30,
        price_30: duration_30 ? parseInt(price_30) : 0,
        duration_60: duration_60,
        price_60: duration_60? parseInt(price_60) : 0,
        duration_90: duration_90,
        price_90: duration_90? parseInt(price_90) : 0,
        parent_id: parent_id,
        time: time
    })
}

export let createPracticeClassRequest = (parent_id, time, duration_15, price_15, duration_30, price_30, duration_60, price_60, duration_90, price_90) => {
    return $api.post('/api/class/create-practic-class', {
        duration_15: duration_15,
        price_15: duration_15 ? parseInt(price_15) : 0,
        duration_30: duration_30,
        price_30: duration_30 ? parseInt(price_30) : 0,
        duration_60: duration_60,
        price_60: duration_60? parseInt(price_60) : 0,
        duration_90: duration_90,
        price_90: duration_90? parseInt(price_90) : 0,
        parent_id: parent_id,
        time: time
    })
}

export let createTurnkeyClassRequest = (parent_id, time, duration_15, price_15, full_time, price_full_time) => {
    return $api.post('/api/class/create-key-class', {
        duration_15: duration_15,
        price_15: duration_15 ? parseInt(price_15) : 0,
        full_time: full_time,
        price_full_time: full_time ? parseInt(price_full_time) : 0,
        parent_id: parent_id,
        time: time
    })
}

import $api from "./api_setting";


export let getClassesRequest = () => $api.get('/api/class/user-classes')


export let createClassRequest = (class_name, description, tags) => {
    return $api.post('/api/class/class', {class_name: class_name, description: description, tags: tags})
}

export let createTheoreticClassRequest = (parent_id, time, duration_15, price_15, duration_30, price_30, duration_60, price_60, duration_90, price_90) => {
    return $api.post('/api/class/theoretic-class', {
        duration_15: parseInt(price_15) > 0 ? duration_15 : false,
        price_15: duration_15 ? parseInt(price_15) : 0,
        duration_30: parseInt(price_30) > 0 ? duration_30 : false,
        price_30: duration_30 ? parseInt(price_30) : 0,
        duration_60: parseInt(price_60) > 0 ? duration_60 : false,
        price_60: duration_60? parseInt(price_60) : 0,
        duration_90: parseInt(price_90) > 0 ? duration_90 : false,
        price_90: duration_90? parseInt(price_90) : 0,
        parent_id: parent_id,
        time: time
    })
}

export let createPracticeClassRequest = (parent_id, time, duration_15, price_15, duration_30, price_30, duration_60, price_60, duration_90, price_90) => {
    return $api.post('/api/class/practic-class', {
        duration_15: parseInt(price_15) > 0 ? duration_15 : false,
        price_15: duration_15 ? parseInt(price_15) : 0,
        duration_30: parseInt(price_30) > 0 ? duration_30 : false,
        price_30: duration_30 ? parseInt(price_30) : 0,
        duration_60: parseInt(price_60) > 0 ? duration_60 : false,
        price_60: duration_60? parseInt(price_60) : 0,
        duration_90: parseInt(price_90) > 0 ? duration_90 : false,
        price_90: duration_90? parseInt(price_90) : 0,
        parent_id: parent_id,
        time: time
    })
}

export let createTurnkeyClassRequest = (parent_id, time, duration_15, price_15, full_time, price_full_time) => {
    return $api.post('/api/class/key-class', {
        duration_15: parseInt(price_15) > 0 ? duration_15 : false,
        price_15: duration_15 ? parseInt(price_15) : 0,
        full_time: parseInt(price_full_time) > 0 ? full_time : false,
        price_full_time: full_time ? parseInt(price_full_time) : 0,
        parent_id: parent_id,
        time: time
    })
}





export let updateClassRequest = (class_id, class_name, description, tags) => {
    return $api.put('/api/class/class', {class_id: class_id, class_name: class_name, description: description, tags: tags})
}


export let updateTheoreticClassRequest = (class_id, parent_id, time, duration_15, price_15, duration_30, price_30, duration_60, price_60, duration_90, price_90) => {
    return $api.put('/api/class/theoretic-class', {
        class_id: class_id,
        duration_15: parseInt(price_15) > 0 ? duration_15 : false,
        price_15: duration_15 ? parseInt(price_15) : 0,
        duration_30: parseInt(price_30) > 0 ? duration_30 : false,
        price_30: duration_30 ? parseInt(price_30) : 0,
        duration_60: parseInt(price_60) > 0 ? duration_60 : false,
        price_60: duration_60? parseInt(price_60) : 0,
        duration_90: parseInt(price_90) > 0 ? duration_90 : false,
        price_90: duration_90? parseInt(price_90) : 0,
        time: time
    })
}

export let updatePracticeClassRequest = (class_id, parent_id, time, duration_15, price_15, duration_30, price_30, duration_60, price_60, duration_90, price_90) => {
    return $api.put('/api/class/practic-class', {
        class_id: class_id,
        duration_15: parseInt(price_15) > 0 ? duration_15 : false,
        price_15: duration_15 ? parseInt(price_15) : 0,
        duration_30: parseInt(price_30) > 0 ? duration_30 : false,
        price_30: duration_30 ? parseInt(price_30) : 0,
        duration_60: parseInt(price_60) > 0 ? duration_60 : false,
        price_60: duration_60? parseInt(price_60) : 0,
        duration_90: parseInt(price_90) > 0 ? duration_90 : false,
        price_90: duration_90? parseInt(price_90) : 0,
        time: time
    })
}

export let updateTurnkeyClassRequest = (class_id, parent_id, time, duration_15, price_15, full_time, price_full_time) => {
    return $api.put('/api/class/key-class', {
        class_id: class_id,
        duration_15: parseInt(price_15) > 0 ? duration_15 : false,
        price_15: duration_15 ? parseInt(price_15) : 0,
        full_time: parseInt(price_full_time) > 0 ? full_time : false,
        price_full_time: full_time ? parseInt(price_full_time) : 0,
        time: time
    })
}

export let deleteClassRequest = (id) => {
    return $api.delete(`/api/class/class/${id}`)
}

export let changeStatusClassRequest = (id, status) => {
    return $api.put(`/api/class/booking/?new_status=${status}&booking_id=${id}`)
}

export let getCommunicationsRequest = (class_id) => {
    return $api.get(`/api/class/booking/change-communication/${class_id}`)
}


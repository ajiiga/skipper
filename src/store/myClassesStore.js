import {makeAutoObservable} from "mobx";
import {
    createClassRequest,
    createPracticeClassRequest,
    createTheoreticClassRequest,
    createTurnkeyClassRequest,
    getClassesRequest
} from "../api/api_my_classes";
import publicStore from "./publicStore";

class MyClassesStore {
    constructor() {
        makeAutoObservable(this)
    }

    async getClasses() {
        let r = await getClassesRequest()
        return JSON.parse(r.data.classes)
    }

    async createMainClass(class_name, description, tags) {
        try {
            let r = await createClassRequest(class_name, description, tags)
            return r.data.class_is
        } catch (e) {

        }
    }

    async createTheoreticClass(parent_id, time, duration_15, price_15, duration_30, price_30, duration_60, price_60, duration_90, price_90) {
        let r = await createTheoreticClassRequest(parent_id, time, duration_15, price_15, duration_30, price_30, duration_60, price_60, duration_90, price_90)
        return r.data
    }

    async createPracticeClass(parent_id, time, duration_15, price_15, duration_30, price_30, duration_60, price_60, duration_90, price_90) {
        let r = await createPracticeClassRequest(parent_id, time, duration_15, price_15, duration_30, price_30, duration_60, price_60, duration_90, price_90)
        return r.data
    }

    async createTurnkeyClass(parent_id, time, duration_15, price_15, full_time, price_full_time) {
        let r = await createTurnkeyClassRequest(parent_id, time, duration_15, price_15, full_time, price_full_time)
        return r.data
    }

    async createClass(class_name, description, tags, theory_class_state, practice_class_state, turnkey_state) {
        let parent_id = await this.createMainClass(class_name, description, tags)
        if (theory_class_state.valid) {
            let time = [].concat(...theory_class_state.calendar).join('')
            let r = await createTheoreticClassRequest(
                parent_id,
                time,
                theory_class_state['15_min'].status,
                theory_class_state['15_min'].price,
                theory_class_state['30_min'].status,
                theory_class_state['30_min'].price,
                theory_class_state['60_min'].status,
                theory_class_state['60_min'].price,
                theory_class_state['90_min'].status,
                theory_class_state['90_min'].price)
        }

        if (practice_class_state.valid) {
            let time = [].concat(...practice_class_state.calendar).join('')
            let r = await createPracticeClassRequest(
                parent_id,
                time,
                practice_class_state['15_min'].status,
                practice_class_state['15_min'].price,
                practice_class_state['30_min'].status,
                practice_class_state['30_min'].price,
                practice_class_state['60_min'].status,
                practice_class_state['60_min'].price,
                practice_class_state['90_min'].status,
                practice_class_state['90_min'].price)
        }

        if (turnkey_state.valid) {
            let time = [].concat(...practice_class_state.calendar).join('')
            let r = await createTurnkeyClassRequest(
                parent_id,
                time,
                turnkey_state['15_min'].status,
                turnkey_state['15_min'].price,
                turnkey_state.individual_term.status,
                turnkey_state.individual_term.price,
                )
        }

        return parent_id
    }


    async initializeEditClasses() {
        let res = await Promise.all([
            await publicStore.getChildTags(),
            await this.getClasses()
        ])
        return {
            childTags: res[0],
            myClasses: res[1]
        }
    }

}

export default new MyClassesStore()
import {makeAutoObservable} from "mobx";
import {getMenteeInfoRequest, getMentorInfoRequest} from "../api/api_public_profile";
import authStore from "./authStore";
import publicStore from "./publicStore";


class publicProfileStore {
    constructor() {
        makeAutoObservable(this)
    }

    async getMenteeInfo(id) {
        try {
            let r = await getMenteeInfoRequest(id)
            let stringDate = r.data.register_date.slice(0, 10)
            let arrayDate = stringDate.split('-')
            return {response: true, data: {...r.data, year: arrayDate[0], month: arrayDate[1], day: arrayDate[2]}}
        }
        catch (e) {
            return {response: false}
        }
    }


    async getMentorInfo(id) {
        try {
            let r = await getMentorInfoRequest(id)
            let stringDate = r.data.register_date.slice(0, 10)
            let arrayDate = stringDate.split('-')
            return {response: true, data: {...r.data, year: arrayDate[0], month: arrayDate[1], day: arrayDate[2]}}
        }
        catch (e) {
            return {response: false}
        }
    }

    async initializeMentorInfo(id) {
        let res = await Promise.all([
            await publicStore.getChildTags(),
            await this.getMentorInfo(id)
        ])
        return {tags: res[0], user: res[1]}
    }
}

export default new publicProfileStore()
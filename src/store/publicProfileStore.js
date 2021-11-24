import {makeAutoObservable} from "mobx";
import {getMenteeInfoRequest} from "../api/api_public_profile";


class publicProfileStore {
    constructor() {
        makeAutoObservable(this)
    }

    async getMenteeInfo(id) {
        try {
            let r = await getMenteeInfoRequest(id)
            let stringDate = r.data.register_date.slice(0, 10)
            let arrayDate = stringDate.split('-')
            return {...r.data, year: arrayDate[0], month: arrayDate[1], day: arrayDate[2]}
        }
        catch (e) {
            console.log(e)
        }
    }
}

export default new publicProfileStore()
import {makeVerifyEmail, UpdateProfileDataRequest} from "../api/api_private_profile";
import {makeAutoObservable} from "mobx";


class PrivateProfileStore {
    constructor() {
        makeAutoObservable(this)
    }

    async UpdateProfileData(first_name, second_name, patronymic, date_of_birthday, time, description) {
        let r = await UpdateProfileDataRequest(first_name, second_name, patronymic, date_of_birthday, time, description)
        console.log(r)
    }

    async makeVerifyEmail(email) {
        let r = await makeVerifyEmail(email)
    }
}

export default new PrivateProfileStore()
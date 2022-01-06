import {
    AddCommunicationRequest,
    addEducationRequest,
    addWorkExperienceRequest,
    changeProfileImageRequest,
    changeSpecializationRequest,
    getMessengerListRequest,
    getMyCommunicationsRequest,
    getMyEducationRequest,
    getMyWorkExperienceRequest,
    makeVerifyEmailRequest,
    UpdateProfileDataRequest
} from "../api/api_private_profile";
import {makeAutoObservable} from "mobx";
import authStore from "./authStore";


class PrivateProfileStore {
    constructor() {
        makeAutoObservable(this)
    }

    async UpdateProfileData(first_name, second_name, patronymic, date_of_birthday, time, description) {
        try {
            let r = await UpdateProfileDataRequest(first_name, second_name, patronymic, date_of_birthday, time, description)
            authStore.user.first_name = first_name
            authStore.user.second_name =second_name
            authStore.user.patronymic = patronymic
            authStore.user.date_of_birthday = date_of_birthday
            authStore.user.time = time
            authStore.user.description = description
            return {response: true}
        }
        catch (e) {
            return {response: false, message: 'Проблемы с отправкой формы'}
        }
    }

    async makeVerifyEmail(email) {
        let r = await makeVerifyEmailRequest(email)
    }

    async getMessengerList() {
        let r = await getMessengerListRequest()
        return r.data?.messengers
    }

    async getMyCommunications() {
        let r = await getMyCommunicationsRequest()
        return r.data?.communications
    }

    async getMyEducations() {
        try {
            let r = await getMyEducationRequest()
            return r.data.education
        }
        catch (e) {

        }
    }

    async getMyWorkExperience() {
        try {
            let r = await getMyWorkExperienceRequest()
            return r.data.work_experience
        }
        catch (e) {
            return '[]'
        }
    }

    async AddCommunication(messenger_id, login) {
        let r = await AddCommunicationRequest(messenger_id, login)
    }

    async initializationPrivateProfile() {
        let res = await Promise.all([
            await this.getMessengerList(),
            await this.getMyCommunications()
        ])
        return {
            messengers: res[0],
            myCommunications: res[1]
        }
    }

    async changeProfileImage(file) {
        try {
            let r = await changeProfileImageRequest(file)
            authStore.setUser({...authStore.user, profile_picture: r.data.profile_picture})
        }
        catch (e) {
            console.log(e)
        }
    }



    async addEducation(name, first_year, last_year, degree) {
        try {
            let r = await addEducationRequest(name, first_year, last_year, degree)
        }
        catch (e) {

        }
    }

    async addWorkExperience(name, first_year, last_year) {
        try {
            let r = await addWorkExperienceRequest(name, first_year, last_year)
        }
        catch (e) {

        }
    }

    async changeSpecialization(specialization) {
        try {
            let r = await changeSpecializationRequest(specialization)
        }
        catch (e) {

        }
    }

}

export default new PrivateProfileStore()
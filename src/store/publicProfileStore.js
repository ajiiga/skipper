import {makeAutoObservable} from "mobx";
import {
    getBookingListRequest,
    getMenteeInfoRequest, getMenteeStatisticRequest,
    getMentorInfoRequest, getMentorStatisticRequest,
    registrationLessonRequest
} from "../api/api_public_profile";
import authStore from "./authStore";
import publicStore from "./publicStore";


class publicProfileStore {
    constructor() {
        makeAutoObservable(this)
    }

    decode = (calendar_code) => {
        let res = []
        for (let i = 0; i < 8; i++) {
            res.push(calendar_code.slice(i * 7, (i + 1) * 7))
        }
        return res.map(x => x.split('').map(x => parseInt(x)))
    }

    async getMenteeInfo(id) {
        try {
            let r = await getMenteeInfoRequest(id)
            let stringDate = r.data.register_date.slice(0, 10)
            let arrayDate = stringDate.split('-')
            return {response: true, data: {...r.data, year: arrayDate[0], month: arrayDate[1], day: arrayDate[2]}}
        } catch (e) {
            return {response: false}
        }
    }

    async initializeMenteeInfo(id) {
        try {
            let r = await Promise.all([
                await this.getMenteeInfo(id),
                await this.getMenteeStatistic(id)
            ])
            return {user: r[0], statistic:r[1] }
        } catch (e) {

        }
    }


    async getMentorInfo(id) {
        try {
            let r = await getMentorInfoRequest(id)
            let stringDate = r.data.register_date.slice(0, 10)
            let arrayDate = stringDate.split('-')
            let tags = []
            JSON.parse(r.data.classes).forEach(c => {
                tags = [...tags ,...c.Tags.map(x => x.name3)]
            })
            tags = [...new Set(tags)].slice(0, 5)
            return {response: true, data: {...r.data, tags: tags, year: arrayDate[0], month: arrayDate[1], day: arrayDate[2]}}
        } catch (e) {
            return {response: false}
        }
    }

    async initializeMentorInfo(id) {
        let res = await Promise.all([
            await publicStore.getChildTags(),
            await this.getMentorInfo(id),
            await this.getMentorStatistic(id)
        ])
        return {tags: res[0], user: res[1], statistic: res[2]}
    }

    async registrationLesson(data) {
        try {
            let r = await registrationLessonRequest(data)

        } catch (e) {

        }
    }

    async getMentorStatistic(id) {
        let r = await getMentorStatisticRequest(id)
        return r.data;
    }

    async getMenteeStatistic(id) {
        let r = await getMenteeStatisticRequest(id)
        return r.data
    }
}

export default new publicProfileStore()
import {makeAutoObservable} from "mobx";
import {
    getCategoriesRequest,
    getChildTagsRequest,
    getMainSectionsRequest,
    getSearchClassesRequest
} from "../api/api_public";

class PublicStore {
    constructor() {
        makeAutoObservable(this)
    }

    tags = []

    activeTheme = 1

    addTag = (tag) => {
        if (!this.tags.includes(tag))
            this.tags.push(tag)
    }

    clearTags = () => {
        this.tags = []
    }

    async getCategories() {
        let r = await getCategoriesRequest()
        return r.data.catalog
    }

    async getMainSection() {
        let r = await getMainSectionsRequest()
        return JSON.parse(r.data?.Main_catalog)
    }

    async getChildTags() {
        let r = await getChildTagsRequest()
        let jsonTags = JSON.parse(r.data.catalog_child)
        return jsonTags
    }

    setActiveTheme = (id) => {
        this.activeTheme = id
    }

    getTags = () => this.tags

    setDefaultActiveTheme = () => this.setActiveTheme(1)

    async getSearchClasses(search, page, limit, down_rating, high_rating, price) {
        let r = await getSearchClassesRequest(search, page, limit, down_rating, high_rating, price)
        return JSON.parse(r.data.catalog_of_mentors)
    }

    async initialMainPage() {
        let r = await Promise.all([
            await this.getChildTags(),
            await this.getMainSection()
        ])
        return {tags: r[0], categories: r[1]}
    }

}

export default new PublicStore()
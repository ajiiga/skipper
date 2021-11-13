import {makeAutoObservable} from "mobx";
import {getCategoriesRequest} from "../api/api_public";

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

    deleteTag = (tag) => {
        this.tags = this.tags.filter(x => x !== tag)
    }

    clearTags = () => {
        this.tags = []
    }

    async getCategories() {
        let r = await getCategoriesRequest()
        return r.data.catalog
    }

    setActiveTheme = (id) => {
        this.activeTheme = id
    }

    getTags = () => this.tags

    setDefaultActiveTheme = () => this.setActiveTheme(1)


}

export default new PublicStore()
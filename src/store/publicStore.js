import {makeAutoObservable} from "mobx";
import {getCategoriesRequest} from "../api/api_public";

class PublicStore {
    constructor() {
        makeAutoObservable(this)
    }

    tags = []

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

    getTags = () => this.tags

}

export default new PublicStore()
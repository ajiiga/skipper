import {makeAutoObservable} from "mobx";

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

    getTags = () => this.tags

}

export default new PublicStore()
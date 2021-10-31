import {makeAutoObservable} from "mobx";

class PublicStore {
    constructor() {
        makeAutoObservable(this)
    }

    tags = []

    addTag = (tag) => {
        if (this.tags.includes(tag))
            this.tags.push(tag)
    }

    clearTags = () => {
        this.tags = []
    }
}

export default new PublicStore()
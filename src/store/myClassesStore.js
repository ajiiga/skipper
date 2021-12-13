import {makeAutoObservable} from "mobx";

class MyClassesStore {
    constructor() {
        makeAutoObservable(this)
    }


}
import { observable, action } from "mobx";
import {FindRepositoryList } from "../api/logApi";
export class WikiStore {
    @observable logList = [];

    @action
	findRepositoryList = async() => {
		const data = await findRepositoryList();
        this.LogAllList = data;
        return data;
    }

}
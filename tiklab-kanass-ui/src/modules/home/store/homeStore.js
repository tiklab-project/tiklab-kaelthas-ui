import { observable, action} from "mobx";
import { FindDocumentList, FindDocumentRecentList } from "../api/home";

export class HomeStore {


    @action
    findDocumentList= async(value)=> {
        const data = await FindDocumentList(value);
        return data;
    }

    @action
    findDocumentRecentList= async(value)=> {
        const data = await FindDocumentRecentList(value);
        return data;
    }
}
export const HOME_STORE = "homeStore"

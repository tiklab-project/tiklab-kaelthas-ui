import { observable, action } from "mobx";
import { FindRepository, Findlogpage } from "../api/SurveyApi";

export class SurveyStore {
    @observable opLogList = [];

    @action
    findRepository = async(value) => {
        const params = new FormData();
        params.append("id", value.id)
		const data =  await FindRepository(params);
        return data;
    }

    @action
    findLogpage = async(value)=> {
        const params={
            pageParam: {
                pageSize: 20,
                currentPage: 1
            },
            bgroup: "kanass",
            userId: value.userId,
            content: {
                repositoryId: value.repositoryId
            }
        }
        const data = await Findlogpage(params);
        if(data.code === 0) {
            this.opLogList = data.data.dataList
        }
        return data;
    }
}

export const SURVEY_STORE = "surveyStore"
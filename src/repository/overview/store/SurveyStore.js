import { observable, action } from "mobx";
import { Service } from "../../../common/utils/requset";
export class SurveyStore {
    @observable opLogList = [];

    @action
    findDocumentRecentList= async(value)=> {
        const data = await Service("/document/findRecentDocumentList",value);
        return data;
    }
    
    @action
    findRepository = async(value) => {
        const params = new FormData();
        params.append("id", value.id)
        const data = await Service("/repository/findRepository",params);
        return data;
    }
    @action
    findLogpage = async(value)=> {
        const params={
            pageParam: {
                pageSize: 10,
                currentPage: 1
            },
            bgroup: "sward",
            userId: value.userId,
            data: {
                repositoryId: value.repositoryId
            }
        }
        const data = await Service("/oplog/findlogpage",params);
        if(data.code === 0) {
            this.opLogList = data.data.dataList
        }
        return data;
    }

    @action
    findUserList = async(value) => {
        const data = await Service("/dmUser/findDmUserList",value);
        return data;
    }

    @action
    findCategoryListTreeById = async(value) => {
        const params = new FormData()
        params.append("id", value.id)
        params.append("treePath", value.treePath)
        const data = await Service("/category/findCategoryListTreeById",params);
        return data;
    }

}

export default new SurveyStore();
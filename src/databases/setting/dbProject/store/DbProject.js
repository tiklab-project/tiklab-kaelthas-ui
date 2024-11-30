import {action, observable} from "mobx";
import {Service} from "../../../../common/utils/requset";

export class DbProject {

    @observable searchCondition = {
        pageParam: {
            pageSize: 20,
            currentPage: 1,
        }
    };

    @observable dbPage = [];

    @observable total = 20;

    @observable dbObj;

    @observable dbList;

    @action
    setSearchCondition = (value) => {
        this.searchCondition = Object.assign(this.searchCondition, {...value})
    }

    @action
    setNullCondition = (value) =>{
        this.searchCondition = Object.assign({
            pageParam: {
                pageSize: 20,
                currentPage: 1,
            }
        }, {...value})
    }


    @action
    findDbInfoById = async (id) =>{
        const params = new FormData();
        params.append("id",id)
        const resData = await Service("/dbSetting/findDbInfoById",params)
        this.dbObj = resData.data
        return resData.data
    }


    @action
    updateDbInfo = async (value) =>{
        await Service("/dbSetting/updateDbInfo",value);
    }

    @action
    deleteDbInfo = async (id) =>{
        const params = new FormData();
        params.append("id",id)
        await Service("/dbSetting/deleteDbInfo",params)
    }

}

const dbProject = new DbProject();

export default dbProject;
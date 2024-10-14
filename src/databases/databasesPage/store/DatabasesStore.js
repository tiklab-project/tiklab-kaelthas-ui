import {action, observable} from "mobx";
import {Service} from "../../../common/utils/requset";
import {Axios} from "tiklab-core-ui";

export class DatabasesStore {

    @observable searchCondition = {
        pageParam: {
            pageSize: 20,
            currentPage: 1,
        }
    };

    @observable dbPage = [];

    @observable total = 20;

    @observable dbObj;


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
    findDbInfoPage = async () => {
        const resData = await Service("/dbInfo/findDbInfoPage",this.searchCondition);
        this.dbPage = resData.data.dataList
        this.total = resData.data.totalRecord
    }

    @action
    findDbInfoById = async (id) =>{
        const params = new FormData();
        params.append("id",id)
        const resData = await Service("/dbInfo/findDbInfoById",params)
        this.dbObj = resData.data
        return resData.data
    }

    @action
    createDbInfo = async (value) =>{
        return await Service("/dbInfo/createDbInfo",value);
    }

    @action
    updateDbInfo = async (value) =>{
        await Service("/dbInfo/updateDbInfo",value);
    }

    @action
    deleteDbInfo = async (id) =>{
        const params = new FormData();
        params.append("id",id)
        await Service("/dbInfo/deleteDbInfo",params)
    }

    @action
    testJDBCSql = async (value) =>{
        const resData = await Service("/dbInfo/testSql",value)
        return resData;
    }

    @action
    findDropDown = async () =>{
        const resData = await Axios.post("/dbInfo/findDropDown")
        return resData.data
    }

}

const databases = new DatabasesStore();

export default databases;
import {action, observable} from "mobx";
import {Service} from "../../../common/utils/requset";
import {Axios} from "tiklab-core-ui";
import {message} from "antd";

export class DatabasesStore {
    //刷新
    @observable refresh=false


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
    findDbInfoPage = async (param) => {
        const resData = await Service("/dbInfo/findDbInfoPage",param);
        if (resData.code!==0){
            message.error(resData.msg)
            return
        }
        return resData
    }

    @action
    findDbInfoById = async (id) =>{
        const params = new FormData();
        params.append("id",id)
        const resData = await Service("/dbInfo/findDbInfoById",params)
        this.dbObj = resData.data
        return resData
    }

    @action
    createDbInfo = async (value) =>{
        const res=await Service("/dbInfo/createDbInfo",value);
        if (res.code===0){
            this.refresh=!this.refresh
            message.success("创建成功")
            return res
        }else {
            message.error(res.msg)
        }
    }

    @action
    updateDbInfo = async (value) =>{
        const  res=await Service("/dbInfo/updateDbInfo",value);
        if (res.code===0){
            this.refresh=!this.refresh
            message.success("更新成功")
        }else {
            message.error(res.msg)
            return
        }
        return res
    }

    @action
    deleteDbInfo = async (id) =>{
        const params = new FormData();
        params.append("id",id)
        const res=await Service("/dbInfo/deleteDbInfo",params)
        if (res.code===0){
            this.refresh=!this.refresh
            return res
        }else {
            message.error(res.msg)
        }
    }

    @action
    testJDBCSql = async (value) =>{
        const resData = await Service("/dbInfo/testSql",value)
        return resData;
    }

    @action
    findDropDown = async () =>{
        const resData = await Axios.post("/dbInfo/findDropDown")
        this.dbList = resData.data
        return resData.data
    }

}

const databases = new DatabasesStore();

export default databases;

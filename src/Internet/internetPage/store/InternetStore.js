import {action, observable} from "mobx";
import {Service} from "../../../common/utils/requset";
import {message} from "antd";

export class InternetStore {
    //刷新
    @observable refresh=false

    @observable resultData = [];

    //添加主机表单中的模板名称
    @observable templateList = [];

    //添加主机表单中的主机组名称
    @observable hostGroupList = [];

    //网络信息
    @observable internetData=''

    @observable total = 1;

    @observable searchCondition = {
        orderParams: [{
            name: "id",
            orderType: "desc"
        }],
        pageParam: {
            pageSize: 20,
            currentPage: 1,
        }
    };

    @action
    setSearchCondition = (value) => {
        this.searchCondition = Object.assign(this.searchCondition,  { ...value })
    }

    @action
    setNullCondition = (value) =>{
        this.searchCondition = Object.assign({
            orderParams: [{
                name: "id",
                orderType: "desc"
            }],
            pageParam: {
                pageSize: 20,
                currentPage: 1,
            }
        }, {...value})
    }

    //根据条件查询主机
    @action
    findInternetPage = async (param) => {
        const resData = await Service("/internet/findInternetPage",param);
        if (resData.code!==0){
            message.error(resData.msg)
            return
        }
        return resData

    }

    //通过id查询网络
    @action
    findInternetById = async (id) => {
        const param=new FormData()
        param.append("id",id)
        const resData = await Service("/internet/findInternetById",param);
        if (resData.code===0){
          this.internetData=resData.data
        }
        return resData;
    }

    //添加网络
    @action
    createInternet = async (host) =>{
        const resMessage = await Service("/internet/createInternet",host)
        if (resMessage.code===0){
            this.refresh=!this.refresh
            message.success('创建成功')
            return resMessage;
        }else {
            message.error(resMessage.msg)
        }
    }

    @action
    updateInternet = async (option) =>{
        const res=await Service("/internet/updateInternet", option)
        if (res.code===0){
            message.success('更新成功')
           this.refresh=!this.refresh
        }else {
            message.error(res.msg)
            return
        }
        return res
    }

    //删除网络
    @action
    deleteInternet = async (id) =>{
        const  param=new FormData()
        param.append("id",id)
        const res=await Service("/internet/deleteInternet", param)
        if (res.code===0){
            this.refresh=!this.refresh
            return res
        }else {
            message.error(res.msg)
        }
    }



}

const internetStore = new InternetStore();

export default internetStore;

import {action, observable} from "mobx";
import {Service} from "../../../common/utils/requset";
import {message} from "antd";

export class HostStore {

    //刷新
    @observable refresh=false

    @observable resultData = [];

    //添加主机表单中的模板名称
    @observable templateList = [];

    //添加主机表单中的主机组名称
    @observable hostGroupList = [];

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
    findPageHost = async (param) => {
        const resData = await Service("/hostList/findHostPage",param);
        if (resData.code!==0){
            message.error(resData.msg)
            return
        }
        return resData
    }

    //根据id查询主机
    @action
    findOneHost = async (id) => {
        const params = new FormData();
        params.append("id", id)
        const resData = await Service("/hostList/findOneHost",params);
        if (resData.code===0){
            return resData;
        }else {
            message.error("查询主机失败")
        }
    }

    //根据id查询主机信息
    @action
    findHostById = async (id) => {
        const formData = new FormData();
        formData.append("id", id)
        const resData = await Service("/hostList/findHostById", formData);
        if (resData.code===0){
            this.hostData = resData.data;
        }else {
            message.error("查询主机失败")
        }
        return resData;
    }


    //添加主机
    @action
    addHost = async (host) =>{
        const resMessage = await Service("/hostList/createHost",host)
        if (resMessage.code===0){
            this.refresh=!this.refresh
            message.success("创建成功")
        }else {
            message.error(resMessage.msg)
            return
        }
        return resMessage;
    }

    //更新主机
    @action
    updateHost = async (host) =>{
        const resMessage = await Service("/hostList/updateHost",host)
        if (resMessage.code===0){
            this.refresh=!this.refresh
            message.success("更新成功")
        }else {
            message.error(resMessage.msg)
            return
        }
        return resMessage;
    }


    // 根据名称查询主机组
    @action
    findHostGroup = async () =>{
        const resHostGroup = await Service("/hostList/findAllHostGroupList");
        this.hostGroupList = resHostGroup.data;

        return resHostGroup.data;
    }

    //根据名称查询模板
    @action
    findTemplateAll = async (name) =>{
        const data = await Service("/template/findTemplateAll",name)
        this.templateList = data.data;

        return data.data;
    }

    @action
    createHostRecent = async (option) =>{
        const strId = await Service("/hostRecent/createHostRecent", option)
        return strId;
    }

    //删除主机
    @action
    deleteHostById = async (id) => {
        const params = new FormData();
        params.append("id", id)
        const data = await Service("/hostList/deleteHostById", params)
        if (data.code===0){
            this.refresh=!this.refresh
        }else {
            message.error(data.msg)
        }
    }

}

const hostStore = new HostStore();

export default hostStore;

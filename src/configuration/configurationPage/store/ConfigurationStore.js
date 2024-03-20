import {action, observable} from "mobx";
import {Service} from "../../../common/utils/requset";

export class ConfigurationStore {

    @observable resultData = [];

    //添加主机表单中的模板名称
    @observable templateList = [];

    //添加主机表单中的主机组名称
    @observable hostGroupList = [];

    @observable total = 1;

    @observable hostState = 0

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
    setHostState = value =>{
        this.hostState = value;
    }

    @action
    setSearchCondition = (value) => {
        this.searchCondition = Object.assign(this.searchCondition,  { ...value })
    }


    //根据条件查询主机
    @action
    findPageHost = async () => {

        const resData = await Service("/hostList/findPageHost",this.searchCondition);
        this.resultData = resData.data.dataList;
        this.total = resData.data.totalRecord
        return this.resultData;
    }

    //添加主机
    @action
    addHost = async (host) =>{
        const resMessage = await Service("/hostList/createHost",host)
        return resMessage.data;
    }

    // 根据名称查询主机组
    @action
    findHostGroup = async (name) =>{
        const params = new FormData();
        params.append("name",name);
        const resHostGroup = await Service("/hostGroup/findHostGroupByName",params);
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

}

const configurationStore = new ConfigurationStore();

export default configurationStore;
import {action, observable} from "mobx";
import {Service} from "../../../common/utils/requset";

export class ConfigurationStore {

    @observable resultData = [];

    //添加主机表单中的模板名称
    @observable templateList = [];

    //添加主机表单中的主机组名称
    @observable hostGroupList = [];

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


    //根据条件查询主机
    @action
    findPageHost = async () => {

        const resData = await Service("/hostList/findAllHost",this.searchCondition);
        this.resultData = resData.data.dataList;

        return this.resultData;
    }

    //添加主机
    @action
    addHost = async (host) =>{
        const resMessage = await Service("/hostList/addHost",host)
        return resMessage.data;
    }

    // 根据名称查询主机组
    @action
    findHostGroup = async (name) =>{
        const resHostGroup = await Service("/hostGroup/findHostGroupByName",{name:name});
        this.hostGroupList = resHostGroup.data;

        return resHostGroup.data;
    }

    //根据名称查询模板
    @action
    findTemplateByName = async (name) =>{
        const data = await Service("/template/findTemplateByName",name)
        this.templateList = data.data;

        return data.data;
    }

}

const configurationStore = new ConfigurationStore();

export default configurationStore;
import {action, observable} from "mobx";
import {Service} from "../../../common/utils/requset";

export class InternetStore {

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
    findInternetPage = async () => {

        const resData = await Service("/internet/findInternetPage",this.searchCondition);
        this.resultData = resData.data.dataList;
        this.total = resData.data.totalRecord
        return this.resultData;
    }

    //添加主机
    @action
    createInternet = async (host) =>{
        const resMessage = await Service("/internet/createInternet",host)
        return resMessage.data;
    }

    @action
    updateInternet = async (option) =>{
        await Service("/internet/updateInternet", option)
    }

}

const internetStore = new InternetStore();

export default internetStore;
import {action, observable} from "mobx";
import {Service} from "../../../common/utils/requset";

export class HostStore{

    @observable hostData = {};

    @observable
    hostList = [];

    //根据id查询主机信息
    @action
    findHostById = async (id) => {
        const formData = new FormData();
        formData.append("id", id)
        const resData = await Service("/hostList/findHostById", formData);
        this.hostData = resData.data;
        return resData.data;
    }

    @action
    findRecentHostList = async (id) =>{
        const formData = new FormData();
        formData.append("hostId", id)
        const resData = await Service("/hostList/findRecentHostList", formData);
        this.hostList = resData.data;
        return resData.data;
    }


}

const hostStore = new HostStore();

export default hostStore;
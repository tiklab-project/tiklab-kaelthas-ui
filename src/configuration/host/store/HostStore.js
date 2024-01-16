import {action, observable} from "mobx";
import {Service} from "../../../common/utils/requset";

export class HostStore{

    @observable hostData = {};

    //根据id查询主机信息
    @action
    findHostById = async (id) => {
        const formData = new FormData();
        formData.append("id", id)

        const resData = await Service("/hostList/findHostById", formData);

        this.hostData = resData.data;

        console.log("resData.data:",resData.data)
        console.log("this.hostList:",this.hostData)

        return resData.data;
    }


}

const hostStore = new HostStore();

export default hostStore;
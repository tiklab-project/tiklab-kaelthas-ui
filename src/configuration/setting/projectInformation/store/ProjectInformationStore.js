import {TemplateStore} from "../../../template/store/TemplateStore";
import {action, observable} from "mobx";
import {Service} from "../../../../common/utils/requset";

export class ProjectInformationStore {

    @observable allHostGroupList = [];

    //删除主机
    @action
    deleteHostById = async (id) => {

        const params = new FormData();
        params.append("id",id)
        await Service("/hostList/deleteHostById", params)
    }

    //根据id进行查询主机信息
    @action
    findHostById = async (id) => {
        const params = new FormData();
        params.append("id",id)
        const resData = await Service("/hostList/findHostById",params)
        return resData.data;
    }

    //查询主机组所有信息
    @action
    findAllHostGroupList = async () => {
        const resData = await Service("/hostGroup/findAllHostGroupList")

        this.allHostGroupList = resData.data;

        console.log(resData.data)
        return resData.data;
    }


}

const projectInformationStore = new ProjectInformationStore();
export default projectInformationStore;
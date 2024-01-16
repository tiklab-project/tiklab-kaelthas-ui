import {TemplateStore} from "../../../template/store/TemplateStore";
import {action} from "mobx";
import {Service} from "../../../../common/utils/requset";

export class ProjectInformationStore {

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


}

const projectInformationStore = new ProjectInformationStore();
export default projectInformationStore;
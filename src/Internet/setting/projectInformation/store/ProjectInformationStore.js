import {action, observable} from "mobx";
import {Service} from "../../../../common/utils/requset";

export class ProjectInformationStore {

    @observable allHostGroupList = [];

    //删除网络
    @action
    deleteInternet = async (id) => {

        const params = new FormData();
        params.append("id", id)
        await Service("/inSetting/deleteInternet", params)
    }

    //根据id进行查询主机信息
    @action
    findInternetById = async (id) => {
        const params = new FormData();
        params.append("id", id)
        const resData = await Service("/inSetting/findInternetById", params)
        return resData.data;
    }

    //修改网络信息
    @action
    updateInternet = async (host) => {
        await Service("/inSetting/updateInternet", host)
    }


}

const projectStore = new ProjectInformationStore();
export default projectStore;
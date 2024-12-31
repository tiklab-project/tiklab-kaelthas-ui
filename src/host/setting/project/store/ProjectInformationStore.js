import {TemplateStore} from "../../../config/template/store/TemplateStore";
import {action, observable} from "mobx";
import {Service} from "../../../../common/utils/requset";
import {message} from 'antd';

export class ProjectInformationStore {

    @observable allHostGroupList = [];

    //删除主机
    @action
    deleteHostById = async (id) => {

        const params = new FormData();
        params.append("id", id)
        await Service("/hostSetting/deleteHostById", params)
    }

    //根据id进行查询主机信息
    @action
    findHostById = async (id) => {
        const params = new FormData();
        params.append("id", id)
        const resData = await Service("/hostSetting/findHostById", params)
        return resData.data;
    }

    //修改主机信息
    @action
    updateHost = async (host) => {
        const res =  await Service("/hostSetting/updateHost", host)
        if (res.code===0){
            message.info('更新成功',1)
        }
    }

    //查询主机组所有信息
    @action
    findAllHostGroupList = async () => {
        const resData = await Service("/hostSetting/findAllHostGroupList")

        this.allHostGroupList = resData.data;
        return resData.data;
    }


}

const projectInformationStore = new ProjectInformationStore();
export default projectInformationStore;

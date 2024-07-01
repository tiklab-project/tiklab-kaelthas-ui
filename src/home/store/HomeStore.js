import {action, observable} from "mobx";
import {Service} from "../../common/utils/requset";

export class HomeStore{

    @observable
    hostRecentList = [];

    @observable
    dynamicList = [];

    @observable
    leave = [];

    @action
    findHomeRecentList = async () => {
        const hostRecent = await Service("/hostRecent/findHostRecentList")
        this.hostRecentList = hostRecent.data;
        return hostRecent.data;
    }

    @action
    findDynamicList = async () =>{
        const result = await Service("/dynamic/findDynamicList")
        this.dynamicList = result.data;
        return result.data;
    }

    @action
    updateHostRecent = async (value) =>{
        await Service("/hostRecent/updateHostRecent",value);
    }

    @action
    getAlertCategory = async () =>{
        const resData = await Service("/hostList/getAlertCategory");
        this.leave = resData.data;
        return resData.data;
    }

    @action
    findAlarmTypeNum = async () =>{
        const resData = await Service("/home/findAlarmTypeNum");
        this.leave = resData.data;
        return resData.data;
    }

    @action
    findHostUsage = async () =>{
        const resData = await Service("/home/findHostUsage");
        return resData;
    }

}

const homeStore = new HomeStore();
export default homeStore;
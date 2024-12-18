import {action, observable} from "mobx";
import {Service} from "../../common/utils/requset";

export class HomeStore{

    @observable
    hostRecentList = [];

    @observable
    dynamicList = [];

    @observable
    leave = [];

    @observable
    distributionList = [];

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
    findAlarmTypeNum = async () =>{
        const resData = await Service("/home/findAlarmTypeNum");
        this.leave = resData.data;
        return resData.data;
    }

    @action
    findHostUsage = async () =>{
        return await Service("/home/findHostUsage");
    }

    @action
    findTypeDistribution = async () =>{
        const resData = await Service("/home/findTypeDistribution");
        this.distributionList = resData.data;
        return resData.data;
    }

}

const homeStore = new HomeStore();
export default homeStore;
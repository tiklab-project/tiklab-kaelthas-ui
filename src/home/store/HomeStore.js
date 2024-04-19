import {action, observable} from "mobx";
import {Service} from "../../common/utils/requset";

export class HomeStore{

    @observable
    hostRecentList = [];

    @action
    findHomeRecentList = async () => {
        const hostRecent = await Service("/hostRecent/findHostRecentList")
        this.hostRecentList = hostRecent.data;
        return hostRecent.data;
    }

}

const homeStore = new HomeStore();
export default homeStore;
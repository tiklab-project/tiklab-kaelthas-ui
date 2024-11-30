import {action, observable} from "mobx";
import {Axios} from "tiklab-core-ui";

export class DbDetailsStore {

    @observable searchCondition = {
        pageParam: {
            pageSize: 20,
            currentPage: 1,
        }
    };

    @observable dbObj = {};

    @observable total = 20;

    @action
    setSearchCondition = (value) => {
        this.searchCondition = Object.assign(this.searchCondition, {...value})
    }

    @action
    findDbInfoById = async (id) =>{
        const params = new FormData();
        params.append("id",id)
        const resData = await Axios.post("/dbOverview/findDbInfoById",params)
        this.dbObj = resData.data
        return resData.data
    }
}

const dbDetailsStore = new DbDetailsStore();

export default dbDetailsStore;
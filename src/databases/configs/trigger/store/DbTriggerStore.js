import {action, observable} from "mobx";
import {Service} from "../../../../common/utils/requset";

export class DbTriggerStore {

    @observable data = [];

    @observable total = 0;

    @observable searchCondition = {
        pageParam: {
            pageSize: 20,
            currentPage: 1,
        }
    };

    @observable monitorList = [];

    @observable
    triggerList = [];

    @observable
    mediumList = [];

    //根据条件查询
    @action
    findDbTriggerPage = async () => {
        const resData = await Service('/dbTrigger/findDbTriggerPage', this.searchCondition)
        this.total = resData.data.totalRecord
        this.triggerList = resData.data.dataList
        return resData.data;
    }

    @action
    setSearchCondition = (value) => {
        this.searchCondition = Object.assign(this.searchCondition, {...value})
    }

    //新增
    @action
    createDbTrigger = async (option) => {
        return await Service('/dbTrigger/createDbTrigger', option);
    }

    //修改触发器
    @action
    updateDbTrigger = async (option) => {
        await Service('/dbTrigger/updateDbTrigger', option);

    }

    //根据id进行删除
    @action
    deleteDbTrigger = async (id) => {
        const params = new FormData();
        params.append("id", id)
        await Service('/dbTrigger/deleteDbTrigger', params);
    }

    @action
    getMediumAllList = async () => {
        const mediumList = await Service("/medium/getMediumAllList");
        this.mediumList = mediumList.data
    }

}

const dbTriggerStore = new DbTriggerStore();

export default dbTriggerStore;
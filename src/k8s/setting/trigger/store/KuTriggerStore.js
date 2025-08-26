import {action, observable} from "mobx";
import {Service} from "../../../../common/utils/requset";

export class KuTriggerStore {

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
    findKuTriggerPage = async () => {
        const resData = await Service('/kuTrigger/findKuTriggerPage', this.searchCondition)
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
    createKuTrigger = async (option) => {
        return await Service('/kuTrigger/createKuTrigger', option);
    }

    //修改触发器
    @action
    updateKuTrigger = async (option) => {
        await Service('/kuTrigger/updateKuTrigger', option);

    }

    //根据id进行删除
    @action
    deleteKuTrigger = async (id) => {
        const params = new FormData();
        params.append("id", id)
        await Service('/kuTrigger/deleteKuTrigger', params);
    }

    @action
    getMediumAllList = async () => {
        const mediumList = await Service("/medium/getMediumAllList");
        this.mediumList = mediumList.data
    }

}

const dbTriggerStore = new KuTriggerStore();

export default dbTriggerStore;
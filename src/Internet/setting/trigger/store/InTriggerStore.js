import {action, observable} from "mobx";
import {Service} from "../../../../common/utils/requset";

export class InTriggerStore {

    @observable data = [];

    @observable total = 0;

    @observable searchCondition = {
        orderParams: [{
            name: "id",
            orderType: "desc"
        }],
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
    @action
    setSearchCondition = (value) => {
        this.searchCondition = Object.assign(this.searchCondition, {...value})
    }

    //根据条件查询
    @action
    findTriggerPage = async () => {
        const resData = await Service('/inTrigger/findTriggerPage', this.searchCondition)
        this.total = resData.data.totalRecord
        this.triggerList = resData.data.dataList
        return resData.data;

    }

    //新增
    @action
    createTrigger = async (option) => {
        return await Service('/inTrigger/createTrigger', option);
    }

    //修改触发器
    @action
    updateTrigger = async (option) => {
        await Service('/inTrigger/updateTrigger', option);

    }

    //根据id进行删除
    @action
    deleteTrigger = async (id) => {
        const params = new FormData();
        params.append("id", id)
        const resData = await Service('/inTrigger/deleteTrigger', params);
        this.data = resData;
        return resData;
    }

    @action
    findTriggerExpressionAll = async () => {
        const triggerExAll = await Service("/inTriggerExpression/findTriggerExpressionAll")
        return triggerExAll.data;
    }

    @action
    getMediumAllList = async () => {
        const resData = await Service("/medium/getMediumAllList");
        this.mediumList = resData.data
    }

}

const triggerStore = new InTriggerStore();

export default triggerStore;
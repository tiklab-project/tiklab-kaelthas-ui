import {action, observable} from "mobx";
import {Service} from "../../../../common/utils/requset";
import {Axios} from "thoughtware-core-ui";

export class KuGraphicsStore {

    @observable graphicsList = [];

    @observable total = 0;

    @observable monitorList = [];

    @observable monitorTotal = 0;

    @observable searchCondition = {
        pageParam: {
            pageSize: 20,
            currentPage: 1,
        }
    };

    @action
    setSearchCondition = (value) => {
        this.searchCondition = Object.assign(this.searchCondition, {...value})
    }

    //根据条件查询
    @action
    findKuGraphicsPage = async () => {
        const resData = await Service("/kuGraphics/findKuGraphicsPage", this.searchCondition);
        this.graphicsList = resData.data.dataList;
        this.total = resData.data.totalRecord
        return resData.data;
    }

    @action
    findMonitorIds = async (value) => {
        const resData = await Axios.post("/kuGraphicsMonitor/findMonitorIds", value);
        return resData.data;
    }


    //根据数据库id查询监控项列表
    @action
    findAllMonitor = async () => {
        const list = await Service("/kuMonitor/findAllKuMonitor", this.searchCondition)
        this.monitorList = list.data
        return list.data;
    }

    //新增
    @action
    createKuGraphics = async (option) => {
        const resData = await Service("/kuGraphics/createKuGraphics", option);
        return resData;
    }

    //修改
    @action
    updateKuGraphics = async (option) => {
        const resData = await Service("/kuGraphics/updateKuGraphics", option);
        return resData;
    }

    //删除
    @action
    deleteKuGraphics = async (id) => {
        const params = new FormData();
        params.append("id", id)
        await Service("/kuGraphics/deleteKuGraphics", params);
    }


}

const dbGraphicsStore = new KuGraphicsStore();
export default dbGraphicsStore;
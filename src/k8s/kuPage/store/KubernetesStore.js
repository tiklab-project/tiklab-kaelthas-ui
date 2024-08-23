import {action, observable} from "mobx";
import {Service} from "../../../common/utils/requset";

export class KubernetesStore {

    @observable searchCondition = {
        pageParam: {
            pageSize: 20,
            currentPage: 1,
        }
    };

    @observable kbPage = [];

    @observable total = 20;

    @observable kbObj;



    @action
    setSearchCondition = (value) => {
        this.searchCondition = Object.assign(this.searchCondition, {...value})
    }


    @action
    findKbInfoPage = async () => {
        const resData = await Service("/kubernetes/findKbInfoPage",this.searchCondition);
        this.kbPage = resData.data.dataList
        this.total = resData.data.totalRecord
    }

    @action
    createKbInfo = async (value) =>{
        return await Service("/kubernetes/createKbInfo",value)
    }

}

const kubernetesStore = new KubernetesStore();

export default kubernetesStore;
import {action, observable} from "mobx";
import {Service} from "../../../../common/utils/requset";

export class KuProjectStore {

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
    setNullCondition = (value) =>{
        this.searchCondition = Object.assign({
            pageParam: {
                pageSize: 20,
                currentPage: 1,
            }
        }, {...value})
    }

    @action
    updateKbInfo = async (value) => {
        await Service("/KuSetting/updateKbInfo", value);
    }

    @action
    deleteKuInfo = async (id) =>{
        const param = new FormData();
        param.append("id",id);
        await Service("/KuSetting/deleteKuInfo",param)
    }

    @action
    findKuInfoById = async (id) =>{
        const param = new FormData();
        param.append("id",id);
        const kubernetes = await Service("/KuSetting/findKuInfoById",param)
        return kubernetes.data;
    }

}

const kuProjectStore = new KuProjectStore();

export default kuProjectStore;
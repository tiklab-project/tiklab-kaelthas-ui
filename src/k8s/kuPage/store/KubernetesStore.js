import {action, observable} from "mobx";
import {Service} from "../../../common/utils/requset";
import {Axios} from "thoughtware-core-ui";

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
    setNullCondition = (value) =>{
        this.searchCondition = Object.assign({
            pageParam: {
                pageSize: 20,
                currentPage: 1,
            }
        }, {...value})
    }

    @action
    findKbInfoPage = async () => {
        const resData = await Service("/kubernetes/findKbInfoPage", this.searchCondition);
        this.kbPage = resData.data.dataList
        this.total = resData.data.totalRecord
    }

    @action
    createKbInfo = async (value) => {
        return await Service("/kubernetes/createKbInfo", value);
    }

    @action
    updateKbInfo = async (value) => {
        await Service("/kubernetes/updateKbInfo", value);
    }

    @action
    deleteKuInfo = async (id) =>{
        const param = new FormData();
        param.append("id",id);
        await Service("/kubernetes/deleteKuInfo",param)
    }

    @action
    findKuInfoById = async (id) =>{
        const param = new FormData();
        param.append("id",id);
        const kubernetes = await Service("/kubernetes/findKuInfoById",param)
        return kubernetes.data;
    }

    @action
    findKuDropDown = async () =>{
        const resData = await Axios.post("/kubernetes/findKuDropDown")
        return resData.data
    }

}

const kubernetesStore = new KubernetesStore();

export default kubernetesStore;
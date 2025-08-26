import {action, observable} from "mobx";
import {Service} from "../../../common/utils/requset";
import {Axios} from "tiklab-core-ui";
import {message} from "antd";

export class KubernetesStore {
    //刷新
    @observable refresh=false

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

    //分页查询
    @action
    findKbInfoPage = async (param) => {
        const resData = await Service("/kubernetes/findKbInfoPage", param);
        if(resData.code!==0){
            message.error(resData.msg)
            return
        }
        return resData
    }

    //创建
    @action
    createKbInfo = async (value) => {
        const res=await Service("/kubernetes/createKbInfo", value);
        if (res.code===0){
            this.refresh=!this.refresh
            message.success("创建成功")
            return res
        }else {
            message.error(res.msg)
        }
    }

    //更新
    @action
    updateKbInfo = async (value) => {
        const res=await Service("/kubernetes/updateKbInfo", value);
        if (res.code===0){
            this.refresh=!this.refresh
            message.success("更新成功")
        }else {
            message.error(res.msg)
            return
        }
        return res
    }

    //删除
    @action
    deleteKuInfo = async (id) =>{
        const param = new FormData();
        param.append("id",id);
        const res=await Service("/kubernetes/deleteKuInfo",param)
        if (res.code===0){
            this.refresh=!this.refresh
            return res
        }else {
            message.error(res.msg)
        }
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

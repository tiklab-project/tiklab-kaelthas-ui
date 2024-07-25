import {action, observable} from "mobx";
import {Axios} from "thoughtware-core-ui";

export class CustomizeStore {

    @observable customizePage = [];

    @observable total = 20;

    @observable searchCondition = {
        pageParam: {
            pageSize: 20,
            currentPage: 1,
        }
    };

    @action
    setSearchCondition = (value) => {
        this.searchCondition = Object.assign(this.searchCondition,  { ...value })
    }

    @action
    findCustomizePage = async () =>{
        const resData = await Axios.post("/customize/findCustomizePage",this.searchCondition)
        this.customizePage = resData.data.dataList
        this.total = resData.data.totalRecord
        return resData.data.dataList
    }

    @action
    createCustomize = async (value)=>{
        await Axios.post("/customize/createCustomize",value)
    }

    @action
    updateCustomize = async (value) =>{
        await Axios.post("/customize/updateCustomize",value)
    }

    @action
    deleteCustomize = async (value)=>{
        const formData = new FormData();
        formData.append("id",value)
        await Axios.post("/customize/deleteCustomize", formData)
    }

}

const customizeStore = new CustomizeStore();

export default customizeStore;
import { observable, action} from "mobx";
import { FindDocumentList, FindDocumentRecentList, FindMessageDispatchItemPage, Findlogpage, FindRecentRepositoryList } from "../api/home";
import { getUser } from 'tiklab-core-ui';

export class HomeStore {
    @observable currentLink = "home";
    @observable opLogList = [];
    @action
    setCurrentLink = (value) => {
        this.currentLink = value
    }
    
    @action
    findDocumentList= async(value)=> {
        const data = await FindDocumentList(value);
        return data;
    }

    @action
    findDocumentRecentList= async(value)=> {
        const data = await FindDocumentRecentList(value);
        return data;
    }

    @action
    findMessageDispatchItemPage = async (value) => {
        const params = {
            pageParam:{
                pageSize:10,
                currentPage: value.page
            },
            sendType: 'site',
            receiver: getUser().userId,
            status: value.status,
            bgroup: "teamwire"
        }
        const data = await FindMessageDispatchItemPage(params)
        if(data.code === 0){
            this.messageTotal = data.data.totalPage;
            if(value.page === 1){
                this.messageList = data.data.dataList
            }
            if(value.page > 1 && this.isMessageReachBottom) {
                this.messageList.push(...data.data.dataList);
            }

           
            if(value.page >= this.messageTotal) {
                this.isMessageReachBottom = false
            }else {
                this.isMessageReachBottom = true
            }
        }
        return data;
    }

    @action
    findLogpage = async(value)=> {
        const params={
            pageParam: {
                pageSize: 10,
                currentPage: 1
            },
            bgroup: "kanass",
            userId: value.userId,
            content: {
                repositoryId: value.repositoryId
            }
        }
        const data = await Findlogpage(params);
        if(data.code === 0) {
            this.opLogList = data.data.dataList
        }
        return data;
    }

    @action
    findRecentRepositoryList= async(value)=> {
        const data = await FindRecentRepositoryList(value);
        return data;
    }

}
export const HOME_STORE = "homeStore"

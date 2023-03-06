import { observable, action} from "mobx";
import { getUser } from 'tiklab-core-ui';
import { Service } from "../../../common/utils/requset";
export class HomeStore {
    @observable currentLink = "home";
    @observable opLogList = [];
    @action
    setCurrentLink = (value) => {
        this.currentLink = value
    }
    
    @action
    findDocumentList= async(value)=> {
        const data = await Service("/document/findDocumentList",value);
        return data;
    }

    @action
    findDocumentRecentList= async(value)=> {
        const data = await Service("/documentRecent/findDocumentRecentList",value);
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
        const data = await Service("/message/messageItem/findMessageItemPage",params);
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
        const data = await Service("/oplog/findlogpage",params);
        if(data.code === 0) {
            this.opLogList = data.data.dataList
        }
        return data;
    }

    @action
    findRecentRepositoryList= async(value)=> {
        const data = await Service("/repository/findRecentRepositoryList",params);
        return data;
    }

}
export const HOME_STORE = "homeStore"

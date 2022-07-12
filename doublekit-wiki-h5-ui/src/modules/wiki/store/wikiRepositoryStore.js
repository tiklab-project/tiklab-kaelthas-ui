import { observable, action } from "mobx";
import { FindRepositoryPage, FindAllUser,AddWikiList } from "../api/wikiRepositoryApi";
export class WikiRepositoryStore {
    @observable repositoryList = [];
    @observable userList = []
    @observable list = []
    @observable repositoryCondition = {
        orderParams: [{
            name: "id",
            orderType: "asc"
        }],
        pageParam: {
            pageSize: 10,
            currentPage: 1,
            total: 1
        }
    };

    @action
	findRepositoryPage = async(value) => {
        Object.assign(this.repositoryCondition, { ...value })
		const data = await FindRepositoryPage(this.repositoryCondition);
        if(data.code === 0){
            if(this.repositoryCondition.pageParam.currentPage === 1){
                this.repositoryList = []
            }
            this.repositoryList.push(...data.data.dataList);
            
            
            this.repositoryCondition.pageParam.total = data.totalRecord
        }
        
        return data;
    }

    @action
    findAllUser = async() => {
		const data = await FindAllUser()

        if(data.code === 0){
            const list = data.data;
            const userList = [];
            list && list.length > 0 && list.map(item => {
                userList.push({ value: item.id, label: item.name });
                return 0;
            })
            this.userList = userList;
        } 
    }

    @action
	addWikilist = async(values) => {
        // let param = {
        //     name: values.name,
        //     limits: values.limits,
        //     master:  {id: values.master},
        //     desc: values.desc
        // }
		const data = await AddWikiList(values)
        return data;
    }

}

export const WIKIREPOSITORY_STORE = "wikirepositoryStore"
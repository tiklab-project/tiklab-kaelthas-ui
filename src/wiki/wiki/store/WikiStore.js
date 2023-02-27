import { observable, action } from "mobx";
import { FindRepositoryList,AddWikiList,DeleWikiList,SearchWiki,
    UpdateWikiList,GetWikiTypeList,GetUseList,GetAllWikiList,CreateDocumentRecent, 
    FindRecentRepositoryList, CreateRepositoryFocus, FindRepositoryFocusList, DeleteRepositoryFocusByCondition } from "../api/Wiki";

export class WikiStore {
    @observable wikilist = [];
    @observable wikiTypelist = [];
    @observable uselist = [];
    @observable wiki = [];
    @observable allWikilist = [];
    @observable name = "";
    @observable wikiPageParams = {
        current: 1,
        pageSize: 10
    };

    @action
    findRepositoryList = async(params) => {
		const data =  await FindRepositoryList(params);
        if(data.code === 0){
            this.wikilist = data.data;
        }
        return data;
    }

    @action
	getAllWikilist = () => {
		FindRepositoryList().then(response => {
			this.allWikilist = response.data;
            this.wikilist = data.data;
        }).catch(error => {
            console.log(error)
        })
    }


    @action
	addWikilist = (values) => {
        // let param = {
        //     name: values.name,
        //     limits: values.limits,
        //     master:  {id: values.master},
        //     desc: values.desc
        // }
		const data = AddWikiList(values);
        return data;
    }

    @action
	delewikiList = (values) => {
        const param = new FormData()
        param.append("id", values)

        const that = this;
		DeleWikiList(param).then(response => {
            if(response.code=== 0){
                that.getWikilist()
            }
        }).catch(error => {
            console.log(error)
        })
    }

    // 修改
    @action
	updateWiki = (values) => {
        // let param = {
        //     id: values.id,
        //     name: values.name,
        //     desc: values.desc,
        // }
        const data =  UpdateWikiList(values);
        return data;
		
    }
    @action
	searchwikiList = (values) => {
        const param = new FormData()
        param.append("id", values)
        const that = this;
        return new Promise((resolve, reject)=>{
            SearchWiki(param).then(response => {
                that.wikilist=[response.data];
                resolve(response.data)
                }).catch(error => {
                    console.log(error)
                    reject()
                })
            }
        )
		
    }
    @action
	searchwiki = (values) => {
        const params = new FormData()
        params.append("id", values)
        
        const data = SearchWiki(params);
        return data;
	}
    @action
    getWikiTypeList = () => {
		GetWikiTypeList().then(response => {
			this.wikiTypelist = response.data;
        }).catch(error => {
            console.log(error)
        })
    }

    @action
    getUseList = () => {
		GetUseList().then(response => {
			this.uselist = response.data;
        }).catch(error => {
            console.log(error)
        })
    }

    @action
    createDocumentRecent= async(value)=> {
        const data = await CreateDocumentRecent(value);
        return data.data;
    }

    @action
    findRecentRepositoryList= async(value)=> {
        const data = await FindRecentRepositoryList(value);
        if(data.code === 0){
            this.wikilist = data.data;
        }
        return data;
    }

    @action
    createRepositoryFocus = async(value) => {
        const data = await CreateRepositoryFocus(value);
        return data;
    }

    @action
    findRepositoryFocusList = async(value) => {
        const data = await FindRepositoryFocusList(value);
        if(data.code === 0){
            this.wikilist = data.data;
        }
        return data;
    }

    @action
    deleteRepositoryFocusByCondition = async(value) => {
        const data = await DeleteRepositoryFocusByCondition(value);
        return data;
    }
    
}

export const WIKI_STORE = "wikiStore"

// export default Promisestore;
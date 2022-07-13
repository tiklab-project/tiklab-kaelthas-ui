import { observable, action} from "mobx";
import { FindWikiCatalogue, FindRepository, CreateCategory } from "../api/repository"
export class WikiCatalogueStore {
    @observable wikiCatalogueList = [];

    @action
    findWikiCatalogue = async(id)=> {
        const params = {
            repositoryId: id
        }
        const data = await FindWikiCatalogue(params);
        if(data.code === 0){
            this.wikiCatalogueList = data.data
        }
        return data.data;
    }

    @action
	findRepository = async(value) => {
        const params = new FormData();
        params.append("id", value.id)
		const data = await FindRepository(params)
        return data;
    }

    @action
    createCategory = async(value) => {
		const data = await CreateCategory(value)
        return data;
    }

}

export const WIKICATELOGUE_STORE = "wikiCatalogueStore"
import { observable, action } from "mobx";
import { FindCategory,UpdateCategory, FindAllUser } from "../api/categorySetApi";

export class CategorySetStore {
    @observable userList = []
    @action
    findCategory = async(values) => {
        const params = new FormData()
        params.append("id", values)

        const data = await FindCategory(params)
        return data;
	}

    @action
	updateCategory = async(values) => {
        const data = await UpdateCategory(values)
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
        return data;
    }

}

export const CATEGORY_STORE = "categorySetStore"

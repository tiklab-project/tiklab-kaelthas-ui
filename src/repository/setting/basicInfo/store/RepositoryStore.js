import { observable, action } from "mobx";
import { Service } from "../../../../common/utils/requset";
export class RepositoryIconStore {
    @action
    creatIcon = async (value) => {
        const data = await Service("/icon/createIcon", value)
        return data;

    }

    @action
    findIconList = async (params) => {
        const data = await Service("/icon/findIconList", params)
        return data;
    }
}

export default new RepositoryIconStore();
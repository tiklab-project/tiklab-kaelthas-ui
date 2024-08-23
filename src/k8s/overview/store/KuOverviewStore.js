import {observable} from "mobx";

export class KuOverviewStore {
    @observable searchCondition = {
        pageParam: {
            pageSize: 20,
            currentPage: 1,
        }
    };

    @observable kbPage = [];

    @observable total = 20;

    @observable kbObj;
}

const kuOverviewStore = new KuOverviewStore();

export default kuOverviewStore;
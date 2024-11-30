import {action, observable} from "mobx";
import {Service} from "../../../common/utils/requset";

export class KuOverviewStore {
    @observable searchCondition = {
        pageParam: {
            pageSize: 20,
            currentPage: 1,
        }
    };

    @observable kbPage = [];

    @observable total = 20;

    @observable kuOverView;

    @action
    findKuOverviewTotal = async (kuId) => {
        const formData = new FormData();
        formData.append("kuId",kuId);
        const resData = await Service("/kuOverview/findKuOverviewTotal",formData);
        this.kuOverView = resData.data
    }
}

const kuOverviewStore = new KuOverviewStore();

export default kuOverviewStore;
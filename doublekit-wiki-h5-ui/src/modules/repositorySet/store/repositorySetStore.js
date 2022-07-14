import { observable, action } from "mobx";
import { FindRepository } from "../api/repositorySetApi";

export class RepositorySetStoroe {

    @action
	findRepository = async(values) => {
        const params = new FormData()
        params.append("id", values)

        const data = await FindRepository(params)
        return data;
	}

}

export const REPOSITORY_STORE = "repositorySetStoroe"

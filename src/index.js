import React from 'react';
import ReactDOM from 'react-dom';
import Routers from './Routers';
import { orgStores } from "thoughtware-user-ui/es/store";
import { enableAxios } from 'thoughtware-core-ui';
import { useTranslation } from 'react-i18next';
import { observer } from "mobx-react"
import {useVersion} from "thoughtware-eam-ui/es/utils";
import {privilegeStores} from "thoughtware-privilege-ui/es/store";
import App from "./App";
enableAxios()
const Index = observer((props) => {

    const { i18n } = useTranslation();
    useVersion()

    const allStore = {
        ...privilegeStores,
        ...orgStores
    }

    return (
        <App
            routes={Routers}
            allStore={allStore}
        />
    )
});

ReactDOM.render(<Index />, document.getElementById('root'));


import React from 'react';
import ReactDOM from 'react-dom';
import Routers from './Routers';
import { orgStores } from "tiklab-user-ui/es/store";
import { enableAxios } from 'tiklab-core-ui';
import { useTranslation } from 'react-i18next';
import { observer } from "mobx-react"
import {useVersion} from "tiklab-eam-ui/es/utils";
import {privilegeStores} from "tiklab-privilege-ui/es/store";
import App from "./App";
import "./assets/index";
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


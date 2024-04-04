import React from 'react';
import TopList from "../../../home/common/TopList";
import LeftMenu from "../../common/components/LeftMenu";
import "./Permissions.scss"
import SettingLeftTabs from "../common/SettingLeftTabs";
import {withRouter} from "react-router-dom";

const Permissions = (props) => {

    return (
        <div className="permissions-box-body-right">
            这是权限页面的内容
        </div>
    );
};
export default withRouter(Permissions);
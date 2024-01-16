import React from 'react';
import TopList from "../../../home/common/components/TopList";
import LeftMenu from "../../common/components/LeftMenu";
import "./Permissions.scss"
import SettingLeftTabs from "../common/SettingLeftTabs";
import {withRouter} from "react-router-dom";

const Permissions = (props) => {

    return (
        <div>
            <div className="permissions-box">
                <LeftMenu/>
                <div className="permissions-box-right">
                    <SettingLeftTabs/>
                    <div className="permissions-box-body-right">
                        这是权限页面的内容
                    </div>
                </div>
            </div>
        </div>
    );
};
export default withRouter(Permissions);
import React from 'react';
import TopList from "../../common/TopList";
import LeftMenu from "../../common/LeftMenu";
import "./ProjectInformation.scss"
import SettingLeftTabs from "../common/SettingLeftTabs";
import {withRouter} from "react-router-dom";
import DropDownMenu from "./DropDownMenu";

const ProjectInformation = (props) => {

    return (
        <div>
            <TopList/>
            <div className="setting-box">
                <LeftMenu/>
                <div className="setting-box-right">
                    <SettingLeftTabs/>
                    <div className="setting-box-body-right">
                        <div className="setting-box-right-head">
                            <div className="setting-box-right-head-text">
                                项目信息
                            </div>
                            <DropDownMenu/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(ProjectInformation);
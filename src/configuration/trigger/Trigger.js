import React from 'react';
import TopList from "../../common/TopList";
import LeftMenu from "../common/LeftMenu";
import {withRouter} from "react-router-dom";
import "./Trigger.scss"
import AddTrigger from "./AddTrigger";
import {Input} from "antd";
import TriggerList from "./TriggerList";

const Trigger = (props) => {


    const Search = () => <Input placeholder="请输入监控项名称"/>;

    return (
        <div>
            <TopList/>
            <div className="trigger-body">
                <div className="box-trigger">
                    <LeftMenu/>
                    <div className="box-trigger-right">
                        <div className="box-trigger-title">
                            <div className="box-trigger-title-text">
                                触发器
                            </div>
                            <div className="trigger-top-right">
                                <div>
                                    <AddTrigger/>
                                </div>
                            </div>
                        </div>
                        <div className="trigger-kind-options">
                            <div className="trigger-kind-options-tabs">
                                <div className="trigger-kind-options-tabs-text">
                                    全部
                                </div>
                                <div className="trigger-kind-options-tabs-text">
                                    模板触发器
                                </div>
                                <div className="trigger-kind-options-tabs-text">
                                    主机触发器
                                </div>
                            </div>
                            <div>
                                <Search/>
                            </div>
                        </div>

                        <div className="box-trigger-table">
                            <TriggerList/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Trigger);
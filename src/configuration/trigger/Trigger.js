import React, {useEffect, useState} from 'react';
import TopList from "../common/TopList";
import LeftMenu from "../common/LeftMenu";
import {withRouter} from "react-router-dom";
import "./Trigger.scss"
import AddTrigger from "./AddTrigger";
import {Input} from "antd";
import TriggerList from "./TriggerList";

const Trigger = (props) => {


    const data = [
        {
            key: '1',
            triggerName: '内核占用CPU百分比超过数值',
            isTemplate: '否',
            triggerExpression:'system.cpu(internal,time)>80%',
            messageType:'短信发送',
            alarmType: '一般严重',
            description:'对内核占用CPU百分比超过80%进行告警',
        },
        {
            key: '2',
            triggerName: '空闲CPU时间百分比低于正常值',
            isTemplate: '否',
            triggerExpression:'system.cpu(idle,c)<10%',
            messageType:'使用微信公众号',
            alarmType: '告警',
            description:'空闲CPU时间百分比低于10%进行告警',
        },
    ];

    const [dataList,setDataList] = useState();


    useEffect(() => {
        setDataList(data)
    }, []);

    const Search = () => <Input placeholder="请输入监控项名称"/>;

    return (
        <div>
            <TopList/>
                <div className="box-trigger">
                    <LeftMenu/>
                    <div className="box-trigger-right">
                        <div className="box-trigger-title">
                            <div className="box-trigger-title-text">
                                触发器
                            </div>
                            <div className="trigger-top-right">
                                <div>
                                    <AddTrigger dataList={dataList} setDataList={setDataList}/>
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
                            <TriggerList dataList={dataList} setDataList={setDataList}/>
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default withRouter(Trigger);
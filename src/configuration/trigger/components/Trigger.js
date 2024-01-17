import React, {useEffect, useState} from 'react';
import LeftMenu from "../../common/components/LeftMenu";
import {withRouter} from "react-router-dom";
import "./Trigger.scss"
import AddTrigger from "./AddTrigger";
import {Input} from "antd";
import TriggerList from "./TriggerList";
import triggerStore from "../store/TriggerStore";

const Trigger = (props) => {

    const [dataList, setDataList] = useState([]);

    const {getTriggerList,setSearchCondition} = triggerStore;

    const searchName = async (e) => {
        setSearchCondition({name:e.target.value})

        const resData = await getTriggerList();

        setDataList([...resData.dataList])
    };

    return (
        <div>
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
                            <Input onPressEnter={(event) => searchName(event)} placeholder="请输入触发器名称"/>
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
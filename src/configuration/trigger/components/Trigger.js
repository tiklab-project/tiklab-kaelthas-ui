import React, {useEffect, useState} from 'react';
import TopList from "../../../home/common/components/TopList";
import LeftMenu from "../../common/compnoents/LeftMenu";
import {withRouter} from "react-router-dom";
import "./Trigger.scss"
import AddTrigger from "./AddTrigger";
import {Input} from "antd";
import TriggerList from "./TriggerList";
import triggerStore from "../store/TriggerStore";

const Trigger = (props) => {

    const [dataList, setDataList] = useState([]);

    const {findTriggerByName} = triggerStore;

    const searchName = async (e) => {

        const resData = await findTriggerByName(e.target.value);

        setDataList([...resData])
    };
    const Search = () => <Input onPressEnter={(event) => searchName(event)} placeholder="请输入监控项名称"/>;

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
import React, {useEffect, useState} from 'react';
import {withRouter} from "react-router-dom";
import "./Trigger.scss"
import AddTrigger from "./AddTrigger";
import {Col, Input, Row} from "antd";
import TriggerList from "./TriggerList";
import triggerStore from "../store/TriggerStore";
import {SearchOutlined} from "@ant-design/icons";

const Trigger = (props) => {

    const [dataList, setDataList] = useState([]);

    const {getTriggerList, setSearchCondition, getMediumAllList} = triggerStore;

    const searchName = async (e) => {
        setSearchCondition({name: e.target.value})
        const resData = await getTriggerList();
        setDataList([...resData.dataList])
    };

    useEffect(async () => {
        await getMediumAllList();
    }, []);

    return (
        <Row className="box-trigger-right">
            <Col sm={24} md={24} lg={{span: 24}} xl={{span: "22", offset: "1"}} xxl={{span: "18", offset: "3"}}>
                <div className="box-trigger-title">
                    <div className="box-trigger-title-text">
                        触发器
                    </div>
                    <div className="trigger-top-right">
                        <AddTrigger dataList={dataList} setDataList={setDataList}/>
                    </div>
                </div>
                <div className="trigger-kind-options">
                    <div className="trigger-kind-options-tabs">

                    </div>
                    <div>
                        <Input
                            onPressEnter={(event) => searchName(event)}
                            placeholder="请输入触发器名称"
                            prefix={<SearchOutlined/>}
                        />
                    </div>
                </div>

                <div className="box-trigger-table">
                    <TriggerList dataList={dataList} setDataList={setDataList}/>
                </div>
            </Col>
        </Row>
    );
};

export default withRouter(Trigger);
import React, {useEffect, useState} from 'react';
import "./Graphics.scss"
import AddGraphics from "./AddGraphics";
import {Col, Input, Row} from "antd";
import GraphicsList from "./GraphicsList";
import graphicsStore from "../store/GraphicsStore";
import {withRouter} from "react-router-dom";
import {SearchOutlined} from "@ant-design/icons";
import {observer} from "mobx-react";

const Graphics = (props) => {

    const {getGraphicsStoreList, setSearchCondition, findMonitorListById,total} = graphicsStore;

    const [dataList, setDataList] = useState([]);

    const [monitorData, setMonitorData] = useState([]);

    useEffect(async () => {

        setSearchCondition({
            hostId: localStorage.getItem("hostId"),
            reportType: 2
        })

        getGraphicsStoreList().then((res) => {
            setDataList([...res.dataList])
        })

    }, []);

    const searchName = async (e) => {
        setSearchCondition({name: e.target.value})
        const resData = await getGraphicsStoreList();
        setDataList([...resData.dataList])
    };

    return (
        <Row className="box-graphics-right">
            <Col sm={24} md={24} lg={{span: 24}} xl={{span: "22", offset: "1"}} xxl={{span: "18", offset: "3"}}>
                <div className="box-graphics-title">


                </div>
                <div className="graphics-kind-options">
                    <div className="box-graphics-title-text">
                        图形的数量:{total}
                    </div>
                    <div className="box-graphics-title-div">
                        <div>
                            <Input placeholder="图形名称"
                                   className="graphics-kind-search"
                                   onPressEnter={(event) => searchName(event)}
                                   allowClear={true}
                                   prefix={<SearchOutlined/>}
                            />
                        </div>
                        <div className="graphics-top-right">
                            <AddGraphics dataList={dataList} setDataList={setDataList} monitorData={monitorData}/>
                        </div>
                    </div>
                </div>
                <div className="box-graphics-table">
                    <GraphicsList dataList={dataList} setDataList={setDataList}/>
                </div>
            </Col>
        </Row>
    );
};

export default withRouter(observer(Graphics));
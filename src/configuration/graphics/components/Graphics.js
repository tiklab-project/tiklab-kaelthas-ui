import React, {useEffect, useState} from 'react';
import LeftMenu from "../../common/components/LeftMenu";
import "./Graphics.scss"
import AddGraphics from "./AddGraphics";
import {Input} from "antd";
import GraphicsList from "./GraphicsList";
import graphicsStore from "../store/GraphicsStore";
import {withRouter} from "react-router-dom";

const Graphics = (props) => {

    const {getGraphicsStoreList, setSearchCondition, findMonitorListById} = graphicsStore;

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
    const Search = () => <Input placeholder="请输入图形名称" onPressEnter={(event) => searchName(event)}/>;

    return (
        <div className="box-graphics-right">
            <div className="box-graphics-title">
                <div className="box-graphics-title-text">
                    图形
                </div>
                <div className="graphics-top-right">
                    <AddGraphics dataList={dataList} setDataList={setDataList} monitorData={monitorData}/>
                </div>
            </div>
            <div className="graphics-kind-options">
                <div className="graphics-kind-options-tabs">

                </div>
                <div className="graphics-kind-search">
                    <Search/>
                </div>
            </div>
            <div className="box-graphics-table">
                <GraphicsList dataList={dataList} setDataList={setDataList}/>
            </div>
        </div>
    );
};

export default withRouter(Graphics);
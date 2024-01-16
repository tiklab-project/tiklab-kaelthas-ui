import React, {useState} from 'react';
import TopList from "../../../home/common/components/TopList";
import LeftMenu from "../../common/components/LeftMenu";
import "./Graphics.scss"
import AddGraphics from "./AddGraphics";
import {Input} from "antd";
import GraphicsList from "./GraphicsList";
import graphicsStore from "../store/GraphicsStore";
import {withRouter} from "react-router-dom";

const Graphics = (props) => {

    const {getGraphicsStoreByName} = graphicsStore;

    const [dataList,setDataList] = useState([]);


    const searchName = async (e) => {
        const resData = await getGraphicsStoreByName(e.target.value);
        setDataList([...resData])
    };
    const Search = () => <Input placeholder="请输入图形名称" onPressEnter={(event) => searchName(event)}/>;

    return (
        <div>
            <div className="box-graphics">
                <LeftMenu/>
                <div className="box-graphics-right">
                    <div className="box-graphics-title">
                        <div className="box-graphics-title-text">
                            <div>
                                图形
                            </div>
                        </div>
                        <div className="graphics-top-right">
                            <div className="graphics-top-right-button">
                                <AddGraphics dataList={dataList} setDataList={setDataList}/>
                            </div>
                        </div>
                    </div>
                    <div className="graphics-kind-options">
                        <div className="graphics-kind-options-tabs">
                            <div className="graphics-kind-options-tabs-text">
                                全部
                            </div>
                            <div className="graphics-kind-options-tabs-text">
                                模板图形
                            </div>
                            <div className="graphics-kind-options-tabs-text">
                                主机图形
                            </div>
                        </div>
                        <div className="graphics-kind-search">
                            <Search/>
                        </div>
                    </div>
                    <div className="box-graphics-table">
                        <GraphicsList dataList={dataList} setDataList={setDataList}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Graphics);
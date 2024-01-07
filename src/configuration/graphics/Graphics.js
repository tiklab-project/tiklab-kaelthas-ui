import React, {useState} from 'react';
import TopList from "../common/TopList";
import LeftMenu from "../common/LeftMenu";
import "./Graphics.scss"
import AddGraphics from "./AddGraphics";
import {Input} from "antd";
import GraphicsList from "./GraphicsList";

const Graphics = (props) => {

    const data = [
        {
            key: '1',
            graphicsName: '内存监控图表',
            width: '900',
            height: '400',
        },
        {
            key: '2',
            graphicsName: '网络监控图表',
            width: '900',
            height: '400',
        },
        {
            key: '3',
            graphicsName: '改变过优先级的进程图表',
            width: '900',
            height: '400',
        },
        {
            key: '4',
            graphicsName: '空闲CPU图表',
            width: '900',
            height: '400',
        },
    ];

    const [dataList,setDataList] = useState(data);


    const Search = () => <Input placeholder="请输入图形名称"/>;

    return (
        <div>
            <TopList/>
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

export default Graphics;
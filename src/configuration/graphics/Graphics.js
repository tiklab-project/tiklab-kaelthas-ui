import React from 'react';
import TopList from "../common/TopList";
import LeftMenu from "../common/LeftMenu";
import "./Graphics.scss"
import AddGraphics from "./AddGraphics";
import {Input} from "antd";
import GraphicsList from "./GraphicsList";

const Graphics = () => {

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
                                <AddGraphics/>
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
                        <GraphicsList/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Graphics;
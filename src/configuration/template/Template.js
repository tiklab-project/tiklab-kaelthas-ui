import React, {useState} from 'react';
import TopList from "../common/TopList";
import LeftMenu from "../common/LeftMenu";
import "./Template.scss"
import AddTemplate from "./AddTemplate";
import {Input} from "antd";
import TemplateList from "./TemplateList";

const Template = (props) => {


    const data = [
        {
            key: '1',
            templateName: 'CPU监控模板',
            monitorNum: '6',
            triggerNum: '1',
        },
        {
            key: '2',
            templateName: '内存监控模板',
            monitorNum: '4',
            triggerNum: '2',
        },
        {
            key: '3',
            templateName: '网络监控模板',
            monitorNum: '8',
            triggerNum: '3',
        },
        {
            key: '4',
            templateName: 'template001',
            monitorNum: '4',
            triggerNum: '2',
        },
    ];

    const [dataList,setDataList] = useState(data);

    const Search = () => <Input placeholder="请输入监控项名称"/>;

    return (
        <div>
            <TopList/>
            <div className="host-body">
                <div className="box-template">
                    <LeftMenu/>
                    <div className="box-template-right">
                        <div className="box-template-title">
                            <div className="box-template-title-text">
                                主机下模板
                            </div>
                            <div className="template-top-right">
                                <div>
                                    <AddTemplate dataList={dataList} setDataList={setDataList}/>
                                </div>

                            </div>
                        </div>
                        <div className="template-kind-options">
                            <div className="template-kind-search">
                                <div>
                                    <Search/>
                                </div>
                            </div>
                        </div>

                        <div className="box-template-table">
                            <TemplateList dataList={dataList} setDataList={setDataList}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Template;
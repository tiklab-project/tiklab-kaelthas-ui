import React, {useState} from 'react';
import TopList from "../../common/TopList";
import LeftMenu from "../../common/LeftMenu";
import "./Template.scss"
import AddTemplate from "./AddTemplate";
import {Input} from "antd";
import TemplateList from "./TemplateList";
import templateStore from "../store/TemplateStore";

const Template = (props) => {

    const {getTemplateByName} = templateStore;

    const [dataList,setDataList] = useState();

    const searchName = async (event) => {

        const resData = await getTemplateByName(event.target.value);
        setDataList([...resData])

    };


    const Search = () => <Input placeholder="请输入监控项名称" onPressEnter={(event) => searchName(event)}/>;

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
import React, {useState} from "react";
import TableList from "./TableList";
import TapList from "../common/TopList"
import AddHost from "./AddHost";
import "./Configuration.scss"
import {Input} from "antd";


const Configuration = (props) => {

    const data = [
        {
            key: '1',
            name: 'host01',
            ip: '127.0.0.1',
            status: '已启用',
            availability: '可用',
            templateCount: 1,
            monitorCount: 3,
            triggerCount: 2,
            graphics: 1,
            createTime: '1小时前'
        },
        {
            key: '2',
            name: 'host02',
            ip: '127.0.0.1',
            status: '已启用',
            availability: '可用',
            templateCount: 1,
            monitorCount: 3,
            triggerCount: 2,
            graphics: 1,
            createTime: '1小时前'
        },
        {
            key: '3',
            name: 'host03',
            ip: '127.0.0.1',
            status: '已启用',
            availability: '可用',
            templateCount: 1,
            monitorCount: 3,
            triggerCount: 2,
            graphics: 1,
            createTime: '1小时前'
        },
        {
            key: '4',
            name: 'host04',
            ip: '127.0.0.1',
            status: '已启用',
            availability: '可用',
            templateCount: 1,
            monitorCount: 3,
            triggerCount: 2,
            graphics: 1,
            createTime: '1小时前'
        },
        {
            key: '5',
            name: 'host05',
            ip: '127.0.0.1',
            status: '已启用',
            availability: '可用',
            templateCount: 1,
            monitorCount: 3,
            triggerCount: 2,
            graphics: 1,
            createTime: '1小时前'
        },
        {
            key: '6',
            name: 'host06',
            ip: '127.0.0.1',
            status: '已启用',
            availability: '可用',
            templateCount: 1,
            monitorCount: 3,
            triggerCount: 2,
            graphics: 1,
            createTime: '1小时前'
        },
    ];

    const [dataList,setDataList] = useState(data);

    const Search = () => <Input placeholder="请输入监控项名称"/>;

    return (
        <div>
            <TapList/>
            <div className='box-configuration-body'>
                <div className="box-configuration-body-item">
                    <div className="box-configuration-body--title">
                        <div className="box-configuration-title-left">
                            <span>主机配置</span>
                        </div>
                        <div className="box-configuration-title-right">
                            <AddHost setDataList={setDataList} dataList={dataList}/>
                        </div>
                    </div>
                    <div className="box-configuration-body-type">
                        <div className="box-configuration-body-tabs">
                            <div className="box-configuration-body-tabs-item">
                                所有
                            </div>
                            <div className="box-configuration-body-tabs-item">
                                可用
                            </div>
                            <div className="box-configuration-body-tabs-item">
                                不可用
                            </div>

                        </div>
                        <div className="box-configuration-body-search">
                            <Search/>
                        </div>
                    </div>
                    <div className="box-configuration-body-list">
                        <TableList setDataList={setDataList} dataList={dataList}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Configuration;
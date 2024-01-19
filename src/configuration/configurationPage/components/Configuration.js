import React, {useEffect, useState} from "react";
import AddHost from "./AddHost";
import "./Configuration.scss"
import {Input, Table} from "antd";
import configurationStore from "../store/ConfigurationStore";
import {withRouter} from "react-router-dom";


const Configuration = (props) => {

    const [dataList, setDataList] = useState([]);

    const {findPageHost, findHostGroup, setSearchCondition} = configurationStore;

    useEffect(async () => {

        const resData = await findPageHost()

        setDataList([...resData])

    }, []);

    const searchName = async (e) => {
        const name = e.target.value;
        setSearchCondition({name: name})
        const resData = await findPageHost()

        setDataList([...resData])
    };

    const host = (record) => {
        console.log("路由跳转到host")
        props.history.push(`/hostList/${record.id}/hostDetails`);
        localStorage.setItem('hostId', record.id);
        console.log(record.id)
    }


    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => <span style={{cursor: "pointer"}} onClick={() => host(record)}>{text}</span>,
        },
        {
            title: '主机ip',
            dataIndex: 'ip',
            key: 'ip',
        },
        {
            title: '主机状态',
            dataIndex: 'state',
            key: 'state',
            render: (state) => {
                let config = {
                    1: "启用",
                    2: "未启用",
                }
                return config[state];
            }
        },
        {
            title: '可用性',
            dataIndex: 'usability',
            key: 'usability',
            render: (usability) => {
                let config = {
                    1: "可用",
                    2: "不可用",
                    3: "未知"
                }
                return config[usability];
            }
        }, {
            title: '模板数量',
            dataIndex: 'templateCount',
            key: 'templateCount',
        }, {
            title: '监控项数量',
            dataIndex: 'monitorCount',
            key: 'monitorCount',
        }, {
            title: '触发器数量',
            dataIndex: 'triggerCount',
            key: 'triggerCount',
        }, {
            title: '图形数量',
            dataIndex: 'graphics',
            key: 'graphics',
        }, {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
        },

    ];

    const Search = () => <Input placeholder="请输入主机名称" onPressEnter={(event) => searchName(event)}/>;

    const changePage = async (pagination, filters, sorter) => {
        console.log("pagination当中的数据:", pagination)
        console.log("filters当中的数据:", filters)
        console.log("sorter当中的数据:", sorter)
        const resData = await findPageHost(
            {
                pageParam: {
                    currentPage: pagination.current,
                    pageSize: pagination.pageSize,
                }
            }
        )

        setDataList([...resData])

    };
    const checkTab = async (value) => {
        setSearchCondition({
            usability: value,
            name: ""
        });
        const resData = await findPageHost()

        setDataList([...resData])
    };
    return (
        <div>
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
                            <div className="box-configuration-body-tabs-item" onClick={() => checkTab(null)}>
                                所有
                            </div>
                            <div className="box-configuration-body-tabs-item" onClick={() => checkTab(1)}>
                                可用
                            </div>
                            <div className="box-configuration-body-tabs-item" onClick={() => checkTab(2)}>
                                不可用
                            </div>

                        </div>
                        <div className="box-configuration-body-search">
                            <Search/>
                        </div>
                    </div>
                    <div className="box-configuration-body-list">
                        <Table
                            rowKey={record => record.id}
                            columns={columns}
                            dataSource={dataList}
                            onChange={changePage}
                            pagination={{
                                position: ["bottomCenter"],
                            }
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Configuration);
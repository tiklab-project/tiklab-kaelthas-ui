import React, {useEffect, useState} from "react";
import TapList from "../../../home/common/components/TopList"
import AddHost from "./AddHost";
import "./Configuration.scss"
import {Input, Table} from "antd";
import configurationStore from "../store/ConfigurationStore";
import {withRouter} from "react-router-dom";
import {renderRoutes} from "react-router-config";


const Configuration = (props) => {

    const route = props.route.routes;

    const [dataList, setDataList] = useState([]);

    const {findPageHost,findHostGroup} = configurationStore;

    const [value, setValue] = useState();

    useEffect(async () => {

        const resData = await findPageHost({
            name: value,
            pageParam: {
                currentPage: 1,
                pageSize: 10
            }
        })

        setDataList([...resData])

    }, []);

    const searchName = (e) => {
        const name = e.target.value;
        setValue(name);
    };

    const host = () => {
        console.log("路由跳转到host")
        props.history.push("/hostList/:id/hostDetails");
    }


    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <span style={{cursor: "pointer"}} onClick={host}>{text}</span>,
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
        },
        {
            title: '可用性',
            dataIndex: 'usability',
            key: 'usability',
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

    const changePage = (pagination) => {

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
                        <Table
                            rowKey={record => record.id}
                            columns={columns}
                            dataSource={dataList}
                            onChange={changePage}
                            pagination={{
                            position: ["bottomCenter"],
                        }}
                            defaultCurrent={1}
                            defaultPageSize={20}
                            total={50}
                            pageSizeOptions={[10, 20, 50, 100]}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Configuration);
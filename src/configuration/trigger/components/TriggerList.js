import {Form, Space, Table, Tag, Tooltip} from 'antd';
import React, {useEffect, useState} from 'react';
import UpdateTrigger from "./UpdateTrigger";
import triggerStore from "../store/TriggerStore";
import "../../../common/styles/_tabStyle.scss"
import {observer} from "mobx-react";

const TriggerList = (props) => {

    const {
        getTriggerList,
        deleteTriggerById,
        setSearchCondition,
        total,
        triggerList
    } = triggerStore;

    const {dataList, setDataList, mediumList} = props;

    const [rowData, setRowData] = useState({});

    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(async () => {

        await setSearchCondition({hostId: localStorage.getItem("hostId")})

        getTriggerList().then(res => {
            setDataList([...res.dataList])
        });

    }, []);

    const deleteTrigger = async (id) => {

        await deleteTriggerById(id);
        const resData = await getTriggerList();
        setDataList([...resData.dataList])

    }

    const rowEcho = (record) => {

        setIsModalOpen(true);

        form.setFieldsValue(
            {
                name: record.name,
                monitorId: record.monitorId,
                severityLevel: record.severityLevel,
                mediumType: record.mediumIds,
                describe: record.describe,
                numericalValue: record.numericalValue,
                operator: record.operator,
                expression: record.expression,
                source: record.source,
                scheme: record.scheme,
                rangeTime: record.rangeTime,
                percentage: record.percentage
            }
        )

        setRowData({
            id: record.id,
            name: record.name,
            expressionId: record.expressionId,
            severityLevel: record.severityLevel,
            mediumType: record.mediumType,
            describe: record.describe,
            source: record.source,

        })

        console.log(record)
    };

    const columns = [
        {
            title: '触发器名称',
            dataIndex: 'name',
            id: 'name',
            render: (text, record) =>
                <span style={{cursor: "pointer"}}
                      onClick={() => rowEcho(record)}>{text}</span>,
        },
        {
            title: '关系表达式',
            dataIndex: 'expression',
            id: 'expression',
            render: (name) => <Tooltip title={name}>
                <div>{name}</div>
            </Tooltip>
        },
        {
            title: '触发方案',
            dataIndex: 'scheme',
            id: 'scheme',
            render: (mediumType) => {
                let config = {
                    1: "avg(平均值)",
                    2: "percentage(百分比)",
                    3: "last(最近一个值)",
                }
                return config[mediumType];
            }
        },
        {
            title: '时间范畴',
            dataIndex: 'rangeTime',
            id: 'rangeTime',
            render:(rangeTime)=>{
                return rangeTime + "分钟";
            }
        },
        {
            title: '消息通知方案',
            dataIndex: 'mediumIds',
            id: 'mediumIds',
            render: (mediumIds) => (
                <span>
                    {
                        mediumIds && mediumIds.map(tag => {
                                let color = tag.length > 5 ? 'geekblue' : 'green';
                                let config = {
                                    1: "APP",
                                    2: "企业微信",
                                    3: "站内信",
                                    4: "邮件通知",
                                }
                                return (
                                    <Tag color={color} key={tag}>
                                        {config[tag]}
                                    </Tag>
                                );
                            }
                        )
                    }
                </span>
            )
        },
        {
            title: '告警等级',
            dataIndex: 'severityLevel',
            id: 'severityLevel',
            render: (severityLevel) => {
                let config = {
                    1: "灾难",
                    2: "严重",
                    3: "一般严重",
                    4: "告警",
                    5: "信息",
                    6: "未分类",
                }
                return config[severityLevel];
            }
        },
        {
            title: '描述',
            dataIndex: 'describe',
            id: 'describe',
        },
        {
            title: '操作',
            id: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <span style={{cursor: "pointer"}} onClick={() => deleteTrigger(record.id)}>删除</span>
                </Space>
            ),
        },

    ];

    async function changePage(pagination) {
        setSearchCondition({
            pageParam: {
                pageSize: pagination.pageSize,
                currentPage: pagination.current,
            }
        })

        await getTriggerList();
    }

    return (
        <>
            <UpdateTrigger dataList={dataList} setDataList={setDataList} form={form}
                           rowData={rowData} setRowData={setRowData}
                           isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
                           mediumList={mediumList}
            />
            <Table
                rowKey={record => record.id}
                columns={columns}
                dataSource={triggerList}
                className="custom-table"
                onChange={changePage}
                scroll={{
                    x: 300,
                }}
                pagination={{
                    position: ["bottomCenter"],
                    total: total,
                    showSizeChanger: true
                }}
            />
        </>

    )
};
export default observer(TriggerList);
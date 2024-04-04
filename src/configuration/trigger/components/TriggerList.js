import {Form, Input, Modal, Select, Space, Table, Tag, Tooltip} from 'antd';
import React, {useEffect, useState} from 'react';
import UpdateTrigger from "./UpdateTrigger";
import triggerStore from "../store/TriggerStore";
import "../../../common/styles/_tabStyle.scss"
const TriggerList = (props) => {

    const {
        getTriggerList,
        deleteTriggerById,
        setSearchCondition,
        monitorList,
        findMonitorListById,
        total
    } = triggerStore;

    const {dataList, setDataList} = props;

    const [rowData, setRowData] = useState({});

    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(async () => {

        await setSearchCondition({hostId: localStorage.getItem("hostId")})

        getTriggerList().then(res => {
            setDataList([...res.dataList])
        });

        return null;
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
                mediumType: record.mediumType,
                describe: record.describe,
                numericalValue: record.numericalValue,
                operator: record.operator,
                expression: record.expression,
                source: record.source,
                scheme:record.scheme,
                rangeTime:record.rangeTime
            }
        )

        setRowData({
            id: record.id,
            name: record.name,
            expressionId: record.expressionId,
            severityLevel: record.severityLevel,
            mediumType: record.mediumType,
            describe: record.describe,
            source: record.source
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
        /*{
            title: '监控项名称',
            dataIndex: 'monitorName',
            id: 'monitorName',
        },*/
        {
            title: '关系表达式',
            dataIndex: 'expression',
            id: 'expression',
            render: (name) => <Tooltip title={name}>
                <div>{name}</div>
            </Tooltip>
        },
        /*{
            title: '运算符',
            dataIndex: 'operator',
            id: 'operator',
            render: (severityLevel) => {
                let config = {
                    1: ">",
                    2: "<",
                    3: "=",
                    4: ">=",
                    5: "<=",
                    6: "<>",
                }
                return config[severityLevel];
            }
        },
        {
            title: '表达式数值',
            dataIndex: 'numericalValue',
            id: 'numericalValue',
        },*/
        {
            title: '触发方案',
            dataIndex: 'scheme',
            id: 'scheme',
            render: (mediumType) => {
                let config = {
                    1: "avg(平均值)",
                    2: "max(最大值)",
                    3: "min(最小值)",
                    4: "last(之后一个值)",
                }
                return config[mediumType];
            }
        },
        {
            title: '时间范畴',
            dataIndex: 'rangeTime',
            id: 'rangeTime',
        },
        {
            title: '消息通知方案',
            dataIndex: 'mediumType',
            id: 'mediumType',
            render: (mediumType) => {
                let config = {
                    1: "方案1:电子邮件",
                    2: "方案2:微信公众号",
                    3: "方案3:钉钉",
                    4: "方案4:短信",
                }
                return config[mediumType];
            }
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
        }, {
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

    function changePage(pagination) {
        setSearchCondition({
            pageParam: {
                pageSize: pagination.pageSize,
                currentPage: pagination.current,
            }
        })

        getTriggerList().then(res => {
            setDataList([...res.dataList])
        });
    }

    return (
        <>
            <UpdateTrigger dataList={dataList} setDataList={setDataList} form={form}
                           rowData={rowData} setRowData={setRowData}
                           isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
            />
            <Table
                rowKey={record => record.id}
                columns={columns}
                dataSource={dataList}
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
export default TriggerList;
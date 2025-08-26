import React, {useEffect, useState} from 'react';
import {Button, Col, Input, Row, Table, Tag, Tooltip} from "antd";
import "./Databases.scss"
import {SearchOutlined} from "@ant-design/icons";
import databasesStore from "../store/DatabasesStore";
import {observer} from "mobx-react";
import SearchInput from "../../../common/input/SearchInput";
import Dropdowns from "../../../common/Dropdown/Dropdowns";
import Page from "../../../common/page/Page";
import DataBaseCompilePop from "../../common/DataBaseCompilePop";


const availabilityTab = [
    {title: '全部', key: 2, icon: "all"},
    {title: '可用', key: 1, icon: "available"},
    {title: '不可用', key: 0, icon: "noAvailable"}];
const Databases = (props) => {

    const {refresh,findDbInfoPage,deleteDbInfo, setSearchCondition} = databasesStore

    const [dbTab, setDbTab] = useState(2);


    //搜索数据库的名字
    const [dbName,setDbName]=useState(null)
    //数据库list
    const [dbList,setDbList]=useState([])
    const [currentPage,setCurrentPage]=useState(1)
    const [totalPage,setTotalPage]=useState()
    const [totalRecord,setTotalRecord]=useState()
    const [pageSize]=useState(15)

    const [dataBase,setDataBase] = useState(null)
    const [visible,setVisible] = useState(false)


    useEffect(async () => {
        findDbPag(currentPage,dbTab,dbName)
    }, [refresh]);


    //分页查询数据库
    const findDbPag = (currentPage,usability,dbName) => {
        let state;
        if (usability!==2){
            state=usability
        }
        findDbInfoPage({pageParam:{currentPage:currentPage, pageSize:pageSize},
            name:dbName,
            usability:state}).then(res=>{

            setDbList(res.data.dataList)
            setTotalPage(res.data.totalPage)
            setCurrentPage(res.data.currentPage)
            setTotalRecord(res.data.totalRecord)
        })
    }

    //切换tab
    const checkTab = async (value) => {
        setDbTab(value)
        findDbPag(1,value,dbName)
    };


    //数据库名字搜索
    const searchDbName = (e) => {
        const name = e.target.value;
        setDbName(name)
        if (name===''){
            setCurrentPage(1)
            findDbPag(1)
        }
    }
    const onSearch = () => {
        setCurrentPage(1)
        findDbPag(1,dbTab,dbName)
    }
    //分页查询
    const changePage = async (value) => {
        setCurrentPage(value)
        findDbPag(value,dbTab,dbName)
    };

    //刷新
    const refreshFind = () => {
        findDbPag(currentPage,dbTab,dbName)
    }

    async function hrefDatabases(record) {
        props.history.push(`/db/${record.id}/monitoring`);
    }

    //打开更新
    const openUpdate = (value) => {
        setVisible(true)
        setDataBase(value)
    }

    //打开创建
    const openAddDatabases = () => {
        setVisible(true)
    }


    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => <div style={{cursor: "pointer"}}
                                           onClick={() => hrefDatabases(record)}>{text}</div>,
        },
        {
            title: '数据库地址',
            dataIndex: 'ip',
            key: 'ip',
        },
        {
            title: '数据库类型',
            dataIndex: 'dbType',
            key: 'dbType',
        },
        {
            title: '状态',
            dataIndex: 'dbTab',
            key: 'dbTab',
            render: (usability, record) => <div style={{cursor: "pointer"}}>{converType(record)}</div>,
        },
        {
            title: '未解决告警数量',
            dataIndex: 'alarmNum',
            ellipsis: true,
            key: 'alarmNum',
            render: (text, record) => <div style={{cursor: "pointer"}}>{conversionColor(text)}</div>
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
        },
        {
            title:'操作',
            dataIndex: 'action',
            width:'5%',
            key: 'action',
            render:(text,record)=>(
                <Dropdowns {...props}
                           goPage={openUpdate}
                           value={record}
                           deleteMethod={deleteDbInfo}
                           size={18}
                           type={"db"}
                />
            )
        }
    ];

    function converType(record) {

        if (record.usability === 0) {
            return <div>
                <Tag color={"red"}>异常</Tag><span>(无法连接)</span>
            </div>
        }
        if (record.usability === 2) {
            return <div>
                <Tag color={"red"}>异常</Tag><span>(未配置监控项)</span>
            </div>
        }

        if (record.alarmNum !== null) {
            if (record.alarmNum === 1) {
                let messageText;
                if (record.message.length>10){
                    messageText = record.message.substring(0,10)
                    return <div>
                        <Tag color={"red"}>异常</Tag><Tooltip title={record.message}>({messageText}...)</Tooltip>
                    </div>
                }
                return <div>
                    <Tag color={"red"}>异常</Tag><Tooltip title={record.message}>({record.message})</Tooltip>
                </div>
            }
            if (record.alarmNum > 1) {
                return <div>
                    <Tag color={"red"}>异常</Tag><Tooltip title={record.message}>({record.message}...)</Tooltip>
                </div>
            }
        }

        if (record.usability === 1) {
            return <Tag color={"blue"}>正常</Tag>
        }

    }


    function conversionColor(text) {
        if (text === 0 || text === null) {
            return <Tag color={"blue"}>{0}</Tag>
        } else {
            return <Tag color={"red"}>{text}</Tag>
        }
    }




    return (
        <Row className="db-row">
            <Col sm={24} md={24} lg={{span: 24}} xl={{span: "22", offset: "1"}} xxl={{span: "18", offset: "3"}}>

                <div className="db-body">
                    <div className="db-title">
                        <div className="db-title-text">数据库</div>
                        <div className="db-title-add-button" onClick={openAddDatabases}>新建数据库</div>
                    </div>
                    <div className="db-type-search">
                        <div className="db-type">
                            {
                                availabilityTab.map(item => {
                                    return <div
                                        className={`db-type-text ${dbTab === item.key ? "db-type-text-button-color" : ""}`}
                                        key={item.key}
                                        onClick={() => checkTab(item.key)}
                                    >
                                        {item.title}
                                    </div>
                                })
                            }
                        </div>
                        <div>
                            <SearchInput {...props}
                                         placeholder={"数据源名称"}
                                         onChange={(event) => searchDbName(event)}
                                         onPressEnter={onSearch}
                            />
                         {/*   <Input
                                placeholder="数据源名称"
                                className="box-configuration-body-search"
                                onPressEnter={(event) => searchDbName(event)}
                                allowClear={true}
                                prefix={<SearchOutlined/>}
                            />*/}
                        </div>
                    </div>
                    <div className="db-table">
                        <Table
                            rowKey={record => record.id}
                            columns={columns}
                            className="custom-table"
                            dataSource={dbList}
                            pagination={false}
                        />
                        <Page pageCurrent={currentPage}
                              changPage={changePage}
                              totalPage={totalPage}
                              totalRecord={totalRecord}
                              refresh={refreshFind}
                        />
                    </div>
                </div>
                <DataBaseCompilePop visible={visible}
                                    setVisible={setVisible}
                                    dataBase={dataBase}
                                    setDataBase={setDataBase}
                />
            </Col>
        </Row>
    );
};

export default observer(Databases);

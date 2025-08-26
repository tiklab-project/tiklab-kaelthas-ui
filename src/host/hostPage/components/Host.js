import React, {useEffect, useState} from "react";
import "./Host.scss"
import {Col, Dropdown, Input, Row, Table, Tag, Tooltip} from "antd";
import hostStore from "../store/HostStore";
import {withRouter} from "react-router-dom";
import {observer} from "mobx-react";
import {SearchOutlined} from "@ant-design/icons";
import alarmPageStore from "../../../alarm/alarmPage/store/AlarmPageStore";
import SearchInput from "../../../common/input/SearchInput";
import Dropdowns from "../../../common/Dropdown/Dropdowns";
import Page from "../../../common/page/Page";
import HostCompilePop from "../../common/components/HostCompilePop";

const availabilityTab = [
    {title: '全部', key: 2, icon: "allHost"},
    {title: '可用', key: 1, icon: "availableHost"},
    {title: '不可用', key: 0, icon: "noAvailableHost"}];
const Host = (props) => {

    const {refresh,findPageHost, createHostRecent,deleteHostById} = hostStore;


    const {setNullConditionByMonitoring} = alarmPageStore;

    const [hostTab, setHostTab] = useState(2);

    //搜索主机的名字
    const [hostName,setHostName]=useState(null)
    //主机list
    const [hostList,setHostList]=useState([])
    const [currentPage,setCurrentPage]=useState(1)
    const [totalPage,setTotalPage]=useState()
    const [totalRecord,setTotalRecord]=useState()
    const [pageSize]=useState(15)


    const [hostData,setHostData] = useState(null)
    const [visible,setVisible] = useState(false)



    useEffect(async () => {
        findHost(currentPage,hostTab,hostName)
    }, [refresh]);


    //查询主机
    const findHost = (currentPage,usability,name) => {
        let state;
        if (usability!==2){
            state=usability
        }
        findPageHost({pageParam:{currentPage:currentPage, pageSize:pageSize},
            name:name,
            usability:state}).then(res=>{
                setHostList(res.data.dataList)
                setTotalPage(res.data.totalPage)
                setCurrentPage(res.data.currentPage)
                setTotalRecord(res.data.totalRecord)
        })
    }

    //切换tab
    const checkTab = async (value) => {
        setHostTab(value)
        findHost(1,value,hostName)
    };


    //主机名字搜索
    const searchName = async (e) => {
        const name = e.target.value;
        setHostName(name)
        if (name===''){
            setCurrentPage(1)
            findHost(1,hostTab)
        }
    };
    const onSearch = () => {
        setCurrentPage(1)
        findHost(1,hostTab,hostName)
    }

    //分页查询
    const changePage = (value) => {
        setCurrentPage(value)
        findHost(value,hostTab,hostName)
    };

    //刷新
    const refreshFind = () => {
        findHost(currentPage,hostTab,hostName)
    }

    //打开更新弹窗
    const openUpdate = (value) => {
        setVisible(true)
        setHostData(value)
       // props.history.push(`/host/update/${value.id}`);
    }

    //打开新建主机的弹窗
    function hrefAddHost() {
        setVisible(true)
        //props.history.push('/host/addHost');
    }

    const host = async (record) => {
        props.history.push(`/host/${record.id}/monitoring`);

        //添加到临时表当中
        await createHostRecent({
            hostId: record.id
        })
    }

    function converType(record) {
        if (record.usability === 0) {
            return <div>
                <Tag color={"red"}>异常</Tag><span>(无法连接)</span>
            </div>
        }

        if (record.alarmNum !== null) {
            if (record.alarmNum === 1) {
                let messageText;
                if (record.message.length > 10) {
                    messageText = record.message.substring(0, 10)
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

    async function hrefAlarmPage(record) {
        setNullConditionByMonitoring({
            hostName: record.name,
            status: 2
        })

        localStorage.setItem("menuKey", "alarm")
        props.history.push(`/alarm`);
    }

    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            width: "20%",
            ellipsis: true,

            render: (text, record) => <div style={{cursor: "pointer"}} onClick={() => host(record)}>{text}</div>,
        },
        {
            title: '主机IP',
            dataIndex: 'ip',
            key: 'ip',
            width: "20%",
            ellipsis: true,
        },
        {
            title: '主机状态',
            dataIndex: 'usability',
            key: 'usability',
            width: "20%",
            ellipsis: true,
            render: (usability, record) => <div style={{cursor: "pointer"}}
                                                onClick={() => host(record)}>{converType(record)}</div>,
        },
        {
            title: '未解决告警数量',
            dataIndex: 'alarmNum',
            key: 'alarmNum',
            width: "20%",
            ellipsis: true,
            render: (text, record) => <div style={{cursor: "pointer"}}
                                           onClick={() => hrefAlarmPage(record)}>{conversionColor(text)}</div>
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            width: "20%",
            ellipsis: true,
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
                          deleteMethod={deleteHostById}
                          type={"host"}
                          size={18}

               />

            )
        }
    ];

    return (
        <Row className='box-configuration-body'>
            <Col sm={24} md={24} lg={{span: 24}} xl={{span: "22", offset: "1"}} xxl={{span: "18", offset: "3"}}>
                <div className="box-configuration-body-item">
                    <div className="box-configuration-body--title">
                        <div className="box-configuration-title-left">
                            主机
                        </div>
                        <div className="box-configuration-title-right" onClick={() => hrefAddHost()}>
                            新建主机
                        </div>
                    </div>


                    <div className="box-configuration-body-type">
                        <div className="box-configuration-body-tabs">
                            {
                                availabilityTab.map(item => {
                                    return <div
                                        className={`box-configuration-body-tabs-item ${hostTab === item.key ? "box-configuration-tabs" : ""}`}
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
                                         placeholder={"主机名称"}
                                         onChange={(event) => searchName(event)}
                                         onPressEnter={onSearch}
                            />
                        </div>
                    </div>
                    <div className="box-configuration-body-list">
                        <Table
                            rowKey={record => record.id}
                            columns={columns}
                            className="custom-table"
                            dataSource={hostList}
                            pagination={false}
                            scroll={{
                                x: 300,
                            }}
                        />
                        <Page pageCurrent={currentPage}
                              changPage={changePage}
                              totalPage={totalPage}
                              totalRecord={totalRecord}
                              refresh={refreshFind}
                        />
                    </div>
                </div>
                <HostCompilePop visible={visible}
                            setVisible={setVisible}
                            hostData={hostData}
                            setHostData={setHostData}
                />
            </Col>
        </Row>
    )
}

export default withRouter(observer(Host));

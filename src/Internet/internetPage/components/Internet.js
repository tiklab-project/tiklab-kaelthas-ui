import React, {useEffect, useState} from "react";
import "./Internet.scss"
import {Col, Input, Row, Table, Tag, Tooltip} from "antd";
import {withRouter} from "react-router-dom";
import {observer} from "mobx-react";
import {SearchOutlined} from "@ant-design/icons";
import alarmPageStore from "../../../alarm/alarmPage/store/AlarmPageStore";
import internetStore from "../store/InternetStore";
import SearchInput from "../../../common/input/SearchInput";
import Dropdowns from "../../../common/Dropdown/Dropdowns";
import Page from "../../../common/page/Page";
import InternetCompilePop from "../../common/InternetCompilePop";


const availabilityTab = [
    {title: '全部', key: 2, icon: "all"},
    {title: '可用', key: 1, icon: "available"},
    {title: '不可用', key: 0, icon: "noAvailable"}];
const Internet = (props) => {

    const {refresh,findInternetPage, updateInternet,deleteInternet} = internetStore;

    const {setNullConditionByMonitoring} = alarmPageStore;


    const [hostTab, setHostTab] = useState(2);
    //搜索网络的名字
    const [internetName,setInternetName]=useState(null)
    //网络list
    const [internetList,setInternetList]=useState([])
    const [currentPage,setCurrentPage]=useState(1)
    const [totalPage,setTotalPage]=useState()
    const [totalRecord,setTotalRecord]=useState()
    const [pageSize]=useState(15)

    const [internet,setInternet] = useState(null)
    const [visible,setVisible] = useState(false)


    useEffect(async () => {
        findInternet(currentPage,hostTab,internetName)
    }, [refresh]);

    //分页查询网络
    const findInternet = (currentPage,usability,internetName) => {
        let state;
        if (usability!==2){
             state=usability
        }
        findInternetPage({pageParam:{currentPage:currentPage, pageSize:pageSize},
            name:internetName,
            usability:state
        }).then(res=>{
                setInternetList(res.data.dataList)
                setTotalPage(res.data.totalPage)
                setCurrentPage(res.data.currentPage)
                setTotalRecord(res.data.totalRecord)
        })
    }

    //网络名字查询
    const searchName = async (e) => {
        const name = e.target.value;
        setInternetName(name)
        if (name===''){
            setCurrentPage(1)
            findInternet(1,hostTab)
        }
    };
    const onSearch = () => {
        setCurrentPage(1)
        findInternet(1,hostTab,internetName)
    }

    //分页查询
    const changePage = (value) => {
        setCurrentPage(value)
        findInternet(value,hostTab,internetName)
    };


    //刷新
    const refreshFind = () => {
        findInternet(currentPage,hostTab,internetName)
    }

    //切换tab
    const checkTab = async (value) => {
        setHostTab(value)
        findInternet(1,value,internetName)
    };


    //打开更新弹窗
    const openUpdate = (value) => {
        setVisible(true)
        setInternet(value)
    }

    function hrefAddHost() {
        setVisible(true)
    }

    const host = async (record) => {
        props.history.push(`/internet/${record.id}/inOverview`);

   /*     //添加到临时表当中
        await updateInternet({
            id: record.id
        })*/
    }

    function converType(record) {

        if (record?.usability === 0) {
            return <div>
                <Tag color={"red"}>异常</Tag><span>(无法连接)</span>
            </div>
        }

        if (record?.alarmNum !== null && record?.alarmNum !== 0) {
            let messageText = record?.message.substring(0, 6)
            if (record?.alarmNum === 1) {
                return <div>
                    <Tag color={"red"}>异常</Tag><Tooltip title={record?.message}>({messageText})</Tooltip>
                </div>
            }

            if (record?.alarmNum > 1) {
                return <div>
                    <Tag color={"red"}>异常</Tag><Tooltip title={record?.message}>({messageText}...)</Tooltip>
                </div>
            }
        }

        if (record?.usability === 1) {
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

        sessionStorage.setItem("menuKey", "alarm")
        props.history.push(`/alarm`);
    }

    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            width: "14%",
            ellipsis: true,

            render: (text, record) => <div style={{cursor: "pointer"}} onClick={() => host(record)}>{text}</div>,
        },
        {
            title: 'IP',
            dataIndex: 'ip',
            key: 'ip',
            width: "14%",
            ellipsis: true,
        },
        {
            title: '端口',
            dataIndex: 'port',
            key: 'port',
            width: "14%",
            ellipsis: true
        },
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            width: "14%",
            ellipsis: true,
            render: (type) => <div>
                {
                    type === 1 ? <Tag color={"blue"}>交换机</Tag> : <Tag color={"blue"}>路由器</Tag>
                }
            </div>
        },
        {
            title: '网络状态',
            dataIndex: 'usability',
            key: 'usability',
            width: "14%",
            ellipsis: true,
            render: (usability, record) => <div onClick={() => host(record)}>{converType(record)}</div>,
        },
        {
            title: '未解决告警数量',
            dataIndex: 'alarmNum',
            key: 'alarmNum',
            width: "14%",
            ellipsis: true,
            render: (text, record) => <div style={{cursor: "pointer"}}
                                           onClick={() => hrefAlarmPage(record)}>{conversionColor(text)}</div>
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            width: "14%",
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
                           deleteMethod={deleteInternet}
                           size={18}
                           type={"internet"}
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
                            网络设备
                        </div>
                        <div className="box-configuration-title-right" onClick={() => hrefAddHost()}>
                            新建网络设备
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
                                         placeholder={"网络设备名称"}
                                         onChange={(event) => searchName(event)}
                                         onPressEnter={onSearch}
                            />
                           {/* <Input
                                placeholder="网络设备名称"
                                className="box-configuration-body-search"
                                onPressEnter={(event) => searchName(event)}
                                allowClear={true}
                                prefix={<SearchOutlined/>}
                            />*/}
                        </div>
                    </div>
                    <div className="box-configuration-body-list">
                        <Table
                            rowKey={record => record.id}
                            columns={columns}
                            className="custom-table"
                            dataSource={internetList}
                            scroll={{
                                x: 300,
                            }}
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
                <InternetCompilePop visible={visible}
                                    setVisible={setVisible}
                                    internet={internet}
                                    setInternet={setInternet}

                />
            </Col>
        </Row>
    )
}

export default withRouter(observer(Internet));

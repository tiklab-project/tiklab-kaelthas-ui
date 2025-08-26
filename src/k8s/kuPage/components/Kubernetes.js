import React, {useEffect, useState} from 'react';
import {Col, Input, Row, Table, Tag, Tooltip} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import "./Kubernetes.scss"
import kubernetesStore from "../store/KubernetesStore";
import {observer} from "mobx-react";
import SearchInput from "../../../common/input/SearchInput";
import Page from "../../../common/page/Page";
import Dropdowns from "../../../common/Dropdown/Dropdowns";
import KuCompilePop from "../../common/KuCompilePop";

const availabilityTab = [
    {title: '全部', key: 2, icon: "allHost"},
    {title: '可用', key: 1, icon: "availableHost"},
    {title: '不可用', key: 0, icon: "noAvailableHost"}];
const Kubernetes = (props) => {

    const {refresh,findKbInfoPage, deleteKuInfo} = kubernetesStore;


    const [kubTab, setKubTab] = useState(2);

    //搜索主机的名字
    const [kubName,setKubName]=useState(null)
    //主机list
    const [kubList,setKubList]=useState([])
    const [currentPage,setCurrentPage]=useState(1)
    const [totalPage,setTotalPage]=useState()
    const [totalRecord,setTotalRecord]=useState()
    const [pageSize]=useState(15)

    const [kubData,setKubData] = useState(null)
    const [visible,setVisible] = useState(false)


    useEffect(async () => {

        findKubPage(currentPage,kubTab,kubName)
    }, [refresh]);


    //分页查询K8s
    const findKubPage = (currentPage,usability,name) => {
        let state;
        if (usability!==2){
            state=usability
        }
        findKbInfoPage({pageParam:{currentPage:currentPage, pageSize:pageSize},
            name:name,
            usability:state}).then(res=>{
                setKubList(res.data.dataList)
                setTotalPage(res.data.totalPage)
                setCurrentPage(res.data.currentPage)
                setTotalRecord(res.data.totalRecord)
        })
    }

    //切换tab
    const checkTab = async (value) => {
        setKubTab(value)
        findKubPage(1,value,kubName)
    };

    //K8s名字查询
    const searchKubernetesName = (e) => {
        const name = e.target.value;
        setKubName(name)
        if (name===''){
            setCurrentPage(1)
            findKubPage(1,kubTab)
        }
    }
    const onSearch = () => {
        setCurrentPage(1)
        findKubPage(1,kubTab,kubName)
    }

    //分页查询
    const changePage = async (value) => {
        setCurrentPage(value)
        findKubPage(value,kubTab,kubName)
    };

    //刷新
    const refreshFind = () => {
        findKubPage(currentPage,kubTab,kubName)
    }

    //打开更新的弹窗
    const openUpdate = (value) => {
        setVisible(true)
        setKubData(value)
    }

    //打开创建的弹窗
    function createKubernetes() {
        setVisible(true)
    }

    async function hrefDatabases(record) {
        const now = new Date();
        record.updateTime = now.toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }).replace(/\//g, '-');

        props.history.push(`/kubernetes/${record.id}/kuOverview`);
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
            title: 'IP',
            dataIndex: 'ip',
            key: 'ip',
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (usability, record) => <div style={{cursor: "pointer"}}>{converType(record)}</div>,
        },
        {
            title: '未解决告警数量',
            dataIndex: 'alarmNum',
            ellipsis: true,
            key: 'alarmNum',
            render: (alarmNum) => <div style={{cursor: "pointer"}}>{conversionColor(alarmNum)}</div>
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
        }, {
            title:'操作',
            dataIndex: 'action',
            width:'5%',
            key: 'action',
            render:(text,record)=>(
                <Dropdowns {...props}
                           goPage={openUpdate}
                           value={record}
                           deleteMethod={deleteKuInfo}
                           size={18}
                           type={"kubernetes"}
                />
            )
        }


    ];

    function conversionColor(text) {
        if (text === 0 || text === null) {
            return <Tag color={"blue"}>{0}</Tag>
        } else {
            return <Tag color={"red"}>{text}</Tag>
        }
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
                    <Tag color={"red"}>异常</Tag><Tooltip>({messageText})</Tooltip>
                </div>
            }

            if (record?.alarmNum > 1) {
                return <div>
                    <Tag color={"red"}>异常</Tag><span>({messageText}...)</span>
                </div>
            }
        }

        if (record?.status === 1) {
            return <Tag color={"blue"}>正常</Tag>
        }

    }



    return (
        <Row className="kb-row">
            <Col sm={24} md={24} lg={{span: 24}} xl={{span: "22", offset: "1"}} xxl={{span: "18", offset: "3"}}>

                <div className="kb-body">
                    <div className="kb-title">
                        <div className="kb-title-text">Kubernetes</div>
                        <div className="kb-title-add-button" onClick={() => createKubernetes()}>新建Kubernetes</div>
                    </div>
                    <div className="kb-type-search">
                        <div className="kb-type">
                            {
                                availabilityTab.map(item => {
                                    return <div
                                        className={`ku-tabs-item ${kubTab === item.key ? "ku-tabs-button" : ""}`}
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
                                         placeholder={"Kubernetes名称"}
                                         onChange={(event) => searchKubernetesName(event)}
                                        onPressEnter={onSearch}
                            />
                        {/*    <Input
                                placeholder="Kubernetes名称"
                                className="kb-search"
                                onPressEnter={(event) => searchKubernetesName(event)}
                                allowClear={true}
                                prefix={<SearchOutlined/>}
                            />*/}
                        </div>
                    </div>
                    <div className="kb-table">
                        <Table
                            rowKey={record => record.id}
                            columns={columns}
                            className="custom-table"
                            dataSource={kubList}
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
                <KuCompilePop  visible={visible}
                               setVisible={setVisible}
                               kubData={kubData}
                               setKubData={setKubData}
                />
            </Col>
        </Row>
    );
};

export default observer(Kubernetes);

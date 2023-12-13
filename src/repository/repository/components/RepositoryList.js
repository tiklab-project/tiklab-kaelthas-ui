import React, { useEffect, useState, Fragment } from "react";
import { Table, Space, Row, Col, Empty } from 'antd';
import { observer, inject } from "mobx-react";
import { withRouter } from "react-router-dom";
import { getUser } from "thoughtware-core-ui";
import Breadcumb from "../../../common/breadcrumb/breadcrumb";
import InputSearch from "../../../common/input/inputSearch";
import Button from "../../../common/button/button";
import "./RepositoryList.scss";
import { useHistory } from 'react-router-dom';
import RepositoryStore from "../store/RepositoryStore";
import setImageUrl from "../../../common/utils/setImageUrl";
import { useDebounce } from "../../../common/utils/debounce";
const RepositoryList = (props) => {
    const { findRepositoryList, createRecent,
        repositorylist, findRecentRepositoryList, createRepositoryFocus,
        findFocusRepositoryList, deleteRepositoryFocusByCondition, activeTabs, setActiveTabs } = RepositoryStore;
    const userId = getUser().userId;
    const tenant = getUser().tenant;
    const [focusRepositoryList, setFocusRepositoryList] = useState([])
    const [recentRepositoryDocumentList, setRecentRepositoryDocumentList] = useState([]);

    const repositoryTab = [
        {
            title: '所有知识库',
            key: '1',
            icon: "project"
        },
        // {
        //     title: '我最近浏览的',
        //     key: '2',
        //     icon: "programrencent"
        // },
        {
            title: '我收藏的',
            key: '3',
            icon: "programconcern"
        },
        {
            title: '我创建的',
            key: '4',
            icon: "programbuild"
        }
    ]
    const history = useHistory()
    useEffect(() => {
        selectTabs(activeTabs)
        findFocusRepository()
        const recentRepositoryParams = {
            masterId: userId,
            model: "repository",
            orderParams: [{
                name: "recentTime",
                orderType: "desc"
            }]
        }
        findRecentRepositoryList(recentRepositoryParams).then(res => {
            if (res.code === 0) {
                setRecentRepositoryDocumentList(res.data)
            }

        })

        return
    }, [])

    const findFocusRepository = (id) => {
        findFocusRepositoryList({ masterId: id }).then(res => {
            if (res.code === 0) {
                const focusList = res.data;
                focusList.map(item => {
                    focusRepositoryList.push(item.id)
                })
                setFocusRepositoryList(focusRepositoryList)
            }
        })
    }
    const columns = [
        {
            title: "知识库名称",
            dataIndex: "name",
            key: "name",
            align: "left",
            render: (text, record) => <div onClick={() => goRepositorydetail(record)} className="repository-title">
                <img
                    src={setImageUrl(record.iconUrl)}
                    alt=""
                    className="list-img"
                />
                <div className="repository-info">
                    <div className="repository-name">{text}</div>
                    <div className="repository-master">{record.master.nickname}</div>
                </div>

            </div>,
        },
       
        {
            title: "创建时间",
            dataIndex: "createTime",
            key: "createTime",
            align: "left",
            width: "20%"
        },
        {
            title: "操作",
            dataIndex: "action",
            key: "action",
            align: "left",
            width: "15%",
            render: (text, record) => (
                <Space size="middle">
                    {
                        focusRepositoryList.indexOf(record.id) !== -1 ?
                            <svg className="svg-icon" aria-hidden="true" onClick={() => deleteFocusRepository(record.id)}>
                                <use xlinkHref="#icon-focus"></use>
                            </svg>
                            :
                            <svg className="svg-icon" aria-hidden="true" onClick={() => addFocusRepository(record.id)}>
                                <use xlinkHref="#icon-nofocus"></use>
                            </svg>
                    }
                </Space>
            ),
        },
    ]

    const goRepositorydetail = (repository) => {
        const params = {
            name: repository.name,
            model: "repository",
            modelId: repository.id,
            master: { id: userId },
            wikiRepository: { id: repository.id }
        }
        createRecent(params)

        props.history.push({ pathname: `/repositorydetail/${repository.id}/survey` })
    }

    const handleTableChange = (pagination) => {
        findRepositoryList({ current: pagination.current })
    }

    const onSearch = useDebounce(value => {
        console.log(value)
        switch (activeTabs) {
            case "1":
                findRepositoryList({ name: value })
                break;
            case "2":
                findRecentRepositoryList({ master: userId, name: value })
                break;
            case "3":
                findFocusRepositoryList({ masterId: userId, name: value })
                break;
            case "4":
                findRepositoryList({ masterId: userId, name: value });
                break
            default:
                break;
        }
    }, [500]);

    const selectTabs = (key) => {
        setActiveTabs(key)
        switch (key) {
            case "1":
                findRepositoryList({})
                break;
            case "2":
                findRecentRepositoryList({ master: userId })
                break;
            case "3":
                findFocusRepositoryList({ masterId: userId })
                break;
            case "4":
                findRepositoryList({ masterId: userId });
                break
            default:
                break;
        }
    }

    const addFocusRepository = (id) => {
        createRepositoryFocus({ repositoryId: id }).then(res => {
            if (res.code === 0) {
                focusRepositoryList.push(id)
                setFocusRepositoryList([...focusRepositoryList])
            }
        })
    }

    const deleteFocusRepository = (id) => {
        const params = {
            masterId: userId,
            repositoryId: id
        }
        deleteRepositoryFocusByCondition(params).then(res => {
            if (res.code === 0) {
                const index = focusRepositoryList.indexOf(id);
                if (index > -1) {
                    focusRepositoryList.splice(index, 1);
                }
                setFocusRepositoryList([...focusRepositoryList])
            }
        })
    }

    const goRepositoryAdd = () => {
        history.push("/repositoryAdd")
    }
    // const goRepositoryDetail = repository => {
    //     props.history.push(`/repositorydetail/${repository.id}/survey`)
    // }

    return (
        <Row className="repository-row">
            <Col xl={{ span: 18, offset: 3 }} lg={{ span: 18, offset: 3 }} md={{ span: 20, offset: 2 }}>
                <div className="repository">
                    <Breadcumb
                        firstText="知识库"
                    >
                        <Button type="primary" onClick={() => goRepositoryAdd()} buttonText={"添加知识库"} >
                        </Button>
                    </Breadcumb>
                    <div className="recent-repository">
                        <div className="repository-title">常用知识库</div>

                        {
                            recentRepositoryDocumentList.length > 0 ?
                                <div className="repository-box">{
                                    recentRepositoryDocumentList.map(item => {
                                        return <Fragment>
                                            <div className="repository-item" key={item.id} onClick={() => goRepositorydetail(item)} >
                                                <div className="item-title">
                                                    {
                                                        item.iconUrl ?
                                                            <img
                                                                src={version === "cloud" ? (upload_url + item.iconUrl + "?tenant=" + tenant) : (upload_url + item.iconUrl)}

                                                                alt=""
                                                                className="list-img"
                                                            />
                                                            :
                                                            <img
                                                                src={('images/repository1.png')}
                                                                alt=""
                                                                className="list-img"
                                                            />
                                                    }
                                                    <span>{item.name}</span>
                                                </div>
                                                <div className="item-work">
                                                    <div className="process-work"><span style={{ color: "#999" }}>文档</span><span>{item.documentNum}篇</span></div>
                                                    <div className="end-work"><span style={{ color: "#999" }}>目录</span><span>{item.categoryNum}个</span></div>
                                                </div>
                                            </div>

                                        </Fragment>
                                    })
                                }
                                </div>

                                :

                                <Empty image="/images/nodata.png" description="暂时没有查看过知识库~" />
                        }

                    </div>
                    <div className="repository-tabs-search">
                        <div className="repository-filter">
                            <div className="repository-tabs">
                                {
                                    repositoryTab.map(item => {
                                        return <div
                                            className={`repository-tab ${activeTabs === item.key ? "active-tabs" : ""}`}
                                            key={item.key}
                                            onClick={() => selectTabs(item.key)}
                                        >
                                            {item.title}
                                        </div>
                                    })
                                }
                            </div>
                            <InputSearch onChange={(value) => onSearch(value)} placeholder={"知识库名称"} />
                        </div>
                    </div>
                    <div className="table-box">
                        <Table
                            columns={columns}
                            dataSource={repositorylist}
                            rowKey={record => record.id}
                            onChange={handleTableChange}
                            pagination={false}
                        />
                    </div>
                </div>
            </Col>
        </Row >

    )
}
export default withRouter(observer(RepositoryList));
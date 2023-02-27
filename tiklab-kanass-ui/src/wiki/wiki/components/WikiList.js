import React, { Fragment, useEffect, useState } from "react";
import { Breadcrumb, Input, Table, Space, Button, Divider, Row, Col } from 'antd';
import WikiAddmodal from "./WikiAdd";
import { observer, inject } from "mobx-react";
import { Link, withRouter } from "react-router-dom";
import { getUser } from "tiklab-core-ui";
import Breadcumb from "../../../common/breadcrumb/breadcrumb";
import InputSearch from "../../../common/input/inputSearch";
import "./wiki.scss"
const { Search } = Input;
const Wikicontent = (props) => {
    const { wikiStore } = props;
    const { findRepositoryList, addWikilist, searchwiki, createDocumentRecent,
        wikilist, delewikiList, updateWiki, findRecentRepositoryList, createRepositoryFocus,
        findRepositoryFocusList, deleteRepositoryFocusByCondition } = wikiStore;
    const userId = getUser().userId;
    const [activeTabs, setActiveTabs] = useState("2");
    const [focusRepositoryList, setFocusRepositoryList] = useState([])
    const wiliTab = [
        {
            title: '所有知识库',
            key: '1',
            icon: "project"
        },
        {
            title: '我最近浏览的',
            key: '2',
            icon: "programrencent"
        },
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

    useEffect(() => {
        findRecentRepositoryList({ model: "wiki" })
        findRepositoryFocusList({}).then(data => {
            if (data.code === 0) {
                let ids = []
                data.data.map(item => {
                    ids.push(item.id)
                })
                setFocusRepositoryList(ids)
            }
        })
    }, [])

    const columns = [
        {
            title: "知识库名称",
            dataIndex: "name",
            key: "name",
            align: "left",
            render: (text, record) => <div onClick={() => goWikidetail(record)} className="wiki-title">
                {
                    record.iconUrl ?
                        <img
                            src={('/images/' + record.iconUrl)}
                            alt=""
                            className="img-icon"
                        />
                        :
                        <img
                            src={('images/repository1.png')}
                            alt=""
                            className="img-icon"
                        />
                }
                <span className="wiki-name">{text}</span>
            </div>,
        },
        // {
        //     title: "知识库编码",
        //     dataIndex: "id",
        //     key: "id",
        //     align: "left",

        // },
        {
            title: "负责人",
            dataIndex: ["master", "name"],
            key: "master",
            align: "left",
            width: "20%",
        },
        {
            title: "创建时间",
            dataIndex: "createTime",
            key: "createTime",
            align: "left",
            width: "20%"
        },
        // {
        //     title: "知识库状态",
        //     dataIndex: "wikiState",
        //     key: "wikiState",
        //     align: "center",
        //     render: (text) =>(()=>{
        //                 switch(text){
        //                     case "1": 
        //                         return <span>未开始</span>
        //                     case "2": 
        //                         return <span>已开始</span>
        //                     case "3": 
        //                         return <span>已结束</span>
        //                     }
        //             })()
        // },
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
                    <span className="span-botton  delete" onClick={() => delewikiList(record.id)}>
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-delete"></use>
                        </svg>
                    </span>
                </Space>
            ),
        },
    ]

    const goWikidetail = (wiki) => {
        const params = {
            name: wiki.name,
            model: "wiki",
            modelId: wiki.id,
            master: { id: userId },
            repository: { id: wiki.id }
        }
        createDocumentRecent(params)

        // wikiDetailStore.setWikiId(id)
        props.history.push({ pathname: `/index/wikidetail/${wiki.id}/survey` })
    }

    const handleTableChange = (pagination) => {
        findRepositoryList({ current: pagination.current })
    }

    const onSearch = value => {
        console.log(value)
        // switch (activeTabs) {
        //     case "1":
        //         findJoinProjectList({ projectName: value, creator: null })
        //         break;
        //     case "2":
        //         findRecentProjectPage({ projectName: value })
        //         break;
        //     case "3":
        //         findProjectList({ master: userId, projectName: value })
        //         break;
        //     case "4":
        //         findJoinProjectList({ creator: userId, projectName: value });
        //         break
        //     default:
        //         break;
        // }
    };

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
                findRepositoryFocusList({ masterId: userId })
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

    return (
        <div className="wiki">
            <Row>
                <Col xl={{ span: 18, offset: 3 }} lg={{ span: 18, offset: 3 }} md={{ span: 20, offset: 2 }}>
                    <Breadcumb
                        firstText="知识库"
                    >
                        <WikiAddmodal
                            name="添加知识库"
                            type="add"
                            selectTabs = {selectTabs}
                        />
                    </Breadcumb>

                    <div className="wiki-tabs-search">
                        <div className="wiki-filter">
                            <div className="wiki-tabs">
                                {
                                    wiliTab.map(item => {
                                        return <div
                                            className={`wiki-tab ${activeTabs === item.key ? "active-tabs" : ""}`}
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
                            dataSource={wikilist}
                            rowKey={record => record.id}
                            onChange={handleTableChange}
                            pagination = {false}
                        />
                    </div>
                </Col>
            </Row>
        </div>
    )
}
export default withRouter(inject('wikiStore')(observer(Wikicontent)));
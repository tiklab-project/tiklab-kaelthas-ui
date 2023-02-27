import React, { useState, useEffect, Fragment } from "react";
import { Row, Col, Tabs, Form, Dropdown, Menu, Empty } from 'antd';
import { withRouter } from "react-router";
import { inject, observer } from "mobx-react";
import Button from "../../../common/button/button";
import AddLog from "../../common/components/LogAdd"

import "../components/survey.scss";
import { getUser } from "tiklab-core-ui";

const Survey = (props) => {
    const { surveyStore, WikiCatalogueStore, homeStore } = props;

    const { findDocumentRecentList } = homeStore;

    const { findRepository, findLogpage, opLogList } = surveyStore;

    const { findDmPrjRolePage, setWikiCatalogueList, createDocumentRecent, addWikiCataDocument } = WikiCatalogueStore;

    const [repositoryInfo, setRepositoryInfo] = useState();
    const wikiId = props.match.params.wikiId
    const [form] = Form.useForm();
    const [modalTitle, setModalTitle] = useState()
    const [contentValue, setContentValue] = useState()
    const [selectKey, setSelectKey] = useState();
    const [recentViewDocumentList, setRecentViewDocumentList] = useState([]);

    const userId = getUser().id

    useEffect(() => {
        findLogpage({ userId: userId, repositoryId: wikiId })

        findRepository({ id: wikiId }).then(res => {
            if (res.code === 0) {
                setRepositoryInfo(res.data)
            }
        })

        // findWikiCatalogue(wikiId).then((data) => {
        //     setWikiCatalogueList(data)
        // })

        const recentParams = {
            masterId: userId,
            models: ["document", "mindMap"],
            repositoryId: wikiId,
            orderParams: [{
                name: "recentTime",
                orderType: "asc"
            }]
        }
        findDocumentRecentList(recentParams).then(res => {
            if (res.code === 0) {
                setRecentViewDocumentList([...res.data])
            }

        })

    }, [])

    const addMenu = (id) => {
        return <Menu onClick={(value) => selectAddType(value, id)}>
            <Menu.Item key="category">
                添加目录
            </Menu.Item>
            <Menu.Item key="document">
                添加页面
            </Menu.Item>
            {/* <Menu.Item key="mindMap">
                添加脑图
            </Menu.Item> */}
        </Menu>
    };

    const [catalogueId, setCatalogueId] = useState()
    const [userList, setUserList] = useState()
    const [addModalVisible, setAddModalVisible] = useState()
    const selectAddType = (value, id) => {
        setCatalogueId(id)
        findDmPrjRolePage(wikiId).then(data => {
            setUserList(data.dataList)
        })
        if (value.key === "document") {
            const data = {
                name: "未命名文档",
                repository: { id: wikiId },
                master: { id: userId },
                typeId: "document",
                formatType: "document",
                category: {id:id},
            }
            console.log(id)
            addWikiCataDocument(data).then((data) => {
                if (data.code === 0) {
                    findWikiCatalogue(wikiId).then((data) => {
                        setWikiCatalogueList(data)
                    })

                    props.history.push(`/index/wikidetail/${wikiId}/doc/${data.data}`)
                    // 左侧导航
                    setSelectKey(data.data)
                }

            })
        } 
        // else if (value.key === "mindMap") {
        //     setContentValue({ nodes: [], edges: [] })
        //     setAddModalVisible(true)
        //     setModalTitle("添加脑图")
        // } 
        else if (value.key === "category") {
            setAddModalVisible(true)
            setModalTitle("添加目录")
        }
        // 
        form.setFieldsValue({
            formatType: value.key
        })
    }

    const [expandedTree, setExpandedTree] = useState([])
    // 树的展开与闭合
    const isExpandedTree = (key) => {
        return expandedTree.some(item => item === key)
    }
    const setOpenOrClose = key => {
        if (isExpandedTree(key)) {
            setExpandedTree(expandedTree.filter(item => item !== key))
        } else {
            setExpandedTree(expandedTree.concat(key));
        }
    }

    const selectKeyFun = (item) => {
        console.log(item)
        const params = {
            name: item.name,
            model: item.typeId,
            modelId: item.id,
            master: { id: userId },
            repository: { id: wikiId }
        }
        createDocumentRecent(params)
        setSelectKey(item.id)
        if (item.formatType === "category") {
            localStorage.setItem("categoryId", item.id);
            props.history.push(`/index/wikidetail/folder/${item.id}`)
        }
        if (item.typeId === "document") {
            localStorage.setItem("documentId", item.id);
            props.history.push(`/index/wikidetail/doc/${item.id}`)
        }
        if (item.typeId === "mindMap") {
            localStorage.setItem("documentId", item.id);
            props.history.push(`/index/wikidetail/mindmap/${item.id}`)

        }
    }

    const logTree = (item, levels, faid) => {
        let newLevels = 0;
        return <div className={`${!isExpandedTree(faid) ? "" : 'wiki-menu-submenu-hidden'}`}
            key={item.id}
        >
            <div className={`wiki-menu-submenu ${item.id === selectKey ? "wiki-menu-select" : ""} `}
                key={item.id}
                style={{ paddingLeft: levels * 10 }}
            >
                {
                    (item.children && item.children.length > 0) || (item.documents && item.documents.length > 0) ?
                        isExpandedTree(item.id) ? <svg className="open-icon" aria-hidden="true" onClick={() => setOpenOrClose(item.id)}>
                            <use xlinkHref="#icon-rightline" ></use>
                        </svg> :
                            <svg className="open-icon" aria-hidden="true" onClick={() => setOpenOrClose(item.id)}>
                                <use xlinkHref="#icon-downline" ></use>
                            </svg> : <svg className="img-icon" aria-hidden="true">
                            <use xlinkHref="#icon-circle"></use>
                        </svg>
                }
                <svg className="img-icon" aria-hidden="true">
                    <use xlinkHref="#icon-folder"></use>
                </svg>
                <span
                    onClick={() => selectKeyFun(item)}
                >{item.name} </span>
                <div className="category-line"></div>
                <span>{item.updateTime}</span>
            </div>
            {
                item.children && item.children.length > 0 && (newLevels = levels + 1) &&
                item.children.map(childItem => {
                    return logTree(childItem, newLevels, item.id)

                })

            }
            {
                item.documents && item.documents.length > 0 && (newLevels = levels + 1) &&
                item.documents.map(childItem => {
                    return fileTree(childItem, newLevels, item.id)
                })
            }
        </div>
    }
    const fileTree = (item, levels, faid) => {
        return <div className={`${!isExpandedTree(faid) ? null : 'wiki-menu-submenu-hidden'}`}
            key={item.id}
        >
            <div className={`wiki-menu-submenu ${item.id === selectKey ? "wiki-menu-select" : ""} `}
                key={item.id}
                style={{ paddingLeft: levels * 10 }}
            >
                <svg className="img-icon" aria-hidden="true">
                    <use xlinkHref="#icon-circle"></use>
                </svg>
                {
                    item.typeId === "document" && <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-file"></use>
                    </svg>
                }
                {
                    item.typeId === "mindMap" && <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-minmap"></use>
                    </svg>
                }
                <span onClick={() => selectKeyFun(item)}>{item.name} </span>
                <div className="category-line"></div>
                <span>{item.updateTime}</span>
            </div>
        </div>
    }

    const goDocumentDetail = item => {
        if (item.model === "document") {
            localStorage.setItem("documentId", item.modelId);
            props.history.push(`/index/wikidetail/${item.repository.id}/doc/${item.modelId}`)
        }
        if (item.model === "mindMap") {
            localStorage.setItem("documentId", item.modelId);
            props.history.push(`/index/wikidetail/${item.repository.id}/mindmap/${item.modelId}`)
        }

    }

    return (
        <div className="repository-survey">
            <Row >
                <Col xl={{ span: 18, offset: 3 }} lg={{ span: 18, offset: 3 }} md={{ span: 20, offset: 2 }} className="repository-col">
                    <div>
                        {
                            repositoryInfo && <Fragment>
                                <div className="wiki-top">

                                    <div className="top-left">
                                        <svg className="top-icon" aria-hidden="true">
                                            <use xlinkHref="#icon-zhishi"></use>
                                        </svg>
                                        <div className="top-name">
                                            <div className="name">{repositoryInfo?.name}</div>
                                            <div className="desc">{repositoryInfo.desc ? repositoryInfo.desc : "暂无介绍"}</div>
                                            {/* <div className="master"></div> */}
                                        </div>

                                    </div>

                                    <div className="top-right">
                                        <Dropdown overlay={() => addMenu(null)} placement="bottomLeft">
                                            <div className="top-add-botton">添加</div>
                                            {/* <div>sdsd</div>  */}
                                        </Dropdown>
                                        <Button>分享</Button>
                                    </div>
                                </div>
                            </Fragment>
                        }

                        <div className="home-document">
                            <div className="document-box-title">
                                <span className="name">最近查看的文档</span>
                            </div>
                            <div>
                                {
                                    recentViewDocumentList && recentViewDocumentList.map((item) => {
                                        return <div className="document-list-item" key={item.id} onClick={() => goDocumentDetail(item)}>
                                            <div className='document-name' style={{ flex: 1 }}>
                                                <svg className="document-icon" aria-hidden="true">
                                                    <use xlinkHref="#icon-paihang"></use>
                                                </svg>
                                                <span>{item.name}</span>
                                            </div>

                                            <div style={{ flex: 1 }}>{item.repository.name}</div>
                                            <div style={{ flex: 1 }}>{item.master.name}</div>
                                            <div style={{ flex: 1 }}>{item.updateTime}</div>
                                            <div style={{ flex: 1 }}>
                                                <svg className="icon" aria-hidden="true">
                                                    <use xlinkHref="#icon-point"></use>
                                                </svg>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                        <div className="home-dynamic">
                            <div className="dynamic-box-title">
                                <span className="name">相关动态</span>
                                <div className="more" onClick={() => { props.history.push(`/index/wikidetail/${wikiId}/dynamicList`) }}>
                                    <svg aria-hidden="true" className="svg-icon">
                                        <use xlinkHref="#icon-rightjump"></use>
                                    </svg>
                                </div>
                            </div>
                            <div className="dynamic-list">
                                {
                                    opLogList.length > 0 ? opLogList.map(item => {
                                        return <div
                                            dangerouslySetInnerHTML={{ __html: item.data }}
                                            className="dynamic-item"
                                            key={item.id}
                                            onClick={() => goOpLogDetail(item.link)}
                                        />
                                    })
                                        :
                                        <Empty image="/images/nodata.png" description="暂时没有动态~" />
                                }
                            </div>
                        </div>
                    </div>

                    <AddLog
                        setAddModalVisible={setAddModalVisible}
                        addModalVisible={addModalVisible}
                        setWikiCatalogueList={setWikiCatalogueList}
                        form={form}
                        catalogueId={catalogueId}
                        contentValue={contentValue}
                        setSelectKey={setSelectKey}
                        userList={userList}
                        modalTitle={modalTitle}
                        {...props}
                    />
                    {/* <TemplateList changeTemplateVisible={changeTemplateVisible}
                        setChangeTemplateVisible={setChangeTemplateVisible}
                        templateId={templateId}
                        setTemplateId={setTemplateId}
                        setAddModalVisible={setAddModalVisible}
                        contentValue={contentValue}
                        setContentValue={setContentValue}

                    /> */}

                </Col>
            </Row>
        </div>
    )
}

export default withRouter(inject("surveyStore", "WikiCatalogueStore", "homeStore")(observer(Survey)));
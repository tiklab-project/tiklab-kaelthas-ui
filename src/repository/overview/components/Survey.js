import React, { useState, useEffect, Fragment } from "react";
import { Row, Col, Tabs, Form, Dropdown, Menu, Empty } from 'antd';
import { withRouter } from "react-router";
import { inject, observer } from "mobx-react";
import Button from "../../../common/button/button";
import AddLog from "../../common/components/LogAdd";
import UserIcon from "../../../common/UserIcon/UserIcon";

const { TabPane } = Tabs;
import "./survey.scss";
import { getUser } from "tiklab-core-ui";

const Survey = (props) => {
    const { surveyStore, RepositoryCatalogueStore, homeStore } = props;

    const { findDocumentRecentList } = homeStore;

    const { findRepository, findLogpage, opLogList, findUserList } = surveyStore;

    const { findDmPrjRolePage, setRepositoryCatalogueList, createDocumentRecent, addRepositoryCataDocument } = RepositoryCatalogueStore;

    const [repositoryInfo, setRepositoryInfo] = useState();
    const repositoryId = props.match.params.repositoryId
    const [form] = Form.useForm();
    const [modalTitle, setModalTitle] = useState()
    const [contentValue, setContentValue] = useState()
    const [selectKey, setSelectKey] = useState();
    const [recentViewDocumentList, setRecentViewDocumentList] = useState([]);
    const [userList, setUserList] = useState();
    const userId = getUser().id

    useEffect(() => {
        findLogpage({ userId: userId, repositoryId: repositoryId })

        findRepository({ id: repositoryId }).then(res => {
            if (res.code === 0) {
                setRepositoryInfo(res.data)
            }
        })
        const recentParams = {
            masterId: userId,
            model: "category",
            repositoryId: repositoryId,
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

        findUserList({ domainId: repositoryId }).then(res => {
            // console.log(res)
            if (res.code === 0) {
                setUserList(res.data)
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
    const [addModalVisible, setAddModalVisible] = useState()
    const selectAddType = (value, id) => {
        setCatalogueId(id)
        // findDmPrjRolePage(repositoryId).then(data => {
        //     setUserList(data.dataList)
        // })
        if (value.key === "document") {
            const data = {
                name: "未命名文档",
                wikiRepository: { id: repositoryId },
                master: { id: userId },
                typeId: "document",
                formatType: "document",
                category: { id: id },
            }
            console.log(id)
            addRepositoryCataDocument(data).then((data) => {
                if (data.code === 0) {
                    findRepositoryCatalogue(repositoryId).then((data) => {
                        setRepositoryCatalogueList(data)
                    })

                    props.history.push(`/index/repositorydetail/${repositoryId}/doc/${data.data}`)
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
            repository: { id: repositoryId }
        }
        createDocumentRecent(params)
        setSelectKey(item.id)
        if (item.formatType === "category") {
            localStorage.setItem("categoryId", item.id);
            props.history.push(`/index/repositorydetail/folder/${item.id}`)
        }
        if (item.typeId === "document") {
            localStorage.setItem("documentId", item.id);
            props.history.push(`/index/repositorydetail/doc/${item.id}`)
        }
        if (item.typeId === "mindMap") {
            localStorage.setItem("documentId", item.id);
            props.history.push(`/index/repositorydetail/mindmap/${item.id}`)

        }
    }

    const logTree = (item, levels, faid) => {
        let newLevels = 0;
        return <div className={`${!isExpandedTree(faid) ? "" : 'repository-menu-submenu-hidden'}`}
            key={item.id}
        >
            <div className={`repository-menu-submenu ${item.id === selectKey ? "repository-menu-select" : ""} `}
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
        return <div className={`${!isExpandedTree(faid) ? null : 'repository-menu-submenu-hidden'}`}
            key={item.id}
        >
            <div className={`repository-menu-submenu ${item.id === selectKey ? "repository-menu-select" : ""} `}
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
            props.history.push(`/index/repositorydetail/${item.wikiRepository.id}/doc/${item.modelId}`)
        }
        if (item.model === "category") {
            props.history.push(`/index/repositorydetail/${item.wikiRepository.id}/folder/${item.modelId}`)
        }
    }

    /**
     * 跳转到日志详情
     * @param {地址} url 
     */
    const goOpLogDetail = (url) => {
        window.location.href = url
    }

    const changeTabs = (activeKey) => {
        const recentParams = {
            masterId: userId,
            model: activeKey,
            repositoryId: repositoryId,
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
    }

    return (
        <div className="repository-survey">
            <Row >
                <Col xl={{ span: 18, offset: 3 }} lg={{ span: 18, offset: 3 }} md={{ span: 20, offset: 2 }} className="repository-col">
                    <div>
                        {
                            repositoryInfo && <Fragment>
                                <div className="repository-top">

                                    <div className="top-left">
                                        <svg className="top-icon" aria-hidden="true">
                                            <use xlinkHref="#icon-zhishi"></use>
                                        </svg>

                                        <div className="top-name">
                                            <div className="name">{repositoryInfo?.name}</div>
                                            <div className="user">
                                                {
                                                    userList && userList.length > 0 && userList.map((item, index) => {
                                                        if (index < 5) {
                                                            return <div ><UserIcon size="big" name={item.user.nickname}></UserIcon></div>
                                                        }

                                                    })
                                                }
                                                <div className="user-more" onClick={() => props.history.push(`/index/repositorySet/${repositoryId}/user`)}>
                                                    <svg className="user-more-icon" aria-hidden="true">
                                                        <use xlinkHref="#icon-more"></use>
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="desc">
                                                <span>
                                                    目录 {repositoryInfo.categoryNum ? repositoryInfo.categoryNum : 0}
                                                </span>
                                                <span>
                                                    文档 {repositoryInfo.documentNum ? repositoryInfo.documentNum : 0}
                                                </span>

                                            </div>
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
                                <span className="name">最近查看</span>
                            </div>
                            <div>
                                {
                                    recentViewDocumentList && recentViewDocumentList.map((item) => {
                                        return <div className="document-list-item" key={item.id} onClick={() => goDocumentDetail(item)}>
                                            <div className='document-name' style={{ flex: 1 }}>
                                                <svg className="document-icon" aria-hidden="true">
                                                    <use xlinkHref="#icon-file"></use>
                                                </svg>
                                                <span>{item.name}</span>
                                            </div>

                                            <div style={{ flex: 1 }}>{item.wikiRepository.name}</div>
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
                                <div className="more" onClick={() => { props.history.push(`/index/repositorydetail/${repositoryId}/dynamicList`) }}>
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
                        setRepositoryCatalogueList={setRepositoryCatalogueList}
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

export default withRouter(inject("surveyStore", "RepositoryCatalogueStore", "homeStore")(observer(Survey)));
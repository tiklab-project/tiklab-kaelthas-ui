/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-31 09:03:31
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-12-22 14:04:36
 */
import React, { useState, useEffect, Fragment } from "react";
import { Dropdown, Form, Menu, Row, Col, Empty } from 'antd';
import "./categoryDetail.scss"
import { observer, inject, Provider } from "mobx-react";
import CategoryAdd from "../common/components/CategoryAdd"
import { getUser } from "tiklab-core-ui";
import CategoryStore from "../common/store/CategoryStore"
const CategoryDetail = (props) => {
    const store = {
        categoryStore: CategoryStore
    }
    const { detailRepositoryLog, findCategoryDocument, setRepositoryCatalogueList,
        createDocumentRecent, createDocument, expandedTree, setExpandedTree,
        findRepositoryCatalogue, findDmUserList } = CategoryStore
    const categoryId = props.match.params.id;
    const [logList, setLogList] = useState();
    const [logDetail, setLogDetail] = useState();
    // 当前知识库id
    const repositoryId = props.match.params.repositoryId;
    const userId = getUser().userId

    useEffect(() => {
        detailRepositoryLog({ id: categoryId }).then(data => {
            setLogDetail(data)
        })
        findCategoryDocument(categoryId).then(data => {
            setLogList(data.data)
        })
        return;
    }, [categoryId])

    const [addModalVisible, setAddModalVisible] = useState()
    // 添加按钮下拉菜单
    const addMenu = (id) => {
        return <Menu onClick={(value) => selectAddType(value, id)}>
            <Menu.Item key="category">
                <div className="content-add-menu">
                    <svg className="content-add-icon" aria-hidden="true">
                        <use xlinkHref="#icon-folder"></use>
                    </svg>
                    目录
                </div>

            </Menu.Item>
            <Menu.Item key="document">
                <div className="content-add-menu">
                    <svg className="content-add-icon" aria-hidden="true">
                        <use xlinkHref="#icon-file"></use>
                    </svg>
                    文档
                </div>

            </Menu.Item>
            <Menu.Item key="markdown">
                <div className="content-add-menu">
                    <svg className="content-add-icon" aria-hidden="true">
                        <use xlinkHref="#icon-minmap"></use>
                    </svg>
                    Markdown
                </div>
            </Menu.Item>
        </Menu>
    };

    /**
     * 添加目录
     */
    const [contentValue, setContentValue] = useState([
        {
            type: "paragraph",
            children: [{ text: "" }],
        },
    ])
    const [catalogueId, setCatalogueId] = useState()
    const [userList, setUserList] = useState()
    const [form] = Form.useForm();
    // 当前选中目录id
    const [selectKey, setSelectKey] = useState();

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

    const selectAddType = (value, id) => {
        setCatalogueId(id)

        if (value.key === "category") {
            setAddModalVisible(true)
            findDmUserList(repositoryId).then(data => {
                setUserList(data)
            })
        } else if (value.key === "document") {
            const data = {
                name: "未命名文档",
                wikiRepository: { id: repositoryId },
                master: { id: userId },
                typeId: "document",
                formatType: "document",
                wikiCategory: { id: id },
            }
            createDocument(data).then((data) => {
                if (data.code === 0) {
                    setOpenOrClose(id)
                    props.history.push(`/index/repositorydetail/${repositoryId}/doc/${data.data}`)
                    // 左侧导航
                    setSelectKey(data.data)
                    findRepositoryCatalogue(repositoryId).then((data) => {
                        setRepositoryCatalogueList(data)
                    })
                }
            })
        } else if (value.key === "markdown") {
            const data = {
                name: "未命名文档",
                wikiRepository: { id: repositoryId },
                master: { id: userId },
                typeId: "markdown",
                formatType: "document",
                wikiCategory: { id: id },
                details: JSON.stringify([
                    {
                        type: "code",
                        children: [
                            {
                                type: 'paragraph',
                                children: [
                                    {
                                        text: '',
                                    },
                                ],
                            },
                        ]
                    }
                ])
            }
            createDocument(data).then((data) => {
                if (data.code === 0) {
                    findRepositoryCatalogue(repositoryId).then((data) => {
                        setRepositoryCatalogueList(data)
                    })
                    if (!isExpandedTree(id)) {
                        setExpandedTree(expandedTree.concat(id));
                    }
                    props.history.push(`/index/repositorydetail/${repositoryId}/markdownEdit/${data.data}`)
                    // 左侧导航
                    setSelectKey(data.data)
                }
            })
        }
        form.setFieldsValue({
            formatType: value.key
        })
    }

    const goToDocument = (item) => {
        const params = {
            name: item.name,
            model: item.typeId,
            modelId: item.id,
            master: { id: userId },
            wikiRepository: { id: repositoryId }
        }
        createDocumentRecent(params)
        setSelectKey(item.id)
        if (item.formatType === "category") {
            localStorage.setItem("categoryId", item.id);
            props.history.push(`/index/repositorydetail/${repositoryId}/folder/${item.id}`)
        }
        if (item.typeId === "document") {
            props.history.push(`/index/repositorydetail/${repositoryId}/doc/${item.id}`)
        }
        if (item.typeId === "markdown") {
            props.history.push(`/index/repositorydetail/${repositoryId}/markdown/${item.id}`)

        }
    }

    return (<Provider {...store}>
        <div className="log-detail">
            <Row>
                <Col lg={{ span: "18", offset: "3" }} xxl={{ span: "18", offset: "3" }}>
                    <div>
                        {
                            logDetail && <Fragment>
                                <div className="log-title">

                                    <div className="title-left">
                                        <svg className="title-icon" aria-hidden="true">
                                            <use xlinkHref="#icon-folder"></use>
                                        </svg>
                                        <div className="title-name">
                                            <div className="name">{logDetail.name}</div>
                                            <div className="master">{logDetail.master.name}</div>
                                        </div>

                                    </div>
                                    <Dropdown overlay={() => addMenu(logDetail.id)} placement="bottomLeft">
                                        <div className="top-add-botton">添加内容</div>
                                    </Dropdown>
                                </div>
                            </Fragment>
                        }

                        <div className="log-child">
                            {
                                logList && logList.length > 0 ? logList.map(item => {
                                    return <div className="log-child-list" key={item.id} onClick={() => goToDocument(item)}>
                                        <div className="log-child-name" style={{ flex: 1 }}>
                                            {
                                                item.formatType && item.formatType === "category" &&
                                                <svg className="log-icon" aria-hidden="true">
                                                    <use xlinkHref="#icon-folder"></use>
                                                </svg>
                                            }
                                            {
                                                item.formatType && item.formatType === "document" && item.typeId === "markdown" &&
                                                <svg className="log-icon" aria-hidden="true">
                                                    <use xlinkHref="#icon-minmap"></use>
                                                </svg>
                                            }
                                            {
                                                item.formatType && item.formatType === "document" && item.typeId === "document" &&
                                                <svg className="log-icon" aria-hidden="true">
                                                    <use xlinkHref="#icon-file"></use>
                                                </svg>
                                            }

                                            <span>{item.name}</span>
                                        </div>
                                        <div style={{ flex: 1 }}>{item.master.nickname}</div>
                                        <div style={{ flex: 1 }}>{item.updateTime}</div>
                                    </div>
                                })
                                    :
                                    <Empty image="/images/nodata.png" description="暂时没有内容~" />
                            }
                        </div>

                    </div>
                </Col>
            </Row>
            <CategoryAdd
                setAddModalVisible={setAddModalVisible}
                addModalVisible={addModalVisible}
                setRepositoryCatalogueList={setRepositoryCatalogueList}
                form={form}
                catalogueId={catalogueId}
                contentValue={contentValue}
                setSelectKey={setSelectKey}
                userList={userList}
                modalTitle={"添加目录"}
                {...props}
            />
        </div>
    </Provider>

    )
}
export default observer(CategoryDetail);
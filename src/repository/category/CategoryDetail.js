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
import { observer, inject } from "mobx-react";
import AddLog from "../common/components/LogAdd"
import { getUser } from "tiklab-core-ui";
const LogDetail = (props) => {
    const { RepositoryCatalogueStore } = props;
    const { detailRepositoryLog, findCategoryDocument, findDmPrjRolePage, setRepositoryCatalogueList, 
        createDocumentRecent, addRepositoryCataDocument,  expandedTree, setExpandedTree, findRepositoryCatalogue } = RepositoryCatalogueStore
    const categoryId = props.match.params.id;
    const [logList, setLogList] = useState();
    const [logDetail, setLogDetail] = useState();
    // 当前知识库id
    const repositoryId = JSON.parse(localStorage.getItem("repository")).id;
    const userId = getUser().userId

    useEffect(() => {
        detailRepositoryLog({ id: categoryId }).then(data => {
            setLogDetail(data)
        })
        findCategoryDocument(categoryId).then(data => {
            setLogList(data.data)
        })
    }, [categoryId])

    const [addModalVisible, setAddModalVisible] = useState()
    // 添加按钮下拉菜单
    const addMenu = (id) => {
        return <Menu onClick={(value) => selectAddType(value, id)}>
            <Menu.Item key="category">
                添加目录
            </Menu.Item>
            <Menu.Item key="document">
                添加页面
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
        findDmPrjRolePage(repositoryId).then(data => {
            setUserList(data.dataList)
        })
        if (value.key === "category") {
            setAddModalVisible(true)
            
        } else {
            const data = {
                name: "未命名文档",
                wikiRepository: { id: repositoryId },
                master: { id: userId },
                typeId: "document",
                formatType: "document",
                category: { id: id },
            }
            addRepositoryCataDocument(data).then((data) => {
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
            localStorage.setItem("documentId", item.id);
            props.history.push(`/index/repositorydetail/${repositoryId}/doc/${item.id}`)
        }
        if (item.typeId === "mindMap") {
            localStorage.setItem("documentId", item.id);
            props.history.push(`/index/repositorydetail/${repositoryId}/mindmap/${item.id}`)

        }
    }

    return (
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
                                                item.formatType && item.formatType === "document" && item.typeId === "mindMap" &&
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
            <AddLog
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
            {/* <TemplateList
                changeTemplateVisible={changeTemplateVisible}
                setChangeTemplateVisible={setChangeTemplateVisible}
                templateId={templateId}
                setTemplateId={setTemplateId}
                setAddModalVisible={setAddModalVisible}
                contentValue={contentValue}
                setContentValue={setContentValue}

            /> */}
        </div>
    )
}
export default inject("RepositoryCatalogueStore")(observer(LogDetail));
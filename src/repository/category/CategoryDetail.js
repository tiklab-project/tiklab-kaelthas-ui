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
import { getUser } from "thoughtware-core-ui";
import CategoryStore from "../common/store/CategoryStore"
import { appendNodeInTree } from "../../common/utils/treeDataAction";
import AddDropDown from "../common/components/AddDropDown";
const CategoryDetail = (props) => {
    const store = {
        categoryStore: CategoryStore
    }
    const { findCategory, findCategoryDocument, setRepositoryCatalogueList,
        repositoryCatalogueList, createRecent, createDocument, expandedTree, setExpandedTree,
        findRepositoryCatalogue, findDmUserList } = CategoryStore
    const categoryId = props.match.params.id;
    const [logList, setLogList] = useState();
    const [logDetail, setLogDetail] = useState();
    // 当前知识库id
    const repositoryId = props.match.params.repositoryId;
    const userId = getUser().userId

    useEffect(() => {
        findCategory({ id: categoryId }).then(data => {
            if (data.code === 0) {
                setLogDetail(data.data)
            }

        })
        findCategoryDocument(categoryId).then(data => {
            setLogList(data.data)
        })
        return;
    }, [categoryId])

    const [addModalVisible, setAddModalVisible] = useState()
    // 添加按钮下拉菜单


    /**
     * 添加目录
     */
    const [contentValue, setContentValue] = useState([
        {
            type: "paragraph",
            children: [{ text: "" }],
        },
    ])
    const [catalogue, setCatalogue] = useState()
    const [userList, setUserList] = useState()
    const [form] = Form.useForm();
    // 当前选中目录id
    const [selectKey, setSelectKey] = useState();


    const goToDocument = (item) => {
        const params = {
            name: item.name,
            model: item.typeId,
            modelId: item.id,
            master: { id: userId },
            wikiRepository: { id: repositoryId }
        }
        createRecent(params)
        setSelectKey(item.id)
        if (item.formatType === "category") {
            localStorage.setItem("categoryId", item.id);
            props.history.push(`/repositorydetail/${repositoryId}/folder/${item.id}`)
        }
        if (item.typeId === "document") {
            props.history.push(`/repositorydetail/${repositoryId}/doc/${item.id}`)
        }
        if (item.typeId === "markdown") {
            props.history.push(`/repositorydetail/${repositoryId}/markdown/${item.id}`)

        }
    }

    return (<Provider {...store}>
        <Row className="log-detail">
            <Col lg={{ span: "18", offset: "3" }} xxl={{ span: "18", offset: "3" }}>
                <div className="log-detail-content">
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
                                <AddDropDown category={logDetail} isButton={true} />
                            </div>
                        </Fragment>
                    }

                    <div className="log-child">
                        {
                            logList && logList.length > 0 ? logList.map(item => {
                                return <div className="log-child-list" key={item.id} onClick={() => goToDocument(item)}>
                                    <div className="log-child-title" style={{ flex: 1 }}>
                                        {
                                            item.formatType && item.formatType === "category" &&
                                            <svg className="list-img" aria-hidden="true">
                                                <use xlinkHref="#icon-folder"></use>
                                            </svg>
                                        }
                                        {
                                            item.formatType && item.formatType === "document" && item.typeId === "markdown" &&
                                            <svg className="list-img" aria-hidden="true">
                                                <use xlinkHref="#icon-minmap"></use>
                                            </svg>
                                        }
                                        {
                                            item.formatType && item.formatType === "document" && item.typeId === "document" &&
                                            <svg className="list-img" aria-hidden="true">
                                                <use xlinkHref="#icon-file"></use>
                                            </svg>
                                        }
                                        <div className="log-child-info">
                                            <div className="log-child-name" title={item.name}>{item.name}</div>
                                            <div className="log-child-master" style={{ width: "100px" }}>{item.master.nickname}</div>
                                        </div>

                                    </div>

                                    <div >{item.updateTime}</div>
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
            catalogue={catalogue}
            contentValue={contentValue}
            setSelectKey={setSelectKey}
            userList={userList}
            modalTitle={"添加目录"}
            {...props}
        />
    </Provider>

    )
}
export default observer(CategoryDetail);
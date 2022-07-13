/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-07 09:34:01
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-08 18:01:28
 */
import React, { useState, useEffect, Fragment } from "react";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Breadcrumb, Input, Layout, Row, Col, Modal, Pagination, Button, Divider } from 'antd';
import { SafeArea } from "antd-mobile";
import TemplateAddmodal from "../components/templateAdd"
import "../components/template.scss"
import TemplatePreviewmodal from "../components/templatePreview"
import { observer, inject } from "mobx-react";
const { Search } = Input;
const { confirm } = Modal;
const Template = (props) => {
    const { templateStore } = props;
    const { findDocumentTemplatePage, deleteDocumentTemplate, templatePageParams } = templateStore;
    const [addModalVisible, setAddModalVisible] = useState(false)
    const [previewModalVisible, setPreviewModalVisible] = useState(false)
    const [editOrAdd, setEditOrAdd] = useState()
    const [modalName, setModalName] = useState()
    const [hoverId, setHoverId] = useState()
    const [templateList, setTemplateList] = useState()
    const [templateId, setTemplate] = useState()

    useEffect(() => {
        findDocumentTemplatePage().then(data => {
            if (data.code === 0) {
                setTemplateList(data.data.dataList)
            }
        })
    }, [])
    const addModal = () => {
        setAddModalVisible(true)
        setEditOrAdd("add")
        setModalName("添加模板")
    }

    const editModal = (id) => {
        // setAddModalVisible(true)
        // setEditOrAdd("edit")
        // setModalName("查看模板")
        props.history.push(`/templatePreview/${id}`)
        // setTemplate(id)
    }
    const previewModal = (id) => {
        props.history.push(`/templatePreview/${id}`)
    }

    // 删除模板
    const showDeleteConfirm = (name, id) => {
        confirm({
            title: `确定删除${name}?`,
            icon: <ExclamationCircleOutlined />,
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                deleteDocumentTemplate(id).then(data => {
                    findDocumentTemplatePage().then(data => {
                        if (data.code === 0) {
                            setTemplateList(data.data.dataList)
                        }
                    })
                })
            },
            onCancel() {

            },
        });
    }
    // 查找模板
    const onSearch = (value) => {
        findDocumentTemplatePage({ name: value }).then(data => {
            if (data.code === 0) {
                setTemplateList(data.data.dataList)
            }
        })
    }
    // 改变页码
    const changePage = (page) => {
        findDocumentTemplatePage({ current: page }).then(data => {
            if (data.code === 0) {
                setTemplateList(data.data.dataList)
            }
        })
    }
    return (
        <div className="wiki-template">
            <div style={{ background: '#ace0ff' }}>
                <SafeArea position='top' />
            </div>
            <div className="category-top">
                <div className="category-top-left">
                    <svg className="category-icon-logo" aria-hidden="true" onClick={() => props.history.goBack()}>
                        <use xlinkHref="#icon-left"></use>
                    </svg>
                    <div className="category-title">模板</div>
                </div>
                <div className="category-top-right">
                    <span style={{ color: "#5D70EA", fontSize: "14px" }} onClick={() =>  props.history.push("/templateAdd")}>添加</span>
                </div>
            </div>
            <div className="template-box" key="box">
                {
                    templateList && templateList.map((item) => {
                        return <div className="template-item"
                            // onMouseEnter={() => setHoverId(item.id)}
                            // onMouseLeave={() => setHoverId(null)}
                            key={item.id}
                            onClick={() => previewModal(item.id)}
                        >
                            <div>
                                <svg className="icon" aria-hidden="true">
                                    <use xlinkHref="#icon-template"></use>
                                </svg>

                                <div className="title" key="title">{item.name}</div>
                            </div>
                            {/* <div className={`item-shade ${item.id === hoverId ? "item-show" : "item-hidden"}`}>
                                <span onClick={() => previewModal(item.id)}>查看</span>
                                <span onClick={() => editModal(item.id)}>编辑</span>
                                <span onClick={() => showDeleteConfirm(item.name, item.id)}>删除</span>
                            </div> */}
                        </div>
                    })
                }
            </div>
            {/* <TemplateAddmodal
                modalName={modalName}
                editOrAdd={editOrAdd}
                addModalVisible={addModalVisible}
                setAddModalVisible={setAddModalVisible}
                setTemplateList={setTemplateList}
                templateId={templateId}
            /> */}
            {/* <TemplatePreviewmodal
                name="添加知识库"
                type="add"
                previewModalVisible={previewModalVisible}
                setPreviewModalVisible={setPreviewModalVisible}
                templateId={templateId}
            /> */}
        </div>
    )
}

export default inject("templateStore")(observer(Template));
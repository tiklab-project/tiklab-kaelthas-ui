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
    const [editOrAdd, setEditOrAdd] = useState()
    const [modalName, setModalName] = useState()
    const [templateList, setTemplateList] = useState()

    useEffect(() => {
        findDocumentTemplatePage().then(data => {
            if (data.code === 0) {
                setTemplateList(data.data.dataList)
            }
        })
    }, [])

    const previewModal = (id) => {
        props.history.push(`/templatePreview/${id}`)
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
                            key={item.id}
                            onClick={() => previewModal(item.id)}
                        >
                            <div>
                                <svg className="icon" aria-hidden="true">
                                    <use xlinkHref="#icon-template"></use>
                                </svg>

                                <div className="title" key="title">{item.name}</div>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default inject("templateStore")(observer(Template));
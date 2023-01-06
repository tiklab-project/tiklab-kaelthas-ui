/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-07 09:34:01
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-08 18:01:28
 */
import React, { useState,useEffect, Fragment } from "react";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Layout,Row,Col,Modal, Pagination, Table, Space } from 'antd';
import TemplateAddmodal from "./templateAddmodal"
import "../components/template.scss"
import  TemplatePreviewmodal from "./templatePreviewmodal"
import { observer, inject } from "mobx-react";
import Breadcrumb from "../../../common/breadcrumb/breadcrumb";
import Button from "../../../common/button/button";
const { confirm } = Modal;
const Template = (props)=>{
    const { templateStore } = props;
    const { findDocumentTemplatePage,deleteDocumentTemplate,templatePageParams } = templateStore;
    const [addModalVisible,setAddModalVisible] = useState(false)
    const [previewModalVisible,setPreviewModalVisible] = useState(false)
    const [editOrAdd,setEditOrAdd] = useState()
    const [modalName,setModalName] = useState()
    const [hoverId,setHoverId] = useState()
    const [templateList,setTemplateList] = useState()
    const [templateId,setTemplate] = useState()

    useEffect(()=> {
        findDocumentTemplatePage().then(data=> {
            if(data.code === 0){
                setTemplateList(data.data.dataList)
            }
        })
    },[])
    const addModal = () => {
        setAddModalVisible(true)
        setEditOrAdd("add")
        setModalName("添加模板")
    }

    const editModal = (id) => {
        setAddModalVisible(true)
        setEditOrAdd("edit")
        setModalName("编辑模板")
        setTemplate(id)
    }
    const previewModal = (id) => {
        setPreviewModalVisible(true)
        setTemplate(id)
    }

    // 删除模板
    const showDeleteConfirm = (name,id)=>{
        confirm({
            title: `确定删除${name}?`,
            icon: <ExclamationCircleOutlined />,
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                deleteDocumentTemplate(id).then(data=> {
                    findDocumentTemplatePage().then(data=> {
                        if(data.code === 0){
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
        findDocumentTemplatePage({name: value}).then(data=> {
            if(data.code === 0){
                setTemplateList(data.data.dataList)
            }
        })
    }
    // 改变页码
    const changePage = (page) => {
        findDocumentTemplatePage({current: page}).then(data=> {
            if(data.code === 0){
                setTemplateList(data.data.dataList)
            }
        })
    }

    const columns = [
        {
            title: "模板名称",
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
        {
            title: "模板描述",
            dataIndex: "description",
            key: "description",
            align: "left",
        },
        {
            title: "操作",
            dataIndex: "action",
            key: "action",
            align: "left",
            width: "15%",
            render: (text, record) => (
                <Space size="middle">
                     <span className="span-botton  delete" onClick={() => editModal(record.id)}>
                        <svg className="botton-icon" aria-hidden="true">
                            <use xlinkHref="#icon-edit"></use>
                        </svg>
                    </span>
                    <span className="span-botton  delete" onClick={() => previewModal(record.id)}>
                        <svg className="botton-icon" aria-hidden="true">
                            <use xlinkHref="#icon-view"></use>
                        </svg>
                    </span>
                    <span className="span-botton  delete" onClick={() => showDeleteConfirm(record.id)}>
                        <svg className="botton-icon" aria-hidden="true">
                            <use xlinkHref="#icon-delete"></use>
                        </svg>
                    </span>
                </Space>
            ),
        },
    ]

    return (
        <Fragment>
        <Layout className="wiki-template">
            <Row style={{height: "100%"}}>
                <Col xl={{span: 18,offset:3}} lg={{span: 20,offset:2}}>
                     <Breadcrumb
                        firstText="文档模板"
                    >
                        <Button type = "primary" onClick={()=> addModal()} >添加模板</Button>
                    </Breadcrumb>
                    <Table
                        columns={columns}
                        dataSource={templateList}
                        rowKey={record => record.id}
                        pagination = {false}
                    />   
                </Col>
            </Row>
        </Layout>
        <TemplateAddmodal 
            modalName= {modalName} 
            editOrAdd= {editOrAdd}
            addModalVisible = {addModalVisible}
            setAddModalVisible = {setAddModalVisible}
            setTemplateList = {setTemplateList}
            templateId = {templateId}
        />
        <TemplatePreviewmodal 
            name="添加知识库" 
            type="add"
            previewModalVisible = {previewModalVisible}
            setPreviewModalVisible = {setPreviewModalVisible}
            templateId ={templateId}
        />
        </Fragment>
    )
}

export default inject("templateStore")(observer(Template));
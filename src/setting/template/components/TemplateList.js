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
import "../components/TemplateList.scss"
import { observer, inject } from "mobx-react";
import Breadcrumb from "../../../common/breadcrumb/breadcrumb";
import Button from "../../../common/button/button";
const { confirm } = Modal;
const Template = (props)=>{
    const { templateStore } = props;
    const { findDocumentTemplatePage,deleteDocumentTemplate,templatePageParams, templateList } = templateStore;
    const [addModalVisible,setAddModalVisible] = useState(false)
    const [previewModalVisible,setPreviewModalVisible] = useState(false)
    const [editOrAdd,setEditOrAdd] = useState()
    const [modalName,setModalName] = useState()
    const [hoverId,setHoverId] = useState()
    // const [templateList,setTemplateList] = useState()
    const [templateId,setTemplate] = useState()

    useEffect(()=> {
        findDocumentTemplatePage().then(data=> {
            // if(data.code === 0){
            //     setTemplateList(data.data.dataList)
            // }
        })
    },[])
    const addModal = () => {
        // setAddModalVisible(true)
        // setEditOrAdd("add")
        // setModalName("添加模板")
        props.history.push("/index/setting/templateAdd")
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
                    findDocumentTemplatePage()
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
    const goTemplateDetail = (id) => {
        props.history.push(`/index/setting/templateView/${id}`)
    }
    const columns = [
        {
            title: "模板名称",
            dataIndex: "name",
            key: "name",
            align: "left",
            render: (text, record) => <div onClick={() => goTemplateDetail(record.id)} className="template-title">
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
                <span className="template-name">{text}</span>
            </div>,
        },
        // {
        //     title: "模板描述",
        //     dataIndex: "description",
        //     key: "description",
        //     align: "left",
        // },
        {
            title: "操作",
            dataIndex: "action",
            key: "action",
            align: "left",
            width: "15%",
            render: (text, record) => (
                <Space size="middle">
                    
                    <span className="span-botton  delete" onClick={() => showDeleteConfirm(record.name, record.id)}>
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
        <Layout className="repository-template">
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
        {/* <TemplateAddmodal 
            modalName= {modalName} 
            editOrAdd= {editOrAdd}
            addModalVisible = {addModalVisible}
            setAddModalVisible = {setAddModalVisible}
            setTemplateList = {setTemplateList}
            templateId = {templateId}
        /> */}
        {/* <TemplatePreviewmodal 
            name="添加知识库" 
            type="add"
            previewModalVisible = {previewModalVisible}
            setPreviewModalVisible = {setPreviewModalVisible}
            templateId ={templateId}
        /> */}
        </Fragment>
    )
}

export default inject("templateStore")(observer(Template));
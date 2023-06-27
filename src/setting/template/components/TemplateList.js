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
import { Layout,Row,Col,Modal, Table, Space } from 'antd';
import "../components/TemplateList.scss"
import { observer, inject } from "mobx-react";
import Breadcrumb from "../../../common/breadcrumb/breadcrumb";
import Button from "../../../common/button/button";
import TemplateStore from "../store/TemplateStore";

const { confirm } = Modal;
const Template = (props)=>{
    const { findDocumentTemplatePage,deleteDocumentTemplate, templateList } = TemplateStore;

    useEffect(()=> {
        findDocumentTemplatePage()
    },[])
    const addModal = () => {
        props.history.push("/index/setting/templateAdd")
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
        </Fragment>
    )
}

export default observer(Template);
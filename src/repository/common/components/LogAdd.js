/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-03 09:42:40
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-12-22 13:56:14
 */

import React from 'react';
import {withRouter} from "react-router-dom";
import { observer, inject } from "mobx-react";
import { Modal,Select,Form,Input   } from 'antd';

const LogAdd = (props) => {
    const {addModalVisible,setAddModalVisible,setWikiCatalogueList,modalTitle,
        WikiCatalogueStore,catalogueId,form,contentValue,setSelectKey,userList} = props
    const {addWikiCatalogue,addWikiCataDocument,findWikiCatalogue} = WikiCatalogueStore;
    const wikiId = props.match.params.wikiId;
    const onFinish = () => {
        form.validateFields().then((values) => {
            let data;
            if(values.formatType === "category"){
                if(catalogueId){
                    data = {
                        ...values,
                        repository:{id: wikiId},
                        parentCategory: {id:catalogueId},
                        master: {id: values.master},
                        typeId: values.formatType
                    }
                } else {
                    data = {
                        ...values,
                        repository:{id: wikiId},
                        master: {id: values.master},
                        typeId: values.formatType
                    }
                }
                addWikiCatalogue(data).then((data)=> {
                    if(data.code === 0){
                        findWikiCatalogue(wikiId).then((data)=> {
                            setWikiCatalogueList(data)
                        })
                        setAddModalVisible(!addModalVisible)
                        form.resetFields()
                    }
                    
                }) 
            }else {
                // data = {
                //     ...values,
                //     repository:{id: wikiId},
                //     category: {id:catalogueId},
                //     details:JSON.stringify(contentValue),
                //     master: {id: values.master},
                //     typeId: values.formatType
                // }
                if(catalogueId){
                    data = {
                        ...values,
                        repository:{id: wikiId},
                        category: {id:catalogueId},
                        details:JSON.stringify(contentValue),
                        master: {id: values.master},
                        typeId: values.formatType
                    }
                } else {
                    data = {
                        ...values,
                        repository:{id: wikiId},
                        details:JSON.stringify(contentValue),
                        master: {id: values.master},
                        typeId: values.formatType
                    }
                }
                addWikiCataDocument(data).then((data)=> {
                    if(data.code === 0) {
                        findWikiCatalogue(wikiId).then((data)=> {
                            setWikiCatalogueList(data)
                        })
                        setAddModalVisible(!addModalVisible)
                        localStorage.setItem("documentId", data.data);
                        if(values.formatType === "mindMap"){
                            props.history.push(`/index/wikidetail/${wikiId}/mindmap/${data.data}`)
                        }
                        if(values.formatType === "document"){
                            props.history.push(`/index/wikidetail/${wikiId}/doc/${data.data}`)
                        }
                        // 左侧导航
                        setSelectKey(data.data)
                        form.resetFields()
                    }
                    
                })
            }
        })
    }
    // const selectType = () => {

    // }
    return (
        <Modal
            title={modalTitle}
            visible={addModalVisible}
            onOk={()=>onFinish()} 
            onCancel={()=>setAddModalVisible(false)}
            destroyOnClose={true}
        >
            <Form
                form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
            >
                <Form.Item
                    label="名字"
                    name="name"
                    rules={[{ required: true, message: '请输入目录名字!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="负责人" name="master"  rules={[{ required: true }]} >
                    <Select
                        placeholder="负责人"
                        allowClear
                        className="work-select"
                        key="master"
                        style={{ minWidth: '80px'}}
                    >   
                        {
                            userList && userList.map((item)=>{
                                return <Select.Option value={item.user.id} key={item.user.id}>{item.user.name}</Select.Option>
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    label="类型"
                    name="formatType"
                    rules={[{ required: true, message: '请选择类型!' }]}
                    hidden = {true}
                >
                    <Select  onChange = {(value) => selectType(value)}>
                        <Select.Option value="category">目录</Select.Option>
                        <Select.Option value="document">页面</Select.Option>
                        <Select.Option value="mindMap">脑图</Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default inject("WikiCatalogueStore")(observer(LogAdd));
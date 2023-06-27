/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-03 09:42:40
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-12-22 13:56:14
 */

import React from 'react';
import { observer, inject } from "mobx-react";
import { Modal,Select,Form,Input   } from 'antd';

const CategoryAdd = (props) => {
    const {addModalVisible,setAddModalVisible,setRepositoryCatalogueList,modalTitle,
        catalogueId,form,contentValue,setSelectKey,userList, categoryStore} = props
    const {addRepositoryCatalogue,createDocument,findRepositoryCatalogue, expandedTree, setExpandedTree} = categoryStore;
    const repositoryId = props.match.params.repositoryId;

    const isExpandedTree = (key) => {
        return expandedTree.some(item => item === key)
    }
    const setOpenOrClose = key => {
        if (isExpandedTree(key)) {
            return
        } else {
            setExpandedTree(expandedTree.concat(key));
        }
    }

    const onFinish = () => {
        form.validateFields().then((values) => {
            let data;
            if(values.formatType === "category"){
                if(catalogueId){
                    data = {
                        ...values,
                        wikiRepository:{id: repositoryId},
                        parentWikiCategory: {id:catalogueId},
                        master: {id: values.master},
                        typeId: values.formatType
                    }
                } else {
                    data = {
                        ...values,
                        wikiRepository:{id: repositoryId},
                        master: {id: values.master},
                        typeId: values.formatType
                    }
                }
                addRepositoryCatalogue(data).then((data)=> {
                    if(data.code === 0){
                        findRepositoryCatalogue(repositoryId).then((data)=> {
                            setRepositoryCatalogueList(data)
                        })
                        setAddModalVisible(!addModalVisible)
                        if(catalogueId){
                            setOpenOrClose(catalogueId)
                        }
                        props.history.push(`/index/repositorydetail/${repositoryId}/folder/${data.data}`)
                        form.resetFields()
                    }
                    
                }) 
            }else {
                if(catalogueId){
                    data = {
                        ...values,
                        repository:{id: repositoryId},
                        category: {id:catalogueId},
                        details:JSON.stringify(contentValue),
                        master: {id: values.master},
                        typeId: values.formatType
                    }
                } else {
                    data = {
                        ...values,
                        wikiRepository:{id: repositoryId},
                        details:JSON.stringify(contentValue),
                        master: {id: values.master},
                        typeId: values.formatType
                    }
                }
                createDocument(data).then((data)=> {
                    if(data.code === 0) {
                        findRepositoryCatalogue(repositoryId).then((data)=> {
                            setRepositoryCatalogueList(data)
                        })
                        setAddModalVisible(!addModalVisible)
                        localStorage.setItem("documentId", data.data);
                        if(values.formatType === "mindMap"){
                            props.history.push(`/index/repositorydetail/${repositoryId}/mindmap/${data.data}`)
                        }
                        if(values.formatType === "document"){
                            props.history.push(`/index/repositorydetail/${repositoryId}/doc/${data.data}`)
                        }
                        // 左侧导航
                        setSelectKey(data.data)
                        // 如果是在某个目录下面，展开这个目录
                       
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
            okText = "确定"
            cancelText = "取消"
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

export default inject("categoryStore")(observer(CategoryAdd));
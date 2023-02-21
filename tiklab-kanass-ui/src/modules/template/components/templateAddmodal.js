/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-07 10:20:57
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-08 16:20:06
 */
import React, { useState,useEffect } from "react";
import {withRouter} from "react-router-dom";
import { observer, inject } from "mobx-react";
import { Modal,Select,Form,Input   } from 'antd';

import {DocumentEditor} from "tiklab-slate-ui"
import "./templateAddmodal.scss"
const TemplateAddmodal = (props) => {
    const [form] = Form.useForm();
    const {addModalVisible,setAddModalVisible,modalName,templateStore,setTemplateList,editOrAdd,templateId} = props;
    const {greateDocumentTemplate,findDocumentTemplatePage,findDocumentTemplate,updateDocumentTemplate} = templateStore;
    const [editorValue, setEditorValue] = useState()
    const changeEditor = (value) => {
        setEditorValue(value)
    }
    useEffect(()=>{
        if(editOrAdd === "edit" && addModalVisible) {
            findDocumentTemplate(templateId).then(data => {
                const value = data.data
                if(data.code === 0){
                    form.setFieldsValue({   
                        name: value.name,
                        description: value.description
                    })
                    console.log(value.details)
                    setEditorValue(JSON.parse(value.details))
                }
            })
        }
        // else {
        //     console.log("9099")
        //     console.log(editOrAdd, addModalVisible)
        //     setEditorValue([
        //         {
        //             type: "paragraph",
        //             children: [{ text: "2345" }],
        //         },
        //     ])
        // }
        
    },[editOrAdd,templateId, addModalVisible])

    useEffect(()=>{
        if(editOrAdd === "add") {
            form.resetFields();
        }
    },[editOrAdd])
    const onFinish = () => {
        form.validateFields().then((values) => {
            const serialize = JSON.stringify(editorValue)
            
            if(editOrAdd === "edit"){
                const data = {
                    ...values,
                    details: serialize,
                    id: templateId
                }
                updateDocumentTemplate(data).then(data => {
                    if(data.code === 0){
                        setAddModalVisible(false)
                        findDocumentTemplatePage().then(data=> {
                            if(data.code === 0){
                                setTemplateList(data.data.dataList)
                            }
                        })
                    }
                })
            }else {
                const data = {
                    ...values,
                    details: serialize
                }
                greateDocumentTemplate(data).then(data => {
                    if(data.code === 0){
                        setAddModalVisible(false)
                        findDocumentTemplatePage().then(data=> {
                            if(data.code === 0){
                                setTemplateList(data.data.dataList)
                            }
                        })
                    }
                })
            }
            
        })
    }

    const onCancel = ()=> {
        setAddModalVisible(false)
        form.resetFields();
    }
    
    
    return (
        <Modal
            title= {modalName}
            visible={addModalVisible}
            onOk={()=>onFinish()} 
            onCancel={()=>onCancel()}
            width = "80vw"
            className="template-addmodal"
            destroyOnClose = {true}
        >   
        <div>
            <Form
                form={form}
                name="basic"
                initialValues={{ remember: true }}
                style = {{marginBottom: "20px"}}
            >   
                <div className="addmodal-top">
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref= "#icon-paihang"></use>
                    </svg>
                    <div className="addmodal-from">
                        <Form.Item
                            name="name"
                            rules={[{ required: true, message: '请输入模板名称!' }]}
                            wrapperCol = {{ span: 6 }}
                        >
                            <Input placeholder="请输入模板名称" />
                        </Form.Item>

                        <Form.Item
                            name="description"
                            rules={[{ required: true, message: '请输入模板描述!' }]}
                            style= {{marginBottom: 0}}
                            wrapperCol = {{ span: 20 }}
                        >
                            <Input placeholder="请输入模板描述" />
                        </Form.Item>
                    </div>
                </div>
            </Form>
            {
                console.log(editorValue)
            }
            {
                editorValue && <DocumentEditor value = {editorValue} onChange = {setEditorValue}/>
            }
            
        </div>
            
        </Modal>
    )
}

export default inject("templateStore")(observer(TemplateAddmodal));
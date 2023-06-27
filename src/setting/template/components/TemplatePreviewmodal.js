/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-07 10:20:57
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-09 09:10:16
 */
import React, { useState,useEffect } from "react";
import { observer, inject } from "mobx-react";
import { Form } from 'antd';
import "./templatePreviewModal.scss"
import { PreviewEditor } from "tiklab-slate-ui";
import "tiklab-slate-ui/es/tiklab-slate.css";
import TemplateStore from "../store/TemplateStore";
const TemplatePreviewmodal = (props) => {
    const [form] = Form.useForm();
    const {previewModalVisible,templateId, workStore} = props;
    const {findDocumentTemplate} = TemplateStore;
    const [value, setValue] = useState([
		{
			type: "paragraph",
			children: [{ text: "空白文档" }],
		},
	])
    const onFinish = () => {
        form.validateFields().then((values) => {
        })
    }
    useEffect(()=>{
        if(templateId && previewModalVisible) {
            findDocumentTemplate(templateId).then(data => {
                const value = data.data
                if(data.code === 0){
                    setValue(JSON.parse(value.details))
                }
            })
        }
    },[templateId, previewModalVisible])
    const initTemplate = (value) => {
        // setValue(value)
        // const serialize = JSON.stringify(value)
		// const data = {
		// 	id: documentId,
		// 	details: serialize
		// }
		// updateDocument(data)
    }
    return (
       
        <div>
           
            <PreviewEditor value = {value} onChange = {(value)=> initTemplate(value)} workStore = {workStore}/>
        </div>
    )
}

export default inject("workStore")(observer(TemplatePreviewmodal));
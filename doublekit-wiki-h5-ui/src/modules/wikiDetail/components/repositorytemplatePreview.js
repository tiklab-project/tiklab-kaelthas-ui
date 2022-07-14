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
// import { Modal,Select,Form   } from 'antd';
import { SafeArea,Form,Input } from "antd-mobile";
import "./repositorytemplatePreview.scss"
import { PreviewEditor,DocumentEditor } from "doublekit-slate-h5-ui"
const RepositoryTemplatePreview = (props) => {
    const {templateStore,templateId, wikiCatalogueStore} = props;
    const {findDocumentTemplate,updateDocumentTemplate} = templateStore;
    const {addVisible,setAddVisible,setDetail} = wikiCatalogueStore
    const [template,setTemplate] = useState();
    const [editTemplate, setEditTemplate] = useState(false)
    const [templateName, setTemplateName] = useState()
    const [templateDesc, setTemplateDesc] = useState()
    const [value, setValue] = useState([
		{
			type: "paragraph",
			children: [{ text: "空白文档" }],
		},
	])
    const submit = () => {
        setEditTemplate(false)
        const params = {
            id: templateId,
            name: templateName,
            description: templateDesc,
            details: JSON.stringify(value)
        }
        // updateDocumentTemplate(params)
    }
    useEffect(()=>{
        if(templateId) {
            findDocumentTemplate(templateId).then(data => {
                const value = data.data
                if(data.code === 0){
                    setTemplate({...value})
                    setTemplateName(value.name)
                    setTemplateDesc(value.description)
                    setValue(JSON.parse(value.details))
                    setDetail(value.details)
                }
            })
        }
    },[templateId])

    const selectTemplate = () => {
        setAddVisible(true)

    }
    return ( 
        <div className="template-previewmodal">
            <div style={{ background: '#ace0ff' }}>
                <SafeArea position='top' />
            </div>
            <div style={{padding: "10px"}}>
               <div className="previewmodal-top">
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref= "#icon-template"></use>
                </svg>
                <div className="previewmodal-from">
                    <div className="title">
                        {templateName}
                    </div>
                    <div className="doc">
                        {templateDesc}
                    </div>
                </div>
            </div>
            <PreviewEditor value = {value}/> 
            </div>
            <div className="add-next" onClick={() =>selectTemplate()}>下一步</div>
        </div>
    )
}

export default inject("templateStore","wikiCatalogueStore")(observer(RepositoryTemplatePreview));
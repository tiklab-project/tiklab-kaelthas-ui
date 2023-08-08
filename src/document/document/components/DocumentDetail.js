/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-09 09:18:21
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-29 09:14:34
 */
import React,{useState} from "react";
import { Breadcrumb} from 'antd';
import { Provider, observer } from "mobx-react";
import "./documentDetail.scss";
import DocumentExamine from "./DocumnetExamine";
import {withRouter} from "react-router-dom";
import DocumentEdit from "./DocumentEdit";
import DocumentStore from "../store/DocumentStore";
const DocumentDetail = (props)=>{
    const store = {
        documentStore: DocumentStore
    }
    const {docDetail,updateDocument,findDocument} = DocumentStore;

    const [docInfo, setDocInfo] = useState({name: "",likenumInt: "",commentNumber: ""})
    

    const [editOrExamine,seteditOrExamine] = useState("examine")
    const changePageType = (type) => {
        seteditOrExamine(type)
    }
    
    const documentId = props.match.params.id;
   
    // 初始化
   
    
    // 保存内容
    const save = (type) => {
        seteditOrExamine(type)
        saveDocument(value)
        // editRef.current.submit()
    }

    const saveDocument = (value) => {
        setValue(value)
        const serialize = JSON.stringify(value)
		const data = {
			id: documentId,
			details: serialize
		}
		updateDocument(data)
    }
    return (<Provider {...store}>
        <div className="documnet-detail">
            <div className="documnet-detail-header">
                <Breadcrumb>
                    <Breadcrumb.Item>知识库管理</Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href="/">文档详情</a>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className="documnet-detail-button">
                    {
                        editOrExamine === "examine" ?<span onClick={()=>changePageType("edit")}>编辑</span> :
                            <span onClick={()=>save("examine")}>保存</span>
                    }
                </div>
            </div>
            {
                editOrExamine === "examine" ? <DocumentExamine docDetail = {docDetail} findDocument ={findDocument} docInfo = {docInfo} value ={value} {...props}/> : 
                    <DocumentEdit docDetail = {docDetail} onChange ={(value) => saveDocument(value)} docInfo = {docInfo} value={value} {...props}/>
            }
        </div>
    </Provider>
        
    )
}
export default observer(withRouter(DocumentDetail));
/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-09 09:18:21
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-29 09:14:34
 */
import React,{Fragment,useEffect,useState,useRef} from "react";
import { Breadcrumb,Input,Divider } from 'antd';
import { observer,inject } from "mobx-react";
import "./brainMapFlowDetail.scss";
import BrainMapFlowExamine from "./brainMapFlowExamine";
// import  from "./edit-slate/editor";
import {Link,withRouter} from "react-router-dom";
import BrainMapFlowEdit from "./brainMapFlowEdit";
const { Search } = Input;
const DocumentDetail = (props)=>{
    const {WikiCatalogueStore,wikiwork} = props;
    const [graphData, setGraphData] = useState({nodes: [], edges: []} )
    const {docDetail,setDocDetail,updateDocument,findDocument} = WikiCatalogueStore;
    const {findWorkItem} = wikiwork;
    useEffect(()=>{
        
    },[])
    const [docInfo, setDocInfo] = useState({name: "",likenumInt: "",commentNumber: ""})
    

    const [editOrExamine,seteditOrExamine] = useState("examine")
    const changePageType = (type) => {
        seteditOrExamine(type)
    }
    
    const documentId = localStorage.getItem("documentId");
    // const [value, setValue] = useState([
	// 	{
	// 		type: "paragraph",
	// 		children: [{ text: "" }],
	// 	},
	// ])
    // 初始化
    useEffect(() => {
		findDocument(documentId).then((data) => {
			if (data.code === 0) {
				if(data.data.details){
                    const jsonData = JSON.parse(data.data.details);
                    console.log(jsonData)
                    setGraphData({...jsonData})
                }
                setDocInfo(data.data)
			}
		})
	}, [documentId])
    
    // 保存内容
    const save = (type) => {
        seteditOrExamine(type)
        saveDocument()
        // editRef.current.submit()
    }

    const saveDocument = () => {
        // setValue(value)
        const serialize = JSON.stringify(graphData)
		const data = {
			id: documentId,
			details: serialize
		}
		updateDocument(data)
        console.log(graphData)
    }
    return (
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
                editOrExamine === "examine"  ? 
                    <BrainMapFlowExamine 
                        docDetail = {docDetail} 
                        findDocument ={findDocument} 
                        graphData = {graphData} 
                        docInfo = {docInfo} 
                        {...props}
                    /> : 
                    <BrainMapFlowEdit 
                            docDetail = {docDetail} 
                            docInfo = {docInfo} 
                            graphData = {graphData}
                            setGraphData = {setGraphData}
                            {...props}
                    />
            }
        </div>
    )
}
export default inject('wikiStore',"WikiCatalogueStore","wikiwork")(observer(withRouter(DocumentDetail)));
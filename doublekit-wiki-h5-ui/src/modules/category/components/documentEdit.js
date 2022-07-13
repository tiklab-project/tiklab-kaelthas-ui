import React, {useState,useEffect} from "react";
import { SafeArea, Popup,Button } from 'antd-mobile';
import {DocumentEditor} from "doublekit-slate-h5-ui";
import { inject, observer } from "mobx-react";
import "./documentEditor.scss"
const WikiDocumentEdit = (props) => {
    const {documentCommon, wikiCategoryStore} = props;
    const documentId =  props.match.params.id;
    const {findDocument, updateDocument} = wikiCategoryStore;
    const [docInfo, setDocInfo] = useState({name: "",likenumInt: "",commentNumber: ""})
    const [value, setValue] = useState([
		{
			type: "paragraph",
			children: [{ text: "111" }],
		},
	])
    useEffect(() => {
        findDocument(documentId).then((data) => {
			if (data.code === 0) {
				if(data.data.details){
                    // setWorkData(JSON.parse(data.data.details),findWorkItem)
                    setValue(JSON.parse(data.data.details))
                    // setWorkData(JSON.parse(data.data.details),findWorkItem)
                }else {
                    setValue([
                        {
                            type: "paragraph",
                            children: [{ text: "" }],
                        },
                    ])
                }
                setDocInfo(data.data)
			}
		})
    }, [documentId])

    const saveDocument = () => {
        const serialize = JSON.stringify(value)
		const data = {
			id: documentId,
			details: serialize
		}
		updateDocument(data).then(res => {
            if(res.code === 0){
                props.history.goBack()
            }
        })

    }
    
    return (
        <div className="document-eidtwiki">
            <div style={{ background: '#ace0ff' }}>
                <SafeArea position='top' />
            </div>
            <div className="category-top">
                <div className="category-top-left">
                    <svg className="category-icon-logo" aria-hidden="true" onClick={() => props.history.goBack()}>
                        <use xlinkHref= "#icon-left"></use>
                    </svg>
                    <div className="category-title">{docInfo ? docInfo.name : "目录"}</div>
                </div>
                <div className="category-top-right">
                    <span style={{color: "#5D70EA", fontSize: "14px"}} onClick = {() => saveDocument()}>确定</span>
                </div>
            </div>
            <DocumentEditor value={value} onChange = {setValue} showMenu = {true}/>
        </div>
    )

}
export default inject("wikiCategoryStore","slatestore")(observer(WikiDocumentEdit));
/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-09 09:18:21
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-13 13:13:00
 */
import React, { Fragment, useEffect, useState, useRef } from "react";
import { Breadcrumb, Input, Button } from 'antd';
import { observer, inject } from "mobx-react";
import { Link, withRouter } from "react-router-dom";
import "./documentEdit.scss"
import { DocumentEditor } from "doublekit-slate-ui"
const { Search } = Input;
const DocumentEdit = (props) => {
    const {onChange,WikiCatalogueStore} = props;
    const { findDocument,updateDocument } = WikiCatalogueStore;
    const documentId = localStorage.getItem("documentId");
    const [docInfo, setDocInfo] = useState({ name: "", likenumInt: "", commentNumber: "", master: { name: "" } });
    const [value, setValue] = useState([
        {
            type: "paragraph",
            children: [{ text: "" }],
        },
    ])
    useEffect(() => {
        findDocument(documentId).then((data) => {
            if (data.code === 0) {
                if (data.data.details) {
                    // setWorkData(JSON.parse(data.data.details),findWorkItem)
                    setValue(JSON.parse(data.data.details))
                    // setWorkData(JSON.parse(data.data.details),findWorkItem)
                } else {
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

    const save = () => {
        saveDocument(value)
        props.history.push(`/index/wikidetail/doc/${documentId}`)
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

    return (
        <div className = "documnet-edit">
            <div className="edit-title">
                <div>{docInfo.name}</div>
                <div className="edit-right">
                    <Button shape="round" style={{backgroundColor: "#5d70ea", color: "#fff"}} onClick={() => save()}>保存</Button>
                    <svg className="right-icon" aria-hidden="true">
                        <use xlinkHref="#icon-point"></use>
                    </svg>
                </div>
            </div>
            <DocumentEditor onChange = {saveDocument} value = {value}/>
        </div>
    )
}
export default inject('wikiDetailStore', 'wikiStore', "WikiCatalogueStore")(observer(withRouter(DocumentEdit)));
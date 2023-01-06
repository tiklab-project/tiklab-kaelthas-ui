/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-09 09:18:21
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-13 13:13:00
 */
import React, { Fragment, useEffect, useState, useRef } from "react";
import { Row, Col } from 'antd';
import { observer, inject } from "mobx-react";
import { Link, withRouter } from "react-router-dom";
import "./documentEdit.scss";
import { createEditor } from "slate";
import { Editable, Slate, withReact } from "slate-react";
import { EditorBigContent, EditorBigMenu } from "tiklab-slate-ui";
import Button from "../../../../common/button/button";

const DocumentEdit = (props) => {
    const { onChange, WikiCatalogueStore } = props;
    const { findDocument, updateDocument } = WikiCatalogueStore;
    const documentId = localStorage.getItem("documentId");
    const [docInfo, setDocInfo] = useState({ name: "", likenumInt: "", commentNumber: "", master: { name: "" } });
    const wikiId = props.match.params.wikiId;
    const [value, setValue] = useState([
        {
            type: "paragraph",
            children: [{ text: "" }],
        },
    ])
    const [editor] = useState(() => withReact(createEditor()))

    useEffect(() => {
        findDocument(documentId).then((data) => {
            if (data.code === 0) {
                if (data.data.details) {
                    setValue(JSON.parse(data.data.details))
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
        props.history.push(`/index/wikidetail/${wikiId}/doc/${documentId}`)
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
        <div className="documnet-edit">
            <div className="edit-top">
                <div className="edit-title">{docInfo.name}</div>
                <div className="edit-right">
                    <Button type="primary" onClick={() => save()}>保存</Button>
                    <Button onClick={() => props.history.goBack()}>取消</Button>
                    <svg className="right-icon" aria-hidden="true">
                        <use xlinkHref="#icon-point"></use>
                    </svg>
                </div>
            </div>
            <EditorBigMenu editor = {editor}/>
            <Row className="document-examine-content">
                <Col xl={{ span: 18, offset: 3 }} lg={{ span: 18, offset: 3 }} md={{ span: 20, offset: 2 }}>
                    
                    <EditorBigContent 
                        value={value}
                        onChange={value => saveDocument(value)}
                        editor = {editor}
                    />
                </Col>
            </Row>

        </div>
    )
}
export default inject('wikiDetailStore', 'wikiStore', "WikiCatalogueStore")(observer(withRouter(DocumentEdit)));
/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-09 09:18:21
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-29 09:14:34
 */

import React, { Fragment, useEffect, useState, useRef } from "react";
import { observer, inject } from "mobx-react";
import { Row, Col, Button, Input } from 'antd';
import "./documentDetail.scss";
import { Link, withRouter } from "react-router-dom";
import "./documentAddEdit.scss";
import TemplateList from "./SelectTemplateList"
const DocumentAddEdit = (props) => {
    const {WikiCatalogueStore, title, templateStore} = props;
    const [titleValue, setTitleValue] = useState(title);
    const { updateDocument } = WikiCatalogueStore;
    const imageNames = ["template2.png", "template1.png", "template3.png", "template4.png"];
    const [documentId, setDocumentId] = useState(props.match.params.id);
    const wikiId = props.match.params.wikiId;
    const [templateVisible, setTemplateVisible] = useState(false);
    const { findDocumentTemplatePage, findDocumentTemplate } = templateStore;
    const [templateList, setTemplateList] = useState()

    useEffect(() => {
        setTitleValue(title)
        findDocumentTemplatePage().then(data => {
            if (data.code === 0) {
                setTemplateList(data.data.dataList)
            }
        })
        return
    }, [title])

    const changeTitle = (value) => {
        setTitleValue(value.target.value)
        console.log(documentId)
        
        const data = {
            id: documentId,
            name: value.target.value
        }
        updateDocument(data).then(res => {
            if(res.code === 0){
                console.log(res.code)
                document.getElementById("examine-title").innerHTML = value.target.value;
                document.getElementById("file-" + documentId).innerHTML = value.target.value
            }
        })
    }

    const changeDetail = () => {
        const data = {
            id: documentId,
            details: JSON.stringify([
                {
                    type: "paragraph",
                    children: [{ text: "" }],
                },
            ])
        }
        updateDocument(data).then(res => {
            if(res.code === 0){
                props.history.push(`/index/wikidetail/${wikiId}/docEdit/${documentId}`)
            }
        })
    }
    const selectTemplate = (content) => {
        console.log(documentId)
        const data = {
            id: documentId,
            details: content
        }
        updateDocument(data).then(res => {
            if(res.code === 0){
                props.history.push(`/index/wikidetail/${wikiId}/docEdit/${documentId}`)
            }
        })
    }
    return (
        <div className="document-add">
            <Row>
                <Col xl={{ span: 18, offset: 3 }} lg={{ span: 18, offset: 3 }} md={{ span: 20, offset: 2 }}>
                    <div className="document-title">
                        <Input 
                            className="document-title-input" 
                            bordered={false}
                            onChange = {(value) => setTitleValue(value.target.value)}
                            value = {titleValue}
                            onPressEnter = {(value) => changeTitle(value)}
                            onBlur = {(value) => changeTitle(value)}
                        />
                    </div>
                    <div className="document-type">
                        <div className="document-type-item" key = {"empty"} onClick = {() => changeDetail()}>
                            <svg className="img-icon" aria-hidden="true">
                                <use xlinkHref="#icon-emptyDoc"></use>
                            </svg>
                            空白文档
                        </div>
                        <div className="document-type-item" key = {"template"} onClick = {() => setTemplateVisible(true)}>
                            <svg className="img-icon" aria-hidden="true">
                                <use xlinkHref="#icon-templateIcon"></use>
                            </svg>
                            标准模板
                        </div>
                    </div>
                    <div className="template-select">
                        <div className="template-title">推荐模版</div>
                        <div className="template-list">
                            {
                                templateList && templateList.map((item, index) => {
                                    return <div className="template-box" key = {index} onClick = {() => selectTemplate(item.details)}>
                                        <img
                                            src={('/images/' + imageNames[index])}
                                            alt=""
                                            className="template-image"
                                        />
                                        <div className="template-name">{item.name}</div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                    <TemplateList {...props} documentId = {documentId} setTemplateVisible = {setTemplateVisible} templateVisible = {templateVisible}/>
                </Col>
            </Row>
        </div>

    )
}
export default withRouter(inject('WikiCatalogueStore', 'templateStore')(observer(DocumentAddEdit)));
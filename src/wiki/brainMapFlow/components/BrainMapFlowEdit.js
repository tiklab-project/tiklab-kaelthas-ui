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
import "./brainMapFlowEdit.scss";
import { Link, withRouter } from "react-router-dom";
import BrainMapFlow from "./BrainMapFlow";
import Button from "../../../common/button/button";

const DocumentMindMapEdit = (props) => {
    const { onChange, WikiCatalogueStore } = props;
    const { findDocument, updateDocument } = WikiCatalogueStore;
    const documentId = localStorage.getItem("documentId");
    const [docInfo, setDocInfo] = useState({ name: "", likenumInt: "", commentNumber: "", master: { name: "" } });
    const [graphData, setGraphData] = useState(
        { nodes: [], edges: [] }
    )

    const save = () => {
        saveDocument(graphData)
        // props.history.push(`/index/wikidetail/mindmap/${documentId}`)
        props.history.goBack()
        // editRef.current.submit()
    }

    const saveDocument = (value) => {
        setGraphData(value)
        const serialize = JSON.stringify(value)
        const data = {
            id: documentId,
            details: serialize
        }
        updateDocument(data)
    }

    useEffect(() => {
        findDocument(documentId).then((data) => {
            if (data.code === 0) {
                if (data.data.details) {
                    // setWorkData(JSON.parse(data.data.details),findWorkItem)
                    setGraphData(JSON.parse(data.data.details))
                    // setWorkData(JSON.parse(data.data.details),findWorkItem)
                } else {
                    setGraphData({ nodes: [], edges: [] })
                }
                setDocInfo(data.data)
            }
        })
    }, [documentId])
    return (
        <div className="brainmap-edit">
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
            <Row>
                <Col xl={{ span: 18, offset: 3 }} lg={{ span: 18, offset: 3 }} md={{ span: 20, offset: 2 }}>
                    <BrainMapFlow
                        graphData={graphData}
                        setGraphData={setGraphData}
                    />
                </Col>
            </Row>

        </div>
    )
}
export default inject('wikiDetailStore', 'wikiStore', "WikiCatalogueStore")(observer(withRouter(DocumentMindMapEdit)));
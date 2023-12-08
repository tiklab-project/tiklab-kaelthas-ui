/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-09 09:18:21
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-13 13:13:00
 */
import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Input } from 'antd';
import { observer, inject } from "mobx-react";
import { withRouter } from "react-router-dom";
import "./documentEdit.scss";
import { EditorBigContent, EditorBig } from "thoughtware-slate-ui";
import Button from "../../../common/button/button";
import DocumentStore from "../store/DocumentStore";
import CategoryStore from "../../../repository/common/store/CategoryStore";
import "thoughtware-slate-ui/es/thoughtware-slate.css";
import { getUser } from "thoughtware-core-ui";
import { useDebounce } from "../../../common/utils/debounce";
import { updateNodeName } from "../../../common/utils/treeDataAction";
const DocumentEdit = (props) => {
    const { relationWorkStore } = props;
    const { findDocument, updateDocument } = DocumentStore;
    const { repositoryCatalogueList } = CategoryStore
    const documentId = props.match.params.id;
    const [docInfo, setDocInfo] = useState({ name: "", likenumInt: "", commentNumber: "", master: { name: "" } });
    const [value, setValue] = useState()
    const [titleValue, setTitleValue] = useState();
    const editRef = useRef(); 
    const ticket = getUser().ticket;
    const tenant = getUser().tenant;
    useEffect(() => {
        setValue()
        findDocument(documentId).then((data) => {
            if (data.code === 0) {
                if (data.data.details) {
                    setTitleValue(data.data.name)
                    setValue(data.data.details)
                } else {
                    console.log("9090")
                    setValue("[{\"type\":\"paragraph\",\"children\":[{\"text\":\"\"}]}]")
                }
                setDocInfo(data.data)
            }
        })
        return;
    }, [documentId])

    const save = () => {
        saveDocument(value)

        // editRef.current.submit()
    }

    const saveDocument = (value) => {
        setValue(value)
        const serialize = JSON.stringify(value)
        const data = {
            id: documentId,
            details: value,
            detailText:  editRef.current.innerText
        }
        updateDocument(data)
    }

    const updataDesc = useDebounce((value) => {
        setValue(value);

        const data = {
            id: documentId,
            details: value,
            detailText:  editRef.current.innerText
        }
        updateDocument(data)
    }, [500])

    const changeTitle = (value) => {
        setTitleValue(value.target.value)
        const data = {
            id: documentId,
            name: value.target.value
        }
        updateDocument(data).then(res => {
            if (res.code === 0) {
                document.getElementById("examine-title").innerHTML = value.target.value;
                document.getElementById("file-" + documentId).innerHTML = value.target.value;
                updateNodeName(repositoryCatalogueList, documentId, value.target.value)
            }
        })
    }
    
    return (
        <div className="documnet-edit">
            <div className="edit-top">
                <div className="edit-title" id="examine-title">{docInfo.name}</div>
                <div className="edit-right">
                    <Button type="primary" onClick={() => save()}>保存</Button>
                    <Button onClick={() => props.history.goBack()}>退出编辑</Button>
                    <svg className="right-icon" aria-hidden="true">
                        <use xlinkHref="#icon-point"></use>
                    </svg>
                </div>
            </div>
            {
                value && <EditorBig
                    value={value}
                    onChange={value => updataDesc(value)}
                    relationWorkStore= {relationWorkStore}
                    base_url = {upload_url}
                    ticket = {ticket}
                    tenant = {tenant}
                >
                    <>
                        <Row className="document-examine-content">
                            <Col xl={{ span: 18, offset: 3 }} lg={{ span: 18, offset: 3 }} md={{ span: 20, offset: 2 }}>
                                <div className="document-title">
                                    <Input
                                        className="document-title-input"
                                        bordered={false}
                                        onChange={(value) => setTitleValue(value.target.value)}
                                        value={titleValue}
                                        onPressEnter={(value) => changeTitle(value)}
                                        onBlur={(value) => changeTitle(value)}
                                    />
                                </div>
                                <div ref = {editRef}>
                                    <EditorBigContent
                                        value={value}
                                        relationWorkStore= {relationWorkStore}

                                />
                                </div>
                            </Col>
                        </Row>
                    </>

                </EditorBig>
            }



        </div>
    )
}
export default inject("relationWorkStore")(observer(withRouter(DocumentEdit)));
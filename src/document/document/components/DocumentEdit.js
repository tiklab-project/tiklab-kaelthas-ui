/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-09 09:18:21
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-13 13:13:00
 */
import React, { Fragment, useEffect, useState, useRef } from "react";
import { Row, Col, Input } from 'antd';
import { observer, inject } from "mobx-react";
import { Link, withRouter } from "react-router-dom";
import "./documentEdit.scss";
import { createEditor } from "slate";
import { Editable, Slate, withReact } from "slate-react";
import { EditorBigContent, EditorBig, PreviewEditor, DocumentEditor } from "tiklab-slate-ui";
import Button from "../../../common/button/button";


const DocumentEdit = (props) => {
    const { onChange, RepositoryCatalogueStore } = props;
    const { findDocument, updateDocument } = RepositoryCatalogueStore;
    const documentId = props.match.params.id;
    const [docInfo, setDocInfo] = useState({ name: "", likenumInt: "", commentNumber: "", master: { name: "" } });
    const repositoryId = props.match.params.repositoryId;
    const [value, setValue] = useState()
    const [editor] = useState(() => withReact(createEditor()))
    const [titleValue, setTitleValue] = useState();

    useEffect(() => {
        setValue()
        console.log("编辑")
        findDocument(documentId).then((data) => {
            if (data.code === 0) {
                if (data.data.details) {
                    setTitleValue(data.data.name)
                    setValue(JSON.parse(data.data.details))
                } else {
                    console.log("9090")
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

        // editRef.current.submit()
    }

    const saveDocument = (value) => {
        setValue(value)
        const serialize = JSON.stringify(value)
        const data = {
            id: documentId,
            details: serialize
        }
        updateDocument(data).then(res => {
            if (res.code === 0) {
                props.history.push(`/index/repositorydetail/${repositoryId}/doc/${documentId}`)
            }
        })
    }

    const changeTitle = (value) => {
        setTitleValue(value.target.value)
        console.log(value)
        const data = {
            id: documentId,
            name: value.target.value
        }
        updateDocument(data).then(res => {
            if (res.code === 0) {
                console.log(res.code)
                document.getElementById("examine-title").innerHTML = value.target.value;
                document.getElementById("file-" + documentId).innerHTML = value.target.value
            }
        })
    }

    return (
        <div className="documnet-edit">
            <div className="edit-top">
                <div className="edit-title" id="examine-title">{docInfo.name}</div>
                <div className="edit-right">
                    <Button type="primary" onClick={() => save()}>保存</Button>
                    <Button onClick={() => props.history.goBack()}>取消</Button>
                    <svg className="right-icon" aria-hidden="true">
                        <use xlinkHref="#icon-point"></use>
                    </svg>
                </div>
            </div>
            {
                value && <EditorBig
                    value={value}
                    onChange={value => setValue(value)}
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
                                <EditorBigContent
                                    value={value}
                                />
                            </Col>
                        </Row>
                    </>

                </EditorBig>
            }



        </div>
    )
}
export default inject('repositoryDetailStore', 'repositoryStore', "RepositoryCatalogueStore")(observer(withRouter(DocumentEdit)));
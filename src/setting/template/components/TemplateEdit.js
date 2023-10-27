/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-07 10:20:57
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-08 16:20:06
 */
import React, { useState, useEffect } from "react";
import { observer, inject } from "mobx-react";
import { Input, Row, Col } from 'antd';
import { EditorBig, EditorBigContent } from "tiklab-slate-ui";
import "tiklab-slate-ui/es/tiklab-slate.css";
import { createEditor } from "slate";
import { withReact } from "slate-react";
import Button from "../../../common/button/button";
import TemplateStore from "../store/TemplateStore";
import "./templateEdit.scss"
import { getUser } from "tiklab-core-ui";
const TemplateEdit = (props) => {
    const templateId = props.match.params.templateId;
    const { createDocumentTemplate, findDocumentTemplatePage, findDocumentTemplate, updateDocumentTemplate } = TemplateStore;
    const [editorValue, setEditorValue] = useState("[{\"type\":\"paragraph\",\"children\":[{\"text\":\"\"}]}]")
    const [editor] = useState(() => withReact(createEditor()))
    const [titleValue, setTitleValue] = useState("未命名模板");
    const [buttonText, setButtonText] = useState(templateId ? "更改模板" : "创建模板")
    const changeEditor = (value) => {
        setEditorValue(value)
    }
    const ticket = getUser().ticket;
    const tenant = getUser().tenant;
    useEffect(() => {
        if (templateId) {
            setEditorValue()
            findDocumentTemplate(templateId).then(data => {
                const value = data.data
                if (data.code === 0) {
                    setTitleValue(value.name)
                    setEditorValue(value.details)
                }
            })
        }
        return;
    }, [templateId])



    const addTemplate = () => {
        const serialize = JSON.stringify(editorValue)
        const data = {
            name: titleValue,
            details: editorValue
        }

        if (!templateId) {
            createDocumentTemplate(data).then(data => {
                if (data.code === 0) {
                    findDocumentTemplatePage().then(data => {
                        if (data.code === 0) {
                            // setTemplateList(data.data.dataList)
                            props.history.goBack()
                        }
                    })
                }
            })
        } else {
            data.id = templateId
            updateDocumentTemplate(data).then(data => {
                if (data.code === 0) {
                    findDocumentTemplatePage().then(data => {
                        if (data.code === 0) {
                            // setTemplateList(data.data.dataList)
                            props.history.goBack()
                        }
                    })
                }
            })
        }

    }


    return (
        <Row className="template-add">
            <Col xl={{ span: 18, offset: 3 }} lg={{ span: 18, offset: 3 }} md={{ span: 20, offset: 2 }}>
                <div>
                    <div className="template-add-title">
                        <div className="template-add-top">
                            <div className="template-add-breadcrumb">
                                <span onClick={() => props.history.goBack()} className="template-back">模板列表</span>
                                <svg className="svg-icon" aria-hidden="true">
                                    <use xlinkHref="#icon-rightBlue"></use>
                                </svg>
                                <span>{titleValue}</span>
                            </div>
                            <div>
                                {
                                    !titleValue ? <Button>{buttonText}</Button>
                                        :
                                        <Button onClick={() => addTemplate()} type="primary">{buttonText}</Button>
                                }

                            </div>
                        </div>

                    </div>

                    {
                        editorValue &&
                        <EditorBig
                            value={editorValue}
                            onChange={value => setEditorValue(value)}
                            base_url = {upload_url}
                            ticket = {ticket}
                            tenant = {tenant}
                        >
                            <>
                                <div className="template-content">
                                    <Input
                                        className="template-title-input"
                                        bordered={false}
                                        onChange={(value) => setTitleValue(value.target.value)}
                                        value={titleValue}
                                        placeholder="标题"
                                    />
                                    <EditorBigContent
                                        value={editorValue}
                                        onChange={setEditorValue}
                                    />


                                </div>
                            </>

                        </EditorBig>
                    }
                </div>
            </Col>
        </Row>
    )
}

export default observer(TemplateEdit);
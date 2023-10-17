/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-09 09:18:21
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-13 13:13:00
 */
import React, { useEffect, useState, useRef } from "react";
import { withRouter } from "react-router-dom";
import "./MarkdownEdit.scss";
import { Markdown } from "tiklab-markdown-ui";
import Button from "../../../common/button/button";
import MarkdownStore from "../store/MarkdownStore";
import "tiklab-markdown-ui/es/tiklab-markdown.css";
import { Node } from "slate";
const MarkdownEdit = (props) => {
    const { findDocument, updateDocument } = MarkdownStore;
    const documentId = props.match.params.id;
    const [docInfo, setDocInfo] = useState({ name: "", likenumInt: "", commentNumber: "", master: { name: "" } });
    const repositoryId = props.match.params.repositoryId;
    const [value, setValue] = useState()
    const [titleValue, setTitleValue] = useState();
    const editRef = useRef(); 
    useEffect(() => {
        setValue()
        findDocument(documentId).then((data) => {
            if (data.code === 0) {
                if (data.data.details) {
                    setTitleValue(data.data.name)
                    const value = data.data.details;
                    setValue(JSON.parse(value))
                } else {
                    setValue( [{
                        type: 'code',
                        children: [
                            {
                                type: 'paragraph',
                                children: [
                                    {
                                        text:
                                            '**make** **decorations** to  it _dead_ simple .',
                                    },
                                ],
                            }
                        ]
                    }])
                }
                setDocInfo(data.data)
            }
        })

    }, [documentId])

    const save = () => {
        saveDocument(value)

        // editRef.current.submit()
    }
    const serialize = nodes => {
        const text =  nodes.map(n => Node.string(n)).join('\n');
        return text;
    }
    const saveDocument = (value) => {
        setValue(value)
        const serializeValue = serialize(value[0].children)
        console.log(serialize)
        const data = {
            id: documentId,
            details: JSON.stringify(value),
            detailText: serializeValue
        }
        updateDocument(data).then(res => {
            if (res.code === 0) {
                props.history.push(`/index/repositorydetail/${repositoryId}/markdownView/${documentId}`)
            }
        })
    }

    const changeTitle = (value) => {
        // setTitleValue(value.target.value)
        console.log(value)
        const data = {
            id: documentId,
            name: value.target.innerText
        }
        updateDocument(data).then(res => {
            if (res.code === 0) {
                console.log(res.code)
                document.getElementById("examine-title").innerHTML = value.target.innerText;
                document.getElementById("file-" + documentId).innerHTML = value.target.innerText
            }
        })
        setIsFocus(false)
        document.getElementById("examine-title").blur()
    }
    const [isFocus, setIsFocus] = useState()
    const keyDown = (event) => {
        
        if(event.keyCode === 13){
            event.stopPropagation();
            event.preventDefault()
            changeTitle(event)
        }
    }
    const focus = () => {
        document.getElementById("examine-title").focus()
        setIsFocus(true)
    }
    return (
        <div className="document-markdown-edit">
            <div className="edit-top">
                <div 
                    id="examine-title" 
                    contentEditable = {true} 
                    suppressContentEditableWarning
                    className={`edit-title ${isFocus ? "edit-title-focus" : ""}`}
                    onBlur={(event)=> changeTitle(event)}
                    onKeyDown={(event => keyDown(event))}
                    onClick={() => focus() }
                >{docInfo.name}</div>
                <div className="edit-right">
                    <Button type="primary" onClick={() => save()}>保存</Button>
                    <Button onClick={() => props.history.goBack()}>取消</Button>
                    <svg className="right-icon" aria-hidden="true">
                        <use xlinkHref="#icon-point"></use>
                    </svg>
                </div>
            </div>
            {
                value && <Markdown value = {value} setValue = {setValue}/>
            }



        </div>
    )
}
export default withRouter(MarkdownEdit);
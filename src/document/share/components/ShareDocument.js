/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-14 11:20:08
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-16 09:14:44
 */
/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-09 09:18:21
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-13 13:56:29
 */
import React, { useMemo, useEffect, useCallback, useState, useRef, Fragment } from "react";
import { inject, observer } from "mobx-react";
import { Row, Col, Input, Button } from 'antd';
import { PreviewEditor } from "tiklab-slate-ui"
import "./shareDocument.scss"
import Comment from "./CommentShare";
import { withRouter } from "react-router";
const ShareDocument = (props) => {
    const { shareStore } = props;

    const { documentView, commentView, judgeAuthCode } = shareStore;
    const [showComment, setShowComment] = useState(false);
    const [value, setValue] = useState([
        {
            type: "paragraph",
            children: [{ text: "" }],
        },
    ])
    const [docInfo, setDocInfo] = useState({ name: "", likenumInt: "", commentNumber: "" })

    const [commonList, setCommonList] = useState()
    useEffect(() => {
        const shareLink = new FormData();
        shareLink.append("shareLink", `${props.match.params.shareId}`)
        judgeAuthCode(shareLink).then(data => {
            // console.log(props.location.state)
            if (data.data === "true") {
                if (!props.location.state) {
                    window.location.href = `http://127.0.0.1:3004/#/passWord/${props.match.params.shareId}`
                } else {
                    commentView({ documentId: props.match.params.id }).then(data => {
                        console.log(data)
                        if (data.code === 0) {
                            setCommonList(data.data)
                        }
                    })
                    documentView({ documentId: props.match.params.id }).then((data) => {
                        if (data.code === 0) {
                            if (data.data.details) {
                                setValue(JSON.parse(data.data.details))
                                console.log()
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
                }
            }
            if (data.data === "false") {
                commentView({ documentId: props.match.params.id }).then(data => {
                    console.log(data)
                    if (data.code === 0) {
                        setCommonList(data.data)
                    }
                })
                documentView({ documentId: props.match.params.id }).then((data) => {
                    if (data.code === 0) {
                        if (data.data.details) {
                            setValue(JSON.parse(data.data.details))
                            console.log()
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
            }
        })

    }, [])
    return (
        <div className="document-share-examine">
            <Row style={{ height: "100%", flex: 1, overflow: "auto" }}>
                <Col className="repositorydetail-content-col" xl={{ span: 18, offset: 3 }} lg={{ span: 20, offset: 2 }}>
                    <div>
                        <div className="examine-title"><span className="examine-name">{docInfo.name}</span><span className="examine-type">类型：{docInfo.type === "doc" ? "文档" : "目录"}</span></div>
                        <PreviewEditor value={value} />
                    </div>

                </Col>
            </Row>
            {
                showComment && <Comment documentId={props.match.params.id} setShowComment={setShowComment} />
            }
            <div className="comment-box">
                <div className="comment-box-item" >
                    <span className="comment-item" onClick={() => setShowComment(!showComment)}>
                        <svg className="midden-icon" aria-hidden="true" >
                            <use xlinkHref="#icon-comments"></use>
                        </svg>
                    </span>
                </div>

            </div>
        </div>


    )
}

export default inject("shareStore")(observer(withRouter(ShareDocument)));
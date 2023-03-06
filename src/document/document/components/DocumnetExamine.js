/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-09 09:18:21
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-10-22 15:38:49
 */
import React, { useMemo, useEffect, useCallback, useState, useRef } from "react";
import { inject, observer } from "mobx-react";
import { Divider, Input, Button, Row, Col } from 'antd';
import { PreviewEditor } from "tiklab-slate-ui"
import "./documentExamine.scss"
import Share from "../../share/components/ShareDocument";
import { getUser } from "tiklab-core-ui";
import Comment from "../../common/Comment";
import DocumentAddEdit from "./DocumentAddEdit";


const DocumentExamine = (props) => {
    const { repositoryCommon, RepositoryCatalogueStore } = props;
    const documentId = props.match.params.id;
    const { findDocument } = RepositoryCatalogueStore;
    
    const { createComment, findCommentPage, createLike, createShare, updateShare } = repositoryCommon
    const [shareVisible, setShareVisible] = useState(false)

    const userId = getUser().userId;
    const [docInfo, setDocInfo] = useState({ name: "", likenumInt: "", commentNumber: "", master: { name: "" } })
    const [showComment, setShowComment] = useState(false);
    const repositoryId = props.match.params.repositoryId;
    const [like, setLike] = useState(false)
    const [title, seTitle] = useState()
    const [value, setValue] = useState()
    const [titleValue, setTitleValue] = useState(title);

    useEffect(() => {
        seTitle()
        setValue()
        findDocument(documentId).then((data) => {
            if (data.code === 0) {
                if (data.data.details) {
                    console.log("1")
                    setValue(JSON.parse(data.data.details))
                } else {
                    console.log("2")
                    setValue()
                }
                setDocInfo(data.data)
                seTitle(data.data.name)
                setLike(data.data.like)
            }
        })

    }, [documentId])



    // 点赞
    const addDocLike = () => {
        const data = {
            toWhomId: documentId,
            likeUser: { id: userId },
            likeType: "doc"
        }
        createLike(data).then(res => {
            if (res.code === 0) {
                setLike(true)

            }
        })
    }


    return (
        <div className="document-examine">
            <div className="examine-top">
                <div className="examine-title" id = "examine-title">{docInfo.name}</div>
                <div className="document-edit">
                    {
                        value && <svg className="user-icon" aria-hidden="true" onClick={() => props.history.push(`/index/repositorydetail/${repositoryId}/docEdit/${documentId}`)}>
                        <use xlinkHref="#icon-edit"></use>
                    </svg>
                    }
                    
                    <svg className="user-icon" aria-hidden="true">
                        <use xlinkHref="#icon-collection"></use>
                    </svg>
                    {/* <span className="comment-item">
                        <svg className="user-icon" aria-hidden="true" onClick={() => setShowComment(!showComment)}>
                            <use xlinkHref="#icon-comments"></use>
                        </svg>
                        {docInfo.commentNumber}
                    </span>
                    <span className="comment-item" onClick={addDocLike}>
                        {
                            like ? <svg className="user-icon" aria-hidden="true">
                                <use xlinkHref="#icon-zan"></use>
                            </svg> : <svg className="user-icon" aria-hidden="true">
                                <use xlinkHref="#icon-dianzan"></use>
                            </svg>
                        }
                        {docInfo.likenumInt}
                    </span> */}
                    <Button shape="round" style={{ backgroundColor: "#5d70ea", color: "#fff" }} onClick={() => setShareVisible(true)}> 分享</Button>
                    <svg className="right-icon" aria-hidden="true">
                        <use xlinkHref="#icon-point"></use>
                    </svg>
                </div>
            </div>
            {
                value ? <div className="document-examine-content">
                    <Row className="document-examine-row">
                        <Col xl={{ span: 18, offset: 3 }} lg={{ span: 18, offset: 3 }} md={{ span: 20, offset: 2 }}>
                            <div className="document-previeweditor">
                                <PreviewEditor value={value} onChange = {setValue}/>
                            </div>
                        </Col>
                    </Row>
                    {
                        showComment && <Comment documentId={documentId} setShowComment={setShowComment} />
                    }

                </div>
                :
                <DocumentAddEdit title = {title}/>
            }
            <div className="comment-box">
                <div className="comment-box-item top-item" >
                    <span className="comment-item">
                        <svg className="midden-icon" aria-hidden="true" onClick={() => setShowComment(!showComment)}>
                            <use xlinkHref="#icon-comments"></use>
                        </svg>
                    </span>
                </div>
                <div  className="comment-box-item">
                    <span className="comment-item" onClick={addDocLike}>
                    {
                        like ? <svg className="midden-icon" aria-hidden="true">
                            <use xlinkHref="#icon-zan"></use>
                        </svg> : <svg className="midden-icon" aria-hidden="true">
                            <use xlinkHref="#icon-dianzan"></use>
                        </svg>
                    }
                </span>
                </div>
                
            </div>

            <Share shareVisible={shareVisible} setShareVisible={setShareVisible} docInfo={docInfo} createShare={createShare} updateShare={updateShare} />
        </div>
    )
}

export default inject("repositoryCommon", "RepositoryCatalogueStore")(observer(DocumentExamine));
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
import Share from "./share";
import { getUser } from "tiklab-core-ui";
import Comment from "./comment";



const DocumentExamine = (props) => {
    const { wikiCommon, WikiCatalogueStore } = props;
    const documentId = localStorage.getItem("documentId");
    const { findDocument } = WikiCatalogueStore;
    const { createComment, findCommentPage, createLike, createShare, updateShare } = wikiCommon
    const [shareVisible, setShareVisible] = useState(false)
    
    const userId = getUser().userId;
    const [docInfo, setDocInfo] = useState({ name: "", likenumInt: "", commentNumber: "", master: { name: "" } })
    const [showComment, setShowComment] = useState(false);
    const wikiId = props.match.params.wikiId;
    const [like, setLike] = useState(false)
    
    const [value, setValue] = useState([
        {
            type: "paragraph",
            children: [{ text: "" }],
        },
    ])

    useEffect(() => {
        // const value = {
        //     documentId: documentId,
        //     pageParam: {
        //         pageSize: 1,
        //         currentPage: currentPage,
        //     }
        // }
        // findCommentPage(value).then(data => {
        //     if (data.code === 0) {
        //         console.log(data)
        //         setCommonList(data.data.dataList)
        //     }
        // })
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
            if(res.code === 0){
                setLike(true)
                
            }
        })
    }

    
    return (
        <div className="document-examine">
            <div className="examine-top">
                <div className="examine-title">{docInfo.name}</div>
                <div className="document-edit">
                    <svg className="user-icon" aria-hidden="true" onClick={() => props.history.push(`/index/wikidetail/${wikiId}/docEdit/${documentId}`)}>
                        <use xlinkHref="#icon-edit"></use>
                    </svg>
                    <svg className="user-icon" aria-hidden="true">
                        <use xlinkHref="#icon-shou"></use>
                    </svg>
                    <span className="comment-item">
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
                    </span>

                    <div className="inline"></div>
                    <Button shape="round" style={{ backgroundColor: "#5d70ea", color: "#fff" }} onClick={() => setShareVisible(true)}> 分享</Button>
                    <svg className="right-icon" aria-hidden="true">
                        <use xlinkHref="#icon-point"></use>
                    </svg>
                </div>
            </div>
            <div className="document-examine-content">
                <Row className="document-examine-row">
                    <Col xl={{ span: 18, offset: 3 }} lg={{ span: 18, offset: 3 }} md={{ span: 20, offset: 2 }}>
                        <div className="document-previeweditor">
                            <PreviewEditor value={value} />
                        </div>
                    </Col>
                </Row>
                {
                    showComment && <Comment documentId = {documentId} setShowComment = {setShowComment}/>
                }
                
            </div>
            
            <Share shareVisible={shareVisible} setShareVisible={setShareVisible} docInfo={docInfo} createShare={createShare} updateShare={updateShare} />
        </div>
    )
}

export default inject("wikiCommon", "WikiCatalogueStore")(observer(DocumentExamine));
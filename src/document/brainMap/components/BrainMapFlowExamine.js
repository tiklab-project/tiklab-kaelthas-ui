/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-09 09:18:21
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-10-22 15:38:49
 */
import React, { useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { Divider, Input, Button, Row, Col } from 'antd';
import "./brainMapFlowExamine.scss"
import Share from "../../common/Share";
import BrainMapFlowRead from "./BrainMapFlowRead"
import { getUser } from "tiklab-core-ui";
import Comment from "../../common/Comment";

const BrainMapExamine = (props) => {
    const { repositoryCommon, RepositoryCatalogueStore } = props;
    const documentId = localStorage.getItem("documentId");
    const { createComment, findCommentPage, createLike, createShare, updateShare, } = repositoryCommon;
    const { docDetail, findDocument } = RepositoryCatalogueStore;
    const [shareVisible, setShareVisible] = useState(false)
    const [commonList, setCommonList] = useState()
    const repositoryId = props.match.params.repositoryId;
    const [docInfo, setDocInfo] = useState({ name: "", likenumInt: "", commentNumber: "", master: { name: "" } })
    const [like, setLike] = useState(false)
    const userId = getUser().userId;
    const [showComment, setShowComment] = useState(false)
    const [graphData, setGraphData] = useState()
    useEffect(() => {
        findCommentPage({ documentId: documentId }).then(data => {
            if (data.code === 0) {
                setCommonList(data.data.dataList)
            }
        })
        findDocument(documentId).then((data) => {
            if (data.code === 0) {
                if (data.data.details) {
                    setGraphData({ ...JSON.parse(data.data.details) })
                } else {
                    setGraphData({ nodes: [], edges: [] })
                }
                setDocInfo(data.data)
                setLike(data.data.like)
            }
        })
        return
    }, [documentId])

    const [commontContent, setCommontContent] = useState()
    const commonInput = (value) => {
        setCommontContent(value.target.value)
    }
    const announce = () => {
        const data = {
            document: {
                id: documentId
            },
            details: commontContent,
            user: { id: userId }
        }
        createComment(data).then(data => {
            findCommentPage({ documentId: documentId }).then(data => {
                console.log(data)
                if (data.code === 0) {
                    setCommonList(data.data.dataList)
                }
            })
        })
    }
    //回复评论
    const [reply, setReply] = useState()

    const announceReply = (id) => {
        const data = {
            firstOneCommentId: id,
            parentCommentId: id,
            document: {
                id: documentId
            },
            details: commontContent,
            user: { id: userId }
        }
        createComment(data).then(data => {
            findCommentPage({ documentId: documentId }).then(data => {
                console.log(data)
                if (data.code === 0) {
                    setReply(null)
                    setCommonList(data.data.dataList)
                }
            })
        })
    }

    const [childrenReply, setChildrenReply] = useState()
    const announceThirdReply = (firstOneCommentId, parentCommentId) => {
        const data = {
            firstOneCommentId: firstOneCommentId,
            parentCommentId: parentCommentId,
            document: {
                id: documentId
            },
            details: commontContent,
            user: { id: userId }
        }
        createComment(data).then(data => {
            findCommentPage({ documentId: documentId }).then(data => {
                console.log(data)
                if (data.code === 0) {
                    setChildrenReply(null)
                    setCommonList(data.data.dataList)
                }
            })
        })
    }

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
        <div className="mindmap-examine">
            <div className="examine-top">
                <div className="examine-title">{docInfo.name}</div>
                <div className="mindmap-right">
                    <svg className="icon-svg" aria-hidden="true" onClick={() => props.history.push(`/index/repositorydetail/${repositoryId}/mindmapEdit/${documentId}`)}>
                        <use xlinkHref="#icon-edit"></use>
                    </svg>
                    <svg className="icon-svg" aria-hidden="true">
                        <use xlinkHref="#icon-shou"></use>
                    </svg>
                    <span className="comment-item">
                        <svg className="icon-svg" aria-hidden="true" onClick={() => setShowComment(!showComment)}>
                            <use xlinkHref="#icon-comments"></use>
                        </svg>
                        {docInfo.commentNumber}
                    </span>

                    <span className="comment-item" onClick={addDocLike}>
                        {
                            like ? <svg className="icon-svg" aria-hidden="true">
                                <use xlinkHref="#icon-zan"></use>
                            </svg> : <svg className="icon-svg" aria-hidden="true">
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
            <div className="mindmap-examine-content">
                <Row className="mindmap-examine-row">
                    <Col xl={{ span: 18, offset: 3 }} lg={{ span: 18, offset: 3 }} md={{ span: 20, offset: 2 }}>
                        <div className="mindmap-previeweditor">
                            <BrainMapFlowRead graphData={graphData} />
                        </div>
                    </Col>
                </Row>
                {
                    showComment && <Comment documentId={documentId} setShowComment={setShowComment} />
                }

            </div>
            <Share shareVisible={shareVisible} setShareVisible={setShareVisible} docInfo={docInfo} createShare={createShare} updateShare={updateShare} />
        </div>
    )
}

export default inject("repositoryCommon", "RepositoryCatalogueStore")(observer(BrainMapExamine));
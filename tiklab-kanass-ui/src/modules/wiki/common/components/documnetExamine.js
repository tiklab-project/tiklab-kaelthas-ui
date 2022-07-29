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
const DocumentExamine = (props) => {
    const { wikiCommon, WikiCatalogueStore } = props;
    const documentId = localStorage.getItem("documentId");
    const { docDetail, setDocDetail, updateDocument, findDocument } = WikiCatalogueStore;
    const { createComment, findCommentPage, createLike, createShare, updateShare } = wikiCommon
    const [shareVisible, setShareVisible] = useState(false)
    const [commonList, setCommonList] = useState()
    const userId = getUser().userId;
    const [docInfo, setDocInfo] = useState({ name: "", likenumInt: "", commentNumber: "", master: { name: "" } })
    const wiki = JSON.parse(localStorage.getItem("wiki"));
    const [showComment, setShowComment] = useState(false)
    const [value, setValue] = useState([
        {
            type: "paragraph",
            children: [{ text: "" }],
        },
    ])

    useEffect(() => {
        findCommentPage({ documentId: documentId }).then(data => {
            if (data.code === 0) {
                setCommonList(data.data)
            }
        })
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
            }
        })

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
                    setCommonList(data.data)
                    setCommontContent("")
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
                    setCommonList(data.data)
                    setCommontContent("")
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
                    setCommonList(data.data)
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
        createLike(data)
    }
    return (
        <div className="document-examine">
            <div>
                <div className="examine-title">
                    <div>{wiki.name}</div>
                    <div className="document-edit">
                        <svg className="user-icon" aria-hidden="true" onClick={() => props.history.push(`/index/wikidetail/docEdit/${documentId}`)}>
                            <use xlinkHref="#icon-edit"></use>
                        </svg>
                        <svg className="user-icon" aria-hidden="true">
                            <use xlinkHref="#icon-shou"></use>
                        </svg>
                        <svg className="user-icon" aria-hidden="true">
                            <use xlinkHref="#icon-comments"></use>
                        </svg>
                        <span className="comment-item" onClick={addDocLike}>
                            { 
                                docInfo.isLike ? <svg className="user-icon" aria-hidden="true">
                                <use xlinkHref="#icon-zan"></use>
                                </svg> : <svg className="user-icon" aria-hidden="true">
                                    <use xlinkHref="#icon-dianzan"></use>
                                </svg>
                            }
                        </span>
                        
                        <div className="inline"></div>
                        <Button shape="round" style={{backgroundColor: "#5d70ea", color: "#fff"}} onClick={() => setShareVisible(true)}> 分享</Button>
                        <svg className="right-icon" aria-hidden="true">
                            <use xlinkHref="#icon-point"></use>
                        </svg>
                    </div>
                </div>
                <Row>
                    <Col xl={{ span: 16, offset: 4 }} lg={{ span: 20, offset: 2 }} md={{ span: 20, offset: 2 }}>
                        <div className="document-info">
                            <div className="document-info-name">{docInfo.name}</div>
                           
                            <div className="document-info-detail">
                                <svg className="user-icon" aria-hidden="true">
                                    <use xlinkHref="#icon-user5"></use>
                                </svg>
                                <div className="document-info-right">
                                    <div className="document-info-creater">创建者：{docInfo ? docInfo.master.name : ""}</div>
                                    <div className="document-updata-date">最近更新日期：{docInfo ? docInfo.updateTime : ""}</div>
                                </div>

                            </div>
                        </div>
                        <PreviewEditor value={value} />
                    </Col>
                </Row>
                <Divider />
                <div className="examine-comment" >
                    <span className="comment-item" onClick={addDocLike}>
                        { docInfo.isLike ? <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-dianzan"></use>
                        </svg> : <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-dianzan"></use>
                        </svg>}
                        <span className="number">({docInfo.likenumInt || 0}条)</span>
                    </span>
                    <span className="comment-item" onClick={()=> setShowComment(!showComment)}>
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-comments"></use>
                        </svg>
                        <span className="number">({docInfo.commentNumber || 0}条)</span>
                    </span>
                </div>
                
                <div className={showComment ? "show-comment" : "hidden-comment"}>
                    <div className="edit-comment">
                        <svg className="user-icon" aria-hidden="true">
                            <use xlinkHref="#icon-user5"></use>
                        </svg>
                        <Input placeholder="请输入评论" value={commontContent} onChange={value => commonInput(value)} />
                        <Button type="primary" onClick={() => announce()}>发布</Button>
                    </div>
                    <div className="comment-list">
                        <div className="title">评论({docInfo.commentNumber || 0}条)</div>
                        {
                            commonList && commonList.map(item => {
                                return <div className="comment-item" key={item.id}>
                                    <div className="comment-user">
                                        <svg className="user-icon" aria-hidden="true">
                                            <use xlinkHref="#icon-user5"></use>
                                        </svg>
                                        <span className="user-name">{item.user.name}</span>
                                    </div>
                                    <div className="comment-content">
                                        {item.details}
                                    </div>
                                    <div className="comment-operate">
                                        <span>编辑</span>
                                        <span>删除</span>
                                        <span onClick={() => setReply(item.id)}>回复</span>
                                        <span>赞</span>
                                    </div>
                                    <div className={`edit-comment ${reply === item.id ? "edit-comment-show" : "edit-comment-hidden"}`}>
                                        <svg className="user-icon" aria-hidden="true">
                                            <use xlinkHref="#icon-user5"></use>
                                        </svg>
                                        <Input placeholder="请输入评论" value={commontContent} onChange={value => commonInput(value)} />
                                        <Button type="primary" onClick={() => announceReply(item.id)}>发布</Button>
                                    </div>
                                    {
                                        item.commentList && item.commentList.map(children => {
                                            return <div className="comment-item commnet-children-item" key={children.id}>
                                                <div className="comment-user">
                                                    <svg className="user-icon" aria-hidden="true">
                                                        <use xlinkHref="#icon-user5"></use>
                                                    </svg>
                                                    <span className="user-name">{children.user.name}回复了：{children.aimAtUser.name}</span>
                                                </div>
                                                <div className="comment-content">
                                                    {children.details}
                                                </div>
                                                <div className="comment-operate">
                                                    <span>编辑</span>
                                                    <span>删除</span>
                                                    <span onClick={() => setChildrenReply(children.id)}>回复</span>
                                                    <span>赞</span>
                                                </div>
                                                <div className={`edit-comment ${childrenReply === children.id ? "edit-comment-show" : "edit-comment-hidden"}`}>
                                                    <svg className="user-icon" aria-hidden="true">
                                                        <use xlinkHref="#icon-user5"></use>
                                                    </svg>
                                                    <Input placeholder="请输入评论" onChange={value => commonInput(value)} />
                                                    <Button type="primary" onClick={() => announceThirdReply(item.id, children.id)}>发布</Button>
                                                </div>
                                            </div>

                                        })
                                    }
                                </div>
                            })
                        }
                    </div>
                </div>

            </div>
            <Share shareVisible={shareVisible} setShareVisible={setShareVisible} docInfo={docInfo} createShare={createShare} updateShare={updateShare} />
        </div>
    )
}

export default inject("wikiCommon", "WikiCatalogueStore")(observer(DocumentExamine));
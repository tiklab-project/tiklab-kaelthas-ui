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
import moment from "moment";
import { get } from "mobx";
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
    // const [currentPage, setCurrentPage] = useState(1)
    let currentPage = 1;
    const [value, setValue] = useState([
        {
            type: "paragraph",
            children: [{ text: "" }],
        },
    ])

    useEffect(() => {
        const value = {
            documentId: documentId,
            pageParam: {
                pageSize: 1,
                currentPage: currentPage,
            }
        }
        findCommentPage(value).then(data => {
            if (data.code === 0) {
                setCommonList(data.data.dataList)
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
        const value = {
            document: {
                id: documentId
            },
            details: commontContent,
            user: { id: userId },
            
        }
        createComment(value).then(data => {
            const newCommon = {...value, createTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),id: data, user: { name: getUser().name }}
            commonList.unshift(newCommon)
            setCommonList([...commonList])
            // findCommentPage({ documentId: documentId }).then(data => {
            //     console.log(data)
            //     if (data.code === 0) {
            //         setCommonList(data.data)
            //         setCommontContent("")
            //     }
            // })
        })
    }
    //回复评论
    const [reply, setReply] = useState()

    const announceReply = (id) => {
        const value = {
            firstOneCommentId: id,
            parentCommentId: id,
            document: {
                id: documentId
            },
            details: commontContent,
            user: { id: userId },

        }
        createComment(value).then(data => {
            // findCommentPage({ documentId: documentId }).then(data => {
            //     console.log(data)
            //     if (data.code === 0) {
            //         setReply(null)
            //         setCommonList(data.data)
            //         setCommontContent("")
            //     }
            // })
            const list = commonList.unshift(value)
            setCommonList(list)

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

    const nextPageCommon = () => {
        const data ={
            documentId: documentId,
            pageParam: {
                pageSize: 1,
                currentPage: ++currentPage,
            }
        }
        findCommentPage(data).then(data => {
            if (data.code === 0) {
                const list = commonList.concat(data.data.dataList)
                    setCommonList(list)
                }
            })
        }

    return (
        <div className="document-examine">
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
                    <Button shape="round" style={{ backgroundColor: "#5d70ea", color: "#fff" }} onClick={() => setShareVisible(true)}> 分享</Button>
                    <svg className="right-icon" aria-hidden="true">
                        <use xlinkHref="#icon-point"></use>
                    </svg>
                </div>
            </div>
            <Row className="document-examine-content">
                <Col xl={{ span: 16, offset: 4 }} lg={{ span: 20, offset: 2 }} md={{ span: 20, offset: 2 }}>
                    <div className="document-info">
                        <div className="document-info-top">
                            <div className="document-info-name">{docInfo.name}</div>
                            <div>{docInfo.updateTime}</div>
                        </div>

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
                    <div className="document-previeweditor" style={{border: "1px solid #E5E8FF"}}>
                        <PreviewEditor value={value} />
                    </div>
                    
                    <div className="examine-comment" >
                        <span className="comment-item" onClick={addDocLike}>
                            {docInfo.isLike ? <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-dianzan"></use>
                            </svg> : <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-dianzan"></use>
                            </svg>}
                            <span className="number">({docInfo.likenumInt || 0}条)</span>
                        </span>
                        <span className="comment-item" onClick={() => setShowComment(!showComment)}>
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-comments"></use>
                            </svg>
                            <span className="number">({docInfo.commentNumber || 0}条)</span>
                        </span>
                    </div>
                    {/* //className={showComment ? "show-comment" : "hidden-comment"} */}
                    <div className={"show-comment"}>
                        
                        <div className="comment-list">
                            <div className="edit-comment">
                                <svg className="user-icon" aria-hidden="true">
                                    <use xlinkHref="#icon-user5"></use>
                                </svg>
                                <Input placeholder="请输入评论" value={commontContent} onChange={value => commonInput(value)} />
                                <Button type="primary" onClick={() => announce()}>发布</Button>
                            </div>
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
                                            <div>
                                                {item.createTime}
                                            </div>
                                            <div>
                                                <span>编辑</span>
                                                <span>删除</span>
                                                <span onClick={() => setReply(item.id)}>回复</span>
                                                <span>赞</span>
                                            </div>
                                            
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
                            <div className="comment-more-botton" onClick={()=> nextPageCommon()}>查看更多...</div>
                        </div>
                    </div>
                </Col>
            </Row>
            <Share shareVisible={shareVisible} setShareVisible={setShareVisible} docInfo={docInfo} createShare={createShare} updateShare={updateShare} />
        </div>
    )
}

export default inject("wikiCommon", "WikiCatalogueStore")(observer(DocumentExamine));
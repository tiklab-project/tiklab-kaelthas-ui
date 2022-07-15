/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-09 09:18:21
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-10-22 15:38:49
 */
import React, { useEffect, useState, Fragment } from "react";
import { inject, observer } from "mobx-react";
import { SafeArea, Input, Button } from 'antd-mobile';
import { PreviewEditor } from "doublekit-slate-h5-ui";
import "./documentView.scss";
import DocumentShare from "./documentShare"
const DocumentView = (props) => {
    const { documentCommon, wikiCategoryStore } = props;
    const documentId = props.match.params.id;
    const { createComment, findCommentPage, createLike,updateComment,deleteComment } = documentCommon;
    const { findDocument } = wikiCategoryStore;
    const [shareVisible, setShareVisible] = useState(false)
    const [commonList, setCommonList] = useState()
    const [editId, setEditId] = useState()
    const [editDetail, setEditDetail] = useState()
    // const {shareVisible,setShareVisible} = props;
    const [value, setValue] = useState([
        {
            type: "paragraph",
            children: [{ text: "111" }],
        },
    ])
    const [docInfo, setDocInfo] = useState({ name: "", likenumInt: "", commentNumber: "" })

    useEffect(() => {
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
        findCommentPage({ documentId: documentId }).then(data => {
            if (data.code === 0) {
                setCommonList(data.data)
            }
        })
    }, [documentId])

    const [commontContent, setCommontContent] = useState()
    const commonInput = (value) => {
        // console.log(value)
        setCommontContent(value)
    }
    const announce = () => {
        console.log(commontContent)
        const data = {
            document: {
                id: documentId
            },
            details: commontContent,
            user: { id: "111111" }
        }
        createComment(data).then(data => {
            findCommentPage({ documentId: documentId }).then(data => {
                console.log(data)
                if (data.code === 0) {
                    setCommonList(data.data)
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
            user: { id: "111111" }
        }
        createComment(data).then(data => {
            findCommentPage({ documentId: documentId }).then(data => {
                console.log(data)
                if (data.code === 0) {
                    setReply(null)
                    setCommonList(data.data)
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
            user: { id: "111111" }
        }
        createComment(data).then(data => {
            findCommentPage({ documentId: documentId }).then(data => {
                console.log(data)
                if (data.code === 0) {
                    setReply(null)
                    setCommonList(data.data)
                }
            })
        })
    }

    // 点赞
    const addDocLike = () => {
        const data = {
            toWhomId: documentId,
            likeUser: { id: "111111" },
            likeType: "doc"
        }
        createLike(data)
    }
    const showEdit = (id, details) => {
        setEditId(id)
        setCommontContent(details)
    }

    // 更新评论
    const updateCommon = () => {
        const params = {
            id: editId,
            document: {
                id: documentId
            },
            details: commontContent,
            user: { id: "111111" }
        }
        updateComment(params).then(data => {
            if(data.code === 0){
                setEditId()
                setCommontContent()
                document.getElementById(`comment${editId}`).innerHTML = commontContent
            }
        })
    }

    const deleteCommnet = (commnetId) => {
        deleteComment(commnetId).then(data => {
            if(data.code === 0){
                findCommentPage({ documentId: documentId }).then(data => {
                    if (data.code === 0) {
                        setCommonList(data.data)
                    }
                })
            }
        })
    }
    return (
        <div className="document-examine">
            <div style={{ background: '#ace0ff' }}>
                <SafeArea position='top' />
            </div>
            <div className="category-top">
                <div className="category-top-left">
                    <svg className="category-icon-logo" aria-hidden="true" onClick={() => props.history.goBack()}>
                        <use xlinkHref="#icon-left"></use>
                    </svg>
                    <div className="category-title">{"目录"}</div>
                </div>
                <div className="category-top-right" onClick={() => props.history.push(`/documentedit/${documentId}`)}>
                    <svg className="category-icon-add" aria-hidden="true">
                        <use xlinkHref="#icon-edit"></use>
                    </svg>
                </div>
            </div>
            <div style={{ padding: "10px" }}>
                <div className="examine-title">{docInfo.name}<span className="examine-type">类型: 文档</span></div>
                <PreviewEditor value={value} />
                <div className="examine-comment" >
                    <span className="comment-item" onClick={addDocLike}>
                        {docInfo.isLike ? <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-zhanfalse"></use>
                        </svg> : <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-zhanis"></use>
                        </svg>}
                        <span className="number">({docInfo.likenumInt || 0}条)</span>
                    </span>
                    <span className="comment-item" >
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-common"></use>
                        </svg>
                        <span className="number">({docInfo.commentNumber || 0}条)</span>
                    </span>
                    <span className="comment-item" onClick={() => setShareVisible(true)}>
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-share"></use>
                        </svg>
                    </span>
                </div>
                <div className="edit-comment">
                    <svg className="user-icon" aria-hidden="true">
                        <use xlinkHref="#icon-touxiang"></use>
                    </svg>
                    <Input placeholder="请输入评论" onChange={value => commonInput(value)} />
                    <Button color='primary' size='small' onClick={() => announce()}>发布</Button>
                </div>
                <div className="comment-list">
                    <div className="title">评论({docInfo.commentNumber || 0}条)</div>
                    {
                        commonList && commonList.map(item => {
                            return <div className="comment-item" key={item.id}>
                                <div className="comment-user">
                                    <svg className="user-icon" aria-hidden="true">
                                        <use xlinkHref="#icon-touxiang"></use>
                                    </svg>
                                    <span className="user-name">{item.user.name}</span>
                                </div>
                                {
                                    editId === item.id ? <Fragment>
                                        <div >
                                            <Input 
                                                placeholder="请输入评论" 
                                                // onChange={value => commonInput(value)} 
                                                value = {commontContent}
                                                className = "comment-content"
                                                onChange = {(value) => setCommontContent(value)}
                                            />
                                            <div className="comment-operate" type="primary" onClick={() => updateCommon(item.id)}>确定</div>
                                        </div>
                                        
                                    </Fragment>:
                                    <Fragment>
                                        <div className="comment-content" id={`comment${item.id}`}>
                                            {item.details}
                                        </div>
                                        <div className="comment-operate">
                                            <span onClick={() => showEdit(item.id,item.details)}>编辑</span>
                                            <span onClick={() => deleteCommnet(item.id)} >删除</span>
                                            <span onClick={() => setReply(item.id)}>回复</span>
                                            <span>赞</span>
                                        </div>
                                        <div className={`edit-comment ${reply === item.id ? "edit-comment-show" : "edit-comment-hidden"}`}>
                                            <svg className="user-icon" aria-hidden="true">
                                                <use xlinkHref="#icon-touxiang"></use>
                                            </svg>
                                            <Input placeholder="请输入评论" onChange={value => commonInput(value)} />
                                            <Button color='primary' size='small'onClick={() => announceReply(item.id)}>发布</Button>
                                            <Button size='small'onClick={() => setReply()} style={{marginLeft: "10px"}}>取消</Button>
                                        </div>
                                    </Fragment>
                                }
                                

                                {
                                    item.commentList && item.commentList.map(children => {
                                        return <div className="comment-item commnet-children-item" key={children.id}>
                                            <div className="comment-user">
                                                <svg className="user-icon" aria-hidden="true">
                                                    <use xlinkHref="#icon-touxiang"></use>
                                                </svg>
                                                <span className="user-name">{children.user.name}回复了：{children.aimAtUser.name}</span>
                                            </div>
                                            <div className="comment-content">
                                                {children.details}
                                            </div>
                                            <div className="comment-operate">
                                                <span>编辑</span>
                                                <span onClick={() => deleteCommnet(children.id)}>删除</span>
                                                <span onClick={() => setReply(children.id)}>回复</span>
                                                <span>赞</span>
                                            </div>
                                            <div className={`edit-comment ${reply === children.id ? "edit-comment-show" : "edit-comment-hidden"}`}>
                                                <svg className="user-icon" aria-hidden="true">
                                                    <use xlinkHref="#icon-touxiang"></use>
                                                </svg>
                                                <Input placeholder="请输入评论" onChange={value => commonInput(value)} />
                                                <Button color='primary' size='small' onClick={() => announceThirdReply(item.id, children.id)}>发布</Button>
                                                <Button size='small'onClick={() => setReply()} style={{marginLeft: "10px"}}>取消</Button>
                                            </div>
                                        </div>

                                    })
                                }
                            </div>
                        })
                    }
                </div>
                <DocumentShare shareVisible = {shareVisible} setShareVisible = {setShareVisible} {...props}/>
            </div>
            
        </div>
    )
}

export default inject("documentCommon", "wikiCategoryStore")(observer(DocumentView));
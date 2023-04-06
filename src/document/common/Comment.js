
import React, { useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { Input, Empty, message } from "antd";
import Button from "../../common/button/button";
import "./comment.scss"
import { getUser } from "tiklab-core-ui";
import moment from "moment";

const Comment = (props) => {
    const { repositoryCommon, documentId, setShowComment } = props;
    const { createComment, findCommentPage, deleteComment } = repositoryCommon;
    const [commentFirstContent, setCommentFirstContent] = useState();
    const [commentSecondContent, setCommentSecondContent] = useState();
    const [commentThirdContent, setCommentThirdContent] = useState();
    const [commentList, setCommentList] = useState();
    const userId = getUser().userId;
    const userName = getUser().name;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0)
    useEffect(() => {
        const value = {
            documentId: documentId,
            pageParam: {
                pageSize: 10,
                currentPage: currentPage,
            }
        }
        findCommentPage(value).then(data => {
            if (data.code === 0) {
                setCommentList(data.data.dataList)
                setTotalPage(data.data.totalPage)
            }
        })
    }, [documentId])



    const announce = () => {
        if (commentFirstContent) {
            const value = {
                document: {
                    id: documentId
                },
                details: commentFirstContent,
                user: { id: userId, name: userName }
            }
            createComment(value).then(data => {
                if (data.code === 0) {
                    value.id = data.data
                    value.commentList = []
                    const newCommon = { ...value, createTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'), id: data, user: { name: getUser().name } }
                    commentList.unshift(newCommon)
                    setCommentList([...commentList])
                    setCommentFirstContent(null)
                }

            })
        } else {
            message.info("请输入内容")
        }

    }
    //回复评论
    const [reply, setReply] = useState()

    const announceReply = (id, index, aimAtUser) => {
        if (commentSecondContent) {
            const value = {
                firstOneCommentId: id,
                parentCommentId: id,
                document: {
                    id: documentId
                },
                details: commentSecondContent,
                user: { id: userId, name: userName },
                aimAtUser: aimAtUser
            }
            createComment(value).then(data => {
                if (data.code === 0) {
                    setReply(null)
                    value.id = data.data
                    commentList[index].commentList.unshift(value)
                    setCommentList([...commentList])
                    setCommentSecondContent(null)
                }

            })
        } else {
            message.info("请输入内容")
        }

    }

    const [childrenReply, setChildrenReply] = useState()
    const announceThirdReply = (firstOneCommentId, parentCommentId, index, aimAtUser) => {
        if (commentThirdContent) {
            const value = {
                firstOneCommentId: firstOneCommentId,
                parentCommentId: parentCommentId,
                document: {
                    id: documentId
                },
                details: commentThirdContent,
                user: { id: userId, name: userName },
                aimAtUser: aimAtUser
            }
            createComment(value).then(data => {
                if (data.code === 0) {
                    value.id = data.data
                    setChildrenReply(null)
                    commentList[index].commentList.unshift(value)
                    setCommentList([...commentList])
                    setCommentThirdContent(null)
                }
            })
        }else {
            message.info("请输入内容")
        }

    }


    const nextPageCommon = () => {
        const page = currentPage + 1;
        setCurrentPage(page)
        const data = {
            documentId: documentId,
            pageParam: {
                pageSize: 1,
                currentPage: page,
            }
        }

        findCommentPage(data).then(data => {
            if (data.code === 0) {
                const list = commentList.concat(data.data.dataList)
                setCommentList(list)
                setTotalPage(data.data.totalPage)
            }
        })
    }

    const deleteFirst = (id) => {
        deleteComment({ id: id }).then(res => {
            if (res.code === 0) {
                const list = commentList.filter((item) => item.id !== id);
                setCommentList(list)
            }
        })
    }

    const deleteSecond = (fid, id) => {
        deleteComment({ id: id }).then(res => {
            if (res.code === 0) {
                const list = commentList[fid].commentList.filter((item) => item.id !== id);
                commentList[fid].commentList = list;
                setCommentList([...commentList])
            }
        })
    }
    return (
        <div className="comment">
            <div className="comment-top">
                <span className="comment-title">评论</span>
                <svg className="svg-icon" aria-hidden="true" onClick={() => setShowComment(false)}>
                    <use xlinkHref="#icon-close"></use>
                </svg>
            </div>
            <div className="comment-list">
                <div className="edit-comment">
                    <svg className="icon-svg" aria-hidden="true">
                        <use xlinkHref="#icon-user5"></use>
                    </svg>
                    <Input placeholder="请输入评论" value={commentFirstContent} onChange={value => setCommentFirstContent(value.target.value)} />
                    <Button type="primary" onClick={() => announce()} disable={commentSecondContent}>发布</Button>
                </div>
                {
                    commentList && commentList.length > 0 ? <>
                        {
                            commentList && commentList.map((item, index) => {
                                return <div className="comment-item" key={item.id}>
                                    <div className="comment-user">
                                        <svg className="icon-svg" aria-hidden="true">
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
                                            <span className="comment-edit">编辑</span>
                                            <span onClick={() => deleteFirst(item.id)} className="comment-delete">删除</span>
                                            <span onClick={() => setReply(item.id)} className="comment-reply">回复</span>
                                            <span className="comment-like">赞</span>
                                        </div>

                                    </div>
                                    <div className={`edit-comment ${reply === item.id ? "edit-comment-show" : "edit-comment-hidden"}`}>
                                        <svg className="icon-svg" aria-hidden="true">
                                            <use xlinkHref="#icon-user5"></use>
                                        </svg>
                                        <Input placeholder="请输入评论" value={commentSecondContent} onChange={value => setCommentSecondContent(value.target.value)} />
                                        <Button type="primary" onClick={() => announceReply(item.id, index, item.user)} disable={commentSecondContent}>发布</Button>
                                    </div>
                                    {
                                        item.commentList && item.commentList.map((children, childrenIndex) => {
                                            return <div className="comment-item commnet-children-item" key={children.id}>
                                                <div className="comment-user">
                                                    <svg className="icon-svg" aria-hidden="true">
                                                        <use xlinkHref="#icon-user5"></use>
                                                    </svg>
                                                    <span className="user-name">{children.user.name}回复了：{children.aimAtUser.name}</span>
                                                </div>
                                                <div className="comment-content">
                                                    {children.details}
                                                </div>
                                                <div className="comment-operate">
                                                    <span className="comment-edit">编辑</span>
                                                    <span className="comment-delete" onClick={() => deleteSecond(index, children.id)}>删除</span>
                                                    <span className="comment-reply" onClick={() => setChildrenReply(children.id)}>回复</span>
                                                    <span className="comment-like">赞</span>
                                                </div>
                                                <div className={`edit-comment ${childrenReply === children.id ? "edit-comment-show" : "edit-comment-hidden"}`}>
                                                    <svg className="icon-svg" aria-hidden="true">
                                                        <use xlinkHref="#icon-user5"></use>
                                                    </svg>
                                                    <Input placeholder="请输入评论" value={commentThirdContent} onChange={value => setCommentThirdContent(value.target.value)} />
                                                    <Button type="primary" disable={commentThirdContent} onClick={() => announceThirdReply(item.id, children.id, index, children.user)}>发布</Button>
                                                </div>
                                            </div>

                                        })
                                    }

                                </div>
                            })
                        }
                        {
                            totalPage > 1 && currentPage < totalPage && <div className="comment-more-botton" onClick={() => nextPageCommon()}>查看更多...</div>
                        }
                    </>
                        :
                        <Empty image="/images/nodata.png" description="暂时没有评价~" />
                }


            </div>
        </div>
    )
}

export default inject("repositoryCommon")(observer(Comment));
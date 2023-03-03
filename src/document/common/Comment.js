
import React, { useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { Input, Empty } from "antd";
import Button from "../../common/button/button";
import "./comment.scss"
import { getUser } from "tiklab-core-ui";
import moment from "moment";

const Comment = (props) => {
    const { wikiCommon, documentId, setShowComment } = props;
    const { createComment, findCommentPage } = wikiCommon;
    const [commontContent, setCommontContent] = useState();
    const [commonList, setCommonList] = useState();
    const userId = getUser().userId;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0)
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
                console.log(data)
                setCommonList(data.data.dataList)
                setTotalPage(data.data.totalPage)
            }
        })
    }, [documentId])


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
            const newCommon = { ...value, createTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'), id: data, user: { name: getUser().name } }
            commonList.unshift(newCommon)
            setCommonList([...commonList])
            setCommontContent(null)
            console.log(commonList)
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
                const list = commonList.concat(data.data.dataList)
                setCommonList(list)
                setTotalPage(data.data.totalPage)
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
                    <svg className="user-icon" aria-hidden="true">
                        <use xlinkHref="#icon-user5"></use>
                    </svg>
                    <Input placeholder="请输入评论" value={commontContent} onChange={value => commonInput(value)} />
                    <Button type="primary" onClick={() => announce()}>发布</Button>
                </div>
                {
                    commonList && commonList.length > 0 ? <>
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

export default inject("wikiCommon")(observer(Comment));
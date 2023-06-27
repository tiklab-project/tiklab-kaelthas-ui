
import React, { useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { Empty } from "antd";
import "./CommentShare.scss"
const Comment = (props) => {
    const { commentStore, documentId, setShowComment, shareStore } = props;
    const { findCommentPage } = commentStore;
    const { commentView } = shareStore;
    const [commonList, setCommonList] = useState();
    const [currentPage, setCurrentPage] = useState(10);
    const [totalPage, setTotalPage] = useState(0)
    useEffect(() => {
        const value = {
            documentId: documentId,
            pageParam: {
                pageSize: 1,
                currentPage: currentPage,
            }
        }
        commentView(value).then(data => {
            if (data.code === 0) {
                console.log(data)
                setCommonList(data.data)
                setTotalPage(data.data.totalPage)
            }
        })
    }, [documentId])


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
                {
                    commonList && commonList.length > 0 ? <>
                        {
                            commonList && commonList.map(item => {
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
                                    </div>
                                    {
                                        item.commentList && item.commentList.map(children => {
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

export default inject("commentStore", "shareStore")(observer(Comment));
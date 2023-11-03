/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-09 09:18:21
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-10-22 15:38:49
 */
import React, { useEffect, useState } from "react";
import { Provider, inject, observer } from "mobx-react";
import { Button, Row, Col, Dropdown } from 'antd';
import { MarkdownView } from "tiklab-markdown-ui";
import "tiklab-markdown-ui/es/tiklab-markdown.css";
import "./markdownView.scss"
import ShareModal from "../../share/components/ShareModal";
import { getUser } from "tiklab-core-ui";
import Comment from "../../document/components/Comment";
import CommentStore from "../../document/store/CommentStore";
import MarkdownStore from "../store/MarkdownStore";
const DocumentExamine = (props) => {
    const { relationWorkStore } = props;
    const store = {
        markdownStore: MarkdownStore
    }
    const documentId = props.match.params.id;
    const { findDocument } = MarkdownStore;

    const { createLike, createShare, updateShare, deleteLike } = CommentStore;
    const [shareVisible, setShareVisible] = useState(false)

    const userId = getUser().userId;
    const tenant = getUser().tenant;
    const [docInfo, setDocInfo] = useState({ name: "", likenumInt: "", commentNumber: "", master: { name: "" } })
    const [showComment, setShowComment] = useState(false);
    const repositoryId = props.match.params.repositoryId;
    const [like, setLike] = useState(false)
    let [likeNum, setLikeNum] = useState()
    let [commentNum, setCommentNum] = useState()
    const [title, seTitle] = useState()
    const [value, setValue] = useState()
    const [markdownValue, setMarkdownValue] = useState();

    useEffect(() => {
        seTitle()
        setValue()
        findDocument(documentId).then((data) => {
            if (data.code === 0) {
                if (data.data.details) {
                    const value = data.data.details
                    setValue(JSON.parse(value))
                    setMarkdownValue(data.data.detailText)
                    console.log(JSON.parse(value))
                } else {
                    setValue()
                }
                setDocInfo(data.data)
                seTitle(data.data.name)
                setLike(data.data.like)
                setLikeNum(data.data.likenumInt)
                setCommentNum(data.data.commentNumber)
            }
        })
        return;
    }, [documentId])



    // 点赞
    const addDocLike = () => {
        const data = {
            toWhomId: documentId,
            likeUser: { id: userId },
            likeType: "doc"
        }
        if (like) {
            deleteLike(data).then(res => {
                setLike(false)
                likeNum = likeNum - 1;
                setLikeNum(likeNum)
            })
        } else {
            createLike(data).then(res => {
                if (res.code === 0) {
                    setLike(true)
                    likeNum = likeNum + 1;
                    setLikeNum(likeNum)
                }
            })
        }


    }
    const moreMenu = (
        <div className="more-box">
            <div className="markbox-download" onClick={() => downMorkDown()}>
                下载
            </div>
        </div>
    )

    const downMorkDown = () => {
        const url = `data:,${markdownValue}`;
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title}.md`;
        a.click();
    }

    return (<Provider {...store}>
        <div className="document-markdown-examine">
            {
                showComment && <Comment documentId={documentId} setShowComment={setShowComment} commentNum={commentNum} setCommentNum={setCommentNum} />
            }

            <div className="examine-top">
                <div className="examine-title" id="examine-title">{docInfo.name}</div>
                <div className="document-edit">
                    {
                        value && <svg className="right-icon" aria-hidden="true" onClick={() => props.history.push(`/index/repositorydetail/${repositoryId}/markdownEdit/${documentId}`)}>
                            <use xlinkHref="#icon-edit"></use>
                        </svg>
                    }

                    <svg className="right-icon" aria-hidden="true">
                        <use xlinkHref="#icon-collection"></use>
                    </svg>
                    {/* <Button shape="round" style={{ backgroundColor: "#5d70ea", color: "#fff" }} onClick={() => setShareVisible(true)}> 分享</Button> */}
                    <svg className="right-icon" aria-hidden="true" onClick={() => setShareVisible(true)}>
                        <use xlinkHref="#icon-share"></use>
                    </svg>
                    <Dropdown
                        overlay={moreMenu}
                        placement="bottomLeft"
                        trigger="click"
                    >
                        <svg className="right-icon" aria-hidden="true">
                            <use xlinkHref="#icon-point"></use>
                        </svg>
                    </Dropdown>

                </div>
            </div>
            {
                value ? <div className="document-examine-content">
                    <Row className="document-examine-row">
                        <Col xl={{ span: 18, offset: 3 }} lg={{ span: 18, offset: 3 }} md={{ span: 20, offset: 2 }}>
                            <div className="document-previeweditor">
                                <MarkdownView value={value} base_url={upload_url} tenant={tenant} />
                            </div>
                        </Col>
                    </Row>

                </div>
                    :
                    <> </>
            }
            <div className="comment-box">
                <div className="comment-box-item top-item">
                    <svg className="midden-icon" aria-hidden="true" onClick={() => setShowComment(!showComment)}>
                        <use xlinkHref="#icon-comment"></use>
                    </svg>
                    <div className="commnet-num">{commentNum}</div>
                </div>
                <div className="comment-box-item">
                    <span className="comment-item" onClick={addDocLike}>
                        {
                            like ? <svg className="midden-icon" aria-hidden="true">
                                <use xlinkHref="#icon-zan"></use>
                            </svg> : <svg className="midden-icon" aria-hidden="true">
                                <use xlinkHref="#icon-dianzan"></use>
                            </svg>
                        }
                    </span>
                    <div className="commnet-num" style={{ top: "37px" }}>{likeNum}</div>
                </div>

            </div>

            <ShareModal documentIds={[documentId]} shareVisible={shareVisible} setShareVisible={setShareVisible} docInfo={docInfo} createShare={createShare} updateShare={updateShare} />
        </div>
    </Provider>

    )
}

export default inject("relationWorkStore")(observer(DocumentExamine));
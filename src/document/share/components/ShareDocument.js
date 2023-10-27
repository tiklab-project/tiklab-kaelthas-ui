/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-14 11:20:08
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-16 09:14:44
 */
/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-09 09:18:21
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-13 13:56:29
 */
import React, { useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { Row, Col } from 'antd';
import { PreviewEditor } from "tiklab-slate-ui";
import "tiklab-slate-ui/es/tiklab-slate.css";
import "./shareDocument.scss"
import Comment from "./CommentShare";
import { withRouter } from "react-router";
import { getUser } from "tiklab-core-ui";
const ShareDocument = (props) => {
    const { shareStore, relationWorkStore } = props;
    const { documentView, commentView, judgeAuthCode } = shareStore;
    const [showComment, setShowComment] = useState(false);
    const [value, setValue] = useState("[{\"type\":\"paragraph\",\"children\":[{\"text\":\"\"}]}]")
    const [docInfo, setDocInfo] = useState({ name: "", likenumInt: "", commentNumber: "" })
    const tenant = getUser().tenant;
    useEffect(() => {
        commentView({ documentId: props.match.params.id }).then(data => {
            console.log(data)
            
        })
        documentView({ documentId: props.match.params.id }).then((data) => {
            if (data.code === 0) {
                if (data.data.details) {
                    setValue(data.data.details)
                } else {
                    setValue("[{\"type\":\"paragraph\",\"children\":[{\"text\":\"\"}]}]")
                }
                setDocInfo(data.data)
            }
        })
        return;
    }, [props.match.params.id])
    return (
        <div className="document-share-examine">
            <div className="examine-title">
                <span className="examine-name">{docInfo.name}</span>
            </div>
            <div className="examine-content">
                <Row style={{ flex: 1, overflow: "auto" }}>
                    <Col className="repositorydetail-content-col" xl={{ span: 18, offset: 3 }} lg={{ span: 20, offset: 2 }}>
                        <div style={{paddingTop: "10px"}}>
                            <PreviewEditor value={value} relationWorkStore = {relationWorkStore} base_url = {upload_url} tenant = {tenant}/>
                        </div>

                    </Col>
                </Row>
                {
                    showComment && <Comment documentId={props.match.params.id} setShowComment={setShowComment} />
                }
            </div>


            <div className="comment-box">
                <div className="comment-box-item">
                    <svg className="midden-icon" aria-hidden="true" onClick={() => setShowComment(!showComment)}>
                        <use xlinkHref="#icon-comment"></use>
                    </svg>
                    <div className="commnet-num">{docInfo.commentNumber}</div>
                </div>
            </div>
        </div>


    )
}

export default inject("shareStore", "relationWorkStore")(observer(withRouter(ShareDocument)));
import React from "react";
import "./DynamicItem.scss"
import { withRouter } from "react-router";
const DynamicListItem = (props) => {
    const { content, type,id } = props;
    const data = JSON.parse(content)
    const repositoryId = props.match.params.repositoryId;
    
    const goDynamicDetail = () => {
        props.history.push(`/repositorydetail/${repositoryId}/doc/${data.documentId}`);
    }
    const setDom = () => {
        let dom = null;
        switch (type) {
            case "SWARD_LOGTYPE_DOCUMENTADD":
                const { createUserIcon, createUser, updateTime, documentId,
                    documentName } = data;
                dom = (
                    <div className="dynamic-list-item">
                        <div className="dynamic-list-item-left">
                            <div className="dynamic-user-icon">{createUserIcon}</div>
                            <div className="dynamic-content">
                                <div className="dynamic-work-action">{createUser.nickname}添加了文档</div>
                                <div className="dynamic-work-item">
                                    <div className="dynamic-work-title" onClick={() => goDynamicDetail()}>{documentName}</div>
                                </div>
                            </div>
                        </div>
                        <div>{updateTime}</div>
                    </div>
                )
                break;
            default:
                break;

        }
        return dom;
    }
    return (<>
        {
            setDom()
        }
    </>

    )
}

export default withRouter(DynamicListItem);
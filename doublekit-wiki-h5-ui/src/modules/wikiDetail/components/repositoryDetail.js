import React, { useEffect, useState } from "react";
import { SafeArea, Tabs } from 'antd-mobile';
import "./repositoryDetail.scss"
import RepositoryList from "./repositoryList"
const RepositoryDetail = () => {
    return (
        <div className="repository-detail">
            <div style={{ background: '#ace0ff' }}>
                <SafeArea position='top' />
            </div>
            <div className="repository-top">
                <div className="repository-top-left">
                    <svg className="repository-icon-logo" aria-hidden="true">
                        <use xlinkHref= "#icon-wiki"></use>
                    </svg>
                    <div className="repository-title">知识库</div>
                </div>
                <div className="repository-top-right">
                    <svg className="repository-icon-search" aria-hidden="true">
                        <use xlinkHref= "#icon-search"></use>
                    </svg>
                    <svg className="repository-icon-add" aria-hidden="true" onClick={() => props.history.push("/wiki/add")}>
                        <use xlinkHref= "#icon-add"></use>
                    </svg>
                </div>
            </div>
            <div className="repository-desc"> 
                <div className="repository-title">
                    知识库
                </div> 
                <div className="repository-action">
                    <div className="repository-share">
                        收藏
                    </div>
                    <div className="repository-share">
                        分享
                    </div>
                </div>  
            </div>
            <div>
                <div className="repository-header">
                    <div className="repository-tab">
                        文档
                    </div>
                </div>
                <RepositoryList />
            </div>
        </div>
    )
}

export default RepositoryDetail;
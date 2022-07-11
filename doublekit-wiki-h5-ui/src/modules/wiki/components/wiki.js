import React from "react";
import { SafeArea } from 'antd-mobile';
import "./wiki.scss"
const Wiki = () => {
    return (
        <div className="wiki">
            <div style={{ background: '#ace0ff' }}>
                <SafeArea position='top' />
            </div>
            <div className="wiki-top">
                <div className="wiki-top-left">
                    <svg className="wiki-icon-logo" aria-hidden="true">
                        <use xlinkHref= "#icon-wiki"></use>
                    </svg>
                    <div className="wiki-title">知识库</div>
                </div>
                <div className="wiki-top-right">
                    <svg className="wiki-icon-search" aria-hidden="true">
                        <use xlinkHref= "#icon-search"></use>
                    </svg>
                    <svg className="wiki-icon-add" aria-hidden="true">
                        <use xlinkHref= "#icon-add"></use>
                    </svg>
                </div>
            </div>
            <div className="wiki-list">
                <div className="wiki-list-item">
                    <div>
                        <svg className="wiki-respository-logo" aria-hidden="true">
                            <use xlinkHref= "#icon-respository"></use>
                        </svg>
                        
                    </div>
                    <div className="wiki-repository-info">
                        <div className="wiki-respository-title">
                            知识库1
                        </div>
                        <div className="wiki-respository-info-bottom">
                            <span className="wiki-respository-master">
                                admin
                            </span>
                            <span className="wiki-respository-time">
                                2022-10-09
                            </span>
                        </div>
                    </div>  
                    <div>
                        <svg className="wiki-respository-logo" aria-hidden="true">
                            <use xlinkHref= "#icon-view"></use>
                        </svg>
                    </div> 
                </div>
                <div className="wiki-list-item">
                    
                </div>
            </div>
        </div>
    )
}
export default Wiki;
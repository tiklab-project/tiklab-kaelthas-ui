import React, { useEffect, useState,Fragment } from "react";
import {  Popup, Toast } from 'antd-mobile';
import { inject, observer } from "mobx-react";
import "./documentShare.scss"
const DocumentShare= (props) => {
    const {shareVisible,setShareVisible} = props;
    console.log(props)
    const copyLink = () => {
        const input = document.createElement("input");
        input.setAttribute('readonly', 'readonly'); // 设置为只读, 防止在 ios 下拉起键盘
        // input.setAttribute('value', value); // textarea 不能用此方式赋值, 否则无法复制内容
        input.value = window.location.href;
        document.body.appendChild(input);
        input.setSelectionRange(0, 9999); // 防止 ios 下没有全选内容而无法复制
        input.select();
        document.execCommand('copy');
        Toast.show({
            content: '复制成功',
            afterClose: () => {
              console.log('after')
            }
        })
        document.body.removeChild(input);
    }
    return (
        <Fragment>
            <Popup
                className="document-share-popup"
                visible={shareVisible}
                onMaskClick={() => {
                    setShareVisible(false)
                }}
            >   
                
                <div className="document-share-select">
                    <div className="document-share-title">分享</div>
                    <div className="document-share-list">
                        <div className="document-share-item">
                            <svg className="document-share-icon" aria-hidden="true">
                                <use xlinkHref="#icon-weixin"></use>
                            </svg>
                            <span>微信</span>
                        </div>
                        <div className="document-share-item">
                            <svg className="document-share-icon" aria-hidden="true">
                                <use xlinkHref="#icon-weixinfriend"></use>
                            </svg>
                            <span>朋友圈</span>
                        </div>
                        <div className="document-share-item">
                            <svg className="document-share-icon" aria-hidden="true">
                                <use xlinkHref="#icon-qq"></use>
                            </svg>
                            <span>QQ</span>
                        </div>
                        <div className="document-share-item">
                            <svg className="document-share-icon" aria-hidden="true">
                                <use xlinkHref="#icon-qqspace"></use>
                            </svg>
                            <span>QQ空间</span>
                        </div>
                        <div className="document-share-item" onClick={() => copyLink()}>
                            <svg className="document-share-icon" aria-hidden="true">
                                <use xlinkHref="#icon-link"></use>
                            </svg>
                            <span>复制</span>
                        </div>
                    </div>
                    
                </div>
                <div className="document-share-select-cancel" onClick={() => setShareVisible(false)}>
                    取消
                </div>
            </Popup>
            
        </Fragment>
    )
}
export default inject("wikiCatalogueStore")(observer(DocumentShare));
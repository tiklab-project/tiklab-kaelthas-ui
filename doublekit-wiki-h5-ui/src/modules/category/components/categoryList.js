/*
 * @Descripttion: 知识库详情页面左侧导航栏
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2020-12-18 16:05:16
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-12-22 14:33:43
 */

import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { SafeArea, Popup,Modal } from 'antd-mobile';
import "./categoryList.scss";
import RepositoryAdd from "../../wikiDetail/components/repositoryAdd";
const CategoryList = (props) => {
    // 解析props
    const { wikiCategoryStore } = props
    const { findCategoryDocument, findCategory} = wikiCategoryStore;
    const [selectKey, setSelectKey] = useState();
    const [categoryList, setCategoryList] = useState();
    const [categoryInfo, setCategoryInfo] = useState();
    const [visible, setVisible] = useState(false);
    const [visibleAdd, setVisibleAdd] = useState(false);
    const categoryId = props.match.params.id;
    const repositoryId = props.match.params.resid;
    useEffect(() => {
        initList()
        findCategory({id: categoryId}).then(res=> {
            if(res.code === 0){
                setCategoryInfo(res.data)
            }
        })
    }, [])

    const initList = () => {
        findCategoryDocument({id: categoryId}).then(res=> {
            if(res.code === 0){
                setCategoryList(res.data)
            }
        })
    }

    useEffect(() => {
        // 初次进入激活导航菜单
        setSelectKey(props.location.pathname)
        return
    }, [])

    /**
     * 点击左侧菜单
     * @param {*} key 
     */
    const selectKeyFun = (id, formatType) => {
        setSelectKey(id)
        // if (formatType === "category") {
        //     localStorage.setItem("categoryId", id);
        //     props.history.push(`/index/wikidetail/folder/${id}`)
        // }
        // if (formatType === "document") {
        //     localStorage.setItem("documentId", id);
        //     props.history.push(`/index/wikidetail/doc/${id}`)
        // }
        // if (formatType === "mindMap") {
        //     localStorage.setItem("documentId", id);
        //     props.history.push(`/index/wikidetail/mindmap/${id}`)
        // }
    }



    /**
     * 更新目录
     */
    const inputRef = React.useRef(null);
    const [isRename, setIsRename] = useState()
    useEffect(() => {
        if (isRename) {
            inputRef.current.autofocus = true;
            let range = getSelection();//创建range
            range.selectAllChildren(inputRef.current);//range 选择obj下所有子内容
            range.collapseToEnd()
        }
    }, [isRename])

    return (
        <Fragment>
            <div className="category-detail">
            <div style={{ background: '#ace0ff' }}>
                <SafeArea position='top' />
            </div>
            <div className="category-top">
                <div className="category-top-left">
                    <svg className="category-icon-logo" aria-hidden="true" onClick={() => props.history.goBack()}>
                        <use xlinkHref= "#icon-left"></use>
                    </svg>
                    <div className="category-title">{categoryInfo ? categoryInfo.name : "目录"}</div>
                </div>
                <div className="category-top-right">
                    <svg className="category-icon-search" aria-hidden="true">
                        <use xlinkHref= "#icon-search"></use>
                    </svg>
                    <svg className="category-icon-add" aria-hidden="true" onClick={() =>setVisible(true) }>
                        <use xlinkHref= "#icon-add"></use>
                    </svg>
                </div>
            </div>
            <div className="category-desc"> 
                <div className="category-title">
                    {categoryInfo ? categoryInfo.name : "目录"}
                </div> 
                <div className="category-action">
                    <div className="category-share">
                        收藏
                    </div>
                    <div className="category-share">
                        分享
                    </div>
                </div>  
            </div>
            <div>
                <div className="category-header">
                    <div className="category-tab">
                        目录
                    </div>
                </div>
                <div className="category-list">
                    {
                        categoryList && categoryList.length > 0 && categoryList.map((item) => {
                            return <div className="category-list-menu" key= {item.id}>
                                    <svg className="category-list-icon" aria-hidden="true">
                                        <use xlinkHref="#icon-point"></use>
                                    </svg>
                                    {
                                        item.formatType && item.formatType === "document" ?
                                        <Fragment>
                                            <svg className="category-list-icon" aria-hidden="true">
                                                <use xlinkHref="#icon-file"></use>
                                            </svg> 
                                            <span onClick={() => props.history.push(`/document/${item.id}`)}>{item.name} </span>
                                            </Fragment>
                                            :
                                            <Fragment>
                                                <svg className="category-list-icon" aria-hidden="true">
                                                    <use xlinkHref="#icon-folder"></use>
                                                </svg>
                                                <span onClick={() => props.history.push(`/categoryList/${repositoryId}/${item.id}`)}>{item.name} </span>
                                            </Fragment>
                                            
                                    }
                                    
                                </div>
                        })
                    }
                </div>
            </div>
            <RepositoryAdd 
                visible = {visible}
                setVisible = {setVisible}
                visibleAdd = {visibleAdd}
                setVisibleAdd = {setVisibleAdd}
                parentCategoryId = {categoryId}
                repositoryId = {repositoryId}
                initList = {initList}
            />
        </div>
        </Fragment>
    )
}
export default withRouter(inject("wikiCategoryStore")(observer(CategoryList)));

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
import "./repositoryList.scss"
const RepositoryList = (props) => {
    // 解析props
    const { wikiCatalogueStore} = props
    const { findWikiCatalogue, wikiCatalogueList} = wikiCatalogueStore;
    const repositoryId = props.match.params.id
    // 当前选中目录id
    const [selectKey, setSelectKey] = useState();

    useEffect(() => {
        findWikiCatalogue(repositoryId)
    }, [])

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
        if (formatType === "category") {
            localStorage.setItem("categoryId", id);
            props.history.push(`/categoryList/${repositoryId}/${id}`)
        }
        if (formatType === "document") {
            localStorage.setItem("documentId", id);
            props.history.push(`/document/${id}`)
        }
        if (formatType === "mindMap") {
            localStorage.setItem("documentId", id);
            props.history.push(`/index/wikidetail/mindmap/${id}`)
        }
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

    
    /**
     * 折叠菜单
     */
    const [expandedTree, setExpandedTree] = useState([])
    // 树的展开与闭合
    const isExpandedTree = (key) => {
        return expandedTree.some(item => item === key)
    }
    const setOpenOrClose = (key) => {
        if (isExpandedTree(key)) {
            setExpandedTree(expandedTree.filter(item => item !== key))
        } else {
            setExpandedTree(expandedTree.concat(key));
        }
    }

    /**
     * @param {*} data 
     * @param {*} levels 
     * @returns 
     */

    const logTree = (data, levels, faid) => {
        let newLevels = 0;
        return data && data.length > 0 && data.map((item, index) => {
            return <div className={`${!isExpandedTree(faid) ? "" : 'repository-list-menu-submenu-hidden'}`}
                key={item.id}>
                <div className={`repository-list-menu-submenu ${item.id === selectKey ? "repository-list-menu-select" : ""} `}
                    key={item.id}
                >
                    <div style={{ paddingLeft: levels * 10 }} className="repository-list-item">
                        {
                            (item.children && item.children.length > 0) || (item.documents && item.documents.length > 0) ?
                                isExpandedTree(item.id) ? <svg className="repository-list-icon" aria-hidden="true" onClick={() => setOpenOrClose(item.id)}>
                                    <use xlinkHref="#icon-right" ></use>
                                </svg> :
                                <svg className="repository-list-icon" aria-hidden="true" onClick={() => setOpenOrClose(item.id)}>
                                    <use xlinkHref="#icon-down" ></use>
                                </svg> : <svg className="repository-list-icon" aria-hidden="true">
                                <use xlinkHref="#icon-point"></use>
                                </svg>
                        }
                        <svg className="repository-list-icon" aria-hidden="true">
                            <use xlinkHref="#icon-folder"></use>
                        </svg>
                        <span
                            onClick={() => selectKeyFun(item.id, item.formatType)}
                        >{item.name} </span>
                    </div>
                </div>
                {
                    item.children && item.children.length > 0 && (newLevels = levels + 1) && logTree(item.children, newLevels, item.id)
                }
                {
                    item.documents && item.documents.length > 0 && (newLevels = levels + 1) && folderTree(item.documents, newLevels, item.id)
                }
            </div>
        })
    }
    const folderTree = (data, levels, faid) => {
        return data && data.length > 0 && data.map((item) => {
            return <div className={`${!isExpandedTree(faid) ? "" : 'repository-list-menu-submenu-hidden'}`}
                key={item.id}
            >
                <div className={`repository-list-menu-submenu ${item.id === selectKey ? "repository-list-menu-select" : ""} `}
                    key={item.id}
                >
                    <div style={{ paddingLeft: levels * 10 }} className="repository-list-item">
                        <svg className="repository-list-icon" aria-hidden="true">
                            <use xlinkHref="#icon-point"></use>
                        </svg>
                        <svg className="repository-list-icon" aria-hidden="true">
                            <use xlinkHref="#icon-file"></use>
                        </svg>
                        <span
                            onClick={() => selectKeyFun(item.id, item.typeId)}
                            ref={isRename === item.id ? inputRef : null}
                        >{item.name} </span>
                    </div>
                </div>
            </div>
        })
    }
    return (
        <Fragment>
                <div className={`repository-list-aside`}>
                    <div className="repository-list-menu" >
                        {
                            wikiCatalogueList && wikiCatalogueList[1] && folderTree(wikiCatalogueList[1], 0, 1)
                        }
                        {
                            wikiCatalogueList && logTree(wikiCatalogueList[0], 1, 0)
                        }
                    </div>
                </div>
        </Fragment>
    )
}
export default withRouter(inject("wikiCatalogueStore")(observer(RepositoryList)));

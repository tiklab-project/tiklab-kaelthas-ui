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
    const { WikiCatalogueStore} = props
    const { findWikiCatalogue, wikiCatalogueList} = WikiCatalogueStore;
    
    // 当前选中目录id
    const [selectKey, setSelectKey] = useState();

    const [isHover, setIsHover] = useState(false)
    // 菜单是否折叠
    const [isShowText, SetIsShowText] = useState(true)
    // 当前知识库id
    // const wikiId = localStorage.getItem("wikiId")

    useEffect(() => {
        findWikiCatalogue("23300f362f0cae1816a32e965adcd30f")
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
            props.history.push(`/index/wikidetail/folder/${id}`)
        }
        if (formatType === "document") {
            localStorage.setItem("documentId", id);
            props.history.push(`/index/wikidetail/doc/${id}`)
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

    const reName = (value, id, formatType) => {
        const name = value.target.innerText;
        const params = {
            name: name,
            id: id
        }
        if (formatType === "category") {
            updateWikiCatalogue(params).then(data => {
                if (data.code === 0) {
                    setIsRename(null)
                }
            })
        }
        if (formatType === "document") {
            updateDocument(params).then(data => {
                if (data.code === 0) {
                    setIsRename(null)
                }
            })
        }
    }
    /**
     * 折叠菜单
     */
    const [expandedTree, setExpandedTree] = useState([])
    // 树的展开与闭合
    const isExpandedTree = (key) => {
        return expandedTree.some(item => item === key)
    }
    const setOpenOrClose = key => {
        if (isExpandedTree(key)) {
            setExpandedTree(expandedTree.filter(item => item !== key))
        } else {
            setExpandedTree(expandedTree.concat(key));
        }
    }

    const [moveCategoryId, setMoveCategoryId] = useState()
    const [moveCategoryParentId, setMoveCategoryParentId] = useState()
    const [formatType, setFormatType] = useState()
    // 拖放效果
    const moveWorkItem = () => {
        const dragEvent = event.target
        dragEvent.style.background = "#d0e5f2";

    }

    const moveStart = (moveId, fId, formatType) => {

        event.stopPropagation();
        console.log(moveId)
        const dragEvent = event.target
        dragEvent.style.background = "#d0e5f2";

        // 被拖拽盒子的起始id
        setMoveCategoryId(moveId)
        setMoveCategoryParentId(fId)
        setFormatType(formatType)
    }

    //必须有onDragOver才能触发onDrop
    const dragover = () => {
        event.preventDefault();
    }

    const changeLog = (targetId) => {
        event.preventDefault();
        let value;
        if (targetId !== moveCategoryParentId) {
            if (formatType === "category") {
                if (targetId) {
                    value = {
                        parentCategory: { id: targetId },
                        id: moveCategoryId
                    }
                } else {
                    value = {
                        id: moveCategoryId
                    }
                }
                updateWikiCatalogue(value).then((res) => {
                    if (res.code === 0) {
                        findWikiCatalogue(wikiId).then((data) => {
                            setWikiCatalogueList(data)
                        })
                    }
                })
            } else {
                if (targetId) {
                    value = {
                        category: { id: targetId },
                        id: moveCategoryId
                    }
                } else {
                    value = {
                        id: moveCategoryId
                    }
                }
                updateDocument(value).then((res) => {
                    if (res.code === 0) {
                        findWikiCatalogue(wikiId).then((data) => {
                            setWikiCatalogueList(data)
                        })
                    }
                })
            }

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
            return <div className={`${!isExpandedTree(faid) ? null : 'wiki-menu-submenu-hidden'}`}
                key={item.id}>
                <div className={`wiki-menu-submenu ${item.id === selectKey ? "wiki-menu-select" : ""} `}
                    key={item.id}
                    onClick={() => selectKeyFun(item.id, item.formatType)}
                    onMouseOver={() => setIsHover(item.id)} onMouseLeave={() => setIsHover(null)}
                    onDrop={() => changeLog(item.id)}
                    onDragOver={dragover}
                    onDrag={() => moveWorkItem()}
                    draggable="true"
                    onDragStart={() => moveStart(item.id, faid, item.formatType)}
                >
                    <div style={{ paddingLeft: levels * 10 }}>
                        {
                            (item.children && item.children.length > 0) || (item.documents && item.documents.length > 0) ?
                                isExpandedTree(item.id) ? <svg className="icon" aria-hidden="true" onClick={() => setOpenOrClose(item.id)}>
                                    <use xlinkHref="#iconright" ></use>
                                </svg> :
                                    <svg className="icon" aria-hidden="true" onClick={() => setOpenOrClose(item.id)}>
                                        <use xlinkHref="#icondown" ></use>
                                    </svg> : <svg className="icon" aria-hidden="true">
                                    <use xlinkHref=""></use>
                                </svg>
                        }
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#iconB-13"></use>
                        </svg>
                        <span className={`${isRename === item.id ? "wiki-input" : ""}`}
                            contentEditable={isRename === item.id ? true : false}
                            suppressContentEditableWarning
                            onBlur={(value) => reName(value, item.id, item.formatType)}
                            ref={isRename === item.id ? inputRef : null}
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
            return <div className={`${!isExpandedTree(faid) ? null : 'wiki-menu-submenu-hidden'}`}
                key={item.id}
            >
                <div className={`wiki-menu-submenu ${item.id === selectKey ? "wiki-menu-select" : ""} `}
                    key={item.id}
                    onClick={() => selectKeyFun(item.id, item.typeId)}
                    onMouseOver={() => setIsHover(item.id)} onMouseLeave={() => setIsHover(null)}
                    onDragOver={dragover}
                    onDrag={() => moveWorkItem()}
                    draggable="true"
                    onDragStart={() => moveStart(item.id, faid, item.formatType)}
                >
                    <div style={{ paddingLeft: levels * 10 }} >
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref=""></use>
                        </svg>
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#iconB-06"></use>
                        </svg>
                        <span className={`${isRename === item.id ? "wiki-input" : ""}`}
                            contentEditable={isRename === item.id ? true : false}
                            suppressContentEditableWarning
                            onBlur={(value) => reName(value, item.id, item.formatType)}
                            ref={isRename === item.id ? inputRef : null}
                        >{item.name} </span>
                    </div>
                </div>
            </div>
        })
    }
    return (
        <Fragment>
                <div className={`wiki-aside ${isShowText ? "" : "wiki-icon"}`}>
                    <div className="wiki-menu" onDrop={() => changeLog(null)} >
                        {
                            wikiCatalogueList && folderTree(wikiCatalogueList[1], 0, 1)
                        }
                        {
                            wikiCatalogueList && logTree(wikiCatalogueList[0], 1, 0)
                        }
                    </div>
                </div>
        </Fragment>
    )
}
export default withRouter(inject("WikiCatalogueStore")(observer(RepositoryList)));

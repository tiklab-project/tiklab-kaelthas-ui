/*
 * @Descripttion: 知识库详情页面左侧导航栏
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2020-12-18 16:05:16
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-12-22 14:33:43
 */

import React, { Fragment, useState, useEffect, useId, useRef } from 'react';
import { withRouter } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { Menu, Dropdown, Layout, Form } from 'antd';
import { useTranslation } from 'react-i18next';
import CategoryAdd from "./CategoryAdd"
import RepositoryChangeModal from "./RepositoryChangeModal";
import ShareListModal from "../../../document/share/components/ShareListModal"
import MoveLogList from "./MoveLogList"
import { getUser } from 'tiklab-core-ui';
import "./RepositoryDetailAside.scss"
import { appendNodeInTree } from '../../../common/utils/treeDataAction';
import AddDropDown from './AddDropDown';
import { useDebounce } from '../../../common/utils/debounce';
const { Sider } = Layout;


const RepositorydeAside = (props) => {
    // 解析props

    const { searchrepository, repository, repositorylist, categoryStore } = props;
    //语言包
    const { t } = useTranslation();
    const moveRef = useRef([]);
    const { findRepositoryCatalogue, updateRepositoryCatalogue, deleteRepositoryLog, updateDocument, deleteDocument,
        repositoryCatalogueList, setRepositoryCatalogueList, createRecent,
        createDocument, expandedTree, setExpandedTree, findDmUserList, findDocument } = categoryStore;

    // 当前选中目录id
    const id = props.location.pathname.split("/")[5];
    const [selectKey, setSelectKey] = useState(id);
    const [isShowText, SetIsShowText] = useState(true)
    const [changeRepositoryVisible, setChangeRepositoryVisible] = useState(null)
    const repositoryId = props.match.params.repositoryId;
    const [isHover, setIsHover] = useState(false)

    const [requsetedCategory, setRequsetedCategory] = useState([])
    const [moveCategoryId, setMoveCategoryId] = useState()
    const [moveCategoryParentId, setMoveCategoryParentId] = useState()
    const [formatType, setFormatType] = useState()
    const [moveLogListVisible, setMoveLogListVisible] = useState(false)

    const [mouseY, setMouseY] = useState()
    const [mouseDirection, setMouseDirection] = useState()
    const userId = getUser().userId;
    const tenant = getUser().tenant;

    const [shareListVisible, setShareListVisible] = useState(false)
    const [leaveId, setLeaveId] = useState()

    useEffect(() => {
        findRepositoryCatalogue({ repositoryId: repositoryId, parentWikiCategoryIsNull: true }).then((data) => {
            setRepositoryCatalogueList(data.data)
            console.log(data.data)
        })
        return;
    }, [repositoryId])

    useEffect(() => {
        // 初次进入激活导航菜单
        if (props.location.pathname.split("/")[4] === "survey") {
            setSelectKey("survey")
        } else {
            setSelectKey(id)
        }
        return
    }, [id])

    //点击左侧菜单
    const selectKeyFun = (event, item) => {
        event.stopPropagation()
        const params = {
            name: item.name,
            model: item.formatType,
            modelId: item.id,
            master: { id: userId },
            wikiRepository: { id: repositoryId }
        }
        createRecent(params)
        setSelectKey(item.id)
        const isRequested = requsetedCategory.some(category => category === item.id);
        if (!isRequested) {
            findRepositoryCatalogue({ repositoryId: repositoryId, parentWikiCategory: item.id }).then(data => {
                if (data.code === 0) {
                    const list = appendNodeInTree(item.id, repositoryCatalogueList, data.data)
                    console.log(list)
                }

            })
        }

        if (item.formatType === "category") {
            localStorage.setItem("categoryId", item.id);
            setOpenClickCategory(item.id)
            setRequsetedCategory(requsetedCategory.concat(item.id))
            props.history.push(`/repositorydetail/${repositoryId}/folder/${item.id}`)
        }
        if (item.typeId === "document") {
            props.history.push(`/repositorydetail/${repositoryId}/doc/${item.id}`)
        }
        if (item.typeId === "markdown") {
            props.history.push(`/repositorydetail/${repositoryId}/markdownView/${item.id}`)
        }
    }

    // 编辑
    const editMenu = (fItem, item, fId, index) => {
        return <Menu onClick={(value) => editCatelogue(fItem, value, item, fId, index)}>
            <Menu.Item key="edit">
                重命名
            </Menu.Item>
            <Menu.Item key="delete">
                删除
            </Menu.Item>
            <Menu.Item key="move">
                移动
            </Menu.Item>
            <Menu.Item key="share">
                分享
            </Menu.Item>
        </Menu>
    };



    //更新目录
    const inputRef = React.useRef(null);
    const [isRename, setIsRename] = useState()
    const editCatelogue = (fItem, value, item, fId, index) => {
        const { id, formatType } = item;
        value.domEvent.stopPropagation()
        if (value.key === "edit") {
            setIsRename(id)
        }
        if (value.key === "delete") {
            if (formatType === "category") {
                deleteRepositoryLog(id).then(data => {
                    if (data.code === 0) {
                        findRepositoryCatalogue(repositoryId).then((data) => {
                            setRepositoryCatalogueList(data)
                        })
                    }
                })
            }
            if (formatType === "document") {
                deleteDocument(id).then(data => {
                    if (data.code === 0) {
                        findRepositoryCatalogue(repositoryId).then((data) => {
                            setRepositoryCatalogueList(data)
                        })
                    }
                })
            }

            if (fItem.length > 1) {
                if (index !== fItem.length - 1) {
                    if (fItem[index + 1].typeId === "category") {
                        props.history.push(`/repositorydetail/${repositoryId}/folder/${fItem[index + 1].id}`)
                    }
                    if (fItem[index + 1].typeId === "document") {
                        props.history.push(`/repositorydetail/${repositoryId}/doc/${fItem[index + 1].id}`)
                    }
                } else {
                    if (fItem[index - 1].typeId === "category") {
                        props.history.push(`/repositorydetail/${repositoryId}/folder/${fItem[index - 1].id}`)
                    }
                    if (fItem[index - 1].typeId === "document") {
                        props.history.push(`/repositorydetail/${repositoryId}/doc/${fItem[index - 1].id}`)
                    }
                }
            } else {
                if (fId == 0) {
                    props.history.push(`/repositorydetail/${repositoryId}/survey`)
                } else {
                    props.history.push(`/repositorydetail/${repositoryId}/folder/${fId}`)
                }

            }
        }
        if (value.key === "move") {
            setMoveLogListVisible(true)
            setMoveCategoryId(id)
            setFormatType(formatType)
            setMoveCategoryParentId(fId)
        }
        if (value.key === "share") {
            setShareListVisible(true)
        }
    }
    useEffect(() => {
        if (isRename) {
            inputRef.current.autofocus = true;
            let range = getSelection();
            range.selectAllChildren(inputRef.current);
            range.collapseToEnd()
        }
        return;
    }, [isRename])

    const reName = (value, id, formatType) => {
        const name = value.target.innerText;
        const params = {
            name: name,
            id: id
        }
        if (formatType === "category") {
            updateRepositoryCatalogue(params).then(data => {
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
    const enterKeyRename = (value, id, formatType) => {

        if (value.keyCode === 13) {
            event.stopPropagation();
            event.preventDefault()
            reName(value, id, formatType)
        }
    }


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

    const setOpenClickCategory = key => {

        if (!isExpandedTree(key)) {
            setExpandedTree(expandedTree.concat(key));
        }
    }

    
    // 拖放效果
    const moveWorkItem = (event) => {
        event.stopPropagation();
        const dragEvent = event.target;
        dragEvent.style.background = "#d0e5f2";
        if(event.clientY > mouseY){
            setMouseDirection("repository-menu-down")
        }
        if(event.clientY < mouseY){
            setMouseDirection("repository-menu-up")
        }
        setMouseY(event.clientY)
    }

    const moveStart = (event, moveId, fId, formatType) => {
        event.stopPropagation();
        const dragEvent = event.target
        dragEvent.style.background = "#d0e5f2";
        console.log(event)
        setMouseY(event.clientY)
        // 被拖拽盒子的起始id
        setMoveCategoryId(moveId)
        if (fId === 0) {
            setMoveCategoryParentId("nullString")
        } else {
            setMoveCategoryParentId(fId)
        }

        setFormatType(formatType)
    }

    //必须有onDragOver才能触发onDrop
    const dragOver = (event, id) => {
        event.stopPropagation();
        event.preventDefault();
        
        // console.log(event, id)
    }

    const dragEnter = (event, id) => {
        event.stopPropagation();
        event.preventDefault();
        
    }

    const dragLeave = (event, id) => {
        event.stopPropagation();
        event.preventDefault();
        
        // event.
        setLeaveId(id)
        
        // moveRef.current[id].current == event.target
    }

    const moveEnd = () => {
        const dragEvent = event.target
        dragEvent.style.background = "#f7f8fa";
        setLeaveId(null)
    }
    const changeLog = (event, targetId) => {
        event.stopPropagation();
        event.preventDefault();
        console.log(targetId)
        // event.preventDefault();
        // let value;
        // // console.log(moveRef.current[moveCategoryId], moveCategoryId, event.target)
        // if (formatType === "category") {
        //     if (moveRef.current[moveCategoryId].contains(event.target) || moveRef.current[moveCategoryId].current == event.target) {
        //         console.log("不可放置")
        //         return
        //     }
        // }

        // if (targetId && targetId !== moveCategoryParentId && targetId !== moveCategoryId) {
        //     if (formatType === "category") {
        //         if (targetId) {
        //             value = {
        //                 parentWikiCategory: { id: targetId },
        //                 id: moveCategoryId
        //             }
        //         } else {
        //             value = {
        //                 id: moveCategoryId
        //             }
        //         }
        //         updateRepositoryCatalogue(value).then((res) => {
        //             if (res.code === 0) {
        //                 findRepositoryCatalogue(repositoryId).then((data) => {
        //                     setRepositoryCatalogueList(data)
        //                 })
        //             }
        //         })
        //     } else {
        //         if (targetId) {
        //             value = {
        //                 wikiCategory: { id: targetId },
        //                 id: moveCategoryId
        //             }
        //         } else {
        //             value = {
        //                 id: moveCategoryId
        //             }
        //         }
        //         updateDocument(value).then((res) => {
        //             if (res.code === 0) {
        //                 findRepositoryCatalogue(repositoryId).then((data) => {
        //                     setRepositoryCatalogueList(data)
        //                 })
        //             }
        //         })
        //     }
        // }
    }


    const logTree = (fItems, item, levels, faid, index) => {
        let newLevels = 0;
        return <div 
            className={`${isExpandedTree(faid) ? "" : 'repository-menu-submenu-hidden'} 
                ${leaveId === item.id && leaveId !== moveCategoryId ? mouseDirection : ""}`}
            key={item.id}
            onClick={(event) => selectKeyFun(event, item)}
            onDrop={(event) => changeLog(event, item.id, item.sort)}
            onMouseOver={(event) => { event.stopPropagation(), setIsHover(item.id) }}
            onMouseLeave={(event) => { event.stopPropagation(), setIsHover(null) }}
            onDrag={(event) => moveWorkItem(event)}
            onDragOver={(event) => dragOver(event, item.id)}
            onDragEnter={(event) =>dragEnter(event, item.id) }
            onDragLeave = {(event) => dragLeave(event, item.id)}
            draggable="true"
            onDragStart={(event) => moveStart(event, item.id, faid, item.formatType)}
            onDragEnd={() => moveEnd()}
            ref={el => (moveRef.current[item.id] = el)}
            
        >
            <div className={`repository-menu-submenu ${item.id === selectKey ? "repository-menu-select" : ""} `}
                key={item.id}
                draggable="false"
            >
                <div style={{ paddingLeft: levels * 21 + 24 }} className="repository-menu-submenu-left" draggable="false">
                    {
                        item.childrenNum && item.childrenNum > 0 ?
                            isExpandedTree(item.id) ? <svg className="img-icon" aria-hidden="true" onClick={() => setOpenOrClose(item.id)}>
                                <use xlinkHref="#icon-down" ></use>
                            </svg> :
                                <svg className="img-icon" aria-hidden="true" onClick={() => setOpenOrClose(item.id)}>
                                    <use xlinkHref="#icon-right" ></use>
                                </svg> :
                            <div className="img-icon" />
                    }
                    <svg className="img-icon" aria-hidden="true">
                        <use xlinkHref="#icon-folder"></use>
                    </svg>
                    <span className={`${isRename === item.id ? "repository-input" : "repository-view"}`}
                        contentEditable={isRename === item.id ? true : false}
                        suppressContentEditableWarning
                        onBlur={(value) => reName(value, item.id, item.formatType)}
                        ref={isRename === item.id ? inputRef : null}
                        onKeyDownCapture={(value) => enterKeyRename(value, item.id, item.formatType)}
                    >{item.name} -- {item.id} </span>
                </div>
                <div className={`${isHover === item.id ? "icon-show" : "icon-hidden"} icon-action`}>

                    <AddDropDown categaryId={item.id} />
                    <Dropdown overlay={() => editMenu(fItems, item, faid, index)} placement="bottomLeft">
                        <svg className="img-icon" aria-hidden="true">
                            <use xlinkHref="#icon-moreBlue"></use>
                        </svg>
                    </Dropdown>
                </div>
            </div>
            {
                item.children && item.children.length > 0 && (newLevels = levels + 1) &&
                item.children.map((childItem, index) => {
                    if (childItem.formatType === "document") {
                        return fileTree(item.children, childItem, newLevels, item.id, index)
                    }
                    if (childItem.formatType === "category") {
                        return logTree(item.children, childItem, newLevels, item.id, index)
                    }

                })
            }
        </div>


    }
    const fileTree = (fItems, item, levels, fId, index) => {
        return <div className={`${isExpandedTree(fId) ? null : 'repository-menu-submenu-hidden'}`}
            key={item.id}
        >
            <div 
                className={`repository-menu-submenu ${item.id === selectKey ? "repository-menu-select" : ""}
                ${leaveId === item.id && leaveId !== moveCategoryId ? mouseDirection : ""}`}
                key={item.id}
                onClick={(event) => selectKeyFun(event, item)}
                onMouseOver={(event) => { event.stopPropagation(), setIsHover(item.id) }}
                onMouseLeave={(event) => { event.stopPropagation(), setIsHover(null) }}
                onDragOver={(event) => dragOver(event, item.id)}
                onDragLeave = {(event) => dragLeave(event, item.id)}
                onDrag={(event) => moveWorkItem(event)}
                draggable="true"
                onDragStart={(event) => moveStart(event, item.id, fId, item.formatType)}
                onDragEnd={() => moveEnd()}
                ref={el => (moveRef.current[item.id] = el)}
            >
                <div style={{ paddingLeft: levels * 21 + 24 }} className="repository-menu-submenu-left">

                    <div className="img-icon" />
                    {
                        item.typeId === "document" && <svg className="img-icon" aria-hidden="true">
                            <use xlinkHref="#icon-file"></use>
                        </svg>
                    }
                    {
                        item.typeId === "markdown" && <svg className="img-icon" aria-hidden="true">
                            <use xlinkHref="#icon-minmap"></use>
                        </svg>
                    }
                    <span
                        className={`${isRename === item.id ? "repository-input" : "repository-view"}`}
                        contentEditable={isRename === item.id ? true : false}
                        suppressContentEditableWarning
                        onBlur={(value) => reName(value, item.id, item.formatType)}
                        onKeyDownCapture={(value) => enterKeyRename(value, item.id, item.formatType)}
                        ref={isRename === item.id ? inputRef : null}
                        id={"file-" + item.id}
                        title={item.name}
                    >
                        {item.name}
                    </span>
                </div>
                <div className={`${isHover === item.id ? "icon-show" : "icon-hidden"}`}>
                    <Dropdown overlay={() => editMenu(fItems, item, fId, index)} placement="bottomLeft">
                        <svg className="img-icon" aria-hidden="true">
                            <use xlinkHref="#icon-moreBlue"></use>
                        </svg>
                    </Dropdown>
                </div>
            </div>
        </div>

    }
    return (
        <Fragment>
            <Sider trigger={null} collapsible collapsed={!isShowText} collapsedWidth="50" width="270" className="repositorydetail-aside">
                <div className={`repository-aside ${isShowText ? "" : "repository-icon"}`}>
                    <div className="repository-title title">
                        <span className="repository-title-left">
                            {
                                repository?.iconUrl ?
                                    <img
                                        src={version === "cloud" ? (upload_url + repository.iconUrl + "?tenant=" + tenant) : (upload_url + repository.iconUrl)}
                                        alt=""
                                        className="img-icon"
                                    />
                                    :
                                    <img
                                        src={('images/repository1.png')}
                                        alt=""
                                        className="img-icon"
                                    />
                            }
                            <span>{repository?.name}</span>
                        </span>
                        <div className="repository-toggleCollapsed">
                            <RepositoryChangeModal
                                searchrepository={searchrepository}
                                repositorylist={repositorylist}
                                changeRepositoryVisible={changeRepositoryVisible}
                                setChangeRepositoryVisible={setChangeRepositoryVisible}
                            />
                        </div>
                    </div>
                    <div
                        className={`repository-survey ${selectKey === "survey" ? "repository-menu-select" : ""} `}
                        onClick={() => { props.history.push(`/repositorydetail/${repositoryId}/survey`); setSelectKey("survey") }}>
                        <svg className="img-icon" aria-hidden="true">
                            <use xlinkHref="#icon-home"></use>
                        </svg>
                        概况
                    </div>
                    <div className="repository-menu" 
                        onDrop={(event) => changeLog(event, "nullString")} 
                        draggable="true" 
                        
                        onDragOver={(event) => dragOver(event, "repository")}
                    >
                        <div className="repository-menu-firstmenu"
                            onMouseOver={() => setIsHover(0)}
                            onMouseLeave={() => setIsHover(null)}
                        >
                            <div className="repository-menu-firstmenu-left">
                                <svg className="img-icon" aria-hidden="true">
                                    <use xlinkHref="#icon-repository"></use>
                                </svg>
                                <span>知识库</span>
                            </div>
                            <div>
                                <AddDropDown categaryId={null} />
                            </div>
                        </div>
                        <div>
                            {
                                repositoryCatalogueList && repositoryCatalogueList.map((item, index) => {
                                    if (item.formatType === "document") {
                                        return fileTree(repositoryCatalogueList, item, 0, 0, index)
                                    }
                                    if (item.formatType === "category") {
                                        return logTree(repositoryCatalogueList, item, 0, 0, index)


                                    }
                                })
                            }
                        </div>

                    </div>
                    <div className="repository-setting-menu" onClick={() => props.history.push(`/repositorySet/${repositoryId}/basicInfo`)}>
                        <svg className="img-icon" aria-hidden="true">
                            <use xlinkHref="#icon-set"></use>
                        </svg>
                        设置
                    </div>
                </div>
            </Sider>
            <MoveLogList
                moveLogListVisible={moveLogListVisible}
                setMoveLogListVisible={setMoveLogListVisible}
                formatType={formatType}
                moveCategoryId={moveCategoryId}
                moveCategoryParentId={moveCategoryParentId}
            />
            <ShareListModal
                repositoryCatalogueList={repositoryCatalogueList}
                shareListVisible={shareListVisible}
                setShareListVisible={setShareListVisible}
            />
        </Fragment>
    )
}
export default withRouter(inject("categoryStore")(observer(RepositorydeAside)));
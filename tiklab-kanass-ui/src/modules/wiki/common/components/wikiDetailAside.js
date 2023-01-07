/*
 * @Descripttion: 知识库详情页面左侧导航栏
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2020-12-18 16:05:16
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-12-22 14:33:43
 */

import React, { Fragment, useState, useEffect, useId } from 'react';
import { withRouter } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { Menu, Dropdown, Button, Modal, Layout, Form } from 'antd';
import { useTranslation } from 'react-i18next';
import AddLog from "./addLog"
import ChangeWikiModal from "./changeWikiModal"
import MoveLogList from "./moveLogList"
import TemplateList from "./templateList"
import { PrivilegeProject } from "tiklab-privilege-ui";
import { getUser } from 'tiklab-core-ui';
const { Sider } = Layout;
const WikideAside = (props) => {
    // 解析props
    const [form] = Form.useForm();
    const { searchwiki, wiki, wikilist, WikiCatalogueStore } = props;
    //语言包
    const { t } = useTranslation();
    const { findWikiCatalogue, updateWikiCatalogue,
        deleteWikiLog, updateDocument, deleteDocument,
        findDmPrjRolePage, wikiCatalogueList, setWikiCatalogueList, createDocumentRecent } = WikiCatalogueStore;

    // 当前选中目录id
    const id = props.location.pathname.split("/")[5];

    const [selectKey, setSelectKey] = useState(id);
    const [isShowText, SetIsShowText] = useState(true)
    const [changeWikiVisible, setChangeWikiVisible] = useState(null)
    const wikiId = props.match.params.wikiId;
    const [isHover, setIsHover] = useState(false)

    const [changeTemplateVisible, setChangeTemplateVisible] = useState()

    const [templateId, setTemplateId] = useState()

    const [modalTitle, setModalTitle] = useState()
    const userId = getUser().userId

    // 模板内容
    const [contentValue, setContentValue] = useState()
    useEffect(() => {
        findWikiCatalogue(wikiId).then((data) => {
            setWikiCatalogueList(data)
        })
    }, [])

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
    const selectKeyFun = (item) => {
        const params = {
            name: item.name,
            model: item.typeId,
            modelId: item.id,
            master: { id: userId },
            repository: { id: wikiId }
        }
        createDocumentRecent(params)
        setSelectKey(item.id)
        if (item.formatType === "category") {
            localStorage.setItem("categoryId", item.id);
            props.history.push(`/index/wikidetail/${wikiId}/folder/${item.id}`)
        }
        if (item.typeId === "document") {
            localStorage.setItem("documentId", item.id);
            props.history.push(`/index/wikidetail/${wikiId}/doc/${item.id}`)
        }
        if (item.typeId === "mindMap") {
            localStorage.setItem("documentId", item.id);
            props.history.push(`/index/wikidetail/${wikiId}/mindmap/${item.id}`)

        }
    }

    /**
     * 点击折叠或展开菜单栏
     */
    const toggleCollapsed = () => {
        SetIsShowText(!isShowText)
    }
    /**
     * 显示切换知识库弹窗
     */
    const showModal = () => {
        setChangeWikiVisible(true)
    };

    // 添加按钮下拉菜单
    const addMenu = (id) => {
        return <Menu onClick={(value) => selectAddType(value, id)}>
            <Menu.Item key="category">
                添加目录
            </Menu.Item>
            <Menu.Item key="document">
                添加页面
            </Menu.Item>
            <Menu.Item key="mindMap">
                添加脑图
            </Menu.Item>
        </Menu>
    };

    // 编辑
    const editMenu = (id, formatType, fid) => {
        return <Menu onClick={(value) => editCatelogue(value, id, formatType, fid)}>
            <Menu.Item key="edit">
                重命名
            </Menu.Item>
            <Menu.Item key="delete">
                删除
            </Menu.Item>
            <Menu.Item key="move">
                移动
            </Menu.Item>
        </Menu>
    };

    //添加目录,文档
    const [catalogueId, setCatalogueId] = useState()
    const [userList, setUserList] = useState()
    const selectAddType = (value, id) => {
        setCatalogueId(id)
        findDmPrjRolePage(wikiId).then(data => {
            setUserList(data.dataList)
        })
        if (value.key === "document") {
            setChangeTemplateVisible(true)
            setModalTitle("添加文档")
        } else if (value.key === "mindMap") {
            setContentValue({ nodes: [], edges: [] })
            setAddModalVisible(true)
            setModalTitle("添加脑图")
        } else if (value.key === "category") {
            setAddModalVisible(true)
            setModalTitle("添加目录")
        }
        // 
        form.setFieldsValue({
            formatType: value.key
        })
    }

    //更新目录
    const inputRef = React.useRef(null);
    const [isRename, setIsRename] = useState()
    const editCatelogue = (value, id, formatType, fid) => {
        value.domEvent.stopPropagation()
        if (value.key === "edit") {
            setIsRename(id)
        }
        if (value.key === "delete") {
            if (formatType === "category") {
                deleteWikiLog(id).then(data => {
                    if (data.code === 0) {
                        findWikiCatalogue(wikiId).then((data) => {
                            setWikiCatalogueList(data)
                        })
                    }
                })
            }
            if (formatType === "document") {
                deleteDocument(id).then(data => {
                    if (data.code === 0) {
                        findWikiCatalogue(wikiId).then((data) => {
                            setWikiCatalogueList(data)
                        })
                    }
                })
            }
        }
        if (value.key === "move") {
            setMoveLogListVisible(true)
            setMoveCategoryId(id)
            setFormatType(formatType)
            setMoveCategoryParentId(fid)
        }
    }
    useEffect(() => {
        if (isRename) {
            inputRef.current.autofocus = true;
            let range = getSelection();
            range.selectAllChildren(inputRef.current);
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
    const [addModalVisible, setAddModalVisible] = useState()

    //折叠菜单
    const [expandedTree, setExpandedTree] = useState([0])
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
    const [moveLogListVisible, setMoveLogListVisible] = useState(false)
    // 拖放效果
    const moveWorkItem = () => {
        const dragEvent = event.target
        dragEvent.style.background = "#d0e5f2";

    }

    const moveStart = (moveId, fId, formatType) => {

        event.stopPropagation();
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

    const moveEnd = () => {
        const dragEvent = event.target
        dragEvent.style.background = "#f7f8fa";
    }
    const changeLog = (targetId) => {
        event.preventDefault();
        let value;

        if (targetId && targetId !== moveCategoryParentId) {
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


    const logTree = (item, levels, faid) => {
        let newLevels = 0;
        return <div className={`${isExpandedTree(faid) ? "" : 'wiki-menu-submenu-hidden'}`}
            key={item.id}
            onDrop={() => changeLog(item.id)}
        >
            <div className={`wiki-menu-submenu ${item.id === selectKey ? "wiki-menu-select" : ""} `}
                key={item.id}
                onClick={() => selectKeyFun(item)}
                onMouseOver={() => setIsHover(item.id)}
                onMouseLeave={() => setIsHover(null)}
                onDrag={() => moveWorkItem()}
                onDragOver={dragover}
                draggable="true"
                onDragStart={() => moveStart(item.id, faid, item.formatType)}
                onDragEnd={() => moveEnd()}
            >
                <div style={{ paddingLeft: levels * 21 + 24 }} className="wiki-menu-submenu-left">
                    {
                        (item.children && item.children.length > 0) || (item.documents && item.documents.length > 0) ?
                            isExpandedTree(item.id) ? <svg className="img-icon" aria-hidden="true" onClick={() => setOpenOrClose(item.id)}>
                                <use xlinkHref="#icon-right" ></use>
                            </svg> :
                                <svg className="img-icon" aria-hidden="true" onClick={() => setOpenOrClose(item.id)}>
                                    <use xlinkHref="#icon-down" ></use>
                                </svg> : <svg className="img-icon" aria-hidden="true">
                                <use xlinkHref="#icon-circle"></use>
                            </svg>
                    }
                    <svg className="img-icon" aria-hidden="true">
                        <use xlinkHref="#icon-folder"></use>
                    </svg>
                    <span className={`${isRename === item.id ? "wiki-input" : ""}`}
                        contentEditable={isRename === item.id ? true : false}
                        suppressContentEditableWarning
                        onBlur={(value) => reName(value, item.id, item.formatType)}
                        ref={isRename === item.id ? inputRef : null}
                    >{item.name} </span>
                </div>
                <div className={`${isHover === item.id ? "icon-show" : "icon-hidden"}`}>
                    <Dropdown overlay={() => addMenu(item.id)} placement="bottomLeft">
                        <svg className="img-icon" aria-hidden="true">
                            <use xlinkHref="#icon-plusBlue"></use>
                        </svg>
                    </Dropdown>
                    <Dropdown overlay={() => editMenu(item.id, item.formatType, faid)} placement="bottomLeft">
                        <svg className="img-icon" aria-hidden="true">
                            <use xlinkHref="#icon-moreBlue"></use>
                        </svg>
                    </Dropdown>
                </div>
            </div>
            {
                item.children && item.children.length > 0 && (newLevels = levels + 1) &&
                item.children.map(childItem => {
                    return logTree(childItem, newLevels, item.id)

                })

            }
            {
                item.documents && item.documents.length > 0 && (newLevels = levels + 1) &&
                item.documents.map(childItem => {
                    return fileTree(childItem, newLevels, item.id)
                })
            }
        </div>
    }
    const fileTree = (item, levels, faid) => {
        return <div className={`${isExpandedTree(faid) ? null : 'wiki-menu-submenu-hidden'}`}
            key={item.id}
        >
            <div className={`wiki-menu-submenu ${item.id === selectKey ? "wiki-menu-select" : ""} `}
                key={item.id}
                onClick={() => selectKeyFun(item)}
                onMouseOver={() => setIsHover(item.id)} onMouseLeave={() => setIsHover(null)}
                onDragOver={dragover}
                onDrag={() => moveWorkItem()}
                draggable="true"
                onDragStart={() => moveStart(item.id, faid, item.formatType)}
                onDragEnd={() => moveEnd()}
            >
                <div style={{ paddingLeft: levels * 21 + 24 }} className="wiki-menu-submenu-left">
                    <svg className="img-icon" aria-hidden="true">
                        <use xlinkHref="#icon-circle"></use>
                    </svg>
                    {
                        item.typeId === "document" && <svg className="img-icon" aria-hidden="true">
                            <use xlinkHref="#icon-file"></use>
                        </svg>
                    }
                    {
                        item.typeId === "mindMap" && <svg className="img-icon" aria-hidden="true">
                            <use xlinkHref="#icon-minmap"></use>
                        </svg>
                    }
                    <span className={`${isRename === item.id ? "wiki-input" : ""}`}
                        contentEditable={isRename === item.id ? true : false}
                        suppressContentEditableWarning
                        onBlur={(value) => reName(value, item.id, item.formatType)}
                        ref={isRename === item.id ? inputRef : null}
                    >{item.name} </span>
                </div>
                <div className={`${isHover === item.id ? "icon-show" : "icon-hidden"}`}>
                    <Dropdown overlay={() => editMenu(item.id, item.formatType, faid)} placement="bottomLeft">
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
            <Sider trigger={null} collapsible collapsed={!isShowText} collapsedWidth="50" width="250">
                <div className={`wiki-aside ${isShowText ? "" : "wiki-icon"}`}>
                    <div className="wiki-title title">
                        <span className="wiki-title-left">
                            {
                                wiki?.iconUrl ?
                                    <img
                                        src={('/images/' + wiki?.iconUrl)}
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
                            {/* <svg className="img-icon" aria-hidden="true">
                                <use xlinkHref="#icon-folder"></use>
                            </svg> */}
                            {wiki?.name}
                        </span>
                        <div className="wiki-toggleCollapsed">
                            <ChangeWikiModal
                                searchwiki={searchwiki}
                                wikilist={wikilist}
                                changeWikiVisible={changeWikiVisible}
                                setChangeWikiVisible={setChangeWikiVisible}
                            />
                        </div>
                    </div>
                    <div
                        className={`wiki-survey ${selectKey === "survey" ? "wiki-menu-select" : ""} `}
                        onClick={() => { props.history.push(`/index/wikidetail/${wikiId}/survey`); setSelectKey("survey") }}>
                        <svg className="img-icon" aria-hidden="true">
                            <use xlinkHref="#icon-home"></use>
                        </svg>
                        概况
                    </div>
                    <div className="wiki-menu" onDrop={() => changeLog("nullString")} draggable="true" onDragOver={dragover}>
                        <div className="wiki-menu-firstmenu"
                            onMouseOver={() => setIsHover(0)}
                            onMouseLeave={() => setIsHover(null)}
                        >
                            <div className="wiki-menu-firstmenu-left">
                                {/* {
                                    wikiCatalogueList && wikiCatalogueList.length > 0 ?
                                        isExpandedTree(0) ? <svg className="img-icon" aria-hidden="true" onClick={() => setOpenOrClose(0)}>
                                            <use xlinkHref="#icon-right" ></use>
                                        </svg> :
                                            <svg className="img-icon" aria-hidden="true" onClick={() => setOpenOrClose(0)}>
                                                <use xlinkHref="#icon-down" ></use>
                                            </svg> : <svg className="img-icon" aria-hidden="true">
                                            <use xlinkHref="#icon-circle"></use>
                                        </svg>
                                } */}
                                <svg className="img-icon" aria-hidden="true">
                                    <use xlinkHref="#icon-repository"></use>
                                </svg>
                                <span>知识库</span>
                            </div>
                            <div className={`${isHover === 0 ? "icon-show" : "icon-hidden"}`}>
                                <Dropdown overlay={() => addMenu(null)} placement="bottomLeft">
                                    <svg className="img-icon" aria-hidden="true">
                                        <use xlinkHref="#icon-plusBlue"></use>
                                    </svg>
                                </Dropdown>
                            </div>
                        </div>

                        {
                            wikiCatalogueList && wikiCatalogueList.map(item => {
                                if (item.formatType === "document") {
                                    return fileTree(item, 0, 0)
                                }
                                if (item.formatType === "category") {
                                    return logTree(item, 0, 0)
                                }
                            })
                        }
                        {/* </div> */}
                    </div>
                    <div className="wiki-setting-menu" onClick={() => props.history.push(`/index/wikidetail/${wikiId}/wikiSet/basicInfo`)}>
                        {/* <span style={{ marginRight: "20px" }}> */}
                        <svg className="img-icon" aria-hidden="true">
                            <use xlinkHref="#icon-set"></use>
                        </svg>
                        设置
                        {/* </span> */}
                    </div>
                </div>
            </Sider>

            <AddLog
                setAddModalVisible={setAddModalVisible}
                addModalVisible={addModalVisible}
                setWikiCatalogueList={setWikiCatalogueList}
                form={form}
                catalogueId={catalogueId}
                contentValue={contentValue}
                setSelectKey={setSelectKey}
                userList={userList}
                modalTitle={modalTitle}
                {...props}
            />
            <MoveLogList
                wikiCatalogueList={wikiCatalogueList}
                moveLogListVisible={moveLogListVisible}
                setWikiCatalogueList={setWikiCatalogueList}
                setMoveLogListVisible={setMoveLogListVisible}
                findWikiCatalogue={findWikiCatalogue}
                updateDocument={updateDocument}
                formatType={formatType}
                moveCategoryId={moveCategoryId}
                updateWikiCatalogue={updateWikiCatalogue}
                moveCategoryParentId={moveCategoryParentId}
            />
            <TemplateList changeTemplateVisible={changeTemplateVisible}
                setChangeTemplateVisible={setChangeTemplateVisible}
                templateId={templateId}
                setTemplateId={setTemplateId}
                setAddModalVisible={setAddModalVisible}
                contentValue={contentValue}
                setContentValue={setContentValue}

            />
        </Fragment>
    )
}
export default withRouter(inject("wikiDetailStore", "WikiCatalogueStore")(observer(WikideAside)));
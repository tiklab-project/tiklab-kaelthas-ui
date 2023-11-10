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
import { Menu, Dropdown, Layout, Form, Tree } from 'antd';
import { useTranslation } from 'react-i18next';
import RepositoryChangeModal from "./RepositoryChangeModal";
import ShareListModal from "../../../document/share/components/ShareListModal"
import MoveLogList from "./MoveLogList"
import { getUser } from 'tiklab-core-ui';
import "./RepositoryDetailAside.scss"
import { appendNodeInTree, removeNodeAndSort, updataTreeSort, findNodeById } from '../../../common/utils/treeDataAction';
import AddDropDown from './AddDropDown';
import { DownOutlined } from '@ant-design/icons';
const { Sider } = Layout;

const RepositorydeAside = (props) => {
    // 解析props

    const { searchrepository, repository, repositorylist, categoryStore } = props;
    //语言包
    const { t } = useTranslation();
    const moveRef = useRef([]);
    const { findRepositoryCatalogue, updateRepositoryCatalogue, deleteRepositoryLog, updateDocument, deleteDocument,
        repositoryCatalogueList, setRepositoryCatalogueList, createDocumentRecent,
        createDocument, expandedTree, setExpandedTree, findDmUserList, findDocument, findCategory } = categoryStore;

    // 当前选中目录id
    const id = props.location.pathname.split("/")[5];
    const [selectKey, setSelectKey] = useState(id);
    const [isShowText, SetIsShowText] = useState(true)
    const [changeRepositoryVisible, setChangeRepositoryVisible] = useState(null)
    const repositoryId = props.match.params.repositoryId;
    const [isHover, setIsHover] = useState(false)
    const [requsetedCategory, setRequsetedCategory] = useState([])

    const [modalTitle, setModalTitle] = useState()
    const userId = getUser().userId;
    const tenant = getUser().tenant;

    const [shareListVisible, setShareListVisible] = useState(false)

    // 模板内容
    const [contentValue, setContentValue] = useState()
    useEffect(() => {
        findRepositoryCatalogue({ repositoryId: repositoryId, dimensions: [1, 2] }).then((data) => {
            setRepositoryCatalogueList(data.data)
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
        const params = {
            name: item.name,
            model: item.formatType,
            modelId: item.id,
            master: { id: userId },
            wikiRepository: { id: repositoryId }
        }
        createDocumentRecent(params)

        findCategoryChildren(item.id, item.dimension)
        if (item.formatType === "category") {
            localStorage.setItem("categoryId", item.id);
            setOpenClickCategory(item.id)

            props.history.push(`/index/repositorydetail/${repositoryId}/folder/${item.id}`)
        }
        if (item.typeId === "document") {
            props.history.push(`/index/repositorydetail/${repositoryId}/doc/${item.id}`)
        }
        if (item.typeId === "markdown") {
            props.history.push(`/index/repositorydetail/${repositoryId}/markdownView/${item.id}`)
        }
    }

    const findCategoryChildren = (id, dimension) => {
        setSelectKey(id)
        const isRequested = requsetedCategory.some(category => category === id);
        if (!isRequested) {
            findRepositoryCatalogue({ repositoryId: repositoryId, parentWikiCategory: id, dimensions: [dimension + 1, dimension + 2] }).then(data => {
                if (data.code === 0) {
                    const list = appendNodeInTree(id, repositoryCatalogueList, data.data, "overview")
                    setRepositoryCatalogueList([...list])
                    setRequsetedCategory(requsetedCategory.concat(id))
                }

            })
        }
    }

    // 编辑
    const editMenu = (item, index) => {
        return <Menu onClick={(value) => editCatelogue(value, item, index)}>
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
    const editCatelogue = (value, item, index) => {
        const { id, formatType, sort } = item;
        value.domEvent.stopPropagation()
        if (value.key === "edit") {
            setIsRename(id)
        }
        if (value.key === "delete") {
            if (formatType === "category") {
                deleteRepositoryLog(item).then(res => {
                    if (res.code === 0) {
                        removeNodeAndSort(repositoryCatalogueList, item.parentWikiCategory ? item.parentWikiCategory.id : "nullString", sort)
                    }
                })
            }
            if (formatType === "document") {
                deleteDocument(item).then(res => {
                    if (res.code === 0) {
                        removeNodeAndSort(repositoryCatalogueList, item.wikiCategory ? item.wikiCategory.id : "nullString", sort)
                    }
                })
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
        if (inputRef.current) {
            inputRef.current.autofocus = true;
            let range = getSelection();
            range.selectAllChildren(inputRef.current);
            range.collapseToEnd()
        }
        return;
    }, [inputRef.current])

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
    const setOpenOrClose = expanded => {
        const id = expanded.node.key
        if (isExpandedTree(id)) {
            setExpandedTree(expandedTree.filter(item => item !== id))
        } else {
            findCategoryChildren(id, expanded.node.dimension)
            setExpandedTree(expandedTree.concat(id));
        }
    }

    const setOpenClickCategory = key => {

        if (!isExpandedTree(key)) {
            setExpandedTree(expandedTree.concat(key));
        }
    }

    const [moveCategoryId, setMoveCategoryId] = useState()
    const [moveCategoryParentId, setMoveCategoryParentId] = useState()
    const [formatType, setFormatType] = useState()
    const [moveLogListVisible, setMoveLogListVisible] = useState(false)
    // 拖放效果


    //必须有onDragOver才能触发onDrop
    const dragover = () => {
        event.preventDefault();
    }

    const changeLog = (targetId) => {
        event.preventDefault();
        let value;
        if (formatType === "category") {
            if (moveRef.current[moveCategoryId].contains(event.target) || moveRef.current[moveCategoryId].current == event.target) {

                return
            }
        }

        if (targetId && targetId !== moveCategoryParentId && targetId !== moveCategoryId) {
            if (formatType === "category") {
                if (targetId) {
                    value = {
                        parentWikiCategory: { id: targetId },
                        id: moveCategoryId
                    }
                } else {
                    value = {
                        id: moveCategoryId
                    }
                }
                updateRepositoryCatalogue(value).then((res) => {
                    if (res.code === 0) {
                        findRepositoryCatalogue(repositoryId).then((data) => {
                            setRepositoryCatalogueList(data)
                        })
                    }
                })
            } else {
                if (targetId) {
                    value = {
                        wikiCategory: { id: targetId },
                        id: moveCategoryId
                    }
                } else {
                    value = {
                        id: moveCategoryId
                    }
                }
                updateDocument(value).then((res) => {
                    if (res.code === 0) {
                        findRepositoryCatalogue(repositoryId).then((data) => {
                            setRepositoryCatalogueList(data)
                        })
                    }
                })
            }

        }
    }


    const fileTree = (item, index) => {
        return <div
            key={item.id}
            className={`repository-menu-submenu`}
            onClick={(event) => selectKeyFun(event, item)}
            onMouseOver={(event) => { event.stopPropagation(), setIsHover(item.id) }}
            onMouseLeave={(event) => { event.stopPropagation(), setIsHover(null) }}
        >
            <div className="repository-menu-submenu-left">

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


                    id={"file-" + item.id}
                    title={item.name}
                >
                    {item.name}
                </span>
            </div>
            <div className={`${isHover === item.id ? "icon-show" : "icon-hidden"}`}>
                <Dropdown overlay={() => editMenu(item,index)} placement="bottomLeft">
                        <svg className="img-icon" aria-hidden="true">
                            <use xlinkHref="#icon-moreBlue"></use>
                        </svg>
                    </Dropdown>
            </div>
        </div>



    }

    const logTree = (item, index) => {
        return <div className={`repository-menu-submenu`}
            key={item.id}
            onClick={(event) => selectKeyFun(event, item)}
            onMouseOver={(event) => { event.stopPropagation(), setIsHover(item.id) }}
            onMouseLeave={(event) => { event.stopPropagation(), setIsHover(null) }}
        >

            <div className="repository-menu-submenu-left" draggable="false">
                <svg className="img-icon" aria-hidden="true">
                    <use xlinkHref="#icon-folder"></use>
                </svg>
                <span className={`${isRename === item.id ? "repository-input" : "repository-view"}`}
                    contentEditable={isRename === item.id ? true : false}
                    suppressContentEditableWarning
                    onBlur={(value) => reName(value, item.id, item.formatType)}
                    ref={isRename === item.id ? inputRef : null}
                    // id = {isRename === item.id ? isRename : null}
                    onKeyDownCapture={(value) => enterKeyRename(value, item.id, item.formatType)}
                > {item.name} </span>
            </div>
            <div className={`${isHover === item.id ? "icon-show" : "icon-hidden"} icon-action`}>

                <AddDropDown category={item} />
                <Dropdown overlay={() => editMenu(item, index)} placement="bottomLeft">
                    <svg className="img-icon" aria-hidden="true">
                        <use xlinkHref="#icon-moreBlue"></use>
                    </svg>
                </Dropdown>
            </div>
        </div>
    }
    const categoryTree = (data) => {
        return data?.map((item, index) => {
            if (item.formatType === "category") {
                return <Tree.TreeNode
                    title={logTree(item, index)}
                    key={item.id}
                    dimension={item.dimension}
                    sort={item.sort}
                    type={item.formatType}
                    parentWikiCategory={item.dimension !== 1 ? item.parentWikiCategory?.id : "nullString"}
                    disableCheckbox
                    className={`repository-menu-submenu ${item.id === selectKey ? "repository-menu-select" : ""}`}>
                    {categoryTree(item.children)}
                </Tree.TreeNode>
            }
            if (item.formatType === "document") {
                return <Tree.TreeNode
                    title={fileTree(item, index)}
                    disableCheckbox
                    type={item.formatType}
                    dimension={item.dimension}
                    parentWikiCategory={item.dimension !== 1 ? item.wikiCategory?.id : "nullString"}
                    key={item.id}
                    sort={item.sort}
                    className={`repository-menu-submenu ${item.id === selectKey ? "repository-menu-select" : ""} `}
                />

            }
        })
    }

    const setNode = (item) => {
        let element = null
        if (item.formatType === "category") {
            element = logTree(item)
        }
        if (item.formatType === "document") {
            element = fileTree(item)
        }
        return element;
    }
    const onDrop = (info) => {
        const { event, node, dragNode, dragNodesKeys } = info;
        const dropToGap = info.dropToGap;
        const dropType = node.type;
        if (dropType === "document" && dropToGap === false) {
            return
        }

        const dropId = node.key;
        const dropParentId = node.parentWikiCategory;
        const dropSort = node.sort;
        const dropDimension = node.dimension;


        const dragId = dragNode.key;
        const dragParentId = dragNode.parentWikiCategory;
        const dragSort = dragNode.sort;
        const dragDimension = dragNode.dimension;
        const type = dragNode.type;

        const dropPos = info.node.pos.split('-');
        const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

        let params = {}
        if (dropToGap === false && dropPosition !== -1) {
            params = {
                id: dragId,
                sort: 0,
                oldParentId: dragParentId,
                dimension: dropDimension + 1,
                oldDimension: dragDimension,
                oldSort: dragSort,
                wikiRepository: {
                    id: repositoryId
                }
            }
            if (type === "document") {
                params.wikiCategory = {
                    id: dropId
                }
            }
            if (type === "category") {
                params.parentWikiCategory = {
                    id: dropId
                }
            }

        }
        if (dropToGap === true && dropPosition !== -1) {
            //同级
            params = {
                id: dragId,
                sort: dropSort + 1,
                oldParentId: dragParentId,
                oldSort: dragSort,
                oldDimension: dragDimension,
                dimension: dropDimension,
                wikiRepository: {
                    id: repositoryId
                }
            }
            if (type === "document") {
                params.wikiCategory = {
                    id: dropParentId
                }
            }
            if (type === "category") {
                params.parentWikiCategory = {
                    id: dropParentId
                }
            }


        }
        if (dropPosition === -1) {
            params = {
                id: dragId,
                sort: 0,
                oldParentId: dragParentId,
                oldSort: dragSort,
                oldDimension: dragDimension,
                dimension: 1,
                wikiRepository: {
                    id: repositoryId
                }
            }
            if (type === "document") {
                params.wikiCategory = {
                    id: "nullString"
                }
            }
            if (type === "category") {
                params.parentWikiCategory = {
                    id: "nullString"
                }
            }
        }
        if (type === "category") {
            updateCategorySort(params)
        }
        if (type === "document") {
            updateDocumentSort(params)
        }
    }

    const updateDocumentSort = (params) => {
        updateDocument(params).then(res => {
            if (res.code === 0) {
                const node = findNodeById(repositoryCatalogueList, params);
                params.parentId = params.wikiCategory.id
                updataTreeSort(repositoryCatalogueList, params, node)
            }
        })

    }

    const updateCategorySort = (params) => {
        updateRepositoryCatalogue(params).then(res => {
            if (res.code === 0) {
                const node = findNodeById(repositoryCatalogueList, params);
                console.log(node)
                params.parentId = params.parentWikiCategory.id
                updataTreeSort(repositoryCatalogueList, params, node)
            }
        })


    }

    const loop = (data, dropKey) => {
        for (const item of data) {
            if (item.id === dropKey) return item
            if (item.children && item.children.length > 0) {
                const _item = loop(item.children, dropKey)
                if (_item) return _item
            }
        }
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
                        onClick={() => { props.history.push(`/index/repositorydetail/${repositoryId}/survey`); setSelectKey("survey") }}>
                        <svg className="img-icon" aria-hidden="true">
                            <use xlinkHref="#icon-home"></use>
                        </svg>
                        概况
                    </div>
                    <div className="repository-menu" onDrop={() => changeLog("nullString")} draggable="true" onDragOver={dragover}>
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
                                <AddDropDown category={null} />
                            </div>
                        </div>
                        <Tree
                            draggable
                            showIcon
                            rootStyle="repository-menu-tree"
                            blockNode={true}
                            switcherIcon={<DownOutlined />}
                            expandedKeys={expandedTree}
                            onExpand={(expandedKeys, expanded) => setOpenOrClose(expanded)}
                            onDrop={onDrop}
                        // titleRender = {(nodedata) => setNode(nodedata)}
                        // treeData = {repositoryCatalogueList}
                        >
                            {
                                categoryTree(repositoryCatalogueList)
                            }
                        </Tree>

                    </div>
                    <div className="repository-setting-menu" onClick={() => props.history.push(`/index/repositorySet/${repositoryId}/basicInfo`)}>
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
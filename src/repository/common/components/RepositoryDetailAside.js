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
import { Menu, Dropdown, Layout, Form, Tree, message } from 'antd';
import { useTranslation } from 'react-i18next';
import RepositoryChangeModal from "./RepositoryChangeModal";
import ShareListModal from "../../../document/share/components/ShareListModal"
import MoveLogList from "./MoveLogList"
import { getUser } from 'thoughtware-core-ui';
import "./RepositoryDetailAside.scss"
import {
    appendNodeInTree, removeNodeAndSort,
    updataTreeSort, findNodeById, updateNodeName
} from '../../../common/utils/treeDataAction';
import AddDropDown from './AddDropDown';
import { DownOutlined } from '@ant-design/icons';
const { Sider } = Layout;

const RepositorydeAside = (props) => {
    // 解析props

    const { searchrepository, repository, repositorylist, categoryStore } = props;
    //语言包
    const { t } = useTranslation();
    const { findRepositoryCatalogue, updateRepositoryCatalogue, deleteRepositoryLog, updateDocument, deleteDocument,
        repositoryCatalogueList, setRepositoryCatalogueList, createRecent,
        expandedTree, setExpandedTree } = categoryStore;

    // 当前选中目录id
    const id = props.location.pathname.split("/")[4];
    const [selectKey, setSelectKey] = useState(id);
    const [changeRepositoryVisible, setChangeRepositoryVisible] = useState(null)
    const repositoryId = props.match.params.repositoryId;
    const [isHover, setIsHover] = useState(false)
    const [requsetedCategory, setRequsetedCategory] = useState([])

    const userId = getUser().userId;
    const tenant = getUser().tenant;

    const [shareListVisible, setShareListVisible] = useState(false)
    const inputRef = React.useRef(null);
    const [isRename, setIsRename] = useState()

    useEffect(() => {
        findRepositoryCatalogue({ repositoryId: repositoryId, dimensions: [1, 2] }).then((data) => {
            setRepositoryCatalogueList(data.data)
        })
        return () => {
            setExpandedTree([])
        };
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
        event.preventDefault()
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation()
        const params = {
            name: item.name,
            model: item.formatType,
            modelId: item.id,
            master: { id: userId },
            wikiRepository: { id: repositoryId }
        }
        createRecent(params)

        findCategoryChildren(item.id, item.dimension)
        if (item.formatType === "category") {
            localStorage.setItem("categoryId", item.id);
            setOpenClickCategory(item.id)

            props.history.push(`/repositorydetail/${repositoryId}/folder/${item.id}`)
        }
        if (item.typeId === "document") {
            props.history.push(`/repositorydetail/${repositoryId}/doc/${item.id}`)
        }
        if (item.typeId === "markdown") {
            props.history.push(`/repositorydetail/${repositoryId}/markdownView/${item.id}`)
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
                        const node = removeNodeAndSort(repositoryCatalogueList, item.parentWikiCategory ? item.parentWikiCategory.id : "nullString", sort)
                        console.log(node)
                        
                        if (node.formatType === "category") {
                            props.history.push(`/repositorydetail/${repositoryId}/folder/${node.id}`)
                        }
                        if(node.formatType === "document"){
                            props.history.push(`/repositorydetail/${repositoryId}/doc/${node.id}`)
                        }
                    }
                })
            }
            if (formatType === "document") {
                deleteDocument(item).then(res => {
                    if (res.code === 0) {
                        const node = removeNodeAndSort(repositoryCatalogueList, item.wikiCategory ? item.wikiCategory.id : "nullString", sort)
                        console.log(node)
                        if (node.formatType === "category") {
                            props.history.push(`/repositorydetail/${repositoryId}/folder/${node.id}`)
                        }
                        if(node.formatType === "document"){
                            props.history.push(`/repositorydetail/${repositoryId}/doc/${node.id}`)
                        }
                    }
                })
            }
        }
        if (value.key === "move") {
            setMoveLogListVisible(true)
            setMoveItem(item)
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
                    updateNodeName(repositoryCatalogueList, id, name)
                }else {
                    message.info("重命名失败")
                }
            })
        }
        if (formatType === "document") {
            updateDocument(params).then(data => {
                if (data.code === 0) {
                    setIsRename(null)
                    updateNodeName(repositoryCatalogueList, id, name)
                }else {
                    message.info("重命名失败")
                }
            })
        }
        setIsRename(null)
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
        } else {
            setExpandedTree(expandedTree.filter(item => item !== key))
        }
    }

    const [moveItem, setMoveItem] = useState()
    const [moveLogListVisible, setMoveLogListVisible] = useState(false)

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
        const dropTreePath = node.treePath;


        const dragId = dragNode.key;
        const dragParentId = dragNode.parentWikiCategory;
        const dragSort = dragNode.sort;
        const dragDimension = dragNode.dimension;
        const type = dragNode.type;
        const dragTreePath = dragNode.treePath;

        const dropPos = info.node.pos.split('-');
        const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

        let params = {}
        console.log(dropToGap, dropPosition, node, dragNode)
        if (dropToGap === false && dropPosition !== -1) {

            params = {
                id: dragId,
                sort: 0,
                oldParentId: dragParentId,
                dimension: dropDimension + 1,
                oldDimension: dragDimension,
                oldSort: dragSort,
                treePath: dropTreePath ? dropTreePath + dropId + ";" : dropId + ";",
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
            //放在drop的同级
            params = {
                id: dragId,
                oldParentId: dragParentId,
                oldSort: dragSort,
                oldDimension: dragDimension,
                dimension: dropDimension,
                treePath: dropTreePath,
                wikiRepository: {
                    id: repositoryId
                }
            }

            // 同级移动
            if (dropParentId === dragParentId) {
                if (dragSort > dropSort) {
                    params.sort = dropSort + 1
                }
                if (dragSort < dropSort) {
                    params.sort = dropSort
                }
                if (dragSort === dropSort) return;
            } else {
                params.sort = dropSort + 1
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
                treePath: null,
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
                console.log(node)
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
    const fileTree = (item, index) => {
        return <div
            key={item.id}
            className={`repository-menu-submenu`}
            onClick={(event) => selectKeyFun(event, item)}
            onMouseOver={(event) => { event.stopPropagation(), setIsHover(item.id) }}
            onMouseLeave={(event) => { event.stopPropagation(), setIsHover(null) }}
        >
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
            <div className={`${isHover === item.id ? "icon-show" : "icon-hidden"}`}>
                <Dropdown overlay={() => editMenu(item, index)} placement="bottomLeft">
                    <svg className="img-icon" aria-hidden="true">
                        <use xlinkHref="#icon-moreBlue"></use>
                    </svg>
                </Dropdown>
            </div>
        </div>
    }

    const logTree = (item, index) => {
        return <div
            className={`repository-menu-submenu`}
            key={item.id}
            onClick={(event) => selectKeyFun(event, item)}
            onMouseOver={(event) => { event.stopPropagation(), setIsHover(item.id) }}
            onMouseLeave={(event) => { event.stopPropagation(), setIsHover(null) }}
        >
            <svg className="img-icon" aria-hidden="true">
                <use xlinkHref="#icon-folder"></use>
            </svg>
            <div className={`${isRename === item.id ? "repository-input" : "repository-view"}`}
                contentEditable={isRename === item.id ? true : false}
                suppressContentEditableWarning
                onBlur={(value) => reName(value, item.id, item.formatType)}
                ref={isRename === item.id ? inputRef : null}
                onKeyDownCapture={(value) => enterKeyRename(value, item.id, item.formatType)}
            > {item.name} </div>
            <div className={`${isHover === item.id ? "icon-show" : "icon-hidden"} icon-action`}>
            {/* <div className="icon-action"> */}
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
                    treePath={item.treePath}
                    type={item.formatType}
                    parentWikiCategory={item.dimension !== 1 ? item.parentWikiCategory?.id : "nullString"}
                    disableCheckbox
                    className={`repository-menu-node ${item.id === selectKey ? "repository-menu-select" : ""}`}
                >
                    {categoryTree(item.children)}
                </Tree.TreeNode>
            }
            if (item.formatType === "document") {
                return <Tree.TreeNode
                    title={fileTree(item, index)}
                    disableCheckbox
                    type={item.formatType}
                    dimension={item.dimension}
                    treePath={item.treePath}
                    parentWikiCategory={item.dimension !== 1 ? item.wikiCategory?.id : "nullString"}
                    key={item.id}
                    sort={item.sort}
                    className={`repository-menu-node ${item.id === selectKey ? "repository-menu-select" : ""} `}
                />

            }
        })
    }
    return (
        <Fragment>
            <Sider trigger={null} collapsible collapsedWidth="50" width="270" className="repositorydetail-aside">
                <div className='repository-aside'>
                    <div className="repository-title title">
                        <span className="repository-title-left">
                            {
                                repository?.iconUrl ?
                                    <img
                                        src={version === "cloud" ? (upload_url + repository.iconUrl + "?tenant=" + tenant) : (upload_url + repository.iconUrl)}
                                        alt=""
                                        className="list-img"
                                    />
                                    :
                                    <img
                                        src={('images/repository1.png')}
                                        alt=""
                                        className="list-img"
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
                                repository={repository}
                            />
                        </div>
                    </div>
                    <div
                        className={`repository-survey ${selectKey === "survey" ? "repository-menu-select" : ""} `}
                        onClick={() => { props.history.push(`/repositorydetail/${repositoryId}/survey`); setSelectKey("survey") }}
                    >
                        <svg className="img-icon" aria-hidden="true">
                            <use xlinkHref="#icon-home"></use>
                        </svg>
                        概况
                    </div>
                    <div className="repository-menu">
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
                        >
                            {
                                categoryTree(repositoryCatalogueList)
                            }
                        </Tree>
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
                moveItem={moveItem}
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
/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-03 15:21:13
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-12-20 14:35:10
 */
import React, { useState } from 'react';
import { Modal, message } from 'antd';
import "./moveLogList.scss";
import { observer, inject } from "mobx-react";
import { withRouter } from 'react-router';
import { appendNodeInTree, removeNodeAndSort, updataTreeSort, findNodeById } from '../../../common/utils/treeDataAction';

const MoveLogList = (props) => {
    const { moveLogListVisible, setMoveLogListVisible, moveItem, categoryStore } = props;
    const { repositoryCatalogueList, updateDocument, updateRepositoryCatalogue } = categoryStore
    const [selectKey, setSelectKey] = useState()
    const repositoryId = props.match.params.repositoryId;
    const parentItem = moveItem?.formatType === "category" ? moveItem?.parentWikiCategory : moveItem?.wikiCategory
    const onFinish = () => {
        if(!selectKey) {
            message.warning('请选择要引动到的目录');
            return
        }else {
            if(moveItem.formatType === "category") {
                const params = {
                    id: moveItem.id,
                    sort: 0,
                    oldParentId: moveItem.parentWikiCategory ? moveItem.parentWikiCategory.id : "nullString",
                    dimension: selectKey.dimension + 1,
                    oldDimension: moveItem.dimension,
                    oldSort: moveItem.sort,
                    wikiRepository: {
                        id: repositoryId
                    },
                    parentWikiCategory: {
                        id: selectKey.id
                    }
                }
                updateCategorySort(params)
            }

            if(moveItem.formatType === "document") {
                const params = {
                    id: moveItem.id,
                    sort: 0,
                    oldParentId: moveItem.wikiCategory ? moveItem.wikiCategory.id : "nullString",
                    dimension: selectKey.dimension + 1,
                    oldDimension: moveItem.dimension,
                    oldSort: moveItem.sort,
                    wikiRepository: {
                        id: repositoryId
                    },
                    wikiCategory: {
                        id: selectKey.id
                    }
                }
                updateDocumentSort(params)
            }
            
        }
     
    }
    const updateDocumentSort = (params) => {
        updateDocument(params).then(res => {
            if (res.code === 0) {
                const node = findNodeById(repositoryCatalogueList, params);
                console.log(node)
                params.parentId = params.wikiCategory.id
                updataTreeSort(repositoryCatalogueList, params, node)
                setMoveLogListVisible(false)
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
                setMoveLogListVisible(false)
            }
        })
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
    const selectMoveParent = (category) => {
        // if(categoryId === moveCategoryId || categoryId === moveCategoryParentId){
        //     return
        // }else {
        //     setSelectKey()
        // }
        setSelectKey(category)
        
    }
    const logTree = (data, levels, faid) => {
        let newLevels = 0;
        return data && data.length > 0 && data.map((category) => {
            if (category.formatType === "category") {
                return <div 
                className={`${!isExpandedTree(faid) || selectKey !== faid ? "" : 'category-menu-submenu-hidden'}
                    ${category.id === moveItem.id || category.id === parentItem?.id ? "category-disable-select" : "category-allow-select"}
                `}
                    key={category.id}
                >
                    <div className={`category-menu-submenu ${category.id === selectKey?.id ? "category-menu-select" : ""} `}
                        key={category.id}
                        onClick={() => selectMoveParent(category) }
                    >
                        <div style={{ paddingLeft: levels * 10 }}>
                            {
                                (category.children && category.children.length > 0) ?
                                    isExpandedTree(category.id) ? <svg className="icon" aria-hidden="true" onClick={() => setOpenOrClose(category.id)}>
                                        <use xlinkHref="#icon-right" ></use>
                                    </svg>
                                        :
                                        <svg className="icon" aria-hidden="true" onClick={() => setOpenOrClose(category.id)}>
                                            <use xlinkHref="#icon-down" ></use>
                                        </svg> : <svg className="icon" aria-hidden="true">
                                        <use xlinkHref=""></use>
                                    </svg>
                            }
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-folder"></use>
                            </svg>
                            <span>{category.name} </span>
                        </div>
                    </div>
                    {
                        category.children && category.children.length > 0 && (newLevels = levels + 1) && logTree(category.children, newLevels, category.id)
                    }
                </div>
            }

        })
    }

    return (
        <Modal
            title="选择移动目录"
            visible={moveLogListVisible}
            onOk={() => onFinish()}
            onCancel={() => setMoveLogListVisible(false)}
        >
            <div className="move-menu">
                {
                    moveLogListVisible && repositoryCatalogueList && logTree(repositoryCatalogueList, 1, 0)
                }
            </div>
        </Modal>
    )
}
export default withRouter(inject("categoryStore")(observer(MoveLogList)));
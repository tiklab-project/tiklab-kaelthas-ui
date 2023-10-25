/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-03 15:21:13
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-12-20 14:35:10
 */
import React, { useState } from 'react';
import { Modal } from 'antd';
import "./moveLogList.scss";
import { observer, inject } from "mobx-react";
import { withRouter } from 'react-router';
const MoveLogList = (props) => {
    const { moveLogListVisible, setMoveLogListVisible, formatType,
        moveCategoryId, categoryStore, moveCategoryParentId } = props;
    const { findRepositoryCatalogue, repositoryCatalogueList, setRepositoryCatalogueList, updateDocument, 
        updateRepositoryCatalogue } = categoryStore
    const [selectKey, setSelectKey] = useState()
    const repositoryId = props.match.params.repositoryId;
    const onFinish = () => {
        let value;
        if (formatType === "category") {
            if (selectKey) {
                value = {
                    parentWikiCategory: { id: selectKey },
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
                    setMoveLogListVisible(false)
                }
            })
        } else {
            if (selectKey) {
                value = {
                    wikiCategory: { id: selectKey },
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
                    setMoveLogListVisible(false)
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
    const logTree = (data, levels, faid) => {
        let newLevels = 0;
        return data && data.length > 0 && data.map((category) => {
            if (category.formatType === "category") {
                return <div 
                className={`${!isExpandedTree(faid) || selectKey !== faid ? null : 'repository-menu-submenu-hidden'}}
                `}

                    key={category.id}
                >
                    <div className={`repository-menu-submenu ${category.id === selectKey ? "repository-menu-select" : ""} `}
                        key={category.id}
                        onClick={() => setSelectKey(category.id)}
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
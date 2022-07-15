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
import { SafeArea, SwipeAction, Modal, Empty, Toast } from 'antd-mobile';
import "./categoryList.scss";
import RepositoryAdd from "../../wikiDetail/components/repositoryAdd";
import RepositoryLogAdd from '../../wikiDetail/components/repositoryLogAdd';
import RepositoryAction from '../../wikiDetail/components/repositoryAction';
import RepositoryEdit from '../../wikiDetail/components/repositoryEdit';
import DocumentShare from './documentShare';
const CategoryList = (props) => {
    // 解析props
    const { wikiCategoryStore, wikiCatalogueStore } = props
    const { findCategoryDocument, findCategory } = wikiCategoryStore;
    const { addVisible, setAddVisible, setCategoryId, setCategoryType,setEditVisible,editVisible, setWikiName, actionVisible,setActionVisible } = wikiCatalogueStore
    const [selectKey, setSelectKey] = useState();
    const [categoryList, setCategoryList] = useState();
    const [categoryInfo, setCategoryInfo] = useState();
    const [visible, setVisible] = useState(false);
    const [visibleAdd, setVisibleAdd] = useState(false);
    const categoryId = props.match.params.id;
    const repositoryId = props.match.params.resid;
    const [shareVisible, setShareVisible] = useState(false);

    useEffect(() => {
        initList()
        findCategory({ id: categoryId }).then(res => {
            if (res.code === 0) {
                setCategoryInfo(res.data)
            }
        })
    }, [categoryId])

    const initList = () => {
        findCategoryDocument({ id: categoryId }).then(res => {
            if (res.code === 0) {
                setCategoryList(res.data)
            }
        })
    }

    useEffect(() => {
        // 初次进入激活导航菜单
        setSelectKey(props.location.pathname)
        return
    }, [])

    const goLog = (id) => {
        setCategoryId(id)
        setCategoryType("log")
        props.history.push(`/categoryList/${repositoryId}/${id}`)
    }

    const showActionPopupDoc = (id, name) => {
        setActionVisible(true)
        setCategoryId(id)
        setCategoryType("document")
        setWikiName(name)
    }

    const showActionPopupLog = (id,name) => {
        setActionVisible(true)
        setCategoryId(id)
        setCategoryType("log")
        setWikiName(name)
    }

    const showAddCatePopup = (id) => {
        setVisible(true)
        setCategoryId(id)
    }

    const runInAction = (id, name, action) => {
        action(id, name)
    }
    
    const goDocumentDetail = (id, typeId) => {
        if(typeId === "document"){
            props.history.push(`/document/${id}`)
        }
        if (typeId === "mindMap") {
            Toast.show({
                content: '此文档为脑图，请在电脑端查看'
            })
        }
        
    }
    const rightActions = [
        {
            key: 'more',
            text: <svg className="repository-list-icon" aria-hidden="true">
                <use xlinkHref="#icon-more"></use>
            </svg>,
            color: 'light',
            onClick: showActionPopupDoc
        }
    ]

    const rightActionsLog = [
        {
            key: 'more',
            text: <svg className="repository-list-icon" aria-hidden="true">
                <use xlinkHref="#icon-more"></use>
            </svg>,
            color: 'light',
            onClick: showActionPopupLog
        },
        {
            key: 'add',
            text: <svg className="repository-list-icon" aria-hidden="true">
                <use xlinkHref="#icon-addList"></use>
            </svg>,
            color: '#5D70EA',
            onClick: showAddCatePopup
        }
    ]
    return (
        <Fragment>
            <div className="category-detail">
                <div style={{ background: '#ace0ff' }}>
                    <SafeArea position='top' />
                </div>
                <div className="category-top">
                    <div className="category-top-left">
                        <svg className="category-icon-logo" aria-hidden="true" onClick={() => props.history.goBack()}>
                            <use xlinkHref="#icon-left"></use>
                        </svg>
                        <div className="category-title">{categoryInfo ? categoryInfo.name : "目录"}</div>
                    </div>
                    <div className="category-top-right">
                        <svg className="category-icon-search" aria-hidden="true" onClick={() => props.history.push(`/categorySet/${categoryId}`)}>
                            <use xlinkHref="#icon-edit"></use>
                        </svg>
                        <svg className="category-icon-add" aria-hidden="true" onClick={() => setVisible(true)}>
                            <use xlinkHref="#icon-add"></use>
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
                            categoryList && categoryList.length > 0 ? categoryList.map((item) => {
                                return <Fragment>
                                    {
                                        item.formatType && item.formatType === "document" ?
                                            <SwipeAction
                                                key={item.id}
                                                rightActions={rightActions}
                                                onAction={(action, e) => runInAction(item.id,item.name, action.onClick)}
                                            >
                                                <div 
                                                    className="category-list-menu" 
                                                    key={item.id} 
                                                    onClick={() => goDocumentDetail(item.id, item.typeId)}
                                                    
                                                >
                                                    <svg className="category-list-icon" aria-hidden="true">
                                                        <use xlinkHref="#icon-point"></use>
                                                    </svg>
                                                    {
                                                        item.typeId === "document" && <svg className="category-list-icon" aria-hidden="true">
                                                            <use xlinkHref="#icon-file"></use>
                                                        </svg>
                                                    }
                                                    {
                                                        item.typeId === "mindMap" && <svg className="category-list-icon" aria-hidden="true">
                                                            <use xlinkHref="#icon-minmap"></use>
                                                        </svg>
                                                    }
                                                    
                                                    <span id={`name${item.id}`}>{item.name} </span>

                                                </div>
                                            </SwipeAction>
                                            :
                                            <SwipeAction
                                                key={item.id}
                                                rightActions={rightActionsLog}
                                                onAction={(action, e) => runInAction(item.id, item.name, action.onClick)}
                                            >
                                                <div 
                                                    className="category-list-menu" 
                                                    key={item.id} 
                                                    onClick={() => goLog(item.id)}
                                                    
                                                >
                                                    <svg className="category-list-icon" aria-hidden="true">
                                                        <use xlinkHref="#icon-point"></use>
                                                    </svg>

                                                    <svg className="category-list-icon" aria-hidden="true">
                                                        <use xlinkHref="#icon-folder"></use>
                                                    </svg>
                                                    <span id={`name${item.id}`}>{item.name} </span>


                                                </div>
                                            </SwipeAction>
                                    }

                                </Fragment>
                            }): <Empty
                                style={{ padding: '64px 0' }}
                                description='暂无数据'
                            />
                        }
                    </div>
                </div>
                <RepositoryAdd
                    visible={visible}
                    setVisible={setVisible}
                    visibleAdd={visibleAdd}
                    setVisibleAdd={setVisibleAdd}
                    parentCategoryId={categoryId}
                    repositoryId={repositoryId}
                    initList={initList}
                />
                <Modal
                    className="repositoryLog-add"
                    visible={addVisible}
                    content={<RepositoryLogAdd
                        repositoryId={repositoryId}
                        parentCategoryId={categoryId}
                        setVisibleAdd={setAddVisible}
                        initList={initList}
                    />}
                    onClose={() => {
                        setAddVisible(false)
                    }}
                    showCloseButton={true}
                    closeOnMaskClick={true}
                >

                </Modal>
                <RepositoryAction
                    actionVisible={actionVisible}
                    setActionVisible={setActionVisible}
                    initList={initList}
                />
                <Modal
                    className="repositoryLog-add"
                    visible={editVisible}
                    content={<RepositoryEdit />}
                    onClose={() => {
                        setEditVisible(false)
                    }}
                    destroyOnClose={true}
                    closeOnMaskClick={true}
                />
                <DocumentShare shareVisible = {shareVisible} setShareVisible = {setShareVisible} {...props}/>
            </div>
        </Fragment>
    )
}
export default withRouter(inject("wikiCategoryStore", "wikiCatalogueStore")(observer(CategoryList)));

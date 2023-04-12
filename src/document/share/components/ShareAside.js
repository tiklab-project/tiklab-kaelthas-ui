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
import { Layout, Form } from 'antd';
import { useTranslation } from 'react-i18next';
import "./ShareAside.scss"
const { Sider } = Layout;
const ShareAside = (props) => {
    // 解析props
    console.log(props)
    const [form] = Form.useForm();
    const { shareStore } = props;
    //语言包
    const { t } = useTranslation();
    const moveRef = useRef([]);
    const { findShareCategory, judgeAuthCode} = shareStore;

    // 当前选中目录id
    const [selectKey, setSelectKey] = useState();
    const [isShowText, SetIsShowText] = useState(true)
    const shareLink = props.match.params.shareId;
    const id = props.location.pathname.split("/")[4];
    const [repositoryCatalogueList, setRepositoryCatalogueList] = useState([])

    useEffect(() => {
        setSelectKey(id)
        return
    }, [id])

    useEffect(() => {
        const params = new FormData();
        params.append("shareLink", shareLink)
        judgeAuthCode(params).then(data => {
            // console.log(props.location.state)
            if (data.data === "true") {
                if (!props.location.state) {
                    window.location.href = `http://127.0.0.1:3004/#/passWord/${shareLink}`
                } else {
                    findShareCategory(params).then((data) => {
                        if (data.code === 0) {
                            setRepositoryCatalogueList(data.data)
                            const item = data.data[0]
                            if (item?.formatType === "category") {
                                props.history.push(`/share/${shareLink}/category/${item.id}`)
                            }
                            if (item?.formatType === "document") {
                                props.history.push(`/share/${shareLink}/doc/${item.id}`)
                            }
                            setSelectKey(item.id)
                        }
                    })
                }
            }

            if (data.data === "false") {
                findShareCategory(params).then((data) => {
                    if (data.code === 0) {
                        setRepositoryCatalogueList(data.data)
                        const item = data.data[0]
                        if (item?.formatType === "category") {
                            props.history.push(`/share/${shareLink}/category/${item.id}`)
                        }
                        if (item?.formatType === "document") {
                            props.history.push(`/share/${shareLink}/doc/${item.id}`)
                        }
                        setSelectKey(item.id)
                    }
                })
            }
        })

    }, [shareLink])



    //点击左侧菜单
    const selectKeyFun = (event, item) => {
        event.stopPropagation()
        setSelectKey(item.id)
        if (item.formatType === "category") {
            props.history.push(`/share/${shareLink}/category/${item.id}`)
        }
        if (item.typeId === "document") {
            props.history.push(`/share/${shareLink}/doc/${item.id}`)
        }
    }
    //更新目录
    const inputRef = React.useRef(null);
    const [isRename, setIsRename] = useState()

    useEffect(() => {
        if (isRename) {
            inputRef.current.autofocus = true;
            let range = getSelection();
            range.selectAllChildren(inputRef.current);
            range.collapseToEnd()
        }
    }, [isRename])


    //折叠菜单
    const [expandedTree, setExpandedTree] = useState([0])
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

    const logTree = (fItems, item, levels, faid, index) => {
        let newLevels = 0;
        return <div className={`${isExpandedTree(faid) ? "" : 'repository-menu-submenu-hidden'}`}
            key={item.id}
            onClick={(event) => selectKeyFun(event, item)}
            ref={el => (moveRef.current[item.id] = el)}
        >
            <div className={`repository-menu-submenu ${item.id === selectKey ? "repository-menu-select" : ""} `}
                key={item.id}

            >
                <div style={{ paddingLeft: levels * 21 + 24 }} className="repository-menu-submenu-left">
                    {
                        (item.children && item.children.length > 0) || (item.documents && item.documents.length > 0) ?
                            isExpandedTree(item.id) ? <svg className="img-icon" aria-hidden="true" onClick={() => setOpenOrClose(item.id)}>
                                <use xlinkHref="#icon-down" ></use>
                            </svg> :
                                <svg className="img-icon" aria-hidden="true" onClick={() => setOpenOrClose(item.id)}>
                                    <use xlinkHref="#icon-right" ></use>
                                </svg> : <svg className="img-icon" aria-hidden="true">
                                <use xlinkHref="#icon-circle"></use>
                            </svg>
                    }
                    <svg className="img-icon" aria-hidden="true">
                        <use xlinkHref="#icon-folder"></use>
                    </svg>
                    <span className={`${isRename === item.id ? "repository-input" : ""}`}
                        ref={isRename === item.id ? inputRef : null}

                    >{item.name} </span>
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
            <div className={`repository-menu-submenu ${item.id === selectKey ? "repository-menu-select" : ""} `}
                key={item.id}
                onClick={(event) => selectKeyFun(event, item)}
                ref={el => (moveRef.current[item.id] = el)}
            >
                <div style={{ paddingLeft: levels * 21 + 24 }} className="repository-menu-submenu-left">
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
                    <span className={`${isRename === item.id ? "repository-input" : ""}`}
                        ref={isRename === item.id ? inputRef : null}
                        id={"file-" + item.id}
                    >{item.name} </span>
                </div>
            </div>
        </div>
    }
    return (
        <Fragment>
            <Sider trigger={null} collapsible collapsed={!isShowText} collapsedWidth="50" width="250">
                <div className={`repository-aside ${isShowText ? "" : "repository-icon"}`}>
                    <div className="repository-menu">
                        {/* <div className="repository-menu-firstmenu">
                            <div className="repository-menu-firstmenu-left">
                                <svg className="img-icon" aria-hidden="true">
                                    <use xlinkHref="#icon-repository"></use>
                                </svg>
                                <span>知识库</span>
                            </div>
                        </div> */}
                        {
                            repositoryCatalogueList && repositoryCatalogueList.map((item, index) => {
                                if (item.typeId === "document") {
                                    return fileTree(repositoryCatalogueList, item, 0, 0, index)
                                }
                                if (item.formatType === "category") {
                                    return logTree(repositoryCatalogueList, item, 0, 0, index)
                                }
                            })
                        }
                    </div>
                </div>
            </Sider>
        </Fragment>
    )
}
export default withRouter(inject("shareStore")(observer(ShareAside)));
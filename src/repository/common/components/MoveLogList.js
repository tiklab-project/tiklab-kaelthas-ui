/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-03 15:21:13
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-12-20 14:35:10
 */
import React,{Fragment, useState,useEffect} from 'react';
import { Modal} from 'antd';
import "./moveLogList.scss"
import { withRouter } from 'react-router';
const MoveLogList = (props) => {
    const { wikiCatalogueList, moveLogListVisible,
        setMoveLogListVisible,setWikiCatalogueList,formatType,
        moveCategoryId,findWikiCatalogue,updateDocument,updateWikiCatalogue,moveCategoryParentId } = props;
    const [selectKey,setSelectKey] = useState()
    const wikiId = props.match.params.wikiId;
    const onFinish = () => {
        let value;
        if(formatType === "category"){
            if(selectKey){
                value = {
                    parentCategory:{id:selectKey},
                    id: moveCategoryId
                }
            }else {
                value = {
                    id: moveCategoryId
                }
            }
            updateWikiCatalogue(value).then((res)=> {
                if(res.code === 0){
                    findWikiCatalogue(wikiId).then((data)=> {
                        setWikiCatalogueList(data)
                    })
                    setMoveLogListVisible(false)
                }
            })
        }else {
            if(selectKey){
                value = {
                    category:{id:selectKey},
                    id: moveCategoryId
                }
            }else {
                value = {
                    id: moveCategoryId
                }
            }
            updateDocument(value).then((res)=> {
                if(res.code === 0){
                    findWikiCatalogue(wikiId).then((data)=> {
                        setWikiCatalogueList(data)
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
            if(category.formatType === "category" && moveCategoryParentId !== category.id){
                return <div className={`${!isExpandedTree(faid) ||  selectKey !== faid ? null : 'wiki-menu-submenu-hidden'}`}
                    key={category.id}
                >
                <div className={`wiki-menu-submenu ${category.id === selectKey ? "wiki-menu-select" : ""} `}
                    key={category.id}
                    onClick={() => setSelectKey(category.id)}
                >
                    <div style={{ paddingLeft: levels * 10 }}>
                        {
                            (category.children && category.children.length > 0) ?
                                isExpandedTree(category.id) ? <svg className="icon" aria-hidden="true" onClick={() => setOpenOrClose(category.id)}>
                                    <use xlinkHref="#icon-right" ></use>
                                </svg> :
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
                    moveLogListVisible && wikiCatalogueList && logTree(wikiCatalogueList, 1, 0)
                }
            </div>
        </Modal>
    )
}
export default withRouter(MoveLogList);
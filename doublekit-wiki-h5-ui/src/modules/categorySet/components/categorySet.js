import React, { useEffect, useState } from "react";
import { List, SafeArea } from 'antd-mobile';
import { inject, observer } from "mobx-react";
import "./categorySet.scss"
import { withRouter } from "react-router";
const CategorySet = (props) => {
    const {categorySetStore} = props;

    const {findCategory} = categorySetStore;
    const categoryId = props.match.params.id;

    const [categoryInfo, setCategoryInfo] = useState()
    useEffect(()=> {
        localStorage.setItem("categoryId", categoryId)
        findCategory(categoryId).then(data => {
            if(data.code === 0) {
                setCategoryInfo(data.data)
            }
        })
    },[])
    console.log()
    return (
        <div className="category-set">
            <div style={{ background: '#ace0ff' }}>
                <SafeArea position='top' />
            </div>
            <div className="category-top">
                <svg className="category-icon-logo" aria-hidden="true" onClick={() => props.history.goBack()}>
                    <use xlinkHref="#icon-left"></use>
                </svg>
                <div className="category-title">目录设置</div>
            </div>
            <div className="category-set-contant">
                <div className="category-set-item" onClick={() => props.history.push(`/categoryEditName/${categoryInfo.name}`)}>
                    <div>目录名称</div>
                    <div className="item-right">

                        {categoryInfo && categoryInfo.name}
                        <svg className="category-set-icon" aria-hidden="true">
                            <use xlinkHref="#icon-right"></use>
                        </svg>
                    </div>
                </div>
                <div className="category-set-item" onClick={() => props.history.push(`/categoryEditMaster/${categoryInfo.master.name}`)}>
                    <div>负责人</div>
                    <div className="item-right">

                        {categoryInfo && categoryInfo.master.name}
                        <svg className="category-set-icon" aria-hidden="true">
                            <use xlinkHref="#icon-right"></use>
                        </svg>
                    </div>
                </div>
                {/* <div className="category-set-item" onClick={() => props.history.push(`/categoryEditDesc/${categoryInfo.desc}`)}>
                    <div>知识库描述</div>
                    <div className="item-right">

                        {categoryInfo && categoryInfo.desc}
                        <svg className="category-set-icon" aria-hidden="true">
                            <use xlinkHref="#icon-right"></use>
                        </svg>
                    </div>
                </div> */}
            </div>

            <div className="category-set-contant ">
                <div className="category-set-item delete">
                    删除
                </div>
            </div>


        </div>
    )
}

export default withRouter(inject("categorySetStore")(observer(CategorySet)));
import React, { useEffect, useState,Fragment } from "react";
import { SafeArea, Popup, Modal } from 'antd-mobile';
import "./repositoryDetail.scss"
import RepositoryLogAdd from "./repositoryLogAdd";
const RepositoryAdd = (props) => {
    const {visible, setVisible, visibleAdd, setVisibleAdd,repositoryId,parentCategoryId,initList} = props;

    const showAdd = ()=> {
        setVisible(false)
        // props.history.push(`/repositoryLogAdd/${repositoryId}`)
        setVisibleAdd(true)
    }

    return (
        <Fragment>
            <Popup
                className="repository-popup"
                visible={visible}
                onMaskClick={() => {
                    setVisible(false)
                }}
                bodyStyle={{ height: '22vh' }}
            >
                <div className="repository-select">
                    <div className="repository-select-list list-first">
                        <svg className="repository-list-icon" aria-hidden="true">
                            <use xlinkHref="#icon-file"></use>
                        </svg>
                        新建文档
                    </div>
                    <div className="repository-select-list" onClick={()=> showAdd()}>
                        <svg className="repository-list-icon" aria-hidden="true">
                            <use xlinkHref="#icon-folder"></use>
                        </svg>
                        新建目录
                    </div>
                </div>
                <div className="repository-select-cancel" onClick={() => setVisible(false)}>
                    取消
                </div>
            </Popup>
            <Modal 
                className="repositoryLog-add"
                visible={visibleAdd}
                content={<RepositoryLogAdd repositoryId = {repositoryId} parentCategoryId = {parentCategoryId} setVisibleAdd = {setVisibleAdd} initList = {initList}/>}
                onClose={() => {
                    setVisibleAdd(false)
                }}
                closeOnMaskClick = {true}
            >
                
            </Modal>
        </Fragment>
    )
}
export default RepositoryAdd;
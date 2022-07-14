import React, { useEffect, useState,Fragment } from "react";
import { SafeArea, Popup, Dialog } from 'antd-mobile';
import "./repositoryAction.scss";
import { inject, observer } from "mobx-react";
// import RepositoryLogAdd from "./repositoryLogAdd";
const RepositoryAction= (props) => {
    const {setVisibleAdd,wikiCatalogueStore, initList} = props;
    const {deleteDocument, deleteCategory,categoryType,categoryId,setEditVisible,actionVisible,setActionVisible} = wikiCatalogueStore;
  

    const showModal = () => {
        Dialog.show({
            content: '确定删除',
            closeOnAction: true,
            actions: [
              [
                {
                  key: 'cancel',
                  text: '取消',
                },
                {
                  key: 'delete',
                  text: '删除',
                  bold: true,
                  danger: true,
                  onClick: deleteAction
                }
              ],
            ],
        })
        
        
    }
    const deleteAction = () => {
        if(categoryType === "document") {
            deleteDocument(categoryId).then(res => {
                if(res.code === 0){
                    setActionVisible(false)
                    initList()
                }
            })
        }
        if(categoryType === "log") {
            deleteCategory(categoryId).then(res => {
                if(res.code === 0){
                    setActionVisible(false)
                    initList()
                }
            })
        }
    }
    const goEdit = () => {
        setEditVisible(true)
        setActionVisible(false)
    }
    return (
        <Fragment>
            <Popup
                className="repository-action-popup"
                visible={actionVisible}
                onMaskClick={() => {
                    setVisible(false)
                }}
                bodyStyle={{ height: '22vh' }}
            >
                <div className="repository-select">
                    <div className="repository-select-list list-first" onClick={() =>goEdit()}>
                        <svg className="repository-list-icon" aria-hidden="true">
                            <use xlinkHref="#icon-edit"></use>
                        </svg>
                        重命名
                    </div>
                    <div className="repository-select-list" onClick={()=> showModal()} style={{color: "#f13a0c"}}>
                        <svg className="repository-list-icon" aria-hidden="true">
                            <use xlinkHref="#icon-delete"></use>
                        </svg>
                        删除
                    </div>
                </div>
                <div className="repository-select-cancel" onClick={() => setActionVisible(false)}>
                    取消
                </div>
            </Popup>
            
        </Fragment>
    )
}
export default inject("wikiCatalogueStore")(observer(RepositoryAction));
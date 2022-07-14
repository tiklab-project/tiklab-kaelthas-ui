import React, { useEffect, useState } from "react";
import { SafeArea, Popup, Modal } from 'antd-mobile';
import "./repositoryDetail.scss"
import RepositoryList from "./repositoryList";
import { observer, inject } from "mobx-react";
import { withRouter } from "react-router";
import RepositoryAdd from "./repositoryAdd";
import RepositoryLogAdd from "./repositoryLogAdd"
import RepositoryEdit from "./repositoryEdit";
const RepositoryDetail = (props) => {
    const { wikiCatalogueStore } = props
    const { findRepository, addVisible,setAddVisble, editVisible,setEditVisible,categoryId,setCategoryId,setCategoryType } = wikiCatalogueStore;
    const [repository, setRepository] = useState();
    const [visible, setVisible] = useState(false);
    const repositoryId = props.match.params.id;
    useEffect(() => {
        initList()
        setCategoryId(null)
    }, [])

    const initList = () => {
        findRepository({ id: repositoryId }).then(res => {
            if (res.code === 0) {
                setRepository(res.data)
            }
        })
    }
    const addFirst = () => {
        setVisible(true)
        setCategoryId(null)
        setCategoryType()
    }
    return (
        <div className="repository-detail">
            <div style={{ background: '#ace0ff' }}>
                <SafeArea position='top' />
            </div>
            <div className="repository-top">
                <div className="repository-top-left">
                    <svg className="repository-icon-logo" aria-hidden="true" onClick={() => props.history.goBack()}>
                        <use xlinkHref="#icon-left"></use>
                    </svg>
                    <div className="repository-title">{repository ? repository.name : "知识库"}</div>
                </div>
                <div className="repository-top-right">
                    <svg className="repository-icon-search" aria-hidden="true" onClick={() => props.history.push(`/repositorySet/${repositoryId}`)}>
                        <use xlinkHref="#icon-edit"></use>
                    </svg>
                    <svg className="repository-icon-add" aria-hidden="true" onClick={() => addFirst()}>
                        <use xlinkHref="#icon-add"></use>
                    </svg>
                </div>
            </div>
            <div className="repository-desc">
                <div className="repository-desc-title">
                    {repository ? repository.name : "知识库"}
                </div>
                <div className="repository-action">
                    <div className="repository-share">
                        收藏
                    </div>
                    <div className="repository-share">
                        分享
                    </div>
                </div>
            </div>
            <div>
                <div className="repository-header">
                    <div className="repository-tab">
                        文档
                    </div>
                </div>
                <RepositoryList setVisible = {setVisible}/>
            </div>
            <RepositoryAdd 
                visible = {visible}
                setVisible = {setVisible}
                // visibleAdd = {visibleAdd}
                // setVisibleAdd = {setVisibleAdd}
                repositoryId = {repositoryId}
                initList= {initList}
                {...props}
            />
            <Modal 
                className="repositoryLog-add"
                visible={addVisible}
                content={<RepositoryLogAdd 
                        repositoryId = {repositoryId} 
                        parentCategoryId = {categoryId} 
                        setVisibleAdd = {setAddVisble} 
                        initList = {initList}
                />}
                onClose={() => {
                    setAddVisble(false)
                }}
                closeOnMaskClick = {true}
            >
                
            </Modal>
            <Modal 
                className="repositoryLog-add"
                visible={editVisible}
                content={<RepositoryEdit />}
                onClose={() => {
                    setEditVisible(false)
                }}
                destroyOnClose = {true}
                closeOnMaskClick = {true}
            >
                
            </Modal>
        </div>
    )
}

export default withRouter(inject("wikiCatalogueStore")(observer(RepositoryDetail)));
import React, { useEffect, useState } from "react";
import { SafeArea, Popup, Modal } from 'antd-mobile';
import "./repositoryDetail.scss"
import RepositoryList from "./repositoryList";
import { observer, inject } from "mobx-react";
import { withRouter } from "react-router";
import RepositoryAdd from "./repositoryAdd";
const RepositoryDetail = (props) => {
    const { wikiCatalogueStore } = props
    const { findRepository } = wikiCatalogueStore;
    const [repository, setRepository] = useState();
    const [visible, setVisible] = useState(false);
    const [visibleAdd, setVisibleAdd] = useState(false);
    const repositoryId = props.match.params.id;
    useEffect(() => {
        initList()
    }, [])

    const initList = () => {
        findRepository({ id: repositoryId }).then(res => {
            if (res.code === 0) {
                setRepository(res.data)
            }
        })
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
                    <svg className="repository-icon-search" aria-hidden="true">
                        <use xlinkHref="#icon-search"></use>
                    </svg>
                    <svg className="repository-icon-add" aria-hidden="true" onClick={() => setVisible(true)}>
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
                <RepositoryList />
            </div>
            <RepositoryAdd 
                visible = {visible}
                setVisible = {setVisible}
                visibleAdd = {visibleAdd}
                setVisibleAdd = {setVisibleAdd}
                repositoryId = {repositoryId}
                initList= {initList}
            />
            {/* <Popup
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
                content={<RepositoryLogAdd repositoryId = {repositoryId} setVisibleAdd = {setVisibleAdd} setRepository= {setRepository}/>}
                onClose={() => {
                    setVisibleAdd(false)
                }}
                closeOnMaskClick = {true}
            >
                
            </Modal> */}
        </div>
    )
}

export default withRouter(inject("wikiCatalogueStore")(observer(RepositoryDetail)));
import React, { useEffect, useState,Fragment } from "react";
import { SafeArea, Popup, Modal } from 'antd-mobile';
import "./repositoryDetail.scss"
import { observer, inject } from "mobx-react";
import { withRouter } from "react-router";
import RepositoryAddSelectTemplate from "./repositoryAddSelectTemplate";
const RepositoryAdd = (props) => {
    const {visible, setVisible, wikiCatalogueStore} = props;
    const {setAddVisible, setCategoryType} = wikiCatalogueStore
    const [addDocVisible, setAddDocVisible] = useState(false);
    const showAdd = ()=> {
        setVisible(false)
        // props.history.push(`/repositoryLogAdd/${repositoryId}`)
        setAddVisible(true)
        setCategoryType("log")
    }
    const showTempalte = () => {
        setAddDocVisible(true)
        setVisible(false)
        setCategoryType("document")
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
                    <div className="repository-select-list list-first" onClick={() => showTempalte()}>
                        <svg className="repository-list-icon" aria-hidden="true" >
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
            
            
            <RepositoryAddSelectTemplate 
                addDocVisible = {addDocVisible}
                setAddDocVisible = {setAddDocVisible}
            />
        </Fragment>
    )
}
export default withRouter(inject("wikiCatalogueStore")(observer(RepositoryAdd)));
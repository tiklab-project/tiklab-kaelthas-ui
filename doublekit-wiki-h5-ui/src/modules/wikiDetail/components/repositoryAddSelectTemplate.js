import React, { useEffect, useState, Fragment } from "react";
import { Modal, Popup, Dialog } from 'antd-mobile';
// import "./repositoryAction.scss";
import { inject, observer } from "mobx-react";
import "./repositoryAddSelectTempalte.scss";
import RepositoryTemplatePreview from "./repositorytemplatePreview"
import { withRouter } from "react-router";
const RepositoryAddSelectTemplate = (props) => {
    const { addDocVisible, setAddDocVisible, wikiCatalogueStore, setAddVisible } = props;
    const { findDocumentTemplatePage, previewTemplateVisible, setPreviewTemplateVisible} = wikiCatalogueStore;
    const [templateList, setTemplateList] = useState()
    const repositoryId = props.match.params.id;
    // const [previewTemplateVisible, setPreviewTemplateVisible] = useState(false);
    const [templateId, setTemplateId] = useState("")
    useEffect(() => {
        findDocumentTemplatePage().then(data => {
            if (data.code === 0) {
                setTemplateList(data.data.dataList)
            }
        })
    }, [])

    const previewTemplate= (id) => {
        setPreviewTemplateVisible(true)
        setAddDocVisible(false)
        setTemplateId(id)
    }
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
    return (
        <Fragment>
            <Popup
                className="repository-popup-content"
                visible={addDocVisible}
                onMaskClick={() => {
                    setAddDocVisible(false)
                }}
            >
                <div className="repository-popup-content">
                    <div className="repository-select-title">
                        选择模板
                    </div>
                    <div className="template-select">
                        {
                            templateList && templateList.map((item) => {
                                return <div className="template-item"
                                    key={item.id}
                                    onClick={() => previewTemplate(item.id)}
                                >
                                    <svg className="template-icon" aria-hidden="true">
                                        <use xlinkHref="#icon-template"></use>
                                    </svg>

                                    <div className="title" key="title">{item.name}</div>
                                </div>
                            })
                        }

                    </div>
                </div>
                <div className="repository-select-cancel" onClick={() => setAddDocVisible(false)}>
                    取消
                </div>
            </Popup>
            <Modal 
                className="repositoryLog-add"
                visible={previewTemplateVisible}
                showCloseButton = {true}
                content={
                    <RepositoryTemplatePreview 
                        templateId = {templateId} 
                        setPreviewTemplateVisible = {setPreviewTemplateVisible} 
                        // initList = {initList}
                    />
                }
                onClose={() => {
                    setPreviewTemplateVisible(false)
                    setAddDocVisible(true)
                }}
                closeOnMaskClick = {true}
            >
            </Modal>
            
        </Fragment>
    )
}
export default withRouter(inject("wikiCatalogueStore")(observer(RepositoryAddSelectTemplate)));
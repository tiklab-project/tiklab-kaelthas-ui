import React, { useEffect, useState } from "react";
import { Form, Input, Button, Modal, Selector, Picker, NavBar } from 'antd-mobile';
import "./repositoryLogAdd.scss";
import { CloseCircleFill } from 'antd-mobile-icons';
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router";
const RepositoryLogAdd = (props) => {
    const { wikirepositoryStore, wikiCatalogueStore, repositoryId, initList, parentCategoryId } = props;
    const { findAllUser, userList, } = wikirepositoryStore;
    const { createCategory, categoryId,categoryType, detail , createDocument, setPreviewTemplateVisible,setAddVisible} = wikiCatalogueStore;
    const [wikiMaterPickerVisible, setWikiMaterPickerVisible] = useState(false)
    const [form] = Form.useForm();
    useEffect(() => {
        findAllUser()
    }, [])

    const createResposity = (values) => {
        if (categoryType === "document") {
            const param = {
                name: values.name,
                master: { id: values.master[0] },
                formatType: "document",
                repository: {
                    id: repositoryId
                },
                details: detail,
                category: {id:  categoryId && categoryId.length > 0 ? categoryId : null},
                typeId: "document"
            }
            createDocument(param).then(res => {
                if (res.code === 0) {
                    setAddVisible(false)
                    setPreviewTemplateVisible(false)
                    props.history.push(`/document/${res.data}`)
                }
            });
        }
        if (categoryType === "log") {
            const param = {
                name: values.name,
                master: { id: values.master[0] },
                formatType: "category",
                repository: {
                    id: repositoryId
                },
                parentCategory: {
                    id: parentCategoryId && parentCategoryId.length > 0 ? parentCategoryId : null 
                }
            }
            createCategory(param).then(res => {
                if (res.code === 0) {
                    initList()
                    setAddVisible(false)
                    props.history.push(`/categoryList/${localStorage.getItem("respositoryId")}/${res.data}`)
                    
                }
            });
        }

    }

    return (
        <Form
            footer={
                <Button block type='submit' color='primary' size='middle'>
                    提交
                </Button>
            }
            onFinish={(value) => createResposity(value)}
            style={{ "--border-inner": "0", "--border-top": "0" }}

        >
            <Form.Item
                name='name'
                label='标题'
                rules={[{ required: true, message: '标题不能为空' }]}
            >
                <Input className="repositoryLog-desc-text" placeholder='请输入标题' />
            </Form.Item>
            <Form.Item
                name='master'
                label='负责人'
                trigger='onConfirm'
                onClick={() => {
                    setWikiMaterPickerVisible(true)
                }}
            >
                <Picker
                    style={{
                        '--title-font-size': '13px',
                        '--header-button-font-size': '13px',
                        '--item-font-size': '13px',
                        '--item-height': '30px',
                    }}
                    columns={[userList]}
                    visible={wikiMaterPickerVisible}
                    onClose={() => {
                        setWikiMaterPickerVisible(false)
                    }}
                >
                    {
                        value => value.length > 0 ? <div>{value[0].label}</div> : <div>请选择负责人</div>
                    }
                </Picker>
            </Form.Item>
        </Form>
        // </Modal>
    )
}

export default withRouter(inject("wikirepositoryStore", "wikiCatalogueStore")(observer(RepositoryLogAdd)));
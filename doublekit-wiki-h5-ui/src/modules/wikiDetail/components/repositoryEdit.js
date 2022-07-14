import React, { useEffect, useState } from "react";
import { Form, Input, Button, Modal, Selector, Picker, NavBar } from 'antd-mobile';
import "./repositoryLogAdd.scss";
import { CloseCircleFill } from 'antd-mobile-icons';
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router";
const RepositoryEdit = (props) => {
    const { wikiCatalogueStore } = props;
    const { updateCategory, categoryId,categoryType, updateDocument,wikiName,setWikiName, setEditVisible } = wikiCatalogueStore;
    console.log(wikiName)
    const updateName = (values) => {
            const params = {
                name: values.name,
                id: categoryId
            }
            if (categoryType === "document") {
                updateDocument(params).then(data => {
                    if (data.code === 0) {
                        setEditVisible(false)
                        document.getElementById(`name${categoryId}`).innerHTML = values.name
                    }
                })
            }
            if (categoryType === "log") {
                updateCategory(params).then(data => {
                    if (data.code === 0) {
                        setEditVisible(false)
                        document.getElementById(`name${categoryId}`).innerHTML = values.name
                    }
                })
            }
    }

    return (
        <Form
            footer={
                <Button block type='submit' color='primary' size='middle'>
                    提交
                </Button>
            }
            onFinish={(value) => updateName(value)}
            style={{ "--border-inner": "0", "--border-top": "0" }}
            initialValues = {
                {name: wikiName}
            }

        >
            <Form.Item
                name='name'
                label='标题'
                rules={[{ required: true, message: '标题不能为空' }]}
            >
                <Input className="repositoryLog-desc-text" placeholder='请输入标题' value={wikiName} onClick = {(value) => setWikiName(value)} />
            </Form.Item>
        </Form>
    )
}

export default withRouter(inject("wikiCatalogueStore")(observer(RepositoryEdit)));
/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-09 17:06:03
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-12-20 15:30:38
 */
import React, { useState, useEffect } from 'react';
import { observer, inject } from "mobx-react";
import { Modal, Button, Layout, Menu } from 'antd';
import { VideoCameraOutlined } from '@ant-design/icons';
import "./selectTemplateList.scss"
import { PreviewEditor } from "tiklab-slate-ui"
const { Header, Content, Footer, Sider } = Layout;

const TemplateList = (props) => {
    const { templateStore, setTemplateVisible,
        templateVisible, documentId,
        WikiCatalogueStore, setContentValue } = props;
    const { findDocumentTemplatePage, findDocumentTemplate } = templateStore;
    const imageNames = ["template2.png", "template1.png", "template3.png", "template4.png"];
    const { updateDocument } = WikiCatalogueStore;
    const wikiId = props.match.params.wikiId;
    const [value, setValue] = useState([
        {
            type: "paragraph",
            children: [{ text: "" }],
        },
    ])
    const [templateList, setTemplateList] = useState()

    useEffect(() => {
        // setContentValue(value)
        findDocumentTemplatePage().then(data => {
            if (data.code === 0) {
                setTemplateList(data.data.dataList)
            }
        })
    }, [])

   
    const selectTemplate = (content) => {
        const data = {
            id: documentId,
            details: content
        }
        updateDocument(data).then(res => {
            if(res.code === 0){
                setTemplateVisible(false)
                props.history.push(`/index/wikidetail/${wikiId}/docEdit/${documentId}`)
            }
        })
    }

    return (
        <div >
            <Modal
                className="template-modal"
                title="选择模板"
                visible={templateVisible}
                // onCancel={handleCancel}
                width="670px"
                onCancel={() => setTemplateVisible(false)}
                destroyOnClose={true}
                okText="下一步"
                cancelText="取消"
                footer={null}
            >
                <Layout style={{
                    position: 'relative',
                }}>
                    <Sider
                        style={{
                            overflow: 'auto',
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            height: "100%"
                        }}
                    >
                        <Menu theme="light" mode="inline" defaultSelectedKeys={['entry']}>
                            <Menu.Item key="entry" icon={<VideoCameraOutlined />}>
                                推荐模版
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout className="site-layout" style={{ marginLeft: 200 }}>
                        <Content>
                            <div className="template-list">
                                {
                                    templateList && templateList.map((item, index) => {
                                        return <div className="template-box" key={index} onClick = {() => selectTemplate(item.details)}>
                                            <img
                                                src={('/images/' + imageNames[index])}
                                                alt=""
                                                className="template-image"
                                            />
                                            <div className="template-name">{item.name}</div>
                                        </div>
                                    })
                                }

                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </Modal>
        </div>
    )
}
export default inject("templateStore", "WikiCatalogueStore")(observer(TemplateList));
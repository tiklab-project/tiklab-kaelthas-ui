/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-09 17:06:03
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-12-20 15:30:38
 */
import React, { useState,useEffect } from 'react';
import { observer, inject } from "mobx-react";
import { Modal, Button, Layout, Menu } from 'antd';
import {VideoCameraOutlined} from '@ant-design/icons';
import "./templateList.scss"
import {PreviewEditor} from "doublekit-slate-ui"
const { Header, Content, Footer, Sider } = Layout;

const TemplateList = (props) => {
    const { templateStore,changeTemplateVisible,
        setChangeTemplateVisible,setAddModalVisible,
        setTemplateId,setContentValue } = props;
    const { findDocumentTemplatePage,findDocumentTemplate } = templateStore;
    
    const [value, setValue] = useState([
        {
            type: "paragraph",
            children: [{ text: "" }],
        },
    ])
    const [templateList,setTemplateList] = useState()
    
    useEffect(()=> {
        setContentValue(value)
        findDocumentTemplatePage().then(data=> {
            if(data.code === 0){
                setTemplateList(data.data.dataList)
            }
        })
    },[])

    const changeTemplate = (value) => {
        setTemplateId(value.key)
        if(value.key === "entry"){
            setValue([
                {
                    type: "paragraph",
                    children: [{ text: "" }],
                },
            ])
        }else {
            findDocumentTemplate(value.key).then(data => {
                const content = data.data
                if(data.code === 0){
                    // setTemplate({...value})
                    setValue(JSON.parse(content.details))
                }
            })
        }
        
    }
    // 下一步
    const next = () => {
        setChangeTemplateVisible(false)
        setAddModalVisible(true)
        setContentValue(value)
    }
    return (
        <div >
            <Modal
                className="wiki-modal"
                title="选择模板"
                visible={changeTemplateVisible}
                // onCancel={handleCancel}
                width="50vw"
                onOk={() => next()}
                onCancel={() => setChangeTemplateVisible(false)}
                destroyOnClose={true}
                okText= "下一步"
                cancelText="取消"
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
                        {/* <div className="logo" /> */}
                        <Menu theme="light" mode="inline" defaultSelectedKeys={['entry']} 
                            onClick={(value)=>changeTemplate(value)}>
                            <Menu.Item key="entry" icon={<VideoCameraOutlined />}>
                                空白文档
                            </Menu.Item>
                            {
                                templateList && templateList.map((item)=> {
                                    return <Menu.Item key={item.id} icon={<VideoCameraOutlined />}>
                                            {item.name}
                                        </Menu.Item>
                                })
                            }
                        </Menu>
                    </Sider>
                    <Layout className="site-layout" style={{ marginLeft: 200 }}>
                        <Content>
                            <div className="site-layout-background" style={{ background: "#fff",minHeight: "300px" }}>
                            <PreviewEditor value = {value} />
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </Modal>
        </div>
    )
}
export default inject("templateStore")(observer(TemplateList));
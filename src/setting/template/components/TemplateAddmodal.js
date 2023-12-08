/*
 * @Descripttion: 迭代添加编辑弹窗
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2020-12-18 16:05:16
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2022-01-21 13:02:38
 */

import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Input, Select, DatePicker, Upload } from 'antd';
import { observer, inject } from "mobx-react";
import 'moment/locale/zh-cn';
import TemplateStore from "../store/TemplateStore";
import { getUser } from "thoughtware-core-ui";
import UploadIcon1 from "../../../assets/images/uploadIcon.png";
import setImageUrl from "../../../common/utils/setImageUrl";
import "./TemplateAddModal.scss"
const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 24,
    },
};

const TemplateAddModal = (props) => {
    const {showAddModal, setShowAddModal, editType,} = props
    const { findIconList, creatIcon,  createDocumentTemplate, findDocumentTemplateList } = TemplateStore;
    
    const [form] = Form.useForm();
    const [iconUrl, setIconUrl] = useState("template1.png")
    const [iconList, setIconList] = useState();
    const ticket = getUser().ticket;
    const tenant = getUser().tenant;
    /**
     * 关闭打开弹窗，重新加载数据
     */
    useEffect(() => {
        if (showAddModal) {
            getIconList()
        }
        return;
    }, [showAddModal])

    const getIconList = () => {
        findIconList({ iconType: "template" }).then((res) => {
            if(res.code === 0){
                setIconList(res.data)
                if(res.data.length > 0){
                    setIconUrl(res.data[0]?.iconUrl)
                }
            }
            
        })
    }
    /**
     * 添加表单信息，添加或者编辑
     */
    const onFinish = () => {
        form.validateFields().then((values) => {
            if (editType === "add") {
                const params = {
                    name: values.name,
                    iconUrl: iconUrl
                }
                createDocumentTemplate(params).then(res=>{
                    if(res.code === 0){
                        findDocumentTemplateList()
                    }
                })
            } else {
            }
            setShowAddModal(false);
            form.resetFields();
        })
    };

    /**
     * 取消添加或者编制
     */
    const onCancel = () => {
        form.resetFields();
        setShowAddModal(false);

    };
    const upLoadIcon = {
        name: 'uploadFile',
        action: `${upload_url}/dfs/upload`,
        showUploadList: false,
        headers: {
            ticket: ticket,
            tenant: tenant
        },
        onChange(info) {
            if (info.file.status === 'done') {
                console.log(info.file, info.fileList);
                const res = info.file.response.data;
                const params = {
                    iconName: info.file.name,
                    iconUrl: "/image/" + res,
                    iconType: "template"
                }
                creatIcon(params).then((res) => {
                    if (res.code === 0) {
                        getIconList()
                    }
                })
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        }
    };
    return (
        <Modal
            title={"编辑"}
            visible={showAddModal}
            onOk={onFinish}
            onCancel={onCancel}
            cancelText="取消"
            okText="确定"
            closable={false}
        >
            <Form
                {...layout}
                name="basic"
                initialValues={{
                    remember: true,
                }}
                form={form}
                layout="vertical"
            >
                <Form.Item
                    label="模版名称"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: '请输入模版名称',
                        },
                    ]}
                >
                    <Input placeholder="模版名称" />
                </Form.Item>
                <Form.Item
                    label="图标"
                    name="icon"
                >
                    <div className="template-icon-box">
                        {
                            iconList && iconList.map((item) => {
                                return <div key={item.key} className={`template-icon  ${item.iconUrl === iconUrl ? "icon-select" : null}`} onClick={() => { setIconUrl(item.iconUrl) }}>
                                    <img
                                        src={setImageUrl(item.iconUrl)}
                                        alt="" className="img-icon"
                                    />
                                </div>
                            })
                        }
                        <Upload {...upLoadIcon}>
                            <div className="template-icon">
                                <img src={UploadIcon1} alt="" className="list-img" />
                            </div>
                        </Upload>
                    </div>


                </Form.Item>
            </Form>
        </Modal>
    );
};
export default observer(TemplateAddModal);
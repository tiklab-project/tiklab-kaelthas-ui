/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-12-07 14:59:04
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-12-08 09:24:33
 */
import React, { useEffect, useState } from "react";
import { observer, inject } from "mobx-react";
import { Input, Form, Select, Button, Modal, Row, Col, message, Alert } from "antd";
import 'moment/locale/zh-cn';
import "../components/basicInfo.scss";
import Breadcumb from "../../../../common/breadcrumb/breadcrumb";
import RepositoryIcon from "./RepositoryChangeIcon";
import { PrivilegeProjectButton } from "thoughtware-privilege-ui";
import { Collapse } from 'antd';
import { getUser } from "thoughtware-core-ui";
const { Panel } = Collapse;
const BasicInfo = props => {
    const layout = {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 20,
        },
    };
    const formTailLayout = {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 8,
            offset: 4,
        },
    };

    const [form] = Form.useForm();
    const repositoryId = props.match.params.repositoryId;
    const { repositorySetStore, systemRoleStore } = props;
    const { deleteRepository, updateRepository, findRepository, findAllUser, uselist } = repositorySetStore;
    const [disable, setDisabled] = useState(true);
    const [iconUrl, setIconUrl] = useState();
    const [visible, setVisible] = useState(false);
    const [repositoryInfo, setRepositoryInfo] = useState()
    const tenant = getUser().tenant;
    const userId = getUser().userId
    const [confirmForm] = Form.useForm();

    useEffect(() => {
        info()
        findAllUser()
        return;
    }, [])

    const info = () => {
        findRepository(repositoryId).then((response) => {
            if (response.code === 0) {
                const data = response.data;
                
                form.setFieldsValue({
                    name: data.name,
                    limits: data.limits,
                    desc: data.desc,
                    master: data.master.id
                })
                setRepositoryInfo(data)
                setIconUrl(response.data.iconUrl)
                const isPublish = data?.projectLimits === "0" ? true : false
                systemRoleStore.getInitProjectPermissions(userId, repositoryId, isPublish)
            }

        })
    };

    const cancel = () => {
        form.setFieldsValue({
            name: repositoryInfo.name,
            limits: repositoryInfo.limits,
            desc: repositoryInfo.desc,
            master: repositoryInfo.master.id
        })
        setDisabled(true)
    }

    const onFinish = () => {
        form.validateFields().then((values) => {
            const data = {
                ...values,
                master: { id: values.master },
                id: repositoryId
            }

            updateRepository(data).then(res => {
                if (res.code === 0) {
                    message.info('修改成功');
                }
            })
        })
    }

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };


    

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const repositoryInfoDesc = () => (
        <div>
            <div className="repository-info-title">
                <svg aria-hidden="true" className="img-icon" fill="#fff">
                    <use xlinkHref="#icon-projectDetail"></use>
                </svg>
                知识库信息
            </div>
            <div style={{ fontSize: "12px", color: "#999" }}>
                <svg aria-hidden="true" className="img-icon" fill="#fff">
                    <use></use>
                </svg>
                知识库信息图标信息，可见范围，负责人等信息，可点击修改</div>
        </div>
    );

    const repositoryDelete = () => (
        <div>
            <div className="repository-info-title">
                <svg aria-hidden="true" className="img-icon" fill="#fff">
                    <use xlinkHref="#icon-projectDelete"></use>
                </svg>
                删除知识库
            </div>
            <div style={{ fontSize: "12px", color: "#999" }}>
                <svg aria-hidden="true" className="img-icon" fill="#fff">
                    <use></use>
                </svg>
                删除知识库
            </div>
        </div>
    );

    const [confirmProjectName, setConfirmProjectName] = useState();
    const handleOk = () => {
        confirmForm.validateFields().then((fieldsValue) => {
            deleteRepository(repositoryId).then(response => {
                if (response.code === 0) {
                    message.success('删除成功');
                    setIsModalVisible(false);
                    props.history.push("/repository")
                }
            })

        })
    };

    // const handleOk = () => {
    //     deleteRepository(repositoryId).then(response => {
    //         if (response.code === 0) {
    //             props.history.push("/repository")
    //         }
    //     })
    //     setIsModalVisible(false);
    // };
    return (
        <Row>
            <Col lg={{ span: 24 }} xxl={{ span: "18", offset: "3" }} xl={{ span: "18", offset: "3" }}>
                <div className="repository-set-basicinfo">
                    <Breadcumb
                        firstText="知识库信息"
                    />

                    <Collapse expandIconPosition={"right"}>
                        <Panel header={repositoryInfoDesc()} key="1">
                            <div className="repository-set-info">
                                <Form.Item
                                    label="知识库图标"
                                    className="repository-form-icon"
                                    {...layout}
                                    labelAlign="left"
                                >
                                    <div className="form-icon-col">
                                        <div className="form-icon">
                                            {
                                                iconUrl ?
                                                    <img
                                                        src={version === "cloud" ? (upload_url + iconUrl + "?tenant=" + tenant) : (upload_url + iconUrl)}
                                                        alt="" width={60} height={60}
                                                    />
                                                    :
                                                    <img
                                                        src={('images/repository1.png')}
                                                        alt="" width={60} height={60}
                                                    />
                                            }
                                        </div>

                                        <span>知识库图标，可点击更改按钮修改icon</span>
                                    </div>
                                    <div className="change-button" onClick={() => setVisible(true)}>
                                        更改图标
                                    </div>
                                </Form.Item>
                                {/* <Form.Item
                                    {...formTailLayout}
                                    labelAlign="left"
                                >
                                </Form.Item> */}


                                {/* </div> */}

                                <Form
                                    {...layout}
                                    name="basic"
                                    initialValues={{
                                        remember: true,
                                    }}
                                    form={form}
                                    onFinish={onFinish}
                                    onFieldsChange={() => setDisabled(false)}
                                    labelAlign={"left"}
                                >
                                    <Form.Item
                                        label="知识库名称"
                                        name="name"
                                    >
                                        <Input placeholder="知识库名称" />
                                    </Form.Item>
                                    <Form.Item
                                        label="可见人员"
                                        name="limits"
                                    >
                                        <Select
                                            allowClear
                                        >
                                            <Select.Option value="0" key="0">全部成员</Select.Option>
                                            <Select.Option value="1" key="1">知识库成员</Select.Option>
                                        </Select>
                                    </Form.Item>

                                    <Form.Item
                                        label="负责人"
                                        name="master"
                                        rules={[
                                            {
                                                required: false,
                                                message: '请输入知识库编码',
                                            }
                                        ]}
                                    >
                                        <Select
                                            placeholder="负责人"
                                            allowClear
                                        >
                                            {
                                                uselist && uselist.map((item, index) => {
                                                    return <Select.Option value={item.id} key={item.id}>{item.nickname}</Select.Option>
                                                })
                                            }
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        label="知识库描述"
                                        name="desc"
                                    >
                                        <Input placeholder="知识库描述" />
                                    </Form.Item>
                                    <Form.Item {...formTailLayout} >
                                        <Button onClick={() => cancel()}>
                                            取消
                                        </Button>
                                        <Button htmlType="submit" type="primary" disabled={disable}>
                                            保存
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </Panel>
                        <Panel header={repositoryDelete()} key="2">
                            <div className="repository-set-delete">
                                <div className="repository-set-icon-block">
                                此知识库及其目录将在回收站中保留 60 天，之后将被永久删除

                                </div>

                                <PrivilegeProjectButton code={'RepositoryDelete'} domainId={repositoryId}  {...props}>
                                    <div className="change-button delete-button" onClick={() => showModal()}>
                                        删除知识库
                                    </div>
                                </PrivilegeProjectButton>
                            </div>
                        </Panel>
                    </Collapse>
                </div>
                <div className="project-delete-confirm">
                    <Modal 
                        title="确定删除" 
                        getContainer={false} 
                        visible={isModalVisible} 
                        closable={false} 
                        onOk={handleOk} 
                        onCancel={handleCancel} 
                        okText={"确定"} 
                        cancelText={"取消"}
                        okType= "danger"
                        okButtonProps={{type: "primary"}}
                    >
                        <Alert message=" 此知识库及其目录、文档、附件和评论将被永久删除" type="error" showIcon />

                        <Form
                            form={confirmForm}
                            name="dependencies"
                            autoComplete="off"
                            style={{
                                maxWidth: 600,
                            }}
                            layout="vertical"
                        >
                            <Form.Item
                                label="知识库名称"
                                name="confirmProjectName"
                                rules={[
                                    {
                                        required: true,
                                        message: `请输入知识库名称`,
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(rule, value) {
                                            //getFieldValue可以获得其他输入框的内容
                                            if (repositoryInfo?.name !== value) return Promise.reject(`请输入${repositoryInfo?.name}`);
                                            return Promise.resolve();
                                        }
                                    })
                                ]}
                            >
                                <Input value={confirmProjectName} onChange={(value) => setConfirmProjectName(value.target.value)} />
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>

                <RepositoryIcon
                    visible={visible}
                    setVisible={setVisible}
                    updateRepository={updateRepository}
                    setIconUrl={setIconUrl}
                />

            </Col>
        </Row >
    )
}

export default inject("repositorySetStore", "systemRoleStore")(observer(BasicInfo));
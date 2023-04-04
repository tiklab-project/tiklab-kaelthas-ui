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
import { Input, Form, Select, DatePicker, Button, Modal, Row, Col, message } from "antd";
import 'moment/locale/zh-cn';
import "../components/basicInfo.scss";
import Breadcumb from "../../../../common/breadcrumb/breadcrumb";
import RepositoryIcon from "./RespositoryChangeIcon"
import { Collapse } from 'antd';
const { Panel } = Collapse;
const BasicInfo = props => {
    const layout = {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 12,
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
    console.log(props.match.params.repositoryId)
    const repositoryId = props.match.params.repositoryId;
    const { repositoryStore } = props;
    const { delerepositoryList, updateRepository, searchrepository, getUseList, uselist } = repositoryStore;
    const [disable, setDisabled] = useState(true);
    const [iconUrl, setIconUrl] = useState();
    const [visible, setVisible] = useState(false);
    const [repositoryInfo, setRepositoryInfo] = useState()
    useEffect(() => {
        info()
        getUseList()
        return;
    }, [])

    const info = () => {
        searchrepository(repositoryId).then((response) => {
            if (response.code === 0) {
                const data = response.data;
                setRepositoryInfo(data)
                // setIconUrl(data.iconUrl)
                form.setFieldsValue({
                    name: data.name,
                    limits: data.limits,
                    desc: data.desc,
                    master: data.master.id
                })
            }

        })
    };

    const cancel = () => {
        form.setFieldsValue({
            name: data.name,
            limits: data.limits,
            desc: data.desc,
            master: data.master
        })
    }

    const onFinish = () => {
        form.validateFields().then((values) => {
            const data = {
                ...values,
                master: { id: values.master },
                id: repositoryId
            }

            // if (props.type === "add") {
            //     addProlist(data)
            // } else {
            //     updateRepository(data)
            // }
            updateRepository(data).then(res => {
                if (res.code === 0) {
                    message.info('修改成功');
                }
            })
            // setVisible(false);
        })
    }
    // 状态类型
    const status = [
        {
            name: "未开始",
            id: "1"
        },
        {
            name: "进行中",
            id: "2"
        },
        {
            name: "已结束",
            id: "3"
        }
    ]
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

        
    const handleOk = () => {
        delerepositoryList(repositoryId).then(response => {
            if (response.code === 0) {
                props.history.push("/index/repository")
            }
        })
        setIsModalVisible(false);
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
            <div style={{fontSize: "12px", color: "#999"}}> 
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
            <div style={{fontSize: "12px", color: "#999"}}> 
                <svg aria-hidden="true" className="img-icon" fill="#fff">
                    <use></use>
                </svg>
                删除知识库
            </div>
        </div>
    );

    return (
        <Row>
            <Col lg={{ span: 24 }} xxl={{ span: "18", offset: "3" }}>
                <div className="repository-set-basicinfo">
                    <Breadcumb
                        firstText="知识库信息"
                    />

                    <Collapse expandIconPosition={"right"}>
                        <Panel header={repositoryInfoDesc()} key="1">
                            <div className="repository-set-icon">
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
                                                        src={('/images/' + iconUrl)}
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
                                </Form.Item>
                                <Form.Item
                                    {...formTailLayout}
                                    labelAlign="left"
                                >
                                    {/* <PrivilegeProjectButton code={'RepositoryEdit'} domainId={repositoryId}  {...props}> */}
                                    <div className="change-botton" onClick={() => setVisible(true)}>
                                        更改图标
                                    </div>
                                    {/* </PrivilegeProjectButton> */}
                                </Form.Item>


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
                                // onValuesChange={onFinish}
                                >
                                    <Form.Item
                                        label="知识库名称"
                                        name="name"
                                    >
                                        <Input placeholder="知识库名称" />
                                    </Form.Item>
                                    {/* <Form.Item
                                label="知识库类型"
                                name="repositoryType"
                            >
                                <Select
                                    placeholder="知识库类型"
                                    allowClear
                                >
                                    {
                                        repositoryTypelist && repositoryTypelist.map((item, index) => {
                                            return <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                                        })
                                    }
                                </Select>
                            </Form.Item> */}
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
                                                    return <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
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
                            <div className="repository-set-icon">
                                {/* <div className="repository-set-title">
                                    删除知识库
                                </div> */}
                                <div className="repository-set-icon-block">
                                    <div>

                                        <span> 此知识库及其目录将在回收站中保留 60 天，之后将被永久删除</span>
                                    </div>

                                </div>
                                <Form.Item
                                    {...formTailLayout}
                                    labelAlign="left"
                                >
                                    {/* <PrivilegeProjectButton code={'RepositoryDelete'} domainId={repositoryId}  {...props}> */}
                                    <div className="change-botton" onClick={() => showModal()}>
                                        删除知识库
                                    </div>
                                    {/* </PrivilegeProjectButton> */}
                                </Form.Item>
                            </div>
                        </Panel>
                    </Collapse>

                </div>
                <Modal title="是否删除" visible={isModalVisible} closable={false} onOk={handleOk} onCancel={handleCancel} okText={"确定"} cancelText={"取消"}>
                    此知识库及其目录将在回收站中保留 60 天，之后将被永久删除。
                </Modal>

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

export default inject("repositoryStore")(observer(BasicInfo));

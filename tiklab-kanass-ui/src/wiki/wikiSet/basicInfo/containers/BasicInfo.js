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
import WikiIcon from "../components/wikiChangeIcon"

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
    console.log(props.match.params.wikiId)
    const wikiId = props.match.params.wikiId;
    const { wikiStore } = props;
    const { delewikiList, updateWiki, searchwiki, getUseList, uselist } = wikiStore;
    const [disable, setDisabled] = useState(true);
    const [iconUrl, setIconUrl] = useState();
    const [visible, setVisible] = useState(false);
    const [wikiInfo, setWikiInfo] = useState()
    // 周期
    const rangeConfig = {
        rules: [
            {
                type: 'array',
                required: true,
                message: 'Please select time!',
            }
        ]
    };
    const dateFormat = 'YYYY/MM/DD';

    useEffect(() => {
        info()
        getUseList()
        return;
    }, [])

    const info = () => {
        searchwiki(wikiId).then((response) => {
            if (response.code === 0) {
                const data = response.data;
                setWikiInfo(data)
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
                master: {id: values.master},
                id: wikiId
            }

            // if (props.type === "add") {
            //     addProlist(data)
            // } else {
            //     updateWiki(data)
            // }
            updateWiki(data).then(res => {
                if(res.code === 0){
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
        deleproList(wikiId).then(response => {
            if (response.code === 0) {
                props.history.push("/index/wiki")
            }
        })
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return (
        <Row>
            <Col lg={{ span: 24 }} xxl={{ span: "18", offset: "3" }}>
                <div className="wiki-set-basicinfo">
                    <Breadcumb
                        firstText="知识库信息"
                    />
                    <div className="wiki-set-icon">
                        <div className="wiki-set-title">
                            知识库信息
                        </div>
                        <Form.Item
                            label="知识库图标"
                            className="wiki-form-icon"
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
                            {/* <PrivilegeProjectButton code={'WikiEdit'} domainId={wikiId}  {...props}> */}
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
                                name="wikiType"
                            >
                                <Select
                                    placeholder="知识库类型"
                                    allowClear
                                >
                                    {
                                        wikiTypelist && wikiTypelist.map((item, index) => {
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



                    <div className="wiki-set-icon">

                        <div className="wiki-set-title">
                            删除知识库
                        </div>

                        <div className="wiki-set-icon-block">
                            <div>

                                <span> 此知识库及其目录将在回收站中保留 60 天，之后将被永久删除</span>
                            </div>

                        </div>
                        <Form.Item
                            {...formTailLayout}
                            labelAlign="left"
                        >
                            {/* <PrivilegeProjectButton code={'WikiDelete'} domainId={wikiId}  {...props}> */}
                            <div className="change-botton" onClick={() => showModal()}>
                                删除知识库
                            </div>
                            {/* </PrivilegeProjectButton> */}
                        </Form.Item>
                    </div>


                </div>
                <Modal title="是否删除" visible={isModalVisible} closable={false} onOk={handleOk} onCancel={handleCancel} okText={"确定"} cancelText={"取消"}>
                    此知识库及其目录将在回收站中保留 60 天，之后将被永久删除。
                </Modal>

                <WikiIcon
                    visible={visible}
                    setVisible={setVisible}
                    updateWiki={updateWiki}
                    setIconUrl={setIconUrl}
                />

            </Col>
        </Row >
    )
}

export default inject("wikiStore")(observer(BasicInfo));

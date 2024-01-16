import React, {useEffect} from 'react';
import LeftMenu from "../../../common/components/LeftMenu";
import "./ProjectInformation.scss"
import SettingLeftTabs from "../../common/SettingLeftTabs";
import {withRouter} from "react-router-dom";
import {Button, Collapse, Form, Input, Select} from "antd";
import projectInformationStore from "../store/ProjectInformationStore";

const {Panel} = Collapse;

const {deleteHostById,findHostById} =projectInformationStore;

const {Option} = Select;
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const ProjectInformation = (props) => {

    const onChange = (key) => {
        console.log('key', key);
    };


    const [form] = Form.useForm();
    const onGenderChange = (value) => {
        switch (value) {
            case 'male':
                form.setFieldsValue({
                    note: 'Hi, man!',
                });
                return;
            case 'female':
                form.setFieldsValue({
                    note: 'Hi, lady!',
                });
                return;
            case 'other':
                form.setFieldsValue({
                    note: 'Hi there!',
                });
        }
    };
    const onFinish = (values) => {
        console.log(values);
    };
    const onReset = () => {
        form.resetFields();
    };

    useEffect(() => {
        //调用根据id查询,将查询的数据放到表单当中
        const resData = findHostById(localStorage.getItem("hostId"));
        resData.then(res => {
            if (res.state === 1){
                res.state = '开启'
            }else {
                res.state = '关闭'
            }

            form.setFieldsValue({
                name:res.name,
                ip:res.ip,
                hostGroupId:res.hostGroup.name,
                state:res.state
            })
        })

    }, []);


    //删除项目
    function deleteByHost() {

        deleteHostById(localStorage.getItem("hostId"));

        console.log('localStorage.getItem("hostId")',localStorage.getItem("hostId"))

        props.history.push("/configuration")

    }

    return (
        <div>
            <div className="setting-box">
                <LeftMenu/>
                <div className="setting-box-right">
                    <SettingLeftTabs/>
                    <div className="setting-box-body-right">
                        <div className="setting-box-right-head">
                            <div className="setting-box-right-head-text">
                                项目信息
                            </div>
                            <Collapse onChange={onChange} expandIconPosition="right">
                                <Panel header="项目信息" key="1">
                                    <Form {...layout}
                                          form={form}
                                          name="control-hooks"
                                          onFinish={onFinish}
                                          labelAlign={"left"}
                                    >
                                        <Form.Item
                                            name="name"
                                            label="主机名称"
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}
                                        >
                                            <Input/>
                                        </Form.Item>
                                        <Form.Item
                                            name="ip"
                                            label="ip地址"
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}
                                        >
                                            <Input/>
                                        </Form.Item>

                                        <Form.Item
                                            name="hostGroupId"
                                            label="主机群组"
                                            rules={[
                                                {
                                                    required: false,
                                                },
                                            ]}
                                        >
                                            <Select
                                                placeholder="请选择主机群组"
                                                onChange={onGenderChange}
                                                allowClear
                                            >
                                                <Option value="LinuxServer">LinuxServer</Option>
                                                <Option value="群组1">群组1</Option>
                                                <Option value="监控群组2">监控群组2</Option>
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            name="state"
                                            label="是否开启"
                                            rules={[
                                                {
                                                    required: false,
                                                },
                                            ]}
                                        >
                                            <Select
                                                placeholder="是否开启"
                                                onChange={onGenderChange}
                                                allowClear
                                            >
                                                <Option value="启用">启用</Option>
                                                <Option value="关闭">关闭</Option>
                                            </Select>
                                        </Form.Item>


                                        <Form.Item
                                            noStyle
                                            shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
                                        >
                                            {({getFieldValue}) =>
                                                getFieldValue('gender') === 'other' ? (
                                                    <Form.Item
                                                        name="customizeGender"
                                                        label="Customize Gender"
                                                        rules={[
                                                            {
                                                                required: true,
                                                            },
                                                        ]}
                                                    >
                                                        <Input/>
                                                    </Form.Item>
                                                ) : null
                                            }
                                        </Form.Item>
                                        <Form.Item {...tailLayout}>
                                            <Button type="primary" htmlType="submit">
                                                确定
                                            </Button>
                                            <Button htmlType="button" onClick={onReset}>
                                                清除信息
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </Panel>
                                <Panel header="删除项目" key="2">
                                    <div className="dropDownMenu-box">
                                        <div style={{color: "#ff0000"}}>
                                            此项目及其事务、组件、附件和版本将在回收站中保留 60 天，之后将被永久删除。
                                        </div>
                                        <div style={{
                                            background: "#ff0000",
                                            marginTop: "10px",
                                            cursor: "pointer",
                                            textAlign: "center",
                                            height: "30px",
                                            lineHeight: "30px",
                                            color: "#fff",
                                            borderRadius: "4px",
                                            width: "100px",
                                            fontSize: "12px",
                                        }}
                                             onClick={() => deleteByHost()}
                                        >
                                            是否删除项目
                                        </div>
                                    </div>
                                </Panel>
                            </Collapse>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(ProjectInformation);
import React, {useEffect, useState} from 'react';
import LeftMenu from "../../../common/components/LeftMenu";
import "./ProjectInformation.scss"
import SettingLeftTabs from "../../common/SettingLeftTabs";
import {withRouter} from "react-router-dom";
import {Alert, Button, Collapse, Form, Input, Select} from "antd";
import projectInformationStore from "../store/ProjectInformationStore";

const {Panel} = Collapse;


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
    const {deleteHostById, findHostById, findAllHostGroupList, updateHost} = projectInformationStore;

    const [allHostGroupList, setAllHostGroupList] = useState([]);

    const [form] = Form.useForm();
    const onGenderChange = (value) => {
        /*switch (value) {
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
        }*/

        console.log("onGenderChange", value)
    };
    const onFinish = async (values) => {
        values.id = localStorage.getItem("hostId")

        await updateHost(values)

        console.log(values);

        return(
            <Alert message="修改成功" type="success" />
        )
    };
    const onReset = () => {
        form.resetFields();
    };

    useEffect(async () => {
        //调用根据id查询,将查询的数据放到表单当中
        const resData = findHostById(localStorage.getItem("hostId"));
        resData.then(res => {

            form.setFieldsValue({
                id: localStorage.getItem("hostId"),
                name: res.name,
                ip: res.ip,
                hostGroupId: res.hostGroup.id,
                state: res.state,
                describe:res.describe
            })
        })

        const resHostGroup = await findAllHostGroupList();

        setAllHostGroupList([...resHostGroup])

    }, []);


    //删除主机
    function deleteByHost() {

        deleteHostById(localStorage.getItem("hostId"));

        console.log('localStorage.getItem("hostId")', localStorage.getItem("hostId"))

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
                                主机信息
                            </div>
                            <Collapse onChange={onChange} expandIconPosition="right">
                                <Panel header="主机信息" key="1">
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
                                                {
                                                    allHostGroupList && allHostGroupList.map(item => (
                                                        <Option key={item.id} value={item.id}>{item.name}</Option>
                                                    ))
                                                }
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
                                                <Option value={1}>启用</Option>
                                                <Option value={2}>未启用</Option>
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            name="describe"
                                            label="描述"
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}
                                        >
                                            <Input/>
                                        </Form.Item>


                                        {/*<Form.Item
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
                                        </Form.Item>*/}
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
                                <Panel header="删除主机" key="2">
                                    <div className="dropDownMenu-box">
                                        <div style={{color: "#ff0000"}}>
                                            此主机及其事务、组件、附件和版本将在回收站中保留 60 天，之后将被永久删除。
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
                                            是否删除主机
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
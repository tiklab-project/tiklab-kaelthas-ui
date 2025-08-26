/**
 * @name: AddHostPop
 * @author: limingliang
 * @date: 2025-06-16 10:30
 * @description：添加主机弹窗
 * @update: 2025-06-16 10:30
 */

import {Button, Col, Form, Input, Row, Select, Spin} from 'antd';
import React, {useEffect, useState} from 'react';
import Modals from "../../../common/modal/Modals";
import Btn from "../../../common/btn/Btn";
import hostStore from "../../hostPage/store/HostStore";
const {Option} = Select

const layout = {
    labelCol: {span: 0},
    wrapperCol: {span: 24},
};
const HostCompilePop = (props) => {
    const {visible,setVisible,hostData,setHostData} = props
    const [form] = Form.useForm();

    const { findTemplateAll, findHostGroup, hostGroupList,templateList, addHost,updateHost} = hostStore;

    useEffect(()=>{
        findTemplateAll()
        findHostGroup()
    },[])

    useEffect(()=>{
        if (visible&&hostData){
            form.setFieldsValue({
                name: hostData.name,
                ip:hostData.ip,
                hostGroupId:hostData.groupId,
                state:hostData.state,
            })
        }
    },[visible])


    //确认添加
    const onOk = () =>{
      form.validateFields().then((values) => {

          if (hostData){
              updateHost({...values, id:hostData.id}).then(res=>{
                  res.code===0&& cancel()
              })
          }else {
              addHost({...values,hostGroup:{id:values.hostGroupId}}).then(res=>{
                  res.code===0&& cancel()
              })
          }
      })
    }

    const cancel = () => {
        setVisible(false)
        setHostData(null)
    }


    const modalFooter = (
        <>
            <Btn onClick={cancel} title={'取消'} isMar={true}/>
            <Btn onClick={onOk} title={'确定'} type={'primary'}/>
        </>
    )

    return(
        <Modals
            visible={visible}
            onCancel={cancel}
            closable={false}
            footer={modalFooter}
            destroyOnClose={true}
            title={hostData?"更新主机":"新建主机"}
          /*  initialValues={{branchName:branchName}}*/
        >
            <Form
                form={form}
                preserve={false}
                layout={"vertical"}
                {...layout}
                initialValues={{isOpen: "1"}}
            >
                <Form.Item
                    label="主机名称"
                    name="name"
                    rules={[{required: true, message: '请输入主机名称!'}]}
                >
                    <Input placeholder="主机名称"/>
                </Form.Item>
                <Form.Item
                    label="主机ip地址"
                    name="ip"
                    rules={[{required: true, message: '请输入主机ip地址!'}]}
                >
                    <Input placeholder="主机ip地址"/>
                </Form.Item>
                <Form.Item
                    label="主机群组"
                    name="hostGroupId"
                    rules={[{required: true, message: '请选择主机群组!'}]}
                >
                    <Select
                        placeholder="请选择主机群组"
                        key="selectGroup"
                        allowClear
                        showSearch
                        optionFilterProp="children"
                    >
                        {
                            hostGroupList && hostGroupList.map((item) => {
                                return <Option value={item.id}
                                               key={item.id}>{item.name}</Option>
                            })
                        }
                    </Select>
                </Form.Item>
                {
                    !hostData&&
                    <Form.Item
                        label="添加模板"
                        name="templateId"
                        rules={[{required: false, message: '请选择模板!'}]}
                    >
                        <Select
                            placeholder="请选择模板"
                            allowClear
                            className="template-select"
                            key="selectTemplate"
                            showSearch
                            optionFilterProp="children"
                        >
                            {
                                templateList && templateList.map((item) => {
                                    return <Select.Option value={item.id}
                                                          key={item.id}>{item.name}</Select.Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                }

                <Form.Item
                    label="是否开启"
                    name="state"
                    rules={[{required: true, message: '是否开启!'}]}
                >
                    <Select
                        placeholder="是否开启"
                        allowClear
                    >
                        <Option key={1} value={1}>开启</Option>
                        <Option key={2} value={0}>关闭</Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modals>
    )
}
export default HostCompilePop

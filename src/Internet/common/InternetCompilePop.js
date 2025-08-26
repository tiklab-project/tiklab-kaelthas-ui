/**
 * @name: InternetCompilePop
 * @author: limingliang
 * @date: 2025-06-16 10:30
 * @description：网络编辑弹窗
 * @update: 2025-06-16 10:30
 */

import {Button, Col, Form, Input, InputNumber, Row, Select, Spin} from 'antd';
import React, {useEffect, useState} from 'react';
import Modals from "../../common/modal/Modals";
import Btn from "../../common/btn/Btn";
import internetStore from "../internetPage/store/InternetStore";
const {Option} = Select

const layout = {
    labelCol: {span: 0},
    wrapperCol: {span: 24},
};
const InternetCompilePop = (props) => {
    const {visible,setVisible,internet,setInternet} = props
    const [form] = Form.useForm();

    const {createInternet,updateInternet} = internetStore;


    useEffect(()=>{

    },[])

    useEffect(()=>{
        if (visible&&internet){
            form.setFieldsValue({
                name: internet.name,
                ip:internet.ip,
                port:internet.port,
                type:internet.type,
                status:internet.status,
            })
        }
    },[visible])


    //确认添加
    const onOk = () =>{
      form.validateFields().then((values) => {

          if (internet){
              updateInternet({...values, id:internet.id}).then(res=>{
                  res.code===0&& cancel()
              })
          }else {
              createInternet(values).then(res=>{
                  res.code===0&& cancel()
              })
          }
      })
    }

    const cancel = () => {
        setVisible(false)
        setInternet(null)
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
            title={internet?"更新网络":"新建网络"}
        >
            <Form
                form={form}
                preserve={false}
                layout={"vertical"}
                {...layout}
                initialValues={{status: 1, type: 1}}
            >
                <Form.Item
                    label="名称"
                    name="name"
                    rules={[{required: true, message: '名称!'}]}
                >
                    <Input placeholder="名称"/>
                </Form.Item>
                <Form.Item
                    label="ip地址"
                    name="ip"
                    rules={[{required: true, message: 'ip地址!'}]}
                >
                    <Input placeholder="ip地址"/>
                </Form.Item>
                <Form.Item
                    label="端口"
                    name="port"
                    style={{width: 200}}
                    rules={[{required: true, message: '端口!'}]}
                >
                    <InputNumber min={0} style={{
                        width: '100%',
                    }}/>
                </Form.Item>
                <Form.Item
                    label="网络设备类型"
                    name="type"
                    rules={[{required: true, message: '网络设备类型!'}]}
                >
                    <Select
                        placeholder="类型"
                        allowClear
                    >
                        <Option key={1} value={1}>交换机</Option>
                        <Option key={2} value={2}>路由器</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="是否开启"
                    name="status"
                    rules={[{required: false, message: '是否开启!'}]}
                >
                    <Select
                        placeholder="是否开启"
                        allowClear
                    >
                        <Option key={1} value={1}>开启</Option>
                        <Option key={2} value={2}>关闭</Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modals>
    )
}
export default InternetCompilePop

/**
 * @name: KuCompilePop
 * @author: limingliang
 * @date: 2025-06-16 10:30
 * @description：添加k8s弹窗
 * @update: 2025-06-16 10:30
 */

import {Button, Col, Form, Input, InputNumber, Row, Select, Spin} from 'antd';
import React, {useEffect, useState} from 'react';
import Modals from "../../common/modal/Modals";
import Btn from "../../common/btn/Btn";
import kubernetesStore from "../kuPage/store/KubernetesStore";
import TextArea from "antd/es/input/TextArea";
const {Option} = Select

const layout = {
    labelCol: {span: 0},
    wrapperCol: {span: 24},
};
const KuCompilePop = (props) => {
    const {visible,setVisible,kubData,setKubData} = props
    const [form] = Form.useForm();

    const {updateKbInfo,createKbInfo} = kubernetesStore;



    useEffect(()=>{
        if (visible&&kubData){
            form.setFieldsValue({
                name: kubData.name,
                ip:kubData.ip,
                port:kubData.port,
                apiToken:kubData.apiToken,
                state:kubData.status,
            })
        }
    },[visible])


    //确认添加
    const onOk = () =>{
      form.validateFields().then((values) => {
          if (kubData){
              updateKbInfo({...values, id:kubData.id}).then(res=>{
                  res.code===0&& cancel()
              })
          }else {
              createKbInfo(values).then(res=>{
                  res.code===0&& cancel()
              })
          }
      })
    }

    const cancel = () => {
        setVisible(false)
        setKubData(null)
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
            title={kubData?"更新Kubernetes":"新建主机Kubernetes"}
        >
            <Form
                form={form}
                preserve={false}
                layout={"vertical"}
                initialValues={{status: "1",port:6443}}
            >
                <Form.Item
                    label="名称"
                    name="name"
                    rules={[{required: true, message: '名称!'}]}
                >
                    <Input placeholder="名称"/>
                </Form.Item>
                <Form.Item
                    label="集群Ip"
                    name="ip"
                    rules={[{required: true, message: '数据源ip!'}]}
                >
                    <Input placeholder="数据源ip"/>
                </Form.Item>
                <Form.Item
                    label="访问集群端口号"
                    name="port"
                    style={{width: 200}}
                    rules={[{required: true, message: '集群端口号!'}]}
                >
                    <InputNumber placeholder="集群端口号" min={0} style={{
                        width: '100%',
                    }}/>
                </Form.Item>
                <Form.Item
                    label="集群token"
                    name="apiToken"
                    rules={[{required: true, message: '集群token(需要能够访问集群所有资源)!'}]}
                >
                    <TextArea placeholder="集群token(需要能够访问集群所有资源)"/>
                </Form.Item>
                <Form.Item
                    label="是否开启"
                    name="status"
                    rules={[{required: true, message: '是否开启!'}]}
                >
                    <Select
                        placeholder="是否开启"
                        allowClear
                    >
                        <Option key={1} value="1">开启</Option>
                        <Option key={2} value="2">关闭</Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modals>
    )
}
export default KuCompilePop

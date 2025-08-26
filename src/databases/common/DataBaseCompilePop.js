/**
 * @name: DataBaseCompilePop
 * @author: limingliang
 * @date: 2025-06-16 10:30
 * @description：编辑数据库弹窗
 * @update: 2025-06-16 10:30
 */

import {Button, Col, Form, Input, InputNumber, message, Row, Select, Spin} from 'antd';
import React, {useEffect, useState} from 'react';
import Modals from "../../common/modal/Modals";
import Btn from "../../common/btn/Btn";
import databasesStore from "../databasesPage/store/DatabasesStore";
import "./DataBaseCompilePop.css"
const {Option} = Select

const layout = {
    labelCol: {span: 0},
    wrapperCol: {span: 24},
};
const DataBaseCompilePop = (props) => {
    const {visible,setVisible,dataBase,setDataBase} = props
    const [form] = Form.useForm();

    const {createDbInfo,updateDbInfo, testJDBCSql} = databasesStore;

    useEffect(()=>{

    },[])

    useEffect(()=>{
        if (visible&&dataBase){
            form.setFieldsValue({
                name: dataBase.name,
                ip:dataBase.ip,
                dbType:dataBase.ip,
                dbPort:dataBase.dbPort,
                username:dataBase.username,
                password:dataBase.password,
                state:dataBase.state,
            })
        }
    },[visible])


    //确认添加
    const onOk = () =>{
      form.validateFields().then((values) => {

          if (dataBase){
              updateDbInfo({...values, id:dataBase.id}).then(res=>{
                  res.code===0&& cancel()
              })
          }else {
              createDbInfo({...values}).then(res=>{
                  res.code===0&& cancel()
              })
          }
      })
    }

    //测试连接
    async function testSql() {
        let values = await form.validateFields();

        const resData = await testJDBCSql(values)
        if (resData.code === 0){
             message.success("连接数据库成功")
        }else {
             message.error("连接失败!")
        }
    }

    const cancel = () => {
        setVisible(false)
        setDataBase(null)
    }


    const modalFooter = (
        <div className='data-base'>
            <Btn onClick={cancel} title={'取消'}/>
            <Btn onClick={testSql} title={'测试'} type={'primary'}/>
            <Btn onClick={onOk} title={'确定'} type={'primary'}/>
        </div>
    )

    return(
        <Modals
            visible={visible}
            onCancel={cancel}
            closable={false}
            footer={modalFooter}
            destroyOnClose={true}
            title={dataBase?"跟新数据库":"新建数据库"}
        >
            <Form
                className="db-edit-modal-form"
                form={form}
                preserve={false}
                layout={"vertical"}
                {...layout}
                initialValues={{state: 1}}
            >
                <Form.Item
                    label="名称"
                    name="name"
                    rules={[{required: true, message: '请输入名称!'}]}
                >
                    <Input placeholder="名称"/>
                </Form.Item>
                <Form.Item
                    label="数据源ip"
                    name="ip"
                    rules={[{required: true, message: '请输入数据源ip!'}]}
                >
                    <Input placeholder="数据源ip"/>
                </Form.Item>
                <Form.Item
                    label="数据库类型"
                    name="dbType"
                    rules={[{required: true, message: '请输入数据库类型!'}]}
                >
                    <Select
                        placeholder="请选择数据库类型"
                        key="selectGroup"
                        allowClear
                        showSearch
                        style={{width: 200}}
                        optionFilterProp="children"
                        // onChange={SelectChangeDBType}
                    >
                        <Option key={1} value="PostgreSQL">PostgreSQL</Option>
                        <Option key={2} value="MYSQL">MYSQL</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="数据库端口号"
                    name="dbPort"
                    style={{width: 200}}
                    rules={[{required: true, message: '请选择数据库端口号!'}]}
                >
                    {/*<Input placeholder="数据库端口号"/>*/}
                    <InputNumber placeholder="数据库端口号" min={0} style={{
                        width: '100%',
                    }}/>
                </Form.Item>
                <Form.Item
                    label="用户名"
                    name="username"
                    rules={[{required: true, message: '用户名!'}]}
                >
                    <Input placeholder="用户名"/>
                </Form.Item>
                <Form.Item
                    label="密码"
                    name="password"
                    rules={[{required: true, message: '密码!'}]}
                >
                    <Input placeholder="密码"/>
                </Form.Item>
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
export default DataBaseCompilePop

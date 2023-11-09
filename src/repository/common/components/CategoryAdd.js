/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-03 09:42:40
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-12-22 13:56:14
 */

import React from 'react';
import { observer, inject } from "mobx-react";
import { Modal, Select, Form, Input } from 'antd';
import { appendNodeInTree } from '../../../common/utils/treeDataAction';

const CategoryAdd = (props) => {
    const { addModalVisible, setAddModalVisible, modalTitle,
        catalogue, form, contentValue, setSelectKey, userList, categoryStore } = props
    const { addRepositoryCatalogue, createDocument, findRepositoryCatalogue, setRepositoryCatalogueList,
        repositoryCatalogueList, expandedTree, setExpandedTree, findCategory } = categoryStore;
    const repositoryId = props.match.params.repositoryId;

    const isExpandedTree = (key) => {
        return expandedTree.some(item => item === key)
    }
    const setOpenOrClose = key => {
        if (isExpandedTree(key)) {
            return
        } else {
            setExpandedTree(expandedTree.concat(key));
        }
    }

    const onFinish = () => {
        form.validateFields().then((values) => {
            let data;
            if (catalogue) {
                data = {
                    ...values,
                    wikiRepository: { id: repositoryId },
                    parentWikiCategory: { id: catalogue.id },
                    dimension: catalogue.dimension + 1,
                    master: { id: values.master },
                    typeId: "category",
                    formatType: "category"
                }
            } else {
                data = {
                    ...values,
                    wikiRepository: { id: repositoryId },
                    master: { id: values.master },
                    dimension: 1,
                    typeId: "category",
                    formatType: "category"
                }
            }
            addRepositoryCatalogue(data).then((data) => {
                if (data.code === 0) {
                    findCategory({ id: data.data }).then(res => {
                        if (res.code === 0) {
                           const list =  appendNodeInTree(catalogue?.id, repositoryCatalogueList, [res.data]);
                           setRepositoryCatalogueList([...list])
                        }
                    })
                    setAddModalVisible(!addModalVisible)
                    if (catalogue?.id) {
                        setOpenOrClose(catalogue.id)
                    }
                    props.history.push(`/index/repositorydetail/${repositoryId}/folder/${data.data}`)
                    form.resetFields()
                }

            })
        })
    }
    // const selectType = () => {

    // }
    return (
        <Modal
            title={"添加目录"}
            visible={addModalVisible}
            onOk={() => onFinish()}
            onCancel={() => setAddModalVisible(false)}
            destroyOnClose={true}
            okText="确定"
            cancelText="取消"
        >
            <Form
                form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
            >
                <Form.Item
                    label="名字"
                    name="name"
                    rules={[{ required: true, message: '请输入目录名字!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="负责人" name="master" rules={[{ required: true }]} >
                    <Select
                        placeholder="负责人"
                        allowClear
                        className="work-select"
                        key="master"
                        style={{ minWidth: '80px' }}
                    >
                        {
                            userList && userList.map((item) => {
                                return <Select.Option value={item.user.id} key={item.user.id}>{item.user.name}</Select.Option>
                            })
                        }
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default inject("categoryStore")(observer(CategoryAdd));
import React, { useState } from "react";
import { Modal, Form, Select, DatePicker, message, Row, Col, Steps, Breadcrumb } from 'antd';
import 'moment/locale/zh-cn';
import { getUser } from 'tiklab-core-ui';
import { observer, inject } from "mobx-react";
import "./repositoryAdd.scss";
import Button from "../../../common/button/button";
import RepositoryAddInfo from "./RepositoryAddInfo";
import Breadcumb from "../../../common/breadcrumb/breadcrumb";


const RepositoryAddmodal = (props) => {
    const [form] = Form.useForm();
    const [visible, setVisible] = React.useState(false);
    const { name, repositoryStore, selectTabs } = props;
        
    const { addRepositorylist, getUseList, findRepositoryList } = repositoryStore;



    const showModal = () => {
        setVisible(true);
        getUseList()
    };


    const onCancel = () => {
        form.resetFields();
        setVisible(false);
    };


    const Head = () => {
        return (
            <Breadcumb
                firstText="添加知识库"
            >
                <div onClick={() => setVisible(false)} className = "repositoryadd-close">
                    <svg className="svg-icon" aria-hidden="true">
                        <use xlinkHref="#icon-close"></use>
                    </svg>
                </div>
            </Breadcumb>
        )
    }


    return (
        <>
            <div >
                <Button type="primary" onClick={showModal} buttonText={name} >
                </Button>
                <Modal
                    visible={visible}
                    onCancel={onCancel}
                    cancelText="取消"
                    okText="确定"
                    footer={false}
                    className="repository-addmodel"
                    mask={false}
                    closable={false}
                    width={"100vw"}
                >
                    <Row>
                        <Col 
                            className="repository-type-col"
                            lg={{ span: "18", offset: "3" }} 
                            xl={{ span: "14", offset: "5" }} 
                            xxl={{ span: "10", offset: "7" }} 
                            style={{ height: "100%" }}
                        >
                            <Head />
                            <div>
                                <RepositoryAddInfo addRepositorylist={addRepositorylist} findRepositoryList = {findRepositoryList} setVisible={setVisible} selectTabs = {selectTabs}/>
                            </div>
                        </Col>
                    </Row>


                </Modal>
            </div>
        </>
    );
};

export default inject("repositoryStore")(observer(RepositoryAddmodal));
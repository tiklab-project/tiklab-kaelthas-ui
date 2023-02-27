import React, { useState } from "react";
import { Modal, Form, Select, DatePicker, message, Row, Col, Steps, Breadcrumb } from 'antd';
import 'moment/locale/zh-cn';
import { getUser } from 'tiklab-core-ui';
import { observer, inject } from "mobx-react";
import "./wikiAdd.scss";
import Button from "../../../common/button/button";
import WikiAddInfo from "./WikiAddInfo";
import Breadcumb from "../../../common/breadcrumb/breadcrumb";


const WikiAddmodal = (props) => {
    const [form] = Form.useForm();
    const [visible, setVisible] = React.useState(false);
    const { name, wikiStore, selectTabs } = props;
        
    const { addWikilist, getUseList, findRepositoryList } = wikiStore;



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
                <div onClick={() => setVisible(false)} className = "wikiadd-close">
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
                    className="wiki-addmodel"
                    mask={false}
                    closable={false}
                    width={"100vw"}
                >
                    <Row>
                        <Col 
                            className="wiki-type-col"
                            lg={{ span: "18", offset: "3" }} 
                            xl={{ span: "14", offset: "5" }} 
                            xxl={{ span: "10", offset: "7" }} 
                            style={{ height: "100%" }}
                        >
                            <Head />
                            <div>
                                <WikiAddInfo addWikilist={addWikilist} findRepositoryList = {findRepositoryList} setVisible={setVisible} selectTabs = {selectTabs}/>
                            </div>
                        </Col>
                    </Row>


                </Modal>
            </div>
        </>
    );
};

export default inject("wikiStore")(observer(WikiAddmodal));
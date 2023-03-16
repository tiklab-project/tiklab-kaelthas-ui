import React, { useState } from "react";
import { Modal, Form, Select, DatePicker, message, Row, Col, Steps, Breadcrumb } from 'antd';
import 'moment/locale/zh-cn';
import { getUser } from 'tiklab-core-ui';
import { observer, inject } from "mobx-react";
import "./repositoryAdd.scss";

import RepositoryAddInfo from "./RepositoryAddInfo";
import Breadcumb from "../../../common/breadcrumb/breadcrumb";

import { useHistory, useLocation } from 'react-router-dom';

const RepositoryAdd = (props) => {
    const [form] = Form.useForm();
    const [visible, setVisible] = React.useState(false);
    const { name, repositoryStore, selectTabs } = props;
    const history = useHistory();
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
                <div onClick={() => history.replace("/index/repository")} className="repositoryadd-close">
                    <svg className="svg-icon" aria-hidden="true">
                        <use xlinkHref="#icon-close"></use>
                    </svg>
                </div>
            </Breadcumb>
        )
    }


    return (
        <div >
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
                        <RepositoryAddInfo addRepositorylist={addRepositorylist} findRepositoryList={findRepositoryList} setVisible={setVisible} selectTabs={selectTabs} />
                    </div>
                </Col>
            </Row>

        </div>
    );
};

export default inject("repositoryStore")(observer(RepositoryAdd));
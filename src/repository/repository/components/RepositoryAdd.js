import React, { useState } from "react";
import { Row, Col } from 'antd';
import 'moment/locale/zh-cn';
import { observer, Provider } from "mobx-react";
import "./repositoryAdd.scss";

import RepositoryAddInfo from "./RepositoryAddInfo";
import Breadcumb from "../../../common/breadcrumb/breadcrumb";
import RepositoryStore from "../store/RepositoryStore";
const RepositoryAdd = (props) => {
    const { selectTabs } = props;
    // const history = useHistory();
    const { addRepositorylist, findRepositoryList } = RepositoryStore;
    const store = {
        repositoryStore: RepositoryStore
    }
    const Head = () => {
        return (
            <Breadcumb
                firstText="添加知识库"
            >
                <div onClick={() => props.history.goBack()} className="repositoryadd-close">
                    <svg className="svg-icon" aria-hidden="true">
                        <use xlinkHref="#icon-close"></use>
                    </svg>
                </div>
            </Breadcumb>
        )
    }


    return (
        <Provider {...store}>
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
                            <RepositoryAddInfo addRepositorylist={addRepositorylist} findRepositoryList={findRepositoryList} selectTabs={selectTabs} />
                        </div>
                    </Col>
                </Row>

            </div>
        </Provider>

    );
};

export default observer(RepositoryAdd);
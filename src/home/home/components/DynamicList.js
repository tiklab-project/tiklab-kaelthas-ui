import React, { useEffect, useState } from "react";
import Breadcumb from "../../../common/breadcrumb/breadcrumb";
import { inject, observer } from "mobx-react";
import { getUser } from "tiklab-core-ui";
import { Select, Row, Col } from "antd";
import "./dynamicList.scss";

const DynamicList = (props) => {
    const { homeStore, repositoryStore } = props;
    const { findLogpage, opLogList } = homeStore;
    const { findRepositoryList, repositorylist } = repositoryStore;
    const userId = getUser().userId;
    const [projectList, setProjectList] = useState()
    const [firstText, setFirstText] = useState();
    const repositoryId = props.match.params.repositoryId;

    useEffect(() => {
        if (props.route.path === "/index/dynamic") {
            setFirstText("首页")
            findRepositoryList({})
            findLogpage({ userId: userId })
        }

        console.log(props)
        if (props.route.path === "/index/repositorydetail/:repositoryId/dynamicList") {
            setFirstText("知识库概况")
            findLogpage({ userId: userId, repositoryId: repositoryId })
        }
        return;
    }, [])

    const selectProject = (option) => {
        console.log(option)
        findLogpage({ userId: userId, repositoryId: option })
        // getModuleList(option)
        // getsprintlist(option)
        // getSelectUserList(option);
    }

    // useEffect(() => {
    //     const dynamicValue = {
    //         pageSize: 20
    //     }
    //     findDynamicPage(dynamicValue).then(res => {
    //         if(res.code === 0) {
    //             setDynamicList(res.data.dataList)
    //         }
    //     })
    //     return;
    // },[])
    return (
        <Row className="dynamic-row">
            <Col xl={{ span: 18, offset: 3 }} lg={{ span: 18, offset: 3 }} md={{ span: 20, offset: 2 }} className="dynamic-col">
                <div className="dynamic-list-page">
                    <div className="dynamic-list-top">
                        <Breadcumb
                            {...props}
                            firstText={firstText}
                            secondText="日志列表"
                        // firstUrl="/index/home"
                        />
                        <div className="dynamic-filter">
                            <Select
                                placeholder="知识库"
                                allowClear
                                className="dynamic-select"
                                key="selectProject"
                                onSelect={selectProject}
                                width={100}
                            >
                                {
                                    repositorylist && repositorylist.map((item) => {
                                        return <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                                    })
                                }
                            </Select>
                        </div>
                    </div>

                    <div className="dynamic-list">
                        {
                            opLogList && opLogList.map((item) => {
                                return <div
                                    dangerouslySetInnerHTML={{ __html: item.data }}
                                    className="dynamic-list-item"
                                />
                            })
                        }
                    </div>
                </div>
            </Col>
        </Row>
    )
}
export default inject('homeStore', 'repositoryStore')(observer(DynamicList));
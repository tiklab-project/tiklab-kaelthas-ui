import React, { Fragment, useEffect, useState } from 'react';
import "./home.scss";
import { Tabs, Row, Col, Empty } from 'antd';
import { inject, observer } from 'mobx-react';
import { getUser } from 'tiklab-core-ui';
const { TabPane } = Tabs;

const Home = (props) => {
    const { homeStore } = props;
    const { findDocumentList, findDocumentRecentList, opLogList, findLogpage, findRecentRepositoryList } = homeStore;
    const [recentEditDocumentList, setRecentEditDocumentList] = useState([]);
    const [recentViewDocumentList, setRecentViewDocumentList] = useState([]);
    const [recentRepositoryDocumentList, setRecentRepositoryDocumentList] = useState([]);
    const userId = getUser().id

    useEffect(() => {

        findLogpage({ userId: userId })

        const recentParams = {
            masterId: userId,
            model: "repository",
            orderParams: [{
                name: "recentTime",
                orderType: "asc"
            }]
        }
        findDocumentRecentList(recentParams).then(res => {
            console.log(res)
            if (res.code === 0) {
                setRecentViewDocumentList([...res.data])
            }

        })

        findRecentRepositoryList({ model: "repository" }).then(res => {
            if (res.code === 0) {
                setRecentRepositoryDocumentList(res.data)
            }

        })

    }, [])

    const goRepositoryDetail = repository => {
        // localStorage.setItem("repository", JSON.stringify(repository.repository))
        props.history.push(`/index/repositorydetail/${repository.id}/survey`)
    }
    const goDocumentDetail = item => {
        // localStorage.setItem("repository", JSON.stringify(item.repository))
        if (item.model === "document") {
            localStorage.setItem("documentId", item.modelId);
            props.history.push(`/index/repositorydetail/${item.wikiRepository.id}/doc/${item.modelId}`)
        }
        if (item.model === "repository") {
            props.history.push(`/index/repositorydetail/${item.wikiRepository.id}/survey`)
        }
        sessionStorage.setItem("menuKey", "repository")

    }

    const changeTabs = (activeKey) => {
        const recentParams = {
            masterId: userId,
            model: activeKey,
            orderParams: [{
                name: "recentTime",
                orderType: "asc"
            }]
        }
        findDocumentRecentList(recentParams).then(res => {
            if (res.code === 0) {
                setRecentViewDocumentList([...res.data])
            }

        })
    }
    return (
        <div className="home">
            <Row className="home-row">
                <Col xl={{ span: 18, offset: 3 }} lg={{ span: 18, offset: 3 }} md={{ span: 20, offset: 2 }} className="home-col">
                    <div>
                        <div className="home-repository">
                            <div className="repository-title">我最近访问知识库</div>
                            <div className="repository-box">
                                {
                                    recentRepositoryDocumentList && recentRepositoryDocumentList.map(item => {
                                        return <Fragment>
                                            <div className="repository-item" key={item.id} onClick={() => goRepositoryDetail(item)}>
                                                <div className="item-title">
                                                    {
                                                        item.iconUrl ?
                                                            <img
                                                                src={('/images/' + item.iconUrl)}
                                                                alt=""
                                                                className="img-icon"
                                                            />
                                                            :
                                                            <img
                                                                src={('images/repository1.png')}
                                                                alt=""
                                                                className="img-icon"
                                                            />
                                                    }
                                                    <span>{item.name}</span>
                                                </div>
                                                <div className="item-work">
                                                    <div className="process-work"><span style={{ color: "#999" }}>文档</span><span>{item.documentNum}篇</span></div>
                                                    <div className="end-work"><span style={{ color: "#999" }}>目录</span><span>{item.categoryNum}个</span></div>
                                                </div>
                                            </div>

                                        </Fragment>
                                    })
                                }

                            </div>
                        </div>

                        <div className="home-document">
                            <div className="document-box-title">
                                <span className="name">我最近查看的文档</span>
                            </div>
                            <div>
                                {
                                    recentViewDocumentList && recentViewDocumentList.map((item) => {
                                        return <div className="document-list-item" key={item.id} onClick={() => goDocumentDetail(item)}>
                                            <div className='document-name' style={{ flex: 1 }}>
                                                <svg className="document-icon" aria-hidden="true">
                                                    <use xlinkHref="#icon-file"></use>
                                                </svg>
                                                <span>{item.name}</span>
                                            </div>

                                            <div style={{ flex: 1 }}>{item.wikiRepository?.name}</div>
                                            <div style={{ flex: 1 }}>{item.master.name}</div>
                                            <div style={{ flex: 1 }}>{item.recentTime}</div>
                                        </div>
                                    })
                                }
                            </div>

                        </div>




                    </div>

                </Col>
            </Row>

        </div>
    );
}

export default inject("homeStore")(observer(Home));
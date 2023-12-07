import React, { Fragment, useEffect, useState } from 'react';
import "./home.scss";
import { Row, Col, Empty } from 'antd';
import { observer } from 'mobx-react';
import { getUser } from 'tiklab-core-ui';
import HomeStore from "../store/HomeStore";
const Home = (props) => {
    const { findDocumentRecentList, findRecentRepositoryList } = HomeStore;
    const [recentViewDocumentList, setRecentViewDocumentList] = useState([]);
    const [recentRepositoryDocumentList, setRecentRepositoryDocumentList] = useState([]);
    const userId = getUser().userId
    const tenant = getUser().tenant;

    useEffect(() => {
        const recentDocumentParams = {
            masterId: userId,
            model: "document",
            orderParams: [{
                name: "recentTime",
                orderType: "desc"
            }]
        }
        findDocumentRecentList(recentDocumentParams).then(res => {
            console.log(res)
            if (res.code === 0) {
                setRecentViewDocumentList([...res.data])
            }

        })
        const recentRepositoryParams = {
            masterId: userId,
            model: "repository",
            orderParams: [{
                name: "recentTime",
                orderType: "desc"
            }]
        }
        findRecentRepositoryList(recentRepositoryParams).then(res => {
            if (res.code === 0) {
                setRecentRepositoryDocumentList(res.data.slice(0, 5))
            }

        })
        return;
    }, [])

    const goRepositoryDetail = repository => {
        props.history.push(`/repositorydetail/${repository.id}/survey`)
    }
    const goDocumentDetail = item => {
        if (item.model === "document") {
            props.history.push(`/repositorydetail/${item.wikiRepository.id}/doc/${item.modelId}`)
        }
        if (item.model === "repository") {
            props.history.push(`/repositorydetail/${item.wikiRepository.id}/survey`)
        }
        sessionStorage.setItem("menuKey", "repository")

    }
    return (
        <div className="home">
            <Row className="home-row">
                <Col xl={{ span: 18, offset: 3 }} lg={{ span: 18, offset: 3 }} md={{ span: 20, offset: 2 }} className="home-col">
                    <div className="home-repository">
                        <div className="repository-title">我最近访问知识库</div>
                        {

                            recentRepositoryDocumentList.length > 0 ?
                                <div className="repository-box">
                                    {
                                        recentRepositoryDocumentList.map(item => {
                                            return <Fragment>
                                                <div className="repository-item" key={item.id} onClick={() => goRepositoryDetail(item)} >
                                                    <div className="item-title">
                                                        {
                                                            item.iconUrl ?
                                                                <img
                                                                    src={version === "cloud" ? (upload_url + item.iconUrl + "?tenant=" + tenant) : (upload_url + item.iconUrl)}

                                                                    alt=""
                                                                    className="list-img"
                                                                />
                                                                :
                                                                <img
                                                                    src={('images/repository1.png')}
                                                                    alt=""
                                                                    className="list-img"
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
                                :

                                <Empty image="/images/nodata.png" description="暂时没有查看过知识库~" />

                        }
                    </div>

                    <div className="home-document">
                        <div className="document-box-title">
                            <span className="name">我最近查看的文档</span>
                        </div>
                        <div>
                            {
                                recentViewDocumentList && recentViewDocumentList.length > 0 ? recentViewDocumentList.map((item) => {
                                    return <div className="document-list-item" key={item.id} >
                                        <div className='document-item-left' style={{ flex: 1 }}>
                                            <div>
                                                <svg className="document-icon" aria-hidden="true">
                                                    <use xlinkHref="#icon-file"></use>
                                                </svg>
                                            </div>

                                            <div className="document-item-text">
                                                <div className="document-title" onClick={() => goDocumentDetail(item)}>{item.name}</div>
                                                <div className="document-master" style={{ flex: 1 }}>{item.master.nickname}</div>
                                            </div>

                                        </div>

                                        <div className="document-repository">{item.wikiRepository?.name}</div>

                                        <div className="document-time">{item.recentTime}</div>
                                    </div>
                                })
                                    :
                                    <Empty image="/images/nodata.png" description="暂时没有数据~" />
                            }
                        </div>

                    </div>

                </Col>
            </Row>

        </div >
    );
}

export default observer(Home);
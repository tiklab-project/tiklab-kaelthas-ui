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
    const [recentWikiDocumentList, setRecentWikiDocumentList] = useState([]);
    const userId = getUser().id
    useEffect(() => {

        findLogpage({ userId: userId })
      
        const recentParams = {
            masterId: userId,
            models: ["document", "mindMap"],
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

        findRecentRepositoryList({ model: "wiki" }).then(res => {
            if (res.code === 0) {
                setRecentWikiDocumentList(res.data)
            }

        })

    }, [])

    const goWikiDetail = wiki => {
        // localStorage.setItem("wiki", JSON.stringify(wiki.repository))
        props.history.push(`/index/wikidetail/${wiki.id}/survey`)
    }
    const goDocumentDetail = item => {
        // localStorage.setItem("wiki", JSON.stringify(item.repository))
        if (item.model === "document") {
            localStorage.setItem("documentId", item.modelId);
            props.history.push(`/index/wikidetail/${item.repository.id}/doc/${item.modelId}`)
        }
        if (item.model === "mindMap") {
            localStorage.setItem("documentId", item.modelId);
            props.history.push(`/index/wikidetail/${item.repository.id}/mindmap/${item.modelId}`)
        }

    }

    return (
        <div className="home">
            <Row className="home-row">
                <Col xl={{ span: 18, offset: 3 }} lg={{ span: 18, offset: 3 }} md={{ span: 20, offset: 2 }} className="home-col">
                    <div>
                        <div className="home-repository">
                            <div className="repository-title">最近访问知识库</div>
                            <div className="repository-box">
                                {
                                    recentWikiDocumentList && recentWikiDocumentList.map(item => {
                                        return <Fragment>
                                            <div className="repository-item" key={item.id} onClick={() => goWikiDetail(item)}>
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
                                <span className="name">最近查看的文档</span>
                            </div>
                            <div>
                                {
                                    recentViewDocumentList && recentViewDocumentList.map((item) => {
                                        return <div className="document-list-item" key={item.id} onClick={() => goDocumentDetail(item)}>
                                            <div className='document-name' style={{ flex: 1 }}>
                                                <svg className="document-icon" aria-hidden="true">
                                                    <use xlinkHref="#icon-paihang"></use>
                                                </svg>
                                                <span>{item.name}</span>
                                            </div>

                                            <div style={{ flex: 1 }}>{item.repository.name}</div>
                                            <div style={{ flex: 1 }}>{item.master.name}</div>
                                            <div style={{ flex: 1 }}>{item.recentTime}</div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>

                        <div className="home-dynamic">
                            <div className="dynamic-box-title">
                                <span className="name">相关动态</span>
                                <div className="more" onClick={() => { props.history.push(`/index/dynamic`) }}>
                                    <svg aria-hidden="true" className="svg-icon">
                                        <use xlinkHref="#icon-rightjump"></use>
                                    </svg>
                                </div>
                            </div>
                            <div className="dynamic-list">
                                {
                                    opLogList.length > 0 ? opLogList.map(item => {
                                        return <div
                                            dangerouslySetInnerHTML={{ __html: item.data }}
                                            className="dynamic-item"
                                            key={item.id}
                                            onClick={() => goOpLogDetail(item.link)}
                                        />
                                    })
                                        :
                                        <Empty image="/images/nodata.png" description="暂时没有动态~" />
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
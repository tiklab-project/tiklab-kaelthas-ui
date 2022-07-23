import React, { Fragment, useEffect, useState } from 'react';
import "./home.scss";
import { Tabs } from 'antd';
import { inject, observer } from 'mobx-react';
import { getUser } from 'doublekit-core-ui';
const { TabPane } = Tabs;

const Home = (props) => {
    const { homeStore } = props;
    const { findDocumentList, findDocumentRecentList } = homeStore;
    const [recentEditDocumentList, setRecentEditDocumentList] = useState([]);
    const [recentViewDocumentList, setRecentViewDocumentList] = useState([]);
    const [recentWikiDocumentList, setRecentWikiDocumentList] = useState([]);
    const userId = getUser().id
    useEffect(() => {
        const params = {
            orderParams: [{
                name: "updateTime",
                orderType: "asc"
            }]
        }
        findDocumentList(params).then(res => {
            console.log(res)
            if (res.code === 0) {
                setRecentEditDocumentList([...res.data])
            }

        })
        const recentParams = {
            masterId: userId,
            models: ["document","mindMap"],
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

        const wikiParams = {
            masterId: userId,
            model: "wiki",
            orderParams: [{
                name: "recentTime",
                orderType: "asc"
            }]
        }
        findDocumentRecentList(wikiParams).then(res => {
            console.log(res)
            if (res.code === 0) {
                setRecentWikiDocumentList([...res.data])
            }

        })

    }, [])

    const goWikiDetail = wiki => {
        localStorage.setItem("wiki",JSON.stringify(wiki.repository))
        props.history.push(`/index/wikidetail`)
    }
    const goDocumentDetail = item => {
        localStorage.setItem("wiki",JSON.stringify(item.repository))
        if(item.model === "document"){
            localStorage.setItem("documentId", item.modelId);
            props.history.push(`/index/wikidetail/doc/${item.modelId}`)
        }
        if (item.model === "mindMap") {
            localStorage.setItem("documentId", item.modelId);
            props.history.push(`/index/wikidetail/mindmap/${item.modelId}`)
        }
        
    }

    const goEditDetail = item => {
        localStorage.setItem("wiki",JSON.stringify(item.repository))
        if(item.typeId === "document"){
            localStorage.setItem("documentId", item.id);
            props.history.push(`/index/wikidetail/doc/${item.id}`)
        }
        if (item.typeId === "mindMap") {
            localStorage.setItem("documentId", item.modelId);
            props.history.push(`/index/wikidetail/mindmap/${item.id}`)
        }
        
    }
    return (
        <Fragment>
            <div className="home">
                <div className="home-repository">
                    <div className="repository-title">最近访问知识库</div>
                    <div className="repository-box">
                        {
                            recentWikiDocumentList && recentWikiDocumentList.map(item => {
                                return <Fragment>
                                    <div className="repository-item" key={item.id} onClick = {() => goWikiDetail(item)}>
                                        <svg className="icon" aria-hidden="true">
                                            <use xlinkHref="#iconpaihang1"></use>
                                        </svg>

                                        <div className="title" key="title">{item.name}</div>
                                    </div>
                                </Fragment>
                            })
                        }

                    </div>
                </div>
                <div className="home-document">
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="最近查看文档" key="1">
                            <div>
                                {
                                    recentViewDocumentList && recentViewDocumentList.map((item) => {
                                        return <div className="document-list-item" key={item.id} onClick = {() => goDocumentDetail(item)}>
                                            <div className='document-name' style={{ flex: 1 }}>
                                                <svg className="document-icon" aria-hidden="true">
                                                    <use xlinkHref="#iconpaihang1"></use>
                                                </svg>
                                                <span>{item.name}</span>
                                            </div>

                                            <div style={{ flex: 1 }}>{item.repository.name}</div>
                                            <div style={{ flex: 1 }}>{item.master.name}</div>
                                            <div style={{ flex: 1 }}>{item.updateTime}</div>
                                            <div style={{ flex: 1 }}>
                                                <svg className="icon" aria-hidden="true">
                                                    <use xlinkHref="#icon-point"></use>
                                                </svg>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </TabPane>
                        <TabPane tab="最近修改文档" key="2">
                            <div>
                                {
                                    recentEditDocumentList && recentEditDocumentList.map((item) => {
                                        return <div className="document-list-item" key={item.id} onClick = {() => goEditDetail  (item)}>
                                            <div className='document-name' style={{ flex: 1 }}>
                                                <svg className="document-icon" aria-hidden="true">
                                                    <use xlinkHref="#iconpaihang1"></use>
                                                </svg>
                                                <span>{item.name}</span>
                                            </div>

                                            <div style={{ flex: 1 }}>{item.repository.name}</div>
                                            <div style={{ flex: 1 }}>{item.master.name}</div>
                                            <div style={{ flex: 1 }}>{item.updateTime}</div>
                                            <div style={{ flex: 1 }}>
                                                <svg className="icon" aria-hidden="true">
                                                    <use xlinkHref="#icon-point"></use>
                                                </svg>
                                            </div>
                                        </div>
                                    })
                                }

                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </Fragment>
    );
}

export default inject("homeStore")(observer(Home));
import React, { useState, useEffect, Fragment } from "react";
import { Row, Col, Form, Dropdown, Menu, Empty } from 'antd';
import { withRouter } from "react-router";
import { observer } from "mobx-react";
import Button from "../../../common/button/button";
import UserIcon from "../../../common/UserIcon/UserIcon";
import "./survey.scss";
import { getUser } from "tiklab-core-ui";
import SurveyStore from "../store/SurveyStore";
import CategoryStore from "../../common/store/CategoryStore";
import { replaceTree } from '../../../common/utils/treeDataAction';
import AddDropDown from "../../common/components/AddDropDown";
const Survey = (props) => {
    const { findRepository, findLogpage, opLogList, findUserList, findDocumentRecentList,
        findCategoryListTreeById, } = SurveyStore;

    const { expandedTree, setExpandedTree, repositoryCatalogueList } = CategoryStore;

    const [repositoryInfo, setRepositoryInfo] = useState();
    const repositoryId = props.match.params.repositoryId
    const [recentViewDocumentList, setRecentViewDocumentList] = useState([]);
    const [userList, setUserList] = useState();
    const userId = getUser().userId;
    const tenant = getUser().tenant;
    useEffect(() => {
        findLogpage({ userId: userId, repositoryId: repositoryId })

        findRepository({ id: repositoryId }).then(res => {
            if (res.code === 0) {
                setRepositoryInfo(res.data)
            }
        })
        const recentParams = {
            masterId: userId,
            model: "document",
            repositoryId: repositoryId,
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

        findUserList({ domainId: repositoryId }).then(res => {
            if (res.code === 0) {
                setUserList(res.data)
            }
        })
        return;
    }, [repositoryId])

    const goDocumentDetail = document => {
        if (document.typeId === "document") {
            props.history.push(`/repositorydetail/${document.wikiRepository.id}/doc/${document.id}`)
        }
        if (document.typeId === "markdown") {
            props.history.push(`/repositorydetail/${document.wikiRepository.id}/markdownView/${document.id}`)
        }
        if (document.typeId === "category") {
            props.history.push(`/repositorydetail/${document.wikiRepository.id}/folder/${document.id}`)
        }
        const params = {
            id: document.id,
            treePath: document.treePath
        }
        findCategoryListTreeById(params).then(res => {
            if (res.code === 0) {
                console.log(res.data[0])
                replaceTree(repositoryCatalogueList, res.data[0])
                if (document.treePath) {
                    const list = document.treePath.split(";")
                    list.pop();
                    let newExpandedTree = [...expandedTree, ...list]
                    // 去重
                    newExpandedTree = Array.from(new Set(newExpandedTree))
                    setExpandedTree(newExpandedTree)
                }
            }
        })
    }

    /**
     * 跳转到日志详情
     * @param {地址} url 
     */
    const goOpLogDetail = (url) => {
        window.location.href = url
    }

    return (<div >
        <Row className="repository-survey-row">
            <Col xl={{ span: 18, offset: 3 }} lg={{ span: 18, offset: 3 }} md={{ span: 20, offset: 2 }} className="repository-col">
                <div className="repository-survey">
                    {
                        repositoryInfo && <Fragment>
                            <div className="repository-top">

                                <div className="top-left">
                                    <div>
                                        {
                                            repositoryInfo.iconUrl ?
                                                <img
                                                    src={version === "cloud" ? (upload_url + repositoryInfo.iconUrl + "?tenant=" + tenant) : (upload_url + repositoryInfo.iconUrl)}
                                                    alt=""
                                                    className="repository-icon"
                                                />
                                                :
                                                <img
                                                    src={('images/repository1.png')}
                                                    alt=""
                                                    className="repository-icon"
                                                />
                                        }
                                    </div>


                                    <div className="top-name">
                                        <div className="name">{repositoryInfo?.name}</div>
                                        <div className="user">
                                            {
                                                userList && userList.length > 0 && userList.map((item, index) => {
                                                    if (index < 5) {
                                                        return <div ><UserIcon size="big" name={item.user.nickname}></UserIcon></div>
                                                    }

                                                })
                                            }
                                            <div className="user-more" onClick={() => props.history.push(`/repositorySet/${repositoryId}/user`)}>
                                                <svg className="user-more-icon" aria-hidden="true">
                                                    <use xlinkHref="#icon-more"></use>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="desc">
                                            <span>
                                                目录 {repositoryInfo.categoryNum ? repositoryInfo.categoryNum : 0}
                                            </span>
                                            <span>
                                                文档 {repositoryInfo.documentNum ? repositoryInfo.documentNum : 0}
                                            </span>

                                        </div>
                                    </div>

                                </div>

                                <div className="top-right">
                                    <AddDropDown category={null} isButton={true} />
                                    <Button>分享</Button>
                                </div>
                            </div>
                        </Fragment>
                    }

                    <div className="home-document">
                        <div className="document-box-title">
                            <span className="name">最近查看</span>
                        </div>
                        {
                            recentViewDocumentList.length > 0 ? <div>
                                {
                                    recentViewDocumentList && recentViewDocumentList.map((item) => {
                                        return <div className="document-list-item" key={item.id} >
                                            <div className='document-item-left'>
                                                <div>
                                                    {
                                                        item.typeId === "markdown" &&
                                                        <svg className="document-icon" aria-hidden="true">
                                                            <use xlinkHref="#icon-minmap"></use>
                                                        </svg>
                                                    }
                                                    {
                                                        item.typeId === "document" &&
                                                        <svg className="document-icon" aria-hidden="true">
                                                            <use xlinkHref="#icon-file"></use>
                                                        </svg>
                                                    }
                                                </div>

                                                <div className='document-item-text'>
                                                    <div className='document-title' onClick={() => goDocumentDetail(item)}>{item.name}</div>
                                                    <div className='document-master'>{item.master.nickname}</div>
                                                </div>

                                            </div>

                                            {/* <div style={{ flex: 1 }}>{item.wikiRepository.name}</div> */}

                                            <div >{item.updateTime}</div>
                                        </div>
                                    })
                                }
                            </div>
                                :
                                <Empty image="/images/nodata.png" description="暂时没有查看过文档~" />
                        }
                    </div>
                    <div className="home-dynamic">
                        <div className="dynamic-box-title">
                            <span className="name">相关动态</span>
                            <div className="more" onClick={() => { props.history.push(`/repositorydetail/${repositoryId}/dynamicList`) }}>
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
    )
}

export default withRouter(observer(Survey));
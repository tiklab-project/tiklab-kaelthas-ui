import React, { useState, useEffect, Fragment } from "react";
import { Row, Col, Form, Dropdown, Menu, Empty } from 'antd';
import { withRouter } from "react-router";
import { observer } from "mobx-react";
import Button from "../../../common/button/button";
import CategoryAdd from "../../common/components/CategoryAdd";
import UserIcon from "../../../common/UserIcon/UserIcon";
import "./survey.scss";
import { getUser } from "tiklab-core-ui";
import SurveyStore from "../store/SurveyStore";
import CategoryStore from "../../common/store/CategoryStore"
const Survey = (props) => {
    const { findRepository, findLogpage, opLogList, findUserList, findDocumentRecentList } = SurveyStore;

    const { setRepositoryCatalogueList, createDocumentRecent, createDocument, findRepositoryCatalogue,
        expandedTree, setExpandedTree } = CategoryStore;

    const [repositoryInfo, setRepositoryInfo] = useState();
    const repositoryId = props.match.params.repositoryId
    const [form] = Form.useForm();
    const [modalTitle, setModalTitle] = useState()
    const [contentValue, setContentValue] = useState()
    const [selectKey, setSelectKey] = useState();
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
            // console.log(res)
            if (res.code === 0) {
                setUserList(res.data)
            }
        })
        return;
    }, [repositoryId])

    const addMenu = (id) => {
        return <Menu onClick={(value) => selectAddType(value, id)}>
            <Menu.Item key="category">
                <div className="content-add-menu">
                    <svg className="content-add-icon" aria-hidden="true">
                        <use xlinkHref="#icon-folder"></use>
                    </svg>
                    目录
                </div>

            </Menu.Item>
            <Menu.Item key="document">
                <div className="content-add-menu">
                    <svg className="content-add-icon" aria-hidden="true">
                        <use xlinkHref="#icon-file"></use>
                    </svg>
                    文档
                </div>

            </Menu.Item>
            <Menu.Item key="markdown">
                <div className="content-add-menu">
                    <svg className="content-add-icon" aria-hidden="true">
                        <use xlinkHref="#icon-minmap"></use>
                    </svg>
                    Markdown
                </div>
            </Menu.Item>
        </Menu>
    };

    const [catalogueId, setCatalogueId] = useState()
    const [addModalVisible, setAddModalVisible] = useState()
    const selectAddType = (value, id) => {
        setCatalogueId(id)
        if (value.key === "document") {
            const data = {
                name: "未命名文档",
                wikiRepository: { id: repositoryId },
                master: { id: userId },
                typeId: "document",
                formatType: "document",
                wikiCategory: { id: id },
            }
            console.log(id)
            createDocument(data).then((data) => {
                if (data.code === 0) {
                    findRepositoryCatalogue(repositoryId).then((data) => {
                        setRepositoryCatalogueList(data)
                    })

                    props.history.push(`/index/repositorydetail/${repositoryId}/doc/${data.data}`)
                    // 左侧导航
                    setSelectKey(data.data)
                }

            })
        }
        if (value.key === "markdown") {
            const data = {
                name: "未命名文档",
                wikiRepository: { id: repositoryId },
                master: { id: userId },
                typeId: "markdown",
                formatType: "document",
                wikiCategory: { id: id },
                details: JSON.stringify([
                    {
                        type: "code",
                        children: [
                            {
                                type: 'paragraph',
                                children: [
                                    {
                                        text: '',
                                    },
                                ],
                            },
                        ]
                    }
                ])
            }
            createDocument(data).then((data) => {
                if (data.code === 0) {
                    findRepositoryCatalogue(repositoryId).then((data) => {
                        setRepositoryCatalogueList(data)
                    })
                    if (!isExpandedTree(id)) {
                        setExpandedTree(expandedTree.concat(id));
                    }
                    props.history.push(`/index/repositorydetail/${repositoryId}/markdownEdit/${data.data}`)
                    // 左侧导航
                    setSelectKey(data.data)
                }
            })
        }
        if (value.key === "category") {
            setAddModalVisible(true)
            setModalTitle("添加目录")
        }
        // 
        form.setFieldsValue({
            formatType: value.key
        })
    }

    // 树的展开与闭合
    const isExpandedTree = (key) => {
        return expandedTree.some(item => item === key)
    }
    const setOpenOrClose = key => {
        if (!isExpandedTree(key)) {
            setExpandedTree(expandedTree.concat(key));
        }
    }


    const goDocumentDetail = item => {
        if (item.typeId === "document") {
            props.history.push(`/index/repositorydetail/${item.wikiRepository.id}/doc/${item.id}`)
        }
        if (item.typeId === "markdown") {
            props.history.push(`/index/repositorydetail/${item.wikiRepository.id}/markdownView/${item.id}`)
        }
        if (item.typeId === "category") {
            props.history.push(`/index/repositorydetail/${item.wikiRepository.id}/folder/${item.id}`)
        }
        setOpenOrClose(item.wikiCategory?.id)
    }

    /**
     * 跳转到日志详情
     * @param {地址} url 
     */
    const goOpLogDetail = (url) => {
        window.location.href = url
    }

    return (<div className="repository-survey">
        <Row >
            <Col xl={{ span: 18, offset: 3 }} lg={{ span: 18, offset: 3 }} md={{ span: 20, offset: 2 }} className="repository-col">
                <div>
                    {
                        repositoryInfo && <Fragment>
                            <div className="repository-top">

                                <div className="top-left">
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
                                            <div className="user-more" onClick={() => props.history.push(`/index/repositorySet/${repositoryId}/user`)}>
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
                                    <Dropdown overlay={() => addMenu(null)} placement="bottomLeft">
                                        <div className="top-add-botton">添加</div>
                                    </Dropdown>
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
                                        return <div className="document-list-item" key={item.id} onClick={() => goDocumentDetail(item)}>
                                            <div className='document-name' style={{ flex: 1 }}>
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
                                                <span>{item.name}</span>
                                            </div>

                                            <div style={{ flex: 1 }}>{item.wikiRepository.name}</div>
                                            <div style={{ flex: 1 }}>{item.master.name}</div>
                                            <div style={{ flex: 1 }}>{item.updateTime}</div>
                                            <div>
                                                <svg className="icon" aria-hidden="true">
                                                    <use xlinkHref="#icon-point"></use>
                                                </svg>
                                            </div>
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
                            <div className="more" onClick={() => { props.history.push(`/index/repositorydetail/${repositoryId}/dynamicList`) }}>
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

                <CategoryAdd
                    setAddModalVisible={setAddModalVisible}
                    addModalVisible={addModalVisible}
                    setRepositoryCatalogueList={setRepositoryCatalogueList}
                    form={form}
                    catalogueId={catalogueId}
                    contentValue={contentValue}
                    setSelectKey={setSelectKey}
                    userList={userList}
                    modalTitle={modalTitle}
                    {...props}
                />

            </Col>
        </Row>
    </div>
    )
}

export default withRouter(observer(Survey));
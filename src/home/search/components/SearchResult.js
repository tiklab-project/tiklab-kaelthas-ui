import React,{Fragment, useEffect, useRef, useState} from "react";
import { Pagination } from 'antd';
import "./search.scss";
import { Row, Col,Tabs } from 'antd';
import repository from "../../../assets/images/repository.png";
import { observer, inject } from "mobx-react";
const { TabPane } = Tabs;

const SearchResult = (props) => {
    const {searchStore,repositoryDetailStore} = props
    const {getSearchSore,sortList,searchForPage,keyword,searchCondition,setKeyWord,searchList,getSearch} = searchStore;
    const {setRepositoryId} = repositoryDetailStore
    const [lastRecord,setLastRecord] = useState()
    const table = (data) => {
        switch(data){
            case "repository": 
                return "知识库";
            case "WorkItem": 
                return "事项";
        }
    }
    const [itemList,setItem] = useState([])
    const [tabs,setTabs] = useState()
    useEffect(() => {
        if(sortList.length !== 0){
            setTabs(sortList[0].index)
            searchForPage({currentPage: 1,index: sortList[0].index,keyword: keyword}).then((res)=> {
                if(res.code === 0){
                    setItem(res.data.dataList)
                    setLastRecord(res.data.lastRecord)
                }
            })
        }
        return 
    }, [sortList,keyword])

    // 输入中
    const [showRes,setShow] = useState("hidden")
    const changeValue = (value) =>{
        console.log(searchList,showRes)
        setShow("show")
        getSearch(value.target.value)
        
    }

    const changeTab = (activeKey) => {
        searchForPage({currentPage: 1,index: activeKey,}).then((res)=> {
            if(res.code === 0){
                setItem(res.data.dataList)
                setLastRecord(res.data.lastRecord)
            }
        })
    }

    const toRepository = async(repository) => {
        setRepositoryId(repository.id)
        localStorage.setItem("repository",repository.id)
        await props.history.push("/index/repositorydetail/survey")
        setShow("hidden")
        // location.reload();

    }

    const toWorkItem = async(id) => {
        // setWorkId(id)
        await props.history.push("/index/repositorydetail/work")
        setShow("hidden")
        // location.reload();

    }
    const changePage = (page) => {
        searchForPage({currentPage: page,lastRecord:lastRecord}).then((res)=> {
            if(res.code === 0){
                setItem(res.data.dataList)
                setLastRecord(res.data.lastRecord)
            }
        })
    }
    const searchInput = useRef()
    const submit = (value) => {
        if(value.keyCode === 13) {
            getSearchSore(value.target.value)
            setKeyWord(value.target.value)
        }else {
            setKeyWord(searchInput.current.value)
            getSearchSore(searchInput.current.value)
        }
        setShow("hidden")
        
    }

    const hiddenBox = ()=> {
        setShow("hidden")
    }
    const showBox = ()=> {
        setShow("show")
    }
    return (
        <Row>
            <Col span={12} offset={6}>
                <div className="search-resule" 
                >
                    <div tabIndex="-1"
                        onFocus={showBox}
                        onBlur={hiddenBox}
                    >
                        <div className="search-box">
                            <input className="search-input" ref={searchInput} onChange={changeValue} onKeyDown={submit}/>
                            <div className="search-botton" onClick={submit}>搜索</div>
                        </div>
                        <div 
                        className={`show-box ${(searchList.length !== 0 && showRes === "show") ?   null : "hidden-box"}`} 
                    >
                            {
                                searchList && searchList.map((item,index)=> {
                                    return (
                                        <div className="sort-box" key={index}>
                                            
                                            {
                                                (()=> {
                                                    switch(item.index) {
                                                        case "repository": 
                                                            return <div className="sort-title">知识库</div>;
                                                        case "WorkItem":
                                                            return <div className="sort-title">事项</div>;
                                                    }
                                                })()
                                            }
                                            {
                                                item.dataList && item.dataList.map((toItem)=> {
                                                    return <div className="item-box" key={toItem.id}>
                                                                {
                                                                    (()=> {
                                                                        switch(item.index) {
                                                                            case "repository": 
                                                                                return <div className="item-one" onClick={()=>toRepository(toItem)}>
                                                                                            <img src={repository} alt=""/>
                                                                                            <span>{toItem.repositoryName}</span>
                                                                                        </div>;
                                                                            case "WorkItem":
                                                                                return <div className="item-one" onClick={()=>toWorkItem(toItem.id, toItem.wikiRepository.id)}>
                                                                                            <img src={repository} alt=""/>
                                                                                            <span>{toItem.title}</span>
                                                                                        </div>;
                                                                        }
                                                                    })()
                                                                }    
                                                            </div>
                                                })
                                            }
                                        </div>)
                                })
                            }
                    </div>
                    
                    </div>
                    <Tabs defaultActiveKey={tabs} type="card" size={'default'} onChange={changeTab}>
                        {
                            sortList && sortList.map((item)=> {
                                return <TabPane tab={`${table(item.index)}(${item.totalRecord})`} key={item.index} >
                                {
                                    itemList && itemList.map((itemWork)=> {
                                        return <div className="repository-box" key={itemWork.id}>
                                                <div className="repository-item">
                                                {
                                                    (()=> {
                                                        switch(item.index) {
                                                            case "repository": 
                                                                return <div className="repository-contant" onClick={()=>toRepository(itemWork.id)}>
                                                                    <div className="repository-title">{itemWork.repositoryName}</div>
                                                                    <div >
                                                                        <span className="repository-item-name">知识库ID:</span>{itemWork.id}
                                                                    </div>
                                                                    <div>
                                                                        <span className="repository-item-name">知识库详情:  </span>
                                                                        协同办公知识库协同办公知识库协同办公知识库协同办公知识库协同办公知识库
                                                                    </div>
                                                                </div>
                                                            case "WorkItem":
                                                                return <div className="repository-contant" onClick={()=>toWorkItem(itemWork.id)}>
                                                                    <div className="repository-title">{itemWork.title}</div>
                                                                    <div >
                                                                        <span className="repository-item-name">事项ID:</span>{itemWork.id}
                                                                    </div>
                                                                    <div>
                                                                        <span className="repository-item-name">事项详情:  </span>
                                                                        协同办公知识库协同办公知识库协同办公知识库协同办公知识库协同办公知识库
                                                                    </div>
                                                                </div>
                                                        }
                                                    })()
                                                } 
                                                </div>
                                            </div>
                                    })
                                }
                                </TabPane>
                            })
                        }
                    </Tabs>
                    <Pagination defaultCurrent={1} {...searchCondition} onChange={changePage} />
                </div>
            </Col>
        </Row>
        
    )
}
export default inject("searchStore","repositoryDetailStore")(observer(SearchResult));
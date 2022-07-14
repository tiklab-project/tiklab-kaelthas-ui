import React, { useEffect, useState } from "react";
import { SafeArea, InfiniteScroll } from 'antd-mobile';
import "./wikiRepository.scss";
import { inject, observer } from "mobx-react";
const Wiki = (props) => {
    const { wikirepositoryStore } = props;
    const { findRepositoryPage, repositoryList, repositoryCondition } = wikirepositoryStore;
    const [hasMore, setHasMore] = useState(true)
    useEffect(() => {
        const params = {
            pageParam: {
                pageSize: 10,
                total: 1,
                currentPage: 1,
            }
        }
        findRepositoryPage(params)
    },[])

    const changePage = async() => {
        const params = {
            pageParam: {
                pageSize: 10,
                total: 1,
                currentPage: repositoryCondition.pageParam.currentPage + 1,
            }
        }
        const data =  await findRepositoryPage(params)
        if(data.code === 0){
            setHasMore(data.data.length > 0)
        }
    }
    const goRepository = (id) => {
        props.history.push(`/repositoryDetail/${id}`)
        localStorage.setItem("respositoryId", id)
    }
    return (
        <div className="wiki">
            <div style={{ background: '#ace0ff' }}>
                <SafeArea position='top' />
            </div>
            <div className="wiki-top">
                <div className="wiki-top-left">
                    <svg className="wiki-icon-logo" aria-hidden="true">
                        <use xlinkHref= "#icon-wiki"></use>
                    </svg>
                    <div className="wiki-title">知识库22</div>
                </div>
                <div className="wiki-top-right">
                    <svg className="wiki-icon-search" aria-hidden="true">
                        <use xlinkHref= "#icon-search"></use>
                    </svg>
                    <svg className="wiki-icon-add" aria-hidden="true" onClick={() => props.history.push("/wiki/add")}>
                        <use xlinkHref= "#icon-add"></use>
                    </svg>
                </div>
            </div>
            <div className="wiki-list">
            {
                repositoryList && repositoryList.map(item => {
                    return (
                        <div className="wiki-list-item" key={item.id} onClick = {() =>goRepository(item.id)}>
                            <div>
                                <svg className="wiki-respository-logo" aria-hidden="true">
                                    <use xlinkHref= "#icon-respository"></use>
                                </svg>
                                
                            </div>
                            <div className="wiki-repository-info">
                                <div className="wiki-respository-title">
                                    {item.name}
                                </div>
                                <div className="wiki-respository-info-bottom">
                                    <span className="wiki-respository-master">
                                        {item.master.name}
                                    </span>
                                    <span className="wiki-respository-time">
                                        {item.createTime}
                                    </span>
                                </div>
                            </div>  
                            <div>
                                <svg className="wiki-respository-logo" aria-hidden="true">
                                    <use xlinkHref= "#icon-view"></use>
                                </svg>
                            </div> 
                        </div>
                    )
                })
            }
             <InfiniteScroll loadMore={changePage} hasMore={hasMore} threshold = {20}/>
            </div>
           
        </div>
    )
}
export default inject("wikirepositoryStore")(observer(Wiki));
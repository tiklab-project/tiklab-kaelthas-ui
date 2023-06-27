import React,{Fragment, useEffect, useState} from "react";
import { SearchOutlined } from '@ant-design/icons';
import "../components/Search.scss"
import repository from "../../../assets/images/repository.png"
import SearchStore from "../store/Search";
import { observer } from "mobx-react";

const Search = (props) => {
    const {getSearch,searchList,getSearchSore,setKeyWord} = SearchStore;
    useEffect(() => {
        
        return
    }, [])

    // 输入中
    const changeValue = (value) =>{
        console.log(searchList,show)
        setShow("show")
        getSearch(value.target.value)
        
    }


    const [show,setShow] = useState("hidden")
    const toRepository = async(repository) => {
        setRepositoryId(repository.id)
        localStorage.setItem("repository",repository.id)
        await props.history.push("/index/repositorydetail/survey")
        setShow("hidden")
        // location.reload();

    }
    const toWorkItem = async(id,repository) => {
        setRepositoryId(repository.id)
        localStorage.setItem("repository",repository.id)
        await props.history.push("/index/repositorydetail/work")
        setShow("hidden")
        // location.reload();

    }

    const submit = (value) => {
        if(value.keyCode === 13) {
            getSearchSore(value.target.value)
            setKeyWord(value.target.value)
            props.history.push("/index/searchResult")
            setShow("hidden")
        }
    }
    const hiddenBox = ()=> {
        setShow("hidden")
    }
    const showBox = ()=> {
        setShow("show")
    }
    return (
        <Fragment>
            <div className="search"
                tabIndex="-1"
                onFocus={showBox}
                onBlur={hiddenBox}
            >
                <div className="search-box" >
                    <SearchOutlined />
                    <input 
                        className="search-input" 
                        onChange={changeValue} 
                        onKeyDown={submit}
                    />
                </div>
                <div 
                    className={`show-box ${(searchList.length !== 0 && show === "show") ?  null : "hidden-box" }`} 
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
                                                                            return <div className="item-one" onClick={()=>toWorkItem(toItem.id, toItem.wikiRepository)}>
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
        </Fragment>
    )
}
export default observer(Search);
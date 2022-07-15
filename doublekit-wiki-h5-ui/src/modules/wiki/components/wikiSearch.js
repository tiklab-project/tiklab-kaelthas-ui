import React from "react";
import { SearchBar } from 'antd-mobile';
import "./wikiSearch.scss"
const WikiSearch = (props) => {
    return (<div className="wiki-search">
        <SearchBar 
            placeholder='请输入内容' 
            showCancelButton
            onCancel = {() => props.history.goBack()}
        />
    </div>
        
    )
}

export default WikiSearch;
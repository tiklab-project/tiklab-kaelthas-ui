/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-09 09:18:21
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-13 13:13:00
 */
import React, { Fragment, useEffect, useState, useRef } from "react";
import { Breadcrumb, Input, Divider } from 'antd';
import { observer, inject } from "mobx-react";
import "./brainMapFlowEdit.scss";
import { Link, withRouter } from "react-router-dom";
// import "./documentEdit.scss"
// import TemplateList from "./templateList"
// import DocumentEditor from "./edit-slate/editor"
import BrainMapFlow from "./brainMapFlow";
const { Search } = Input;
const DocumentEdit = (props) => {
    const { value, onChange, docInfo,graphData, setGraphData} = props
    return (
        <div className="documnet-edit">
            <Divider />
            <div className="examine-title">{docInfo.name}<span className="examine-type">类型：脑图</span></div>
            <BrainMapFlow 
                graphData={graphData}
                setGraphData={setGraphData} 
            />
        </div>
    )
}
export default inject('wikiDetailStore', 'wikiStore', "WikiCatalogueStore")(observer(withRouter(DocumentEdit)));
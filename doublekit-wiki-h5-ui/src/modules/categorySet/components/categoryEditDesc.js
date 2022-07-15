import React, { useState } from "react";
import { SafeArea, Input,TextArea } from 'antd-mobile';
import "./categoryEditDesc.scss"
import { withRouter } from "react-router";
import { inject, observer } from "mobx-react";
const CategoryEditDesc = (props) => {
    const [desc, setDesc] = useState(props.match.params.desc !== "undefined" ? props.match.params.desc : "");
    const id = localStorage.getItem("respositoryId");
    const { categorySetStore } = props;
    const categoryId = localStorage.getItem("categoryId");
    const { updateCategory } = categorySetStore;
    const submit = () => {
        const params = {
            id: categoryId,
            desc: desc
        }
        updateCategory(params).then(data => {
            if (data.code === 0) {
                props.history.goBack()
            }
        })
    }
    return (
        <div className="category-editdesc">
            <div style={{ background: '#ace0ff' }}>
                <SafeArea position='top' />
            </div>
            <div className="category-editdesc-top">
                <svg className="category-editdesc-icon-logo" aria-hidden="true" onClick={() => props.history.goBack()}>
                    <use xlinkHref="#icon-left"></use>
                </svg>
                <div className="category-editdesc-title">修改描述</div>
                <div onClick={() => submit()} style={{ color: "#5D70EA" }}>确定</div>
            </div>
            <div className="category-editdesc-box">
            <TextArea
                placeholder='请输入内容'
                value={desc}
                rows={5}
                onChange={value => {setDesc(value)}}
            /> 
            </div>

        </div>
    )
}

export default withRouter(inject("categorySetStore")(observer(CategoryEditDesc)));
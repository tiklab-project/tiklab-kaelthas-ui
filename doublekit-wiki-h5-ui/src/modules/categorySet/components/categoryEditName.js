import React, { useState } from "react";
import { List, SafeArea } from 'antd-mobile';
import { Input } from 'antd-mobile'
import "./categoryEditName.scss"
import { withRouter } from "react-router";
import { inject, observer } from "mobx-react";
const CategoryEditName = (props) => {
    const [name, setName] = useState(props.match.params.name);
    const id = localStorage.getItem("respositoryId");
    const categoryId = localStorage.getItem("categoryId");
    const {categorySetStore} = props;
    const {updateCategory} = categorySetStore;
    console.log(name)
    const submit = () => {
        console.log(name)
        const params = {
            id: categoryId,
            name: name
        }
        updateCategory(params).then(data => {
            if(data.code === 0){
                props.history.goBack()
            }
        })
    }
    return (
        <div className="category-editname">
            <div style={{ background: '#ace0ff' }}>
                <SafeArea position='top' />
            </div>
            <div className="category-editname-top">
                <svg className="category-editname-icon-logo" aria-hidden="true" onClick={() => props.history.goBack()}>
                    <use xlinkHref="#icon-left"></use>
                </svg>
                <div className="category-editname-title">修改名称</div>
                <div onClick={() => submit()}>确定</div>
            </div>
            <div className="category-editname-box">
                <Input
                    placeholder='请输入验证码'
                    clearable
                    value={name}
                    onChange = {(value) => setName(value)}
                />
            </div>
                

        </div>
    )
}

export default withRouter(inject("categorySetStore")(observer(CategoryEditName)));
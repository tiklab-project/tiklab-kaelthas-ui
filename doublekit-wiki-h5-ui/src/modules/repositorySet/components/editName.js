import React, { useState } from "react";
import { List, SafeArea } from 'antd-mobile';
import { Input } from 'antd-mobile'
import "./editName.scss"
import { withRouter } from "react-router";
import { inject, observer } from "mobx-react";
const EditRespositoryName = (props) => {
    const [name, setName] = useState(props.match.params.name);
    const id = localStorage.getItem("respositoryId");
    const {repositorySetStore} = props;
    const {updateRepository} = repositorySetStore;
    console.log(name)
    const submit = () => {
        console.log(name)
        const params = {
            id: id,
            name: name
        }
        updateRepository(params).then(data => {
            if(data.code === 0){
                props.history.goBack()
            }
        })
    }
    return (
        <div className="repository-editname">
            <div style={{ background: '#ace0ff' }}>
                <SafeArea position='top' />
            </div>
            <div className="repository-editname-top">
                <svg className="repository-editname-icon-logo" aria-hidden="true" onClick={() => props.history.goBack()}>
                    <use xlinkHref="#icon-left"></use>
                </svg>
                <div className="repository-editname-title">修改名称</div>
                <div onClick={() => submit()}>确定</div>
            </div>
            <div className="repository-editname-box">
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

export default withRouter(inject("repositorySetStore")(observer(EditRespositoryName)));
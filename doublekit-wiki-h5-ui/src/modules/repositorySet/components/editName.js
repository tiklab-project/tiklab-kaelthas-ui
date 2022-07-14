import React from "react";
import { List, SafeArea } from 'antd-mobile';
import { Input } from 'antd-mobile'
import "./editName.scss"
import { withRouter } from "react-router";
const EditRespositoryName = (props) => {
    const name = props.match.params.name
    return (
        <div className="repository-editname">
            <div style={{ background: '#ace0ff' }}>
                <SafeArea position='top' />
            </div>
            <div className="repository-top">
                <svg className="repository-icon-logo" aria-hidden="true" onClick={() => props.history.goBack()}>
                    <use xlinkHref="#icon-left"></use>
                </svg>
                <div className="repository-title">修改名称</div>
            </div>
            <div className="repositoryedit-box">
                <Input
                    placeholder='请输入验证码'
                    clearable
                    value={name}
                />
            </div>
                

        </div>
    )
}

export default withRouter(EditRespositoryName);
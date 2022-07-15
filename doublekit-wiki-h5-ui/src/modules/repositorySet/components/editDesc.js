import React, { useState } from "react";
import { SafeArea, Input,TextArea } from 'antd-mobile';
import "./editDesc.scss"
import { withRouter } from "react-router";
import { inject, observer } from "mobx-react";
const EditRespositoryDesc = (props) => {
    const [desc, setDesc] = useState(props.match.params.desc);
    const id = localStorage.getItem("respositoryId");
    const { repositorySetStore } = props;
    const { updateRepository } = repositorySetStore;
    const submit = () => {
        const params = {
            id: id,
            desc: desc
        }
        updateRepository(params).then(data => {
            if (data.code === 0) {
                props.history.goBack()
            }
        })
    }
    return (
        <div className="repository-editdesc">
            <div style={{ background: '#ace0ff' }}>
                <SafeArea position='top' />
            </div>
            <div className="repository-editdesc-top">
                <svg className="repository-editdesc-icon-logo" aria-hidden="true" onClick={() => props.history.goBack()}>
                    <use xlinkHref="#icon-left"></use>
                </svg>
                <div className="repository-editdesc-title">修改描述</div>
                <div onClick={() => submit()} style={{ color: "#5D70EA" }}>确定</div>
            </div>
            <div className="repository-editdesc-box">
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

export default withRouter(inject("repositorySetStore")(observer(EditRespositoryDesc)));
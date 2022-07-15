import React, { useEffect, useState } from "react";
import { List, SafeArea } from 'antd-mobile';
import { inject, observer } from "mobx-react";
import "./repositorySet.scss"
import { withRouter } from "react-router";
const RepositorySet = (props) => {
    const {repositorySetStore} = props;

    const {findRepository} = repositorySetStore;
    const repositoryId = props.match.params.id;
    const [repositoryInfo, setRepositoryInfo] = useState()
    useEffect(()=> {
        findRepository(repositoryId).then(data => {
            if(data.code === 0) {
                setRepositoryInfo(data.data)
            }
        })
    },[])
    console.log()
    return (
        <div className="repository-set">
            <div style={{ background: '#ace0ff' }}>
                <SafeArea position='top' />
            </div>
            <div className="repository-top">
                <svg className="repository-icon-logo" aria-hidden="true" onClick={() => props.history.goBack()}>
                    <use xlinkHref="#icon-left"></use>
                </svg>
                <div className="repository-title">知识库设置</div>
            </div>
            <div className="repository-set-contant">
                <div className="repository-set-item" onClick={() => props.history.push(`/editRespositoryName/${repositoryInfo.name}`)}>
                    <div>知识库名称</div>
                    <div className="item-right">

                        {repositoryInfo && repositoryInfo.name}
                        <svg className="repository-set-icon" aria-hidden="true">
                            <use xlinkHref="#icon-right"></use>
                        </svg>
                    </div>
                </div>
                <div className="repository-set-item" onClick={() => props.history.push(`/editRespositoryMaster/${repositoryInfo.master.name}`)}>
                    <div>负责人</div>
                    <div className="item-right">

                        {repositoryInfo && repositoryInfo.master.name}
                        <svg className="repository-set-icon" aria-hidden="true">
                            <use xlinkHref="#icon-right"></use>
                        </svg>
                    </div>
                </div>
                <div className="repository-set-item" onClick={() => props.history.push(`/editRespositoryDesc/${repositoryInfo.desc}`)}>
                    <div>知识库描述</div>
                    <div className="item-right">

                        {repositoryInfo && repositoryInfo.desc}
                        <svg className="repository-set-icon" aria-hidden="true">
                            <use xlinkHref="#icon-right"></use>
                        </svg>
                    </div>
                </div>
            </div>

            <div className="repository-set-contant ">
                <div className="repository-set-item delete">
                    删除
                </div>
            </div>


        </div>
    )
}

export default withRouter(inject("repositorySetStore")(observer(RepositorySet)));
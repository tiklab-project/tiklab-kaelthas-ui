import React, {useEffect, useState} from 'react';
import "./ConfigHeader.scss"
import {withRouter} from "react-router-dom";
import {Dropdown, Tooltip} from "antd";
import {CaretDownOutlined} from "@ant-design/icons";
import databasesStore from "../databasesPage/store/DatabasesStore";

const ConfigHeader = (props) => {

    const {findDropDown,updateDbInfo} = databasesStore;

    let dbId = localStorage.getItem('dbId');

    let url = localStorage.getItem('url');

    const [dbList,setDbList] = useState();

    const selectMenu = (url) => {
        localStorage.setItem("url", url)
        localStorage.setItem("confUrl",`/dbList/${dbId}/configs/monitor`)
        props.history.push(url)
    }

    const router = [
        {
            name: '概况',
            icon: 'hostOverview',
            url: `/dbList/${dbId}/dbDetails`,
            key: "dbDetails",
            encoded: "dbDetails",
        },
        {
            name: '监控',
            icon: 'monitoring',
            url: `/dbList/${dbId}/monitoring`,
            key: "monitoring",
            encoded: "monitoring",
        },
        {
            name: '告警',
            icon: 'hostAlarm',
            url: `/dbList/${dbId}/dbAlarm`,
            key: "hostAlarm",
            encoded: "hostAlarm",
        },
        {
            name: '配置',
            icon: 'configuration',
            url: `/dbList/${dbId}/configs/monitor`,
            key: "configuration",
            encoded: "configuration",
        },
        {
            name: '设置',
            icon: 'setting',
            url: `/dbList/${dbId}/dbSetting/dbProject`,
            key: "setting",
            encoded: "setting",
        },
    ];

    function goBackHost() {
        props.history.push("/db")
    }

    useEffect(() => {
        //查询配置的数据库列表,查询4个

    }, []);

    async function dropDownList() {
        const dbs = await findDropDown();
        setDbList(dbs)
    }

    async function changeHost(item) {
        if (dbId !== item.id) {
            await updateDbInfo(item)
            localStorage.setItem("dbId", item.id);
            localStorage.setItem("dbName", item?.name);
            localStorage.setItem("url", `/dbList/${item.id}/dbDetails`);
            props.history.push(`/dbList/${item.id}/dbDetails`);
        }
    }

    return (
        <div className="configs-header">
            <div className="db-topMenu-top">
                <div className="db-topMenu-top-title">
                    <div className="db-normal-aside-left">
                        <svg className="common-icon-show" aria-hidden="true" style={{cursor: "pointer"}}
                             onClick={() => goBackHost()}>
                            <use xlinkHref={`#icon-left`}></use>
                        </svg>
                    </div>
                    <Dropdown
                        getPopupContainer={e => e.parentElement}
                        overlayStyle={{width: 200, top: 48, left: 80}}
                        trigger={['click']}
                        overlayClassName="normal-aside-dropdown"
                        overlay={
                            <div className="db-opt">
                                <div className="db-opt-title">切换主机</div>
                                <div className="db-opt-group">
                                    {
                                        dbList && dbList.map(item => {
                                            return (
                                                <div onClick={() => changeHost(item)}
                                                     key={item?.id}
                                                     className={`db-opt-item ${item?.id === dbId ? "db-opt-active" : ""}`}
                                                >
                                                <span className={`db-opt-icon mf-icon-${item?.color}`}>
                                                    {item?.name?.substring(0, 1).toUpperCase()}
                                                </span>
                                                    <span className="db-opt-name">
                                                    {item?.name}
                                                </span>
                                                </div>
                                            )
                                        })
                                    }
                                    <div className='db-opt-more' onClick={() => props.history.push('/db')}>更多</div>
                                </div>
                            </div>
                        }
                    >
                        <div className="db-normal-aside-opt-icon">
                            <Tooltip placement="right" title={localStorage.getItem("dbName")}>
                                <div className="db-normal-host-opt-title">
                                    <span className="normal-host-opt-text" onClick={() => dropDownList()}>
                                        {localStorage.getItem("dbName")}
                                    </span>
                                    <CaretDownOutlined/>
                                </div>
                            </Tooltip>
                        </div>
                    </Dropdown>
                </div>
            </div>
            <div className="db-right">
                {
                    router.map((item, index) => {
                        return (
                            <div
                                key={index}
                                onClick={() => selectMenu(item.url)}
                                className={`dbMenu-box ${url === item.url ? "border-bottom" : ""}`}
                            >
                                <svg className="menu-icon" aria-hidden="true">
                                    <use xlinkHref={`#icon-${item.icon}`}></use>
                                </svg>
                                <span className="dbMenu-text">
                                    {item.name}
                                </span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default withRouter(ConfigHeader);
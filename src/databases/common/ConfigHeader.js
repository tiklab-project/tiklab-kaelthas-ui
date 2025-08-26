import React, {useEffect, useState} from 'react';
import "./ConfigHeader.scss"
import {withRouter} from "react-router-dom";
import databasesStore from "../databasesPage/store/DatabasesStore";
import {observer} from "mobx-react";
import alarmPageStore from "../../alarm/alarmPage/store/AlarmPageStore";
import Dropdowns from "../../common/Dropdown/Dropdowns";
import DataBaseCompilePop from "./DataBaseCompilePop";

const ConfigHeader = (props) => {
    const {match:{params},location:{pathname}} = props;
    const {refresh,findDbInfoById,dbObj,deleteDbInfo} = databasesStore;
    const {findAlarmNumByCondition} = alarmPageStore


    let dbId = params.id;

    const [alarmNum, setAlarmNum] = useState(0);
    const [url,setUrl]=useState()

    const [dataBase,setDataBase] = useState(null)
    const [visible,setVisible] = useState(false)

    const selectMenu = (url) => {
        props.history.push(url)
    }


    const router = [
        {
            name: '概况',
            icon: 'hostOverview',
            url: `/db/${dbId}/dbDetails`,
            key: "dbDetails",
            encoded: "dbDetails",
        },
        {
            name: '监控',
            icon: 'monitoring',
            url: `/db/${dbId}/monitoring`,
            key: "monitoring",
            encoded: "monitoring",
        },
        {
            name: '告警',
            icon: 'hostAlarm',
            url: `/db/${dbId}/dbAlarm`,
            key: "hostAlarm",
            encoded: "hostAlarm",
        },
        {
            name: '设置',
            icon: 'setting',
            url: `/db/${dbId}/setting/monitor`,
            key: "setting",
            encoded: "setting",
        },
    ];

    useEffect(async () => {
        if (pathname.includes("/setting/")){
            setUrl( `/db/${dbId}/setting/monitor`)
        } else{
            setUrl(pathname)
        }

        findDbInfoById(params.id)

    }, [pathname,refresh]);
    const a=dbObj
    function goBackHost() {
        props.history.push("/db")
    }

    useEffect(async () => {
        //查询配置的数据库列表,查询4个
        const newVar = await findAlarmNumByCondition({hostId: dbId});
        setAlarmNum(newVar?.alarmNum)
    }, []);



    //打开更新
    const openUpdate = (value) => {
        setVisible(true)
        setDataBase(value)
    }

    const deleteData = (id) => {
        deleteDbInfo(id).then(res=>{
            res.code===0&&props.history.push(`/db`);
        })
    }

    return (
        <div className="configs-header">
            <div className="db-topMenu-top">
                <div className="db-topMenu-top-title">
                    <svg className="common-icon-show" aria-hidden="true" style={{cursor: "pointer"}}
                         onClick={() => goBackHost()}>
                        <use xlinkHref={`#icon-left`}></use>
                    </svg>
                    <span style={{fontSize: 16}}>
                            数据库 / {dbObj?.name}
                        </span>
                </div>
            </div>
            <div className='db-topMenu-more'>
                <div className='db-topMenu-b'>
                    <Dropdowns {...props}
                               goPage={openUpdate}
                               value={dbObj}
                               type={"data"}
                               deleteMethod={deleteData}
                               size={25}
                    />
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
                                {/*<svg className="menu-icon" aria-hidden="true">
                                    <use xlinkHref={`#icon-${item.icon}`}></use>
                                </svg>*/}
                                <span className="dbMenu-text">
                                    {item.name}
                                </span>
                                {"告警" === item.name && alarmNum !== 0 ?
                                    <div className="dbTop-text-div">
                                        <div className="dbTop-text-number">
                                            {alarmNum}
                                        </div>
                                    </div> : ""}
                            </div>
                        )
                    })
                }
                <DataBaseCompilePop visible={visible}
                                    setVisible={setVisible}
                                    dataBase={dataBase}
                                    setDataBase={setDataBase}
                />
            </div>
        </div>
    );
};

export default withRouter(observer(ConfigHeader));

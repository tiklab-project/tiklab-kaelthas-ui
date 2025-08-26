import React, {useEffect, useState} from 'react';
import "./InConfigHeader.scss"
import {withRouter} from "react-router-dom";
import internetStore from "../internetPage/store/InternetStore";
import alarmPageStore from "../../alarm/alarmPage/store/AlarmPageStore";
import {observer} from "mobx-react";
import Dropdowns from "../../common/Dropdown/Dropdowns";
import InternetCompilePop from "./InternetCompilePop";

const InConfigHeader = (props) => {
    const {match:{params},location:{pathname}} = props;
    const {refresh,findInternetById,internetData,deleteInternet} = internetStore;
    const {findAlarmNumByCondition} = alarmPageStore

    let internetId = params.id;

    const [alarmNum, setAlarmNum] = useState(0);
    const [url,setUrl]=useState()

    const [internet,setInternet] = useState(null)
    const [visible,setVisible] = useState(false)


    useEffect(async () => {
        if (pathname.includes("/setting/")){
            setUrl( `/internet/${internetId}/setting/monitor`)
        }else {
            setUrl(pathname)
        }
        findInternetById(params.id)
    }, [refresh,pathname]);


    useEffect(async () => {
        const newVar = await findAlarmNumByCondition({hostId: internetId});
        setAlarmNum(newVar?.alarmNum)
    }, []);

    const selectMenu = (url) => {
        props.history.push(url)
    }

    const router = [
        {
            name: '概况',
            icon: 'hostOverview',
            url: `/internet/${internetId}/inOverview`,
            key: "inDetails",
            encoded: "inDetails",
        },
        {
            name: '监控',
            icon: 'monitoring',
            url: `/internet/${internetId}/monitoring`,
            key: "monitoring",
            encoded: "monitoring",
        },
        {
            name: '告警',
            icon: 'hostAlarm',
            url: `/internet/${internetId}/inAlarm`,
            key: "internetAlarm",
            encoded: "internetAlarm",
        },
        {
            name: '设置',
            icon: 'setting',
            url: `/internet/${internetId}/setting/monitor`,
            key: "setting",
            encoded: "setting",
        },
    ];

    function goBackHost() {
        props.history.push("/internet")
    }

    //打开更新弹窗
    const openUpdate = (value) => {
        setVisible(true)
        setInternet(value)
    }

    const deleteData = (id) => {
        deleteInternet(id).then(res=>{
            res.code===0&& props.history.push(`/internet`);
        })
    }

    return (
        <div className="in-configs-header">
            <div className="in-topMenu-top">
                <div className="in-topMenu-top-title">
                    <svg className="common-icon-show" aria-hidden="true" style={{cursor: "pointer"}}
                         onClick={() => goBackHost()}>
                        <use xlinkHref={`#icon-left`}></use>
                    </svg>
                    <span style={{fontSize: 16}}>
                                        网络 / {internetData?.name}
                                    </span>
                </div>
            </div>
            <div className='in-topMenu-more'>
                <div className='in-topMenu-b'>
                    <Dropdowns {...props}
                               goPage={openUpdate}
                               value={internetData}
                               type={"data"}
                               deleteMethod={deleteData}
                               size={25}
                    />
                </div>
            </div>
            <div className="in-config-right">
                {
                    router.map((item, index) => {
                        return (
                            <div
                                key={index}
                                onClick={() => selectMenu(item.url)}
                                className={`inMenu-box ${url === item.url ? "border-bottom" : ""}`}
                            >
                                {/*<svg className="menu-icon" aria-hidden="true">
                                    <use xlinkHref={`#icon-${item.icon}`}></use>
                                </svg>*/}
                                <span className="inMenu-text">
                                    {item.name}
                                </span>
                                {"告警" === item.name && alarmNum !== 0 ?
                                    <div className="inTop-text-div">
                                        <div className="inTop-text-number">
                                            {alarmNum}
                                        </div>
                                    </div> : ""}
                            </div>
                        )
                    })
                }
            </div>
            <InternetCompilePop visible={visible}
                                setVisible={setVisible}
                                internet={internet}
                                setInternet={setInternet}
            />
        </div>
    );
};

export default withRouter(observer(InConfigHeader));

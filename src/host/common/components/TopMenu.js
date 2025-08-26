import React, {useEffect, useState} from 'react';
import {withRouter} from "react-router-dom";
import "./TopMenu.scss"
import hostStore from "../../hostPage/store/HostStore";
import {observer} from "mobx-react";
import alarmPageStore from "../../../alarm/alarmPage/store/AlarmPageStore";
import Dropdowns from "../../../common/Dropdown/Dropdowns";
import HostCompilePop from "./HostCompilePop";

const TopMenu = (props) => {
    const {match:{params},location:{pathname}} = props;

    const [alarmNum,setAlarmNum] = useState(0);

    const {findAlarmNumByCondition} = alarmPageStore

    let hostId=params.id
    const [hostDetails,setHostDetails] = useState(null)
    const [visible,setVisible] = useState(false)

    const {refresh, findHostById,deleteHostById} = hostStore;
    const [url,setUrl]=useState();

    const [hostData,setHostData]=useState(null)

    const router = [
        {name: '概况',
            icon: 'hostOverview',
            url: `/host/${hostId}/hostOverview`,
            key: "hostOverview",
            encoded: "hostOverview",
        },
        {
            name: '监控',
            icon: 'monitoring',
            url: `/host/${hostId}/monitoring`,
            key: "monitoring",
            encoded: "monitoring",
        },
        {
            name: '告警',
            icon: 'hostAlarm',
            url: `/host/${hostId}/hostAlarm`,
            key: "hostAlarm",
            encoded: "hostAlarm",
        },
  /*      {
            name: '配置',
            icon: 'configuration',
            url: `/host/${hostId}/config/monitor`,
            key: "config",
            encoded: "config",
        },*/
        {
            name: '设置',
            icon: 'setting',
            url: `/host/${hostId}/setting/monitor`,
            key: "setting",
            encoded: "setting",
        },
    ];



    useEffect(async () => {
        if (pathname.includes("/setting/")){
           // const a=pathname.slice(0,pathname.indexOf("/config/"))
            setUrl( `/host/${hostId}/setting/monitor`)
        } else{
            setUrl(pathname)
        }
    }, [pathname]);

    useEffect(async () => {
         findHostById(hostId).then(res=>{
             res.code===0&&setHostData(res.data)
         })
    }, [refresh,hostId]);

    useEffect(async () => {
        const newVar = await findAlarmNumByCondition({hostId: hostId});
        setAlarmNum(newVar?.alarmNum)
    }, [hostId]);

    const selectMenu = (url, key) => {
        props.history.push(url)
    }


    function goBackHost() {
        props.history.push("/host")
    }

    const deleteData = (id) => {
       deleteHostById(id).then(res=>{
           res.code===0&&  props.history.push(`/host`);
       })
    }

    //打开更新弹窗
    const openUpdate = (value) => {
        setVisible(true)
        setHostDetails(value)
    }

    return (
        <div className="topMenu-body">
            <div className="topMenu-top">
                <div className="topMenu-top-title">
                    <svg className="common-icon-show" aria-hidden="true" style={{cursor: "pointer"}}
                         onClick={() => goBackHost()}>
                        <use xlinkHref={`#icon-left`}></use>
                    </svg>
                    <span style={{fontSize: 16}}>
                         主机 / {hostData?.name && hostData?.name}
                    </span>
                </div>
            </div>
            <div className='topMenu-more'>
                <div className='topMenu-more-b'>
                    <Dropdowns {...props}
                               goPage={openUpdate}
                               value={hostData}
                               type={"data"}
                               deleteMethod={deleteData}
                               size={25}
                    />
                </div>
            </div>
            <div className="top-tabs">
                <div className="top-right">
                    {
                        router.map((item, index) => {
                            return (

                                <div
                                    key={index}
                                    onClick={() => selectMenu(item.url, item.key)}
                                    className={`topMenu-box ${url === item.url ? "border-bottom" : ""}`}
                                >
                                    {/*<svg className="topMenu-svg-icon" aria-hidden="true">
                                    <use xlinkHref={`#icon-${item.icon}`}></use>
                                </svg>*/}
                                    <span className={`topMenu-text`}>
                                    {item.name}
                                    </span>
                                    {"告警" === item.name && alarmNum !== 0 ?
                                        <div className="top-text-div">
                                            <div className="top-text-number">
                                                {alarmNum}
                                            </div>
                                        </div> : ""}
                                </div>
                            )
                        })
                    }
                </div>
                <HostCompilePop visible={visible}
                                setVisible={setVisible}
                                hostData={hostDetails}
                                setHostData={setHostDetails}
                />

            </div>
        </div>
    );
};
export default withRouter(observer(TopMenu));

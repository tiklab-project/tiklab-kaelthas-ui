import React, {useEffect, useState} from 'react';
import "./KuConfigHeader.scss"
import {withRouter} from "react-router-dom";
import kubernetesStore from "../kuPage/store/KubernetesStore";
import alarmPageStore from "../../alarm/alarmPage/store/AlarmPageStore";
import kuProjectStore from "../setting/kuProject/store/KuProjectStore";
import {observer} from "mobx-react";

const KuConfigHeader = (props) => {
    const {match:{params},location:{pathname}} = props;

    const {updateKbInfo,findKuInfoById} = kubernetesStore;

    const {findAlarmNumByCondition} = alarmPageStore

    let kuId = params.id;

    const [alarmNum, setAlarmNum] = useState(0);
    const [url,setUrl]=useState()
    const [KuData,setKuData]=useState()

    useEffect(async () => {
        if (pathname.includes("/configs/")){
            setUrl( `/kubernetes/${kuId}/configs/monitor`,)
        }else if(pathname.includes("/kuSetting/")){
            setUrl(`/kubernetes/${kuId}/kuSetting/kuProject`)
        } else{
            setUrl(pathname)
        }

        findKuInfoById(params.id).then(res=>{
           setKuData(res)
        })
    }, [pathname]);


    useEffect(async () => {
        const newVar = await findAlarmNumByCondition({hostId: kuId});
        setAlarmNum(newVar?.alarmNum)
    }, []);

    const selectMenu = (url) => {
        props.history.push(url)
    }

    const router = [
        {
            name: '概况',
            icon: 'hostOverview',
            url: `/kubernetes/${kuId}/kuOverview`,
            key: "kuDetails",
            encoded: "kuDetails",
        },
        {
            name: '监控',
            icon: 'monitoring',
            url: `/kubernetes/${kuId}/monitoring`,
            key: "monitoring",
            encoded: "monitoring",
        },
        {
            name: '告警',
            icon: 'hostAlarm',
            url: `/kubernetes/${kuId}/kuAlarm`,
            key: "hostAlarm",
            encoded: "hostAlarm",
        },
        {
            name: '配置',
            icon: 'configuration',
            url: `/kubernetes/${kuId}/configs/monitor`,
            key: "configuration",
            encoded: "configuration",
        },
        {
            name: '设置',
            icon: 'setting',
            url: `/kubernetes/${kuId}/kuSetting/kuProject`,
            key: "setting",
            encoded: "setting",
        },
    ];

    function goBackHost() {
        props.history.push("/kubernetes")
    }


    return (
        <div className="ku-configs-header">
            <div className="ku-topMenu-top">
                <div className="ku-topMenu-top-title">
                        <svg className="common-icon-show" aria-hidden="true" style={{cursor: "pointer"}}
                             onClick={() => goBackHost()}>
                            <use xlinkHref={`#icon-left`}></use>
                        </svg>
                        <span style={{fontSize:16}}>
                              集群 / {KuData?.name}
                        </span>
                </div>
            </div>
            <div className="ku-config-right">
                {
                    router.map((item, index) => {
                        return (
                            <div
                                key={index}
                                onClick={() => selectMenu(item.url)}
                                className={`kuMenu-box ${url === item.url ? "border-bottom" : ""}`}
                            >
                                {/*<svg className="menu-icon" aria-hidden="true">
                                    <use xlinkHref={`#icon-${item.icon}`}></use>
                                </svg>*/}
                                <span className="kuMenu-text">
                                    {item.name}
                                </span>
                                {"告警" === item.name && alarmNum !== 0 ?
                                    <div className="kuTop-text-div">
                                        <div className="kuTop-text-number">
                                            {alarmNum}
                                        </div>
                                    </div> : ""}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default withRouter(observer(KuConfigHeader));

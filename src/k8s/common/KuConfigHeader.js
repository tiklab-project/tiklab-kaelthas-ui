import React, {useEffect, useState} from 'react';
import "./KuConfigHeader.scss"
import {withRouter} from "react-router-dom";
import kubernetesStore from "../kuPage/store/KubernetesStore";
import alarmPageStore from "../../alarm/alarmPage/store/AlarmPageStore";
import {observer} from "mobx-react";
import Dropdowns from "../../common/Dropdown/Dropdowns";
import KuCompilePop from "./KuCompilePop";

const KuConfigHeader = (props) => {
    const {match:{params},location:{pathname}} = props;

    const {refresh,findKuInfoById,deleteKuInfo} = kubernetesStore;

    const {findAlarmNumByCondition} = alarmPageStore

    let kuId = params.id;

    const [alarmNum, setAlarmNum] = useState(0);
    const [url,setUrl]=useState()
    const [KuData,setKuData]=useState()

    const [kubData,setKubData] = useState(null)
    const [visible,setVisible] = useState(false)

    useEffect(async () => {
        if (pathname.includes("/setting/")){
            setUrl(`/kubernetes/${kuId}/setting/monitor`)
        } else{
            setUrl(pathname)
        }

        findKuInfoById(params.id).then(res=>{
           setKuData(res)
        })
    }, [refresh,pathname]);


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
            name: '设置',
            icon: 'setting',
            url: `/kubernetes/${kuId}/setting/monitor`,
            key: "setting",
            encoded: "setting",
        },
    ];

    function goBackHost() {
        props.history.push("/kubernetes")
    }


    const openUpdate = (value) => {
        setVisible(true)
        setKubData(value)
    }

    const deleteData = (id) => {
        deleteKuInfo(id).then(res=>{
            res.code===0&&props.history.push(`/kubernetes`)
        })
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

            <div className='ku-topMenu-more'>
                <div className='ku-topMenu-b'>
                    <Dropdowns {...props}
                               goPage={openUpdate}
                               value={KuData}
                               type={"data"}
                               deleteMethod={deleteData}
                               size={25}
                    />
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

                <KuCompilePop  visible={visible}
                               setVisible={setVisible}
                               kubData={kubData}
                               setKubData={setKubData}
                />
            </div>
        </div>
    );
};

export default withRouter(observer(KuConfigHeader));

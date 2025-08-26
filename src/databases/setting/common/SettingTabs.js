import React, {useEffect, useState} from 'react';
import "./SettingTabs.scss"
import {withRouter} from "react-router-dom";
import {Col} from "antd";
import {renderRoutes} from "react-router-config";

const SettingTabs = (props) => {
    const {match:{params},route} = props;
    const dbId=params.id

    const router = [
        {
            name: '监控项',
            icon: 'monitor',
            url: `/db/${dbId}/setting/monitor`,
            key: "monitor",
            encoded: "monitor",
        },
        {
            name: '触发器',
            icon: 'trigger',
            url: `/db/${dbId}/setting/trigger`,
            key: "trigger",
            encoded: "trigger",
        },
        {
            name: '图形',
            icon: 'graphics',
            url: `/db/${dbId}/setting/graphics`,
            key: "graphics",
            encoded: "graphics",
        },
    ];

    const [selectKey,setSelectKey] = useState(`/db/${dbId}/setting/monitor`);

    const selectSetting = (url) => {
        setSelectKey(url)
        props.history.push(url)
    }

    useEffect(() => {
        // 初次进入激活导航菜单
        setSelectKey(props.location.pathname)
    }, [dbId])

    return (
        <div>
            <div className="host-setting ">

                {
                    router.map((item, index) => {
                        return (
                            <div
                                key={index}
                                onClick={() => selectSetting(item.url)}
                                className={`host-setting-tabs ${item.url === selectKey ? "host-setting-select" : ""}`}
                            >
                                <span>{item.name}</span>
                            </div>

                        )
                    })
                }
            </div>

             {renderRoutes(route.routes)}
        </div>

    );
};

export default withRouter(SettingTabs);

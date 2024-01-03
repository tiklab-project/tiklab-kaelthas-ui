import React from 'react';
import {Link, withRouter} from "react-router-dom";
import "./LeftMenu.scss"

const LeftMenu = (props) => {

    const hostDetails = () => {
        props.history.push("/Configuration/Host")
    }
    const hostMonitor = () => {
        props.history.push("/Configuration/Host/Monitor")
    }

    const hostTrigger = () => {
        props.history.push("/Configuration/Host/Trigger")
    }

    const hostTemplate = () => {
        props.history.push("/Configuration/Host/Template")
    }

    const hostGraphics = () => {
        props.history.push("/Configuration/Host/Graphics")
    }

    const hostSetting = () => {
        props.history.push("/Configuration/Host/Setting")
    }

    const router = [
        {
            name: '主机',
            icon: 'host',
            url: `/Configuration/Host`,
            key: "host",
            encoded: "host",
        },
        {
            name: '监控项',
            icon: 'monitor',
            url: `/Configuration/Host/Monitor`,
            key: "monitor",
            encoded: "monitor",
        },
        {
            name: '触发器',
            icon: 'trigger',
            url: `/Configuration/Host/Trigger`,
            key: "trigger",
            encoded: "trigger",
        },
        {
            name: '模板',
            icon: 'template',
            url: `/Configuration/Host/Template`,
            key: "template",
            encoded: "template",
        },
        {
            name: '图形',
            icon: 'graphics',
            url: `/Configuration/Host/Graphics`,
            key: "graphics",
            encoded: "graphics",
        },
        {
            name: '设置',
            icon: 'setting',
            url: `/Configuration/Host/Setting`,
            key: "setting",
            encoded: "setting",
        },
    ]

    const selectMenu = (url) => {
        props.history.push(url)
    }

    return (
        <div className="box-left">
            {
                router.map((item, index) => {
                    return (
                        <div
                            key={index}
                            onClick={() => selectMenu(item.url)} className="leftMenu-box"
                        >
                            <svg className="leftMenu-svg-icon" aria-hidden="true">
                                <use xlinkHref={`#icon-${item.icon}`}></use>
                            </svg>
                            <span className="leftMenu-text">
                               {item.name}
                             </span>
                        </div>
                    )
                })
            }
        </div>
    );
};
export default withRouter(LeftMenu);
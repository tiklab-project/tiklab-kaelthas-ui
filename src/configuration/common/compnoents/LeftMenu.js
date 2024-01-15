import React, {useEffect} from 'react';
import {Link, withRouter} from "react-router-dom";
import "./LeftMenu.scss"

const LeftMenu = (props) => {

    const router = [
        {
            name: '主机详情',
            icon: 'host',
            url: `/hostList/:id/hostDetails`,
            key: "host",
            encoded: "host",
        },
        {
            name: '监控项',
            icon: 'monitor',
            url: `/hostList/:id/monitor`,
            key: "monitor",
            encoded: "monitor",
        },
        {
            name: '触发器',
            icon: 'trigger',
            url: `/hostList/:id/trigger`,
            key: "trigger",
            encoded: "trigger",
        },
        {
            name: '模板',
            icon: 'template',
            url: `/hostList/:id/template`,
            key: "template",
            encoded: "template",
        },
        {
            name: '图形',
            icon: 'graphics',
            url: `/hostList/:id/graphics`,
            key: "graphics",
            encoded: "graphics",
        },
        {
            name: '设置',
            icon: 'setting',
            url: `/hostList/:id/setting`,
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
                            onClick={() => selectMenu(item.url)}
                            className="leftMenu-box"
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
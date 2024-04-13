import React from 'react';
import {withRouter} from "react-router-dom";
import "./LeftMenu.scss"
import {Dropdown, Space} from "antd";
import Listicon from "./Listicon";
import {CaretDownOutlined} from "@ant-design/icons";

const LeftMenu = (props) => {

    let hostId = localStorage.getItem('hostId');

    const router = [
        {
            name: '概况',
            icon: 'host',
            url: `/hostList/${hostId}/hostDetails`,
            key: "host",
            encoded: "host",
        },
        {
            name: '监控项',
            icon: 'monitor',
            url: `/hostList/${hostId}/monitor`,
            key: "monitor",
            encoded: "monitor",
        },
        {
            name: '触发器',
            icon: 'trigger',
            url: `/hostList/${hostId}/trigger`,
            key: "trigger",
            encoded: "trigger",
        },
        {
            name: '模板',
            icon: 'template',
            url: `/hostList/${hostId}/template`,
            key: "template",
            encoded: "template",
        },
        {
            name: '图形',
            icon: 'graphics',
            url: `/hostList/${hostId}/graphics`,
            key: "graphics",
            encoded: "graphics",
        },
        /*{
            name: '设置',
            icon: 'setting',
            url: `/hostList/${hostId}/setting/projectInformation`,
            key: "projectInformation",
            encoded: "projectInformation",
        },*/
    ]

    /*useEffect(() => {
        localStorage.setItem("url",`/hostList/${hostId}/hostDetails`)
    }, []);*/

    const selectMenu = (url) => {
        props.history.push(url)
        localStorage.setItem("url", url)
    }


    return (
        <div className="leftMenu-body">
            <div className="leftMenu-top">
                <Dropdown
                    getPopupContainer={e => e.parentElement}
                    overlayStyle={{width: 200, top: 48, left: 80}}
                    trigger={['click']}
                    overlayClassName="normal-aside-dropdown"
                    overlay={
                        <div className="host-opt">
                            <div className="host-opt-title">切换主机</div>
                            <div className="host-opt-group">
                                <div className="host-opt-item"></div>
                                <div className='host-opt-more'
                                     onClick={() => props.history.push('/configuration')}
                                >更多
                                </div>
                            </div>
                        </div>
                    }
                >
                    <div className="normal-aside-opt-icon">
                        <Listicon
                            text="主机"
                            colors={null}
                        />
                        <span><CaretDownOutlined/></span>
                    </div>
                </Dropdown>
            </div>
            <div className="box-left">
                {
                    router.map((item, index) => {
                        return (
                            <div
                                key={index}
                                onClick={() => selectMenu(item.url)}
                                className={`leftMenu-box ${localStorage.getItem("url") === item.url ? "border-left" : ""}`}
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
            <div className="box-left-button"
                 onClick={() => selectMenu(`/hostList/${hostId}/setting/projectInformation`)}
            >
                <svg className="leftMenu-svg-icon" aria-hidden="true">
                    <use xlinkHref={"#icon-setting"}></use>
                </svg>
                <span className="leftMenu-text">设置</span>
            </div>
        </div>
    );
};
export default withRouter(LeftMenu);
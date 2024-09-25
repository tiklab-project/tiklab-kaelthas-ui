import React, {useState} from 'react';

import {renderRoutes} from "react-router-config";
import "./HomeLayout.scss";

import {Provider} from 'mobx-react';
import alarmPageStore from "../../alarm/alarmPage/store/AlarmPageStore";
import {Tooltip} from "antd";
import {useHistory} from "react-router";
import {getUser, productTitle,productImg,productWhiteImg} from "thoughtware-core-ui";
import PortalMessage from "./PortalMessage";
import {BellOutlined, QuestionCircleOutlined} from "@ant-design/icons";

import menuBack from "../../assets/images/menu-black.png"
import menuWhite from "../../assets/images/menu-white.png"
import Profile from "../component/profile/Profile";

const HomeLayout = (props) => {

    const {HelpLink,AppLink,AvatarLink} = props;

    const route = props.route.routes;

    let hostId = localStorage.getItem('hostId');

    const {setNullCondition} = alarmPageStore;

    //是否折叠
    const [isExpand,setIsExpand] = useState(false);

    //消息抽屉状态
    const menuKey = (sessionStorage.getItem("menuKey") && props.location.pathname !== "/home") ? sessionStorage.getItem("menuKey") : "home";

    //未读
    const [unread,setUnread] = useState(0);

    //主题色
    const [themeType,setThemeType] = useState('default');

    const history = useHistory()

    const routers = [
        {
            name: '首页',
            url: '/home',
            key: 'home',
        },
        {
            name: '主机',
            url: '/configuration',
            key: 'host',
        },
        {
            name: '数据库',
            url: '/db',
            key: 'db',
        },
        {
            name: 'k8s',
            url: '/kubernetes',
            key: 'kubernetes',
        },
        {
            name: '网络',
            url: '/internet',
            key: 'internet',
        },
        {
            name: '告警',
            url: '/alarm',
            key: 'alarm',
        }
    ];

    /**
     * 点击菜单跳转
     * @param {菜单信息} item
     */
    const changeCurrentLink = async item => {

        if ("alarm" === item.key) {
            setNullCondition()
        }
        sessionStorage.setItem("menuKey", item.key)
        props.history.push(item.url)
    }

    const [notificationVisibility,setNotificationVisibility] = useState(false);

    const selectMenu = (url, key) => {
        if (key === "host") {
            localStorage.setItem("configurationUrl", `/hostList/${hostId}/configuration/monitor`)
        }
        if ("alarm" === key) {
            setNullCondition()
        }
        localStorage.setItem("url", url)
        sessionStorage.setItem("menuKey", key)
        props.history.push(url)
    }

    function hrefHome() {
        props.history.push("/home")
    }

    /**
     * type三个参数为:
     * default(默认 --> --thoughtware-gray-600)，
     * blue(蓝色 --> #2f5eb1)，
     * black(黑色 --> #131d30)
     */
    const changeTheme = type => {
        setThemeType(type)
        localStorage.setItem('theme',type)
    }

    /**
     * 跳转到系统设置
     */
    const goSet = () => {
        props.history.push("/setting/home")
        sessionStorage.setItem("menuKey", null)
    };

    function showMainMenu() {
        let pathname = history.location.pathname;

        if (!pathname.startsWith("/setting")) {

            return <div className="frame-content-left">
                <div className="kaelthas-title">
                    <div className={'frame-header-logo'} onClick={() => hrefHome()}>
                        <img src={productImg.kaelthas} alt={'logo'} style={{height: 32, width: 32}}/>
                    </div>
                </div>
                <div className="host-left">
                    {
                        routers.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    onClick={() => selectMenu(item.url, item.key)}
                                    className={`leftMenu-host ${menuKey === item.key ? "border-left" : ""}`}
                                >
                                    <svg className="host-svg-icon" aria-hidden="true">
                                        <use xlinkHref={`#icon-${item.key}`}></use>
                                    </svg>
                                    <span className="leftMenu-text">
                                                {item.name}
                                            </span>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="aside-bottom">
                    <div className="host-left-button"
                         onClick={() => goSet()}
                    >
                        <Tooltip title="设置" placement="right">
                            <svg aria-hidden="true" className="botton-icon">
                                <use xlinkHref="#icon-iconsetsys"></use>
                            </svg>
                        </Tooltip>
                    </div>
                    <div
                        className="host-left-button"
                        onClick={()=>setNotificationVisibility(!notificationVisibility)}
                    >
                        <Tooltip title="消息" placement="right">
                            <svg aria-hidden="true" className="icon-24">
                                <use xlinkHref="#icon-bell"></use>
                            </svg>
                        </Tooltip>
                    </div>
                    <PortalMessage
                        translateX={isExpand?200:75}
                        history={history}
                        unread={unread}
                        setUnread={setUnread}
                        visible={notificationVisibility}
                        setVisible={setNotificationVisibility}
                    />
                    <div className="host-left-button">
                        <HelpLink
                            bgroup={'kaelthas'}
                            iconComponent={
                                isExpand ?
                                    <div className='aside-item'>
                                        <div className="aside-item-icon"><QuestionCircleOutlined/></div>
                                        <div className="aside-item-title">帮助与支持</div>
                                    </div>
                                    :
                                    <div className="aside-bottom-text" data-title-right={'帮助与支持'}>
                                        <QuestionCircleOutlined className='aside-bottom-text-icon'/>
                                    </div>
                            }
                        />
                    </div>
                    <div className="host-left-button">
                        <AppLink
                            translateX={isExpand?200:75}
                            iconComponent={
                                isExpand?
                                    <div className='aside-item'>
                                        {/*<div className="aside-item-icon">
                                        <img src={themeType==='default'?menuBlack:menuWhite} alt="link" width="18" height="18">
                                        </img>
                                    </div>*/}
                                        <div className="aside-item-title">应用</div>
                                    </div>
                                    :
                                    <div className="aside-bottom-text" data-title-right={'应用'}>
                                        <img src={themeType==='default'?menuBack:menuWhite} alt="link" width="15" height="15"
                                             className='aside-bottom-text-icon'
                                        >
                                        </img>
                                    </div>
                            }
                        />
                    </div>

                    <div className="host-left-button">
                        <AvatarLink
                            {...props}
                            changeTheme={changeTheme}
                            iconComponent={
                                isExpand ?
                                    <div className='aside-item aside-item-user'>
                                        <div className="aside-item-icon"><Profile /></div>
                                        <div className="aside-item-title">{getUser().nickname || getUser().name}</div>
                                    </div>
                                    :
                                    <div className="aside-bottom-text" data-title-right={'个人中心'}>
                                        <Profile />
                                    </div>
                            }
                        />
                    </div>
                </div>
            </div>;
        }
    }

    return (
        <Provider>
            <div className="frame">
                {/*<Header AppLink={<AppLink/>} HelpLink={<HelpLink/>} AvatarLink={<AvatarLink {...props}/>}
                        VipType={<VipType/>}/>*/}
                <div className="frame-content">
                    {showMainMenu()}
                    {renderRoutes(route)}
                </div>
            </div>
        </Provider>

    )
}

export default HomeLayout;
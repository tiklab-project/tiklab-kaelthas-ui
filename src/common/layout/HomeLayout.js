import React, {useEffect, useState} from 'react';

import {renderRoutes} from "react-router-config";
import "./HomeLayout.scss";

import {inject, observer, Provider} from 'mobx-react';
import {useHistory} from "react-router";
import {getUser, productTitle, productImg, productWhiteImg} from "tiklab-core-ui";
import PortalMessage from "./PortalMessage";
import {
    BellOutlined,
    LeftCircleOutlined,
    QuestionCircleOutlined,
    RightCircleOutlined,
    SettingOutlined
} from "@ant-design/icons";

import menuBlack from "../../assets/images/menu-black.png"
import menuWhite from "../../assets/images/menu-white.png"
import Profile from "../component/profile/Profile";
import MoreMenuModel from "./MoreMenuModal";

const HomeLayout = (props) => {

    const {HelpLink, AppLink, AvatarLink, systemRoleStore} = props;

    const path = props.location.pathname;

    const route = props.route.routes;


    //是否折叠
    const [isExpand, setIsExpand] = useState(false);

    //一级导航的选中状态
    const menuKey = (localStorage.getItem("menuKey") && props.location.pathname !== "/home") ? localStorage.getItem("menuKey") : "home";

    //未读
    const [unread, setUnread] = useState(0);

    //主题色
    const [themeType, setThemeType] = useState('default');

    const history = useHistory()

    const [notificationVisibility, setNotificationVisibility] = useState(false);

    const [moreMenu, setMoreMenu] = useState()

    const routers = [
        {
            name: '首页',
            url: '/home',
            key: 'home',
        },
        {
            name: '告警',
            url: '/alarm',
            key: 'alarm',
        },
        {
            name: '主机',
            url: '/host',
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
    ];

    const [projectRouter, setProjectRouter] = useState([]);

    const [morePath, setMorePath] = useState()

    const [themeClass, setThemeClass] = useState("model-select")
    useEffect(() => {
        getThemeClass(themeType)
        return null;
    }, [])

    useEffect(() => {
        getSystemPermissions(getUser().userId);
        const type = localStorage.getItem('theme')
        if (type) {
            setThemeType(type)
        }
    }, [])

    useEffect(() => {
        resizeUpdate(document.getElementById("root"))
        window.addEventListener("resize", resizeUpdate);
        return () => {
            // 组件销毁时移除监听事件
            window.removeEventListener('resize', resizeUpdate);
        }
    }, [themeType])

    const getThemeClass = (theme) => {
        let name
        switch (theme) {
            case "black":
                name = "model-select-black";
                break;
            case "default":
                name = "model-select";
                break;
            case "blue":
                name = "model-select-blue";
                break;
            default:
                name = "model-select";
                break;
        }
        setThemeClass(name)
        setThemeType(theme)
        return name;
    }

    const selectMenu = (url, key) => {
        localStorage.setItem("url", url)
        localStorage.setItem("menuKey", key)
        props.history.push(url)
    }

    const {getSystemPermissions} = systemRoleStore;



    const resizeUpdate = (e) => {
        // 通过事件对象获取浏览器窗口的高度
        const documentHeight = e.target ? e.target.innerHeight : e.clientHeight;

        const menuHeight = documentHeight - 250;
        const menuNum = Math.floor(menuHeight / 80);
        let num = 0;
        num = menuNum > 6 ? 6 : menuNum;
        setProjectRouter(routers.slice(0, num))
        const hiddenMenu = routers.slice(num, routers.length)

        setMoreMenu(hiddenMenu)
        let data = [];
        hiddenMenu.map(item => {
            data.push(item.url)
        })

        setMorePath([...data])
    };



    /**
     * type三个参数为:
     * default(默认 --> --tiklab-gray-600)，
     * blue(蓝色 --> #2f5eb1)，
     * black(黑色 --> #131d30)
     */
    const changeTheme = type => {
        setThemeType(type)
        getThemeClass(type)
        localStorage.setItem('theme', type)

    }

    function showMainMenu() {
        if (path.startsWith('/setting')) {
            return props.children
        }
        let pathname = history.location.pathname;

        if (!pathname.startsWith("/setting")) {

            return (
                <div
                    className={`kaelthas-aside ${isExpand ? 'kaelthas-aside-expand' : 'kaelthas-aside-normal'} kaelthas-aside-${themeType}`}>
                    <div className='aside-logo' onClick={() => history.push('/home')}>
                        {
                            isExpand ?
                                <>
                                    <img src={themeType === 'default' ? productImg.kaelthas : productWhiteImg.kaelthas}
                                         height={24} width={24} alt={''}/>
                                    <div className='aside-logo-text'>{productTitle.kaelthas}</div>
                                </>
                                :
                                <img src={themeType === 'default' ? productImg.kaelthas : productWhiteImg.kaelthas}
                                     height={32} width={32} alt={''}/>
                        }
                    </div>
                    <div className="aside-up">
                        {
                            projectRouter && projectRouter.map(item => (
                                <div key={item.key}
                                     className={`aside-item ${menuKey === item.key ? "aside-select" : ""}`}
                                     onClick={() => selectMenu(item.url, item.key)}
                                >
                                    <div className="aside-item-icon">{item.icon}</div>
                                    <svg className="host-svg-icon" aria-hidden="true">
                                        <use xlinkHref={`#icon-${item.key}`}></use>
                                    </svg>
                                    <div
                                        className={`aside-item-title ${isExpand ? "aside-item-title-left" : ""}`}>{item.name}</div>
                                </div>
                            ))
                        }
                        {moreMenu && moreMenu.length > 0 && <MoreMenuModel
                             moreMenu={moreMenu} morePath={morePath} theme={themeType} isExpand={isExpand} themeClass={themeClass}
                        />}
                    </div>
                    <div className="aside-bottom">
                        {
                            isExpand ?
                                <>
                                    <div
                                        className={`aside-item`}
                                        onClick={() => history.push(`/setting/home`)}
                                    >
                                        <div className="aside-item-icon"><SettingOutlined/></div>
                                        <div className="aside-item-title">设置</div>
                                    </div>
                                    <div
                                        className={`aside-item`}
                                        onClick={() => setNotificationVisibility(!notificationVisibility)}
                                    >
                                        <div className="aside-item-icon"><BellOutlined/></div>
                                        <div className="aside-item-title">消息</div>
                                    </div>
                                </>
                                :
                                <>
                                    <div className="aside-bottom-text text-icon" data-title-right={'设置'}
                                         onClick={() => history.push(`/setting/home`)}
                                    >
                                        <SettingOutlined className='aside-bottom-text-icon'/>
                                    </div>
                                    <div className="aside-bottom-text text-icon" data-title-right={'消息'}
                                         onClick={() => setNotificationVisibility(!notificationVisibility)}
                                    >
                                        <BellOutlined className='aside-bottom-text-icon'/>
                                    </div>
                                </>

                        }
                        <PortalMessage
                            translateX={isExpand ? 200 : 75}
                            history={history}
                            unread={unread}
                            setUnread={setUnread}
                            visible={notificationVisibility}
                            setVisible={setNotificationVisibility}
                        />
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
                        <AppLink
                            translateX={isExpand ? 200 : 75}
                            iconComponent={
                                isExpand ?
                                    <div className='aside-item'>
                                        <div className="aside-item-icon">
                                            <img src={themeType === 'default' ? menuBlack : menuWhite} alt="link"
                                                 width="18" height="18">
                                            </img>
                                        </div>
                                        <div className="aside-item-title">应用</div>
                                    </div>
                                    :
                                    <div className="aside-bottom-text" data-title-right={'应用'}>
                                        <img src={themeType === 'default' ? menuBlack : menuWhite} alt="link" width="18"
                                             height="18"
                                             className='aside-bottom-text-icon'
                                        >
                                        </img>
                                    </div>
                            }
                        />
                        <AvatarLink
                            {...props}
                            changeTheme={changeTheme}
                            iconComponent={
                                isExpand ?
                                    <div className='aside-item aside-item-user'>
                                        <div className="aside-item-icon"><Profile/></div>
                                        <div className="aside-item-title">{getUser().nickname || getUser().name}</div>
                                    </div>
                                    :
                                    <div className="aside-bottom-text" data-title-right={'个人中心'}>
                                        <Profile/>
                                    </div>
                            }
                        />
                    </div>
                    <div className="aside-hover-expand"/>
                    <div className="aside-expand" onClick={() => setIsExpand(!isExpand)}>
                        {isExpand ? <LeftCircleOutlined/> : <RightCircleOutlined/>}
                    </div>
                </div>
            )
        }
    }

    return (
        <Provider>
            <div className="kaelthas-layout">
                {showMainMenu()}
                <div className="kaelthas-layout-content">
                    {renderRoutes(route)}
                </div>
            </div>
        </Provider>

    )
}

export default inject("systemRoleStore")(observer(HomeLayout));

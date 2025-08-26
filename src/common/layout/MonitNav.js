/**
 * 监控第二级的导航栏
 * @param MonitNav
 * @returns {JSX.Element}
 * @constructor
 */

import React,{useEffect,useState} from "react";
import {Drawer} from "antd";
import "./MonitNav.scss"
const MonitNav = (props) => {
    const {visible,setVisible,translateX}=props

    const [menuKey,setMenuKey]=useState(null)

    const routers = [

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

    const onClose = () =>{
        setVisible(false)
    }

    const selectMenu = (url, key) => {
        setMenuKey(key)
        localStorage.setItem("menuKey", "monit")

        setVisible(false)
        props.history.push(url)
    }

    return(
        visible && <Drawer
            closable={false}
            placement="left"
            visible={visible}
            onClose={onClose}
            width={200}
            maskStyle={{background:"transparent"}}
            bodyStyle={{padding:0}}
            contentWrapperStyle={visible?{transform:`translateX(${translateX}px)`,height:145,marginTop:80}:{}}
        >
            <div className='monit-nav'>
                {/* <div className='monit-nav-title'>监控</div>*/}
                <div>
                    {
                        routers.map(item =>{
                            return(
                                <div key={item.key}
                                     className={`monit-nav-data ${menuKey === item.key ? "aside-select" : ""}`}
                                     onClick={() => selectMenu(item.url, item.key)}
                                >
                                    <div className='monit-nav-data-nav'>
                                        <svg className="host-svg-icon" aria-hidden="true">
                                            <use xlinkHref={`#icon-${item.key}`}></use>
                                        </svg>
                                        <div className={`aside-item-title  aside-item-title-left`}>{item.name}</div>
                                    </div>

                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </Drawer>
    )

}
export default MonitNav

import React, {useEffect, useRef, useState} from "react";
import "./MoreMenuModal.scss";
import {withRouter} from "react-router";

const MoreMenuModel = (props) => {
    //是否有折叠的列表,折叠列表,选中折叠的列表,折叠的key用来获取图标

    const isShowText = true;

    const {moreMenu, morePath, theme, isExpand,themeClass} = props;

    // 获取当前被激活的菜单
    const path = props.location.pathname;

    // 菜单的形式，宽菜单，窄菜单
    const [showMenu, setShowMenu] = useState(false);

    // 菜单弹窗ref
    const modelRef = useRef()

    // 更多点击按钮的的ref
    const setButton = useRef()


    /**
     * 显示菜单弹窗
     */
    const showMoreMenu = () => {
        setShowMenu(!showMenu)
        // 设置弹窗的位置在按钮旁边
        modelRef.current.style.left = setButton.current.clientWidth
    }

    /**
     * 监听菜单的弹窗的显示与不显示
     */
    useEffect(() => {
        window.addEventListener("mousedown", closeModal, false);
        return () => {
            window.removeEventListener("mousedown", closeModal, false);
        }
    }, [showMenu])

    /**
     * 关闭弹窗
     * @param {点击的位置} e
     * @returns
     */
    const closeModal = (e) => {
        if (!modelRef.current) {
            return;
        }
        if (!modelRef.current.contains(e.target) && modelRef.current !== e.target) {
            setShowMenu(false)
        }
    }

    /**
     * 点击菜单
     * @param url
     * @param  key
     */
    const selectMenu = (url, key) => {
        props.history.push(url)
        localStorage.setItem("url", url)
        localStorage.setItem("menuKey", key)
        setShowMenu(false)
    }

    return (
        <div className="more-menu">
            {
                isExpand ?
                    <div className={`model-submenu ${morePath.indexOf(path) !== -1 ? `${themeClass}` : ""}`}
                         onClick={() => showMoreMenu()}
                         ref={setButton}
                    >
                        <svg className="svg-icon28" aria-hidden="true">
                            <use xlinkHref={`#icon-more-${theme}`}></use>
                        </svg>
                        <span>
                            更多
                        </span>
                    </div>
                    :
                    <div ref={setButton}
                         className={`project-menu-submenu-icon ${morePath.indexOf(path) !== -1 ? `${themeClass}` : ""}`}
                         onClick={() => showMoreMenu()}>
                        <svg aria-hidden="true" className="svg-icon28">
                            <use xlinkHref={`#icon-more-${theme}`}></use>
                        </svg>
                    </div>
            }
            <div
                className={`more-menu-box ${showMenu ? "menu-show" : "menu-hidden"}`}
                ref={modelRef}
                style={{}}
            >
                {
                    moreMenu && moreMenu.map((item, index) => {
                        return <div className={`project-menu-submenu ${path === item.url ? "project-menu-select" : ""}`}
                                    key={index}
                                    onClick={() => selectMenu(item.url, item.key)}
                        >
                            <svg className="svg-icon" aria-hidden="true">
                                <use xlinkHref={`#icon-${item.key}`}></use>
                            </svg>
                            <span>
                                {item.name}
                            </span>
                        </div>
                    })
                }
            </div>
        </div>
    )
}
export default withRouter(MoreMenuModel);
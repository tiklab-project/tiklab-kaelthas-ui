/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2022-04-23 19:10:33
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2022-04-25 09:02:42
 */
import React from "react";
import "./fontMenuList.scss"
const FontMenuList = () => {
    return (
        <div className="font-menu-list">
            <div className="font-style">
                <div className="font-style-name">文字样式</div>
                <div className="font-style-botton">
                    <div className="botton-item">
                        <svg aria-hidden="true" className="botton-item-icon">
                            <use xlinkHref="#icon-bold"></use>
                        </svg>
                    </div>
                    <div className="botton-item">
                        <svg aria-hidden="true" className="botton-item-icon">
                            <use xlinkHref="#icon-italic"></use>
                        </svg>
                    </div>
                    <div className="botton-item">
                        <svg aria-hidden="true" className="botton-item-icon">
                            <use xlinkHref="#icon-strikethrough"></use>
                        </svg>
                    </div>
                    <div className="botton-item">
                        <svg aria-hidden="true" className="botton-item-icon">
                            <use xlinkHref="#icon-underline"></use>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FontMenuList;
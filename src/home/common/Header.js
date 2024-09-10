import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import {Col, Modal, Row, Space, Tooltip} from "antd";
import {withRouter} from 'react-router';
import {getUser,productImg,productWhiteImg} from 'thoughtware-core-ui';
import logo from "../../assets/png/monitorPng.png"
import "./Header.scss";
import MessageList from "./MessageList";
import alarmPageStore from "../../alarm/alarmPage/store/AlarmPageStore";

const Header = props => {
    // 语言包
    const {i18n} = useTranslation();
    // 登录者的信息
    const user = getUser();

    const {AppLink, HelpLink, AvatarLink ,VipType} = props;

    const menuKey = (sessionStorage.getItem("menuKey") && props.location.pathname !== "/home") ? sessionStorage.getItem("menuKey") : "home";

    const {setNullCondition} = alarmPageStore;

    /**
     * 点击菜单跳转
     * @param {菜单信息} item
     */
    const changeCurrentLink = async item => {

        if ("alarm" === item.key) {
            setNullCondition()
        }

        localStorage.removeItem("sprintId")
        sessionStorage.setItem("menuKey", item.key)
        props.history.push(item.to)
    }




    /**
     * 跳转到系统设置
     */
    const goSet = () => {
        props.history.push("/setting/home")
        sessionStorage.setItem("menuKey", null)
    };


    function hrefHome() {
        props.history.push("/home")
    }

    return (
        <Row className="frame-header">
            <Col span={12}>
                <div className={'frame-header-left'}>
                    <div className="frame-header-left-choose">
                        {AppLink}
                    </div>
                    {
                        logo &&
                        <div className={'frame-header-logo'} onClick={() => hrefHome()}>
                            <img src={productImg.kaelthas} alt={'logo'} className="logo-img"/>
                            <div className="logo-text">Kaelthas</div>
                        </div>
                    }
                </div>
            </Col>
            <Col>
                <div className={'frame-header-right'}>
                    <div className={'frame-header-right-text'}>
                        {/*<div className="frame-header-icon">
                            <div className="frame-header-set" data-title-bottom="系统设置" onClick={() => goSet()}>
                                <Space>
                                    <svg aria-hidden="true" className="header-icon">
                                        <use xlinkHref="#icon-iconsetsys"></use>
                                    </svg>
                                </Space>
                            </div>
                        </div>*/}
                        <MessageList/>
                        {HelpLink}
                        {VipType}
                        {AvatarLink}
                    </div>
                </div>
            </Col>
        </Row>
    )
}
export default withRouter(Header);
/*
 * @Descripttion: 页面头部
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2022-01-08 10:44:07
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2022-04-25 10:16:03
 */
import React, {useState} from 'react';
import {useTranslation} from "react-i18next";
import {Col, Row, Dropdown, Menu, Button,Badge,Avatar,Space} from "antd";
import { withRouter } from 'react-router';
import { MessageOutlined,DownOutlined } from '@ant-design/icons';
import { getVersionInfo, getUser } from 'doublekit-core-ui';
import vipOne from "../../../assets/images/vip-one.png";
import vipTwo from "../../../assets/images/vip-two.png"
const Header = props => {
    const {
        logo,
        AppConfigComponent,
        languageSelectData = [], // 切换语言包的数据
        projectLogout,
        routers
    } = props;
    const [currentLink, setCurrentLink] = useState(props.location.pathname);

    const loginType = getUser().loginType;
    const { i18n } = useTranslation();
    
    const [lan, setLan] = useState(i18n.language);
    
    const isEE = getVersionInfo().release;
    const isLocal = JSON.parse(localStorage.getItem("authConfig")).authType;
    const eeText = isEE === 2 ? vipTwo : vipOne;
    const local = isLocal === "local" ? "本地" : "acc";
    const path = props.location.pathname;
    const onClickLan = ({ key }) => {
        i18n.changeLanguage(languageSelectData[key].value)
        setLan(languageSelectData[key].value)
    };

    const changeCurrentLink = item => {
        setCurrentLink(item.to)
        props.history.push(item.to)
    }

    const renderRouter = () => {
        if (routers) {
            return (
                <div className={'frame-header-link'}>
                    <div key='home' onClick={ () => changeCurrentLink(routers[0])} className={`frame-header-link-item ${path.indexOf("home") !== -1? 'frame-header-link-active' : null}`}> {routers[0].title}</div>
                    <div key='wiki' onClick={ () => changeCurrentLink(routers[1])} className={`frame-header-link-item ${path.indexOf("wiki") !== -1 ? 'frame-header-link-active' : null}`}> {routers[1].title}</div>
                    {/* <div key='program' onClick={ () => changeCurrentLink(routers[2])} className={`frame-header-link-item ${currentLink === routers[2].to ? 'frame-header-link-active' : null}`}> {routers[2].title}</div> */}
                    {/* <div key='log' onClick={ () => changeCurrentLink(routers[3])} className={`frame-header-link-item ${currentLink.indexOf("/index/log") !== -1 ? 'frame-header-link-active' : null}`}> {routers[3].title}</div> */}
                </div>
            )
        }
    }

    // const languageMenu = (
    //     <Menu onClick={onClickLan}>
    //         {
    //             languageSelectData.map((item, index) => {
    //                 return <Menu.Item key={index} value={item.value}>{item.label}</Menu.Item>
    //             })
    //         }
    //     </Menu>
    // );
    
    const useMenu = (
        <Menu
          items={[
            {
              label: <span onClick={() => projectLogout()}>退出</span>,
              key: '0',
            }
          ]}
        />
    );

    const setMenu = (
        <Menu
          items={[
            {
              label: <div onClick={()=> goSet("/index/organ/organ")}>帐号与成员</div>,
              key: '0',
            },
            {
                label: <div onClick={()=> goSet("/index/sysmgr/systemFeature")}>系统设置</div>,
                key: '0',
            }

          ]}
        />
    );
    const goSet = (url) => {
        props.history.push(url)
        setCurrentLink("set")
    }
    const languageMenu = (
        <Menu
          items={[
            {
              label: <div>中文</div>,
              key: '0',
            },
            {
                label: <div>英文</div>,
                key: '1',
            }

          ]}
        />
    );

    return(
        <Row className="frame-header">
            <Col span={12}>
                <div className={'frame-header-right'}>
                    {AppConfigComponent}
                    {logo && <div className={'frame-header-logo'}><img src={logo} alt={'logo'} /></div> }
                    {renderRouter()}
                </div>
            </Col>
            <Col span={12}>
                <div className={'frame-header-right'}>
                    <div className='frame-header-right-search-wrap'>
                        {props.search}
                    </div>
                    <div className={'frame-header-right-text'}>
                        
                        <a href="#/index/userMessage">
                            <Badge count={5} size="small">
                                <Avatar size="small" style={{ background: "transparent",fontSize: "22px"}} icon={<MessageOutlined />} />
                            </Badge>
                        </a>
                        
                        <div className= "frame-header-language">
                            <Dropdown overlay={languageMenu}>
                                <Space>
                                    <svg aria-hidden="true" style={{width: "28px", height: "28px"}}>
                                        <use xlinkHref="#icon-language"></use>
                                    </svg>
                                </Space>
                            </Dropdown>
                        </div>
                        <div className= "frame-header-set">
                            <Dropdown overlay={setMenu}>
                                <Space>
                                    <svg aria-hidden="true" style={{width: "25px", height: "25px"}}>
                                        <use xlinkHref="#icon-shezhi"></use>
                                    </svg>
                                </Space>
                            </Dropdown>
                        </div>
                        <div className = "frame-header-user">
                            <svg aria-hidden="true" style={{width: "28px", height: "28px"}}>
                                <use xlinkHref="#icon-touxiang"></use>
                            </svg>
                            <div className="frame-header-name">
                                <Dropdown overlay={useMenu}>
                                    <Space>
                                        { getUser().name }
                                        <DownOutlined />
                                    </Space>
                                </Dropdown>
                            </div>
                            
                        </div>
                        <span style={{marginRight: "20px"}}>
                            <img src={eeText} alt="" width = "20px" height= "20px" />
                        </span>
                    </div>
                </div>
            </Col>
        </Row>
    )
}
export default withRouter(Header);
import React, { useState, useRef } from 'react';
import { Drawer, Tabs, Badge, Avatar, } from 'antd';
import { observer } from "mobx-react";
import { MessageOutlined } from '@ant-design/icons';
import "./MessageList.scss"
import { withRouter } from 'react-router';
import { useEffect } from 'react';
import HomeStore from "../store/HomeStore";

const MessageList = (props) => {
    const { findMessageDispatchItemPage, messageTotal, messageList, isMessageReachBottom, updateMessageDispatchItem } = HomeStore;
    const [currenTab, setCurrentTab] = useState("0")
    const [currentPage, setCurrentPage] = useState(0)
    const [open, setOpen] = useState(false);
    const messageRef = useRef()

    const openDrawer = () => {
        setOpen(true)
        findMessageDispatchItemPage({ page: 1, status: currenTab })
    }

    useEffect(() => {
        window.addEventListener("mousedown", closeModal, false);
        return () => {
            window.removeEventListener("mousedown", closeModal, false);
        }
    },[])

    const closeModal = (e) => {
        if (!messageRef.current) {
            return;
        }
        if (!messageRef.current.contains(e.target) && messageRef.current !== e.target) {
            setOpen(false)
        }
    }


    const changePage = () => {
        const current = currentPage + 1
        setCurrentPage(current)
        findMessageDispatchItemPage({ page: current, status: currenTab })
    }


    const onClose = () => {
        setOpen(false);
    };
    const onChange = (e) => {
        // setPlacement(e.target.value);
        setCurrentTab(e)
        findMessageDispatchItemPage({ page: 1, status: e })

    };

    const goToMessage = (link,id) => {
        // props.history.push(link)
        
        const value = {
            id: id,
            status: "1"
        }
        updateMessageDispatchItem(value)
        window.location.href = link
    }
    return (
        <div ref = {messageRef}>
            <a className="frame-header-language" data-title="消息提示" onClick={() => openDrawer()}>
                <Badge count={0} size="small">
                    <Avatar
                        size="small" style={{ background: "transparent", fontSize: "22px" }} icon={<MessageOutlined style={{ color: "#fff" }} />} />
                </Badge>
            </a>
            <Drawer
                title="消息"
                placement={"right"}
                closable={true}
                onClose={onClose}
                visible={open}
                className="frame-header-drawer"
                mask={false}
                destroyOnClose={true}
                width={375}
                getContainer = {false}
            >
                <div className="message-content">
                    <Tabs onChange={onChange} size = "small" activeKey = {currenTab}>
                        <Tabs.TabPane tab="未读" key="0">
                            <div className="message-box">
                                {
                                    messageList && messageList.length > 0 && messageList.map(item => {
                                        return <div className="message-list" key={item.id} >
                                            <div
                                                dangerouslySetInnerHTML={{ __html: item.content }}
                                                onClick = {() => goToMessage(item.link,item.id)}
                                                style={{flex: 1}}
                                            />
                                            <div className={`message-status ${item.status === 0 ? "status-unread" : "status-read"}`}></div>
                                        </div>
                                    })
                                }
                                {
                                    messageTotal > 1 && 
                                        (isMessageReachBottom ? 
                                            <div className="message-list-bottom" onClick={() => changePage()}>点击加载更多</div> : <div className="message-list-bottom">第{currentPage}页/总{messageTotal}页</div>)
                                }
                                
                            </div>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="已读" key="1">
                            <div className="message-box">
                                {
                                    messageList && messageList.length > 0 && messageList.map(item => {
                                        return <div className="message-list" key={item.id} >
                                            <div
                                                dangerouslySetInnerHTML={{ __html: item.content }}
                                                className = "message-item"
                                                style={{flex: 1}}
                                                onClick = {() => goToMessage(item.link,item.id)}
                                            />
                                            <div className={`message-status ${item.status === 1 ? "status-read" : "status-unread"}`}></div>
                                        </div>
                                    })
                                }
                                { messageTotal > 1 && 
                                    (isMessageReachBottom ? 
                                        <div className="message-list-bottom" onClick={() => changePage()}>点击加载更多</div> : <div className="message-list-bottom">第{currentPage}页/总{messageTotal}页</div>)}
                            </div>
                        </Tabs.TabPane>
                    </Tabs>
                </div>
            </Drawer>
        </div>
    );
};
export default withRouter(observer(MessageList));

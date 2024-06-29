import React, {useState, useRef, useEffect} from 'react';
import { Drawer, Tabs, Badge, Avatar, } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import "./MessageList.scss"

const MessageList = (props) => {

    // 当前的tab的key
    const [currenTab, setCurrentTab] = useState("0")
    // 当前的页数
    const [currentPage, setCurrentPage] = useState(0)
    // 未读消息条数，显示在图标上
    const [unReadMessage, setUnReadMessage] = useState(0)
    //抽屉的打开与关闭
    const [open, setOpen] = useState(false);
    // 消息的ref 
    const messageRef = useRef()


    /**
     * 挂载监听点击事件
     */
    useEffect(() => {
        window.addEventListener("mousedown", closeModal, false);
        return () => {
            window.removeEventListener("mousedown", closeModal, false);
        }

    },[])
    
    /**
     * 点击抽屉之外的地方关闭抽屉
     * @param {抽屉dom} e 
     * @returns 
     */
    const closeModal = (e) => {
        if (!messageRef.current) {
            return;
        }
        if (!messageRef.current.contains(e.target) && messageRef.current !== e.target) {
            setOpen(false)
        }
    }

    /**
     * 翻页
     */
    const changePage = () => {
        const current = currentPage + 1
        setCurrentPage(current)
        findMessageDispatchItemPage({ page: current, status: currenTab })
    }

    /**
     * 关闭抽屉
     */
    const onClose = () => {
        setOpen(false);
    };

    /**
     * tab 切换
     * @param {tab key} e 
     */
    const changTab = (e) => {
        setCurrentTab(e)
        findMessageDispatchItemPage({ page: 1, status: e })

    };

    /**
     * 查看消息详情
     * @param {跳转地址} link 
     * @param {改变消息为已读} id 
     */
    const goToMessage = (link,id) => {
        const value = {
            id: id,
            status: "1"
        }
        updateMessageDispatchItem(value)
        window.location.href = link
    }
    
    return (
        <div ref = {messageRef}>
            <div className="frame-header-message" data-title-bottom="消息提示" onClick={() => setOpen(true)}>
                <Badge count={unReadMessage} size="small">
                    <Avatar
                        size="small" style={{fontSize: "25px" }} icon={<MessageOutlined style={{ color: "#2b2b2b" }} />} />
                </Badge>
            </div>
            <Drawer
                title="消息"
                placement={"right"}
                closable={true}
                onClose={onClose}
                visible={open}
                key={"left"}
                className="frame-header-drawer"
                mask={false}
                destroyOnClose={true}
                width={450}
                getContainer = {false}
            >
                <div className="message-content">
                    <Tabs onChange={changTab} size = "small" activeKey = {currenTab}>
                        <Tabs.TabPane tab="未读" key="0">
                            <div className="message-box">

                            </div>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="已读" key="1">

                        </Tabs.TabPane>
                    </Tabs>
                </div>
            </Drawer>
        </div>
    );
};
export default MessageList;

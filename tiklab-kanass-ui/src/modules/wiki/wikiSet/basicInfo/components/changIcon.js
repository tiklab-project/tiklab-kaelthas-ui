import React, { useState } from "react";
import { Modal, Button, Form, Input, Upload, Select, message } from 'antd';
import { withRouter } from "react-router";

const ProjectIcon = (props) => {

    const [form] = Form.useForm();
    
    const { visible, setVisible, updateWiki, setIconUrl } = props;

    const [wikiIconUrl, setProjectIconUrl] = useState("")

    const iconList = [
        {
            iconUrl: "repository1.png",
            key: "repository1"
        },
        {
            iconUrl: "repository2.png",
            key: "repository2"
        },
        {
            iconUrl: "repository3.png",
            key: "repository3"
        },
        {
            iconUrl: "repository4.png",
            key: "repository4"
        },
        {
            iconUrl: "repository5.png",
            key: "repository5"
        }
    ]

    const wikiId = props.match.params.wikiId;
    const onFinish = () => {
        const data = { id: wikiId, iconUrl: wikiIconUrl }
        updateWiki(data).then(res => {
            setIconUrl(wikiIconUrl)
            setVisible(false)
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onCancel = () => {
        form.resetFields();
        setVisible(false);
    };


    return (
        <>
            <Modal
                title="更改图标"
                visible={visible}
                // footer={null}
                onCancel={onCancel}
                onOk = {onFinish}
                okText = {"确定"}
                cancelText = {"取消"}
                className="wiki-icon-modal"
                closable = {false}
            >
                <Form >
                    <Form.Item
                        label="图标"
                        name="icon"
                    >
                        <div className="wiki-icon-box">
                            {
                                iconList && iconList.map((item) => {
                                    return <div className={`wiki-icon ${item.iconUrl === wikiIconUrl ? "icon-select" : null}`} key={item.key} onClick={() => { setProjectIconUrl(item.iconUrl) }}>
                                        <img src={('images/' + item.iconUrl)} alt="" className="list-img"/>
                                    </div>
                                })
                            }
                        </div>
                    </Form.Item>
                </Form>
            </Modal>

        </>
    );
};

export default withRouter(ProjectIcon);
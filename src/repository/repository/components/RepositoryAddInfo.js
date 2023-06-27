import React, { Fragment } from "react";
import { Form, Input, message } from 'antd';
import "./repositoryAddInfo.scss";
import Button from "../../../common/button/button"
import { useState } from "react";
import { withRouter } from "react-router";
import { observer } from "mobx-react";
const { TextArea } = Input;

const layout = {
    labelCol: {
        span: 6,
    }
};

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

const RepositoryAddInfo = (props) => {
    const { addRepositorylist, setVisible } = props;
    const [form] = Form.useForm();
    const [iconUrl, setIconUrl] = useState("repository1.png")

    const onFinish = () => {
        form.validateFields().then((values) => {
            const data = {
                name: values.name,
                desc: values.desc,
                limits: values.limits,
                iconUrl: iconUrl
            }
            addRepositorylist(data).then(res => {
                if (res.code === 40000) {
                    message.error(res.msg);
                }
                if (res.code === 0) {
                    message.success('添加成功');
                    props.history.goBack();
                    // findRepositoryList({masterId: userId})
                    // props.history.push(`/index/repositorydetail/${res.data}/survey`)
                }
            })
        })
    }

    const checkLimit = (_, value) => {
        console.log(value)
        if (value) {
            return Promise.resolve();
        }
        return Promise.reject(new Error('Price must be greater than zero!'));
    };
    const [limtValue, setLimitValue] = useState("0");
    const LimitComponents = ({ value = {}, onChange }) => {

        const changeLimit = (id) => {
            setLimitValue(id)
            onChange(id)
        }

        return (
            <div className="repository-limit" onChange={onChange} value={value}>
                <div key="0" className={`repository-limits ${limtValue === "0" ? "limit-select" : ""}`} onClick={() => changeLimit("0")}>
                    <div className="limits-title">
                        公共
                        <svg className="svg-icon" aria-hidden="true">
                            <use xlinkHref="#icon-publish"></use>
                        </svg>
                    </div>
                    <div className="limits-desc">
                        公共知识库，全部成员可见
                    </div>
                </div>
                <div key="1" className={`repository-limits ${limtValue === "1" ? "limit-select" : ""}`} onClick={() => changeLimit("1")}>
                    <div className="limits-title">
                        私密
                        <svg className="svg-icon" aria-hidden="true">
                            <use xlinkHref="#icon-private"></use>
                        </svg>
                    </div>
                    <div className="limits-desc">
                        私密知识库，只有知识库成员可见
                    </div>
                </div>
            </div>
        )
    }
    return (
        <Fragment>
            <div className="repository-addinfo">
                {/* <div className="repository-type-head">填写信息</div> */}
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                        remember: true,
                        limits: "0"
                    }}
                    form={form}
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item
                        label="知识库名称"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: '使用中英文、数字、空格组合',
                            },
                        ]}
                    >
                        <Input placeholder="使用中英文、数字、空格组合" />
                    </Form.Item>
                    
                    <Form.Item
                        label="可见范围"
                        name="limits"
                        rules={[
                            {
                                validator: checkLimit,
                            }
                        ]}
                    >
                        <LimitComponents />
                    </Form.Item>
                    <Form.Item
                        label="知识库描述"
                        name="desc"
                        rules={[
                            {
                                required: false,
                                message: '请输入知识库描述',
                            },
                        ]}
                    >
                        <TextArea rows={3} />
                    </Form.Item>
                    <Form.Item
                        label="图标"
                        name="icon"
                    >
                        <div className="repository-icon-box">
                            {
                                iconList && iconList.map((item) => {
                                    return <div key={item.key} className={`repository-icon  ${item.iconUrl === iconUrl ? "icon-select" : null}`} onClick={() => { setIconUrl(item.iconUrl) }}>
                       
                                        <img src={('/images/' + item.iconUrl)} alt="" className="img-icon" />
                                    </div>
                                })
                            }
                        </div>
                    </Form.Item>
                    <div className="repository-add-submit">
                        <Button htmlType="button" onClick={() => setVisible(false)}>
                            取消
                        </Button>

                        <Button type="primary" htmlType="submit" onClick={onFinish}>
                            提交
                        </Button>
                    </div>
                </Form>
            </div>
        </Fragment>

    )
}
export default withRouter(observer(RepositoryAddInfo));
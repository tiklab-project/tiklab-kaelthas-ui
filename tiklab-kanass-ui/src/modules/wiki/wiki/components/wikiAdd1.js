import React, { useState } from "react";
import { Modal,Form,Input,Select,DatePicker } from 'antd';
import Button from "../../../../common/button/button";
import 'moment/locale/zh-cn';
const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 16,
    },
};

const WikiAddmodal = (props) => {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const {searchwiki,wikiTypelist,getWikiTypeList,getUseList,uselist } = props;
    const [wikiId,setWikiId] = useState("");
    const dateFormat = 'YYYY/MM/DD';
    const showModal = () => {
        setVisible(true);
        // getWikiTypeList()
        getUseList()
        if(props.type !== "add"){
            searchwiki(props.id).then((response)=> {
                // const time = response["startTime"]
                form.setFieldsValue({   
                    name: response.name,
                    desc: response.desc,
                    master: response.master.id,
                    limits: response.limits
                    // startTime: response.startTime.format("YYYY-MM-DD"),
                    // endTime: response.endTime.format("YYYY-MM-DD"),
                    // wikiState: response.projectState,
                    // startTime:[moment(response.startTime, dateFormat), moment(response.endTime, dateFormat)]
                })
                setWikiId(response.id)

            })
        }
    };
    
    
    const onCancel = () => {
        form.resetFields();
        setVisible(false);
    };
    const onFinish = () => {
        form.validateFields().then((values) => {
            // const time = values["startTime"]
            const data = {...values,
                // startTime: time[0].format("YYYY-MM-DD"),
                // endTime: time[1].format("YYYY-MM-DD"),
                id: wikiId
            }
            
            if(props.type === "add"){
                props.addWikilist(values)
            }else {
                props.updateWiki(data)
            }
            setVisible(false);
        })
    }

    // 周期
    const rangeConfig = {
        rules: [
            {
                type: 'array',
                required: true,
                message: 'Please select time!',
            }
        ]
    };

    // 状态类型
    const limits = [
        {
            name: "全部成员",
            id: "0"
        },
        {
            name: "知识库成员",
            id: "1"
        }
    ]

    

    return (
        <>
        <div className="addmodel">
            {
                props.type !=="edit"? 
                    <Button type="primary" onClick={showModal}>
                        {props.name}
                    </Button>
                : <div><span onClick={showModal} className = "span-botton">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref= "#icon-chuangzuo"></use>
                        </svg>
                    </span>
                    </div>
            }
            <Modal
                title={props.name}
                visible={visible}
                onOk={onFinish} 
                onCancel={onCancel}
                cancelText="取消"
                okText="确定"
            >
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    form={form}
                >
                    <Form.Item
                        label="知识库名称"
                        name="name"
                        
                        rules={[
                            {
                                required: true,
                                message: '请输入知识库名称',
                            },
                        ]}
                    >
                        <Input placeholder="知识库名称"/>
                    </Form.Item>

                    <Form.Item
                        label="负责人"
                        name="master"
                        rules={[
                            {
                                required: false,
                                message: '请输入知识库编码',
                            }
                        ]}
                    >
                        <Select
                            placeholder="负责人"
                            allowClear
                        >   
                            {
                                uselist && uselist.map((item,index)=> {
                                    return <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="可见人员"
                        name="limits"
                        rules={[
                            {
                                required: false,
                                message: '请选择可见人员',
                            }
                        ]}
                    >
                        <Select
                            placeholder="可见人员"
                            allowClear
                        >   
                            {
                                limits && limits.map((item,index)=> {
                                    return <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                                })
                            }
                        </Select>
                    </Form.Item>

                    {/* <Form.Item name="startTime" label="计划日期" {...rangeConfig}>
                        <RangePicker locale={locale}/>
                    </Form.Item> */}
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
                        <Input placeholder="知识库描述"/>
                    </Form.Item>

                    <Form.Item
                        label="图标"
                        name="icon"
                    >
                        <div className="project-icon-box">
                            {
                                iconList && iconList.map((item) => {
                                    return <div key={item.key} className={`project-icon  ${item.iconUrl === iconUrl ? "icon-select" : null}`} onClick={() => { setIconUrl(item.iconUrl) }}>
                       
                                        <img src={('/images/' + item.iconUrl)} alt="" className="img-icon" />
                                    </div>
                                })
                            }
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
        
        </>
    );
};

export default WikiAddmodal;
import React, {useState} from 'react';
import {disableFunction} from "thoughtware-core-ui";
import {HeaderDropdown} from "thoughtware-licence-ui/es/commons";
import vipLight from '../../assets/images/vip-light.png';
import vipDark from '../../assets/images/vip-dark.png';
import {BaseModal} from "thoughtware-eam-ui/es/commons";
import "./VipType.scss"

const featureList = [
    {
        "id": "c41206b0c8d3",
        "productType": {
            "id": "eas",
            "code": null,
            "typeName": null
        },
        "type": "ce",
        "name": "EAS-社区版",
        "price": "0",
        "version": "V1.0.1",
        "createTime": "2024-01-31 16:19:57.337",
        "modelList": [
            {
                "id": "f0c2e2a82f5a",
                "comparisonId": "c41206b0c8d3",
                "name": "用户模块基础功能",
                "sort": 1,
                "createTime": "2024-01-31 16:20:23.9",
                "children": [
                    {
                        "id": "101d898efe47",
                        "comparisonModelId": "f0c2e2a82f5a",
                        "name": "用户",
                        "sort": 0,
                        "createTime": "2024-01-31 16:20:49.842"
                    },
                    {
                        "id": "d9e7bad20ba4",
                        "comparisonModelId": "f0c2e2a82f5a",
                        "name": "部门",
                        "sort": 0,
                        "createTime": "2024-01-31 16:21:00.937"
                    },
                    {
                        "id": "3d0c554d1241",
                        "comparisonModelId": "f0c2e2a82f5a",
                        "name": "用户组",
                        "sort": 0,
                        "createTime": "2024-01-31 16:21:07.324"
                    }
                ]
            },
            {
                "id": "dd46f5cf974a",
                "comparisonId": "c41206b0c8d3",
                "name": "权限模块",
                "sort": 2,
                "createTime": "2024-05-14 19:43:45.982",
                "children": [
                    {
                        "id": "aede35ec70ff",
                        "comparisonModelId": "dd46f5cf974a",
                        "name": "用户权限控制",
                        "sort": 0,
                        "createTime": "2024-05-14 19:43:54.188"
                    }
                ]
            },
            {
                "id": "a437e3fe7c57",
                "comparisonId": "c41206b0c8d3",
                "name": "登录模块基础功能",
                "sort": 3,
                "createTime": "2024-05-14 19:39:52.102",
                "children": [
                    {
                        "id": "767e11c4c06c",
                        "comparisonModelId": "a437e3fe7c57",
                        "name": "内部用户登录",
                        "sort": 0,
                        "createTime": "2024-05-14 19:40:11.316"
                    }
                ]
            },
            {
                "id": "f044b2eec2c9",
                "comparisonId": "c41206b0c8d3",
                "name": "消息模块基础功能",
                "sort": 5,
                "createTime": "2024-05-14 19:39:57.433",
                "children": [
                    {
                        "id": "08479b49e0dc",
                        "comparisonModelId": "f044b2eec2c9",
                        "name": "站内信消息通知",
                        "sort": 0,
                        "createTime": "2024-05-14 19:40:25.195"
                    }
                ]
            },
            {
                "id": "56f96e47c4c6",
                "comparisonId": "c41206b0c8d3",
                "name": "安全模块",
                "sort": 6,
                "createTime": "2024-05-14 19:44:04.333",
                "children": [
                    {
                        "id": "058af047cb46",
                        "comparisonModelId": "56f96e47c4c6",
                        "name": "系统数据备份与恢复",
                        "sort": 0,
                        "createTime": "2024-05-14 19:44:12.816"
                    }
                ]
            }
        ],
        "resourcesList": [
            {
                "id": "c1198a3ed578",
                "comparisonId": "c41206b0c8d3",
                "key": "单文件上传",
                "values": "1G",
                "sort": 1,
                "createTime": "2024-05-24 21:36:36.594"
            },
            {
                "id": "017a05a5cefc",
                "comparisonId": "c41206b0c8d3",
                "key": "日志保存时长",
                "values": "不限制",
                "sort": 1,
                "createTime": "2024-05-24 21:37:06.291"
            },
            {
                "id": "60d0dc03c7ec",
                "comparisonId": "c41206b0c8d3",
                "key": "消息保存时长",
                "values": "不限制",
                "sort": 1,
                "createTime": "2024-05-24 21:37:14.805"
            }
        ],
        "customerList": [
            {
                "id": "66a9add5f5f6",
                "comparisonId": "c41206b0c8d3",
                "key": null,
                "values": "应用群聊",
                "sort": 1,
                "createTime": "2024-05-24 21:40:31.356"
            },
            {
                "id": "e6d881382a2b",
                "comparisonId": "c41206b0c8d3",
                "key": null,
                "values": "在线工单支持",
                "sort": 2,
                "createTime": "2024-05-24 20:28:55.475"
            }
        ]
    },
    {
        "id": "rew23fsdas",
        "productType": {
            "id": "eas",
            "code": null,
            "typeName": null
        },
        "type": "ee",
        "name": "EAS-企业版",
        "price": "3000",
        "version": "V1.0.2",
        "createTime": "2024-01-31 16:19:57.337",
        "modelList": [
            {
                "id": "1a5ec64551dc",
                "comparisonId": "rew23fsdas",
                "name": "用户模块：支持Ldap用户，企业微信用户，Ldap用户目录，企业微信用户目录",
                "sort": 1,
                "createTime": "2024-06-06 13:59:54.976",
                "children": []
            },
            {
                "id": "f3abf737cb46",
                "comparisonId": "rew23fsdas",
                "name": "登录模块：支持Ldap用户登录，企业微信用户登录",
                "sort": 2,
                "createTime": "2024-06-06 14:00:48.787",
                "children": []
            },
            {
                "id": "de49335cc437",
                "comparisonId": "rew23fsdas",
                "name": "消息模块：支持企业微信机器人消息",
                "sort": 3,
                "createTime": "2024-06-06 14:01:26.115",
                "children": []
            }
        ],
        "resourcesList": [
            {
                "id": "457a8481eee6",
                "comparisonId": "rew23fsdas",
                "key": "单文件上传",
                "values": "3G",
                "sort": 1,
                "createTime": "2024-05-24 21:35:24.817"
            },
            {
                "id": "24699000dabb",
                "comparisonId": "rew23fsdas",
                "key": "日志保存时长",
                "values": "不限制",
                "sort": 1,
                "createTime": "2024-05-24 21:37:42.195"
            },
            {
                "id": "ee5fcd2b9e3b",
                "comparisonId": "rew23fsdas",
                "key": "消息保存时长",
                "values": "不限制",
                "sort": 1,
                "createTime": "2024-05-24 21:37:48.911"
            }
        ],
        "customerList": [
            {
                "id": "25a407b1dea3",
                "comparisonId": "rew23fsdas",
                "key": null,
                "values": "在线工单支持",
                "sort": 1,
                "createTime": "2024-05-24 21:29:27.167"
            },
            {
                "id": "723929eb0616",
                "comparisonId": "rew23fsdas",
                "key": null,
                "values": "应用专属群聊",
                "sort": 1,
                "createTime": "2024-05-24 21:40:23.273"
            },
            {
                "id": "4e0f7beca9c7",
                "comparisonId": "rew23fsdas",
                "key": null,
                "values": "企业微信专属客服",
                "sort": 1,
                "createTime": "2024-05-24 21:41:35.693"
            },
            {
                "id": "40f63f2c05b9",
                "comparisonId": "rew23fsdas",
                "key": null,
                "values": "7*24 小时智能客服",
                "sort": 2,
                "createTime": "2024-05-24 21:29:15.008"
            },
            {
                "id": "1a620016ea70",
                "comparisonId": "rew23fsdas",
                "key": null,
                "values": "提供私有化专属技术支持",
                "sort": 3,
                "createTime": "2024-05-24 21:31:25.975"
            }
        ]
    },
    {
        "id": "34asd",
        "productType": {
            "id": "eas",
            "code": null,
            "typeName": null
        },
        "type": "cloud-pay",
        "name": "EAS-线上付费版",
        "price": "1000",
        "version": null,
        "createTime": "2024-01-31 16:19:57.337",
        "modelList": [
            {
                "id": "892a3a53f94e",
                "comparisonId": "34asd",
                "name": "用户模块：支持Ldap用户，企业微信用户，Ldap用户目录，企业微信用户目录",
                "sort": 0,
                "createTime": "2024-05-14 19:55:34.121",
                "children": [
                    {
                        "id": "45df80a8f965",
                        "comparisonModelId": "892a3a53f94e",
                        "name": "企业微信登录",
                        "sort": 0,
                        "createTime": "2024-05-14 19:55:41.862"
                    },
                    {
                        "id": "b48f2eebe8f2",
                        "comparisonModelId": "892a3a53f94e",
                        "name": "Ldap登录",
                        "sort": 0,
                        "createTime": "2024-05-14 19:55:52.618"
                    }
                ]
            },
            {
                "id": "c171d521b839",
                "comparisonId": "34asd",
                "name": "登录模块：支持Ldap用户登录，企业微信用户登录",
                "sort": 0,
                "createTime": "2024-05-14 19:56:00.379",
                "children": [
                    {
                        "id": "b9c8bdb340a6",
                        "comparisonModelId": "c171d521b839",
                        "name": "企业微信消息通知",
                        "sort": 0,
                        "createTime": "2024-05-14 19:56:08.001"
                    },
                    {
                        "id": "5edb743bdb0c",
                        "comparisonModelId": "c171d521b839",
                        "name": "邮箱消息通知",
                        "sort": 0,
                        "createTime": "2024-05-14 19:56:24.511"
                    }
                ]
            },
            {
                "id": "516d9607bdad",
                "comparisonId": "34asd",
                "name": "消息模块：支持企业微信机器人消息",
                "sort": 0,
                "createTime": "2024-05-14 19:56:31.357",
                "children": [
                    {
                        "id": "052aed95f2de",
                        "comparisonModelId": "516d9607bdad",
                        "name": "同步企业微信",
                        "sort": 0,
                        "createTime": "2024-05-14 19:56:39.244"
                    },
                    {
                        "id": "8fdf9ff24abe",
                        "comparisonModelId": "516d9607bdad",
                        "name": "同步Ldap",
                        "sort": 0,
                        "createTime": "2024-05-14 19:56:46.621"
                    }
                ]
            }
        ],
        "resourcesList": [
            {
                "id": "4405e4f6fd1e",
                "comparisonId": "34asd",
                "key": "单文件上传",
                "values": "3G",
                "sort": 1,
                "createTime": "2024-05-24 21:35:45.857"
            },
            {
                "id": "9f3227d10425",
                "comparisonId": "34asd",
                "key": "日志保存时长",
                "values": "不限制",
                "sort": 1,
                "createTime": "2024-05-24 21:38:41.293"
            },
            {
                "id": "3593802ea302",
                "comparisonId": "34asd",
                "key": "消息保存时长",
                "values": "不限制",
                "sort": 1,
                "createTime": "2024-05-24 21:38:46.895"
            }
        ],
        "customerList": [
            {
                "id": "b305f245d909",
                "comparisonId": "34asd",
                "key": null,
                "values": "在线工单支持",
                "sort": 1,
                "createTime": "2024-05-24 21:30:36.261"
            },
            {
                "id": "5ff79f60964b",
                "comparisonId": "34asd",
                "key": null,
                "values": "企业微信专属客服",
                "sort": 1,
                "createTime": "2024-05-24 21:41:56.347"
            },
            {
                "id": "2a6ad8652078",
                "comparisonId": "34asd",
                "key": null,
                "values": "应用专属群聊",
                "sort": 1,
                "createTime": "2024-05-24 21:42:22.796"
            },
            {
                "id": "6ecc99b73d0d",
                "comparisonId": "34asd",
                "key": null,
                "values": "7*24 小时智能客服",
                "sort": 3,
                "createTime": "2024-05-24 21:30:46.022"
            }
        ]
    },
    {
        "id": "cd6d9045f47b",
        "productType": {
            "id": "eas",
            "code": null,
            "typeName": null
        },
        "type": "cloud-free",
        "name": "EAS-线上免费版本",
        "price": "0",
        "version": null,
        "createTime": "2024-03-26 10:55:08.539",
        "modelList": [
            {
                "id": "11e787922da4",
                "comparisonId": "cd6d9045f47b",
                "name": "用户模块基础功能",
                "sort": 1,
                "createTime": "2024-06-06 16:41:36.229",
                "children": []
            },
            {
                "id": "20e375f44e21",
                "comparisonId": "cd6d9045f47b",
                "name": "权限模块",
                "sort": 1,
                "createTime": "2024-06-06 16:41:47.132",
                "children": []
            },
            {
                "id": "c7731ce7627c",
                "comparisonId": "cd6d9045f47b",
                "name": "登录模块基础功能",
                "sort": 1,
                "createTime": "2024-06-06 16:42:02.376",
                "children": []
            },
            {
                "id": "4e96bfe0dd82",
                "comparisonId": "cd6d9045f47b",
                "name": "消息模块基础功能",
                "sort": 1,
                "createTime": "2024-06-06 16:42:35.42",
                "children": []
            },
            {
                "id": "8b06aecd9c18",
                "comparisonId": "cd6d9045f47b",
                "name": "安全模块",
                "sort": 1,
                "createTime": "2024-06-06 16:42:42.927",
                "children": []
            }
        ],
        "resourcesList": [
            {
                "id": "4f0b6ec9bef6",
                "comparisonId": "cd6d9045f47b",
                "key": "单文件上传",
                "values": "1G",
                "sort": 1,
                "createTime": "2024-05-24 21:35:07.978"
            },
            {
                "id": "b760772138eb",
                "comparisonId": "cd6d9045f47b",
                "key": "日志保存时长",
                "values": "不限制",
                "sort": 1,
                "createTime": "2024-05-24 21:39:02.94"
            },
            {
                "id": "2f24978c1cbf",
                "comparisonId": "cd6d9045f47b",
                "key": "消息保存时长",
                "values": "不限制",
                "sort": 1,
                "createTime": "2024-05-24 21:39:14.285"
            }
        ],
        "customerList": [
            {
                "id": "002e42aa4e5a",
                "comparisonId": "cd6d9045f47b",
                "key": null,
                "values": "应用群聊",
                "sort": 1,
                "createTime": "2024-05-24 21:42:44.234"
            },
            {
                "id": "7164a7a7cdc5",
                "comparisonId": "cd6d9045f47b",
                "key": null,
                "values": "在线工单支持",
                "sort": 2,
                "createTime": "2024-05-24 21:30:53.944"
            }
        ]
    }
]

const VipType = (props) => {

    const {featureType='ee'} = props;

    const isVip = disableFunction();

    const [visible,setVisible] = useState(false);

    const onOk = () =>{
        if(featureType==='ee'){
            window.open(`https://tiklab.net/account/subscribe/apply/eas`)
        } else {
            window.open(`https://work.tiklab.net/#/enterprise/application/eas`)
        }
        onCancel()
    }

    const onCancel = () =>{
        setVisible(false)
    }

    const versionInfo = localStorage.getItem("versionInfo");
    const parse = JSON.parse(versionInfo);

    const featureHtml = type => {
        let item = featureList.find(li => li.type === type);
        return (
            <div className='feature-item'>
                <div className='feature-item-header'>
                    <div className='header-title'>
                        {type==='ce' && '社区版'}
                        {type==='ee' && '企业版'}
                        {type==='cloud-free' && '免费版' }
                        {type==='cloud-pay' && '专业版' }
                    </div>
                    <div className='header-desc'>
                        {type==='ce' && '适用于个人和小型团队快速部署和使用。'}
                        {type==='ee' && '适用于大型组织和企业的复杂需求。'}
                        {type==='cloud-free' && '适用于个人和小型团队快速部署和使用。' }
                        {type==='cloud-pay' && '适用于大型组织和企业的复杂需求。' }
                    </div>
                </div>
                <div className='feature-item-body'>
                    <div className='feature-item-body-model'>
                        <div className='feature-item-body-title'>
                            <span>功能</span>
                            {
                                type==='cloud-pay' &&
                                <span className='feature-item-body-title-ex'>
                                    包含免费版所有功能
                                </span>
                            }
                        </div>
                        <div>
                            {
                                item?.modelList?.map(model=>(
                                    <div key={model.id} className='feature-model-item'>
                                        <div className='feature-item-body-icon'></div>
                                        <div className='feature-model-item-name'>{model.name}</div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className='feature-item-body-resources'>
                        <div className='feature-item-body-title'>资源</div>
                        <div>
                            {
                                item?.resourcesList?.map(resources=>{
                                    return (
                                        <div key={resources.id} className='feature-resources-item'>
                                            <div className='feature-item-body-icon'></div>
                                            <div className='feature-resources-item-key'>{resources?.key}：</div>
                                            <div className='feature-resources-item-values'>{resources?.values}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='feature-item-body-customer'>
                        <div className='feature-item-body-title'>服务</div>
                        <div>
                            {
                                item?.customerList?.map(customer=>{
                                    return (
                                        <div key={customer.id} className='feature-customer-item'>
                                            <div className='feature-item-body-icon'></div>
                                            <div className='feature-customer-item-value'>{customer?.values}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )

    }


    return (
        <HeaderDropdown
            visible={visible}
            setVisible={setVisible}
            type={'applink'}
            tooltip={parse.expired ? "社区版":"企业版"}
            Icon={<img src={isVip ? vipDark : vipLight} alt={"vip"} width={24} height={24}/>}
        >
            <BaseModal
                width={700}
                title={"版本功能"}
                okText={'订阅'}
                visible={visible}
                onOk={onOk}
                onCancel={onCancel}
            >
                <div className='application-feature-modal'>
                    {featureHtml(featureType!==''?'ce':'cloud-free')}
                    {featureHtml(featureType!==''?'ee':'cloud-free')}
                </div>
            </BaseModal>
        </HeaderDropdown>
    );
};

export default VipType;
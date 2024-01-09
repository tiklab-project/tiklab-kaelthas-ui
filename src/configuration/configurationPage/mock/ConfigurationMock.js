import Mock from "mockjs";

const data = Mock.mock({
    key:Mock.mock('@id'),
    name:Mock.mock('@guid'),
    ip:Mock.mock('@ip'),
    'status|1':[
        '已启用',
        '未启用'
    ],
    'availability|1':[
        '可用',
        '不可用'
    ],
    'templateCount|3-10':3,
    'monitorCount|1-10':3,
    'triggerCount|1-10':5,
    'graphics|1-6':1,
    createTime:Mock.mock('@datetime'),

})

Mock.mock("/Configuration/Host",'post',{data})


/*
{
    key: '1',
    name: 'host01',
    ip: '127.0.0.1',
    status: '已启用',
    availability: '可用',
    templateCount: 1,
    monitorCount: 3,
    triggerCount: 2,
    graphics: 1,
    createTime: '1小时前'
},*/

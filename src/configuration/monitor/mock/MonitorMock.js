import Mock from "mockjs";

const data = {
    code: 0,
    data: [
        {
            key: '1',
            monitorName: '内核占用CPU时间百分比',
            isTemplate: '否',
            monitorType: 'CPU信息监控',
            monitorExpression: 'system.cpu(internal,time)',
            interval: '10s',
            dataRetentionPeriod: '36d',
            status: '启动',
            failureInformation: '监控项无法识别'
        },
        {
            key: '2',
            monitorName: '用户态进程占用CPU时间百分比',
            isTemplate: '否',
            monitorType: 'CPU信息监控',
            monitorExpression: 'system.cpu(process,time)',
            interval: '20s',
            dataRetentionPeriod: '40d',
            status: '启动',
            failureInformation: '不存在这个监控项'
        },
        {
            key: '3',
            monitorName: '改变过优先级的进程占用CPU的百分比',
            isTemplate: '否',
            monitorType: 'CPU信息监控',
            monitorExpression: 'system.cpu(process,c)',
            interval: '20s',
            dataRetentionPeriod: '50d',
            status: '启动',
            failureInformation: '监控项无法识别'
        },
        {
            key: '4',
            monitorName: '空闲CPU时间百分比',
            isTemplate: '否',
            monitorType: 'CPU信息监控',
            monitorExpression: 'system.cpu(idle,c)',
            interval: '30s',
            dataRetentionPeriod: '30d',
            status: '启动',
            failureInformation: '监控成功'
        },
    ]
}

Mock.mock("/Configuration/Host/Monitor", 'post', {
    data() {
        return data.data;
    }
});


Mock.mock("/Configuration/Host/Monitor/monitorFindByName", 'post', {
    data({name}) {

        data.data.forEach(item=>{
            if (item.monitorName === name){
                return item;
            }
        })

        return [];
    }
})

/*
Mock.mock('/api/goodslist','get',{
    status:200,
    message:'获取商品列表成功！',
    'data|5':[{
        id:'@increment(1)',
        name:'@cword(2,8)',
        price:'@natural(2,5)',
        count:'@natural(100,999)',
        img:'dataImage(300x300)',
    }]
})*/
// {[
//     Mock.mock({
//         key: Mock.mock('@id'),
//         'monitorName|1': [
//             '内核占用CPU时间百分比',
//             '用户态进程占用CPU时间百分比',
//             '改变过优先级的进程占用CPU的百分比',
//             '空闲CPU时间百分比'
//         ],
//         isTemplate: '否',
//         'monitorType|1': [
//             'CPU信息监控',
//             '内存信息监控',
//             '磁盘信息监控'
//         ],
//         'monitorExpression|1': [
//             'system.cpu(internal,time)',
//             'system.cpu(process,time)',
//             'system.cpu(process,c)',
//             'system.cpu(idle,c)'
//         ],
//         'interval|1-120': 10,
//         'dataRetentionPeriod|1-365': 365,
//         'status|1': [
//             '启动',
//             '关闭'
//         ],
//         'failureInformation|1-100': 1
//     }),
//
//
//
// ]}
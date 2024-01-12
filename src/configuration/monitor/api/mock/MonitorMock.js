import Mock from "mockjs";

const data = {
    code: 0,
    data: [
        {
            id: '1',
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
            id: '2',
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
            id: '3',
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
            id: '4',
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

//全部查询
Mock.mock("/Configuration/Host/Monitor", 'post', {
    data() {
        return data.data;
    }
});

//根据名称查询
Mock.mock("/Configuration/Host/Monitor/monitorFindByName", 'post', (option) => {

    const name = JSON.parse(option.body).name;

    if ('' == name){
        return data.data;
    }

    const resData = [];

    /*return data.data.filter(item => {
        return item.monitorName === name;
    });*/
    data.data.forEach(item =>{
        if (item.monitorName === name){
            resData.push(item);
        }
    })

    return resData;

})

//根据id进行修改
Mock.mock("/Configuration/Host/Monitor/updateMonitorById", 'post', (option) => {

    const partyData = JSON.parse(option.body);

     data.data.map((item,index) =>{
        if (item.id === partyData.id) {
            
            data.data.splice(index, 1);

            data.data.push(partyData);
        }
    })

    return data.data;

})

//删除
Mock.mock("/Configuration/Host/Monitor/deleteMonitorById", 'post', (option) => {

    const id = JSON.parse(option.body);
    console.log('id:',id)

    data.data.map((item,index) =>{
        if (item.id == id){
            data.data.splice(index,1);
        }
    })

    console.log(data.data)

    return data.data;


})

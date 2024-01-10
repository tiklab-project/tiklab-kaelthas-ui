import Mock from "mockjs";

const data = {
    code: 0,
    data: [
        {
            id: 1,
            triggerName: '内核占用CPU百分比超过数值',
            isTemplate: '否',
            triggerExpression: 'system.cpu(internal,time)>80%',
            messageType: '短信发送',
            alarmType: '一般严重',
            description: '对内核占用CPU百分比超过80%进行告警',
        },
        {
            id: 2,
            triggerName: '空闲CPU时间百分比低于正常值',
            isTemplate: '否',
            triggerExpression: 'system.cpu(idle,c)<10%',
            messageType: '使用微信公众号',
            alarmType: '告警',
            description: '空闲CPU时间百分比低于10%进行告警',
        },
        {
            id: 3,
            triggerName: '空闲CPU时间百分比低于正常值',
            isTemplate: '否',
            triggerExpression: 'system.cpu(idle,c)>40%',
            messageType: '短信',
            alarmType: '信息',
            description: '空闲CPU时间百分比高于40%进行告警',
        },
        {
            id: 4,
            triggerName: '触发器1',
            isTemplate: '否',
            triggerExpression: 'system.cpu(idle,c)<10%',
            messageType: '短信',
            alarmType: '信息',
            description: '空闲CPU时间百分比低于10%进行告警',
        },
    ]
}

//查询全部
Mock.mock("/trigger/getTriggerList", 'post', {
    data() {
        return data.data;
    }
});

//根据名称进行查询
Mock.mock("/trigger/findTriggerByName", "post", (option) => {

    const name = JSON.parse(option.body).name;
    if ('' === name){
        return data.data;
    }

    return data.data.filter((item, index) => {
        return item.triggerName === name;
    })
})

//新增内容
Mock.mock("/trigger/addTrigger", 'post', (option) =>{
    const trigger = JSON.parse(option.body);
    data.data.push(trigger);
    return data.data;
});

//修改内容
Mock.mock("/trigger/updateTriggerById", 'post', (option) =>{
    const trigger = JSON.parse(option.body);

    const resData = [];

    data.data.map((item,index) => {
        if (item.id === trigger.id){
            resData.push(trigger);
        }else {
            resData.push(item)
        }
    })

    return resData;
});


//根据id删除
Mock.mock("/trigger/deleteTriggerById", 'post', (option) =>{
    const id = JSON.parse(option.body).id;
    data.data.map((item,index) => {
        if (item.id == id){
            data.data.splice(index,1);
        }
    })
    return data.data;
});
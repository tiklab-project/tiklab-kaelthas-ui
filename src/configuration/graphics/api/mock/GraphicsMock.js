import Mock from "mockjs";

const data = {
    code: 0,
    data: [
        {
            id: '1',
            graphicsName: '内存监控图表',
            width: '900',
            height: '400',
            monitoringMetrics:'system.cpu(internal,time)',
            description:'内存监控图表'
        },
        {
            id: '2',
            graphicsName: '网络监控图表',
            width: '900',
            height: '400',
            monitoringMetrics:'system.cpu(process,time)',
            description:'网络监控图表'
        },
        {
            id: '3',
            graphicsName: '改变过优先级的进程图表',
            width: '900',
            height: '400',
            monitoringMetrics:'system.cpu(process,c)',
            description:'改变过优先级的进程图表'
        },
        {
            id: '4',
            graphicsName: '空闲CPU图表',
            width: '900',
            height: '400',
            monitoringMetrics:'system.cpu(idle,c)',
            description:'空闲CPU图表'
        },
    ]
};

//全部查询
Mock.mock("/graphicsStore/getGraphicsStoreList", 'post', {
    data() {
        return data.data;
    }
});

//根据名称查询
Mock.mock("/graphicsStore/getGraphicsStoreByName", 'post', (option) => {

    const name = JSON.parse(option.body).name;

    if ('' == name) {
        return data.data;
    }

    const resData = [];

    data.data.forEach(item => {
        if (item.graphicsName === name){
            resData.push(item);
        }
    });

    return resData;

})

//新增
Mock.mock("/graphicsStore/addGraphicsStore", 'post', (option) => {

    const partyData = JSON.parse(option.body);

    data.data.push(partyData);

    return data.data;

})

//根据id进行修改
Mock.mock("/graphicsStore/updateGraphicsStoreById", 'post', (option) => {

    const partyData = JSON.parse(option.body);

    const resData = [];

    data.data.map((item, index) => {
        if (item.id === partyData.id) {
            resData.push(partyData);
        }else {
            resData.push(item);
        }
    })


    return resData;

})

//删除
Mock.mock("/graphicsStore/deleteGraphicsStoreById", 'post', (option) => {

    const id = JSON.parse(option.body);
    console.log('id:', id)

    data.data.map((item, index) => {
        if (item.id == id) {
            data.data.splice(index, 1);
        }
    })

    return data.data;


})
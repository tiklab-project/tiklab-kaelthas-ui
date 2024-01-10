import Mock from "mockjs";

const data = {
    code:0,
    data: [
        {
            id: 1,
            templateName: 'CPU监控模板',
            monitorNum: '6',
            triggerNum: '1',
        },
        {
            id: 2,
            templateName: '内存监控模板',
            monitorNum: '4',
            triggerNum: '2',
        },
        {
            id: 3,
            templateName: '网络监控模板',
            monitorNum: '8',
            triggerNum: '3',
        },
        {
            id: 4,
            templateName: 'template001',
            monitorNum: '4',
            triggerNum: '2',
        },
    ]
};


//查询所有
Mock.mock("/template/getAllTemplate",'post',() => {
    return data.data;
})


//根据名称查询
Mock.mock("/template/getTemplateByName",'post',(option) => {
    const name = JSON.parse(option.body).name;
    if ('' == name){
        return data.data;
    }

    return data.data.filter(item => {
        return item.templateName === name;
    });
})


//新增
Mock.mock("/template/addTemplate",'post',(option) => {
    const template = JSON.parse(option.body);

    data.data.push(template);
    return data.data;
})


//删除
Mock.mock("/template/deleteTemplate",'post',(option) => {

    const id = JSON.parse(option.body).id;

    data.data.map((item,index) =>{
        if (item.id == id){
            data.data.splice(index,1);
        }
    })

    return data.data;
})
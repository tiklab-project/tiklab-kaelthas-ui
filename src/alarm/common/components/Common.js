import {Tag} from "antd";
import React from "react";


/**
 * 告警等级
 * @param severityLevel：等级
 */

const leveList = {"1": "灾难", "2": "严重", "3": "一般严重", "4": "告警", "5": "信息", "6": "未分类"};
const conversionType = (severityLevel) =>{
    let tagColor;
    let tagName;

    switch (severityLevel) {
        case 1:
            tagColor = "#ff0003";
            tagName = leveList[severityLevel];
            break;
        case 2:
            tagColor = "#e97659";
            tagName = leveList[severityLevel];
            break;
        case 3:
            tagColor = "orange";
            tagName = leveList[severityLevel];
            break;
        case 4:
            tagColor = "#fac858";
            tagName = leveList[severityLevel];
            break;
        case 5:
            tagColor = "yellow";
            tagName = leveList[severityLevel];
            break;
        case 6:
            tagColor = "grey";
            tagName = leveList[severityLevel];
            break;
    }
    return <Tag key={severityLevel} color={tagColor}>
        {tagName}
    </Tag>
}


/**
 * 设备类型
 * @param machineType：类型
 */
function converMachine(machineType) {
    let machineName;
    switch (machineType) {
        case 1:
            machineName = "主机"
            break;
        case 2:
            machineName = "数据库"
            break;
        case 3:
            machineName = "k8s"
            break;
        case 4:
            machineName = "网络"
            break;
    }
    return <Tag>{machineName}</Tag>
}

/**
 * 警告解决状态
 * @param machineType：类型
 */
function isConfirm(status) {
    switch (status) {
        case 1:
            return <Tag key={status} color={"green"}>
                已解决
            </Tag>
        case 2:
            return <Tag key={status} color={"red"}>
                未解决
            </Tag>
    }
}

export {conversionType,converMachine,isConfirm}

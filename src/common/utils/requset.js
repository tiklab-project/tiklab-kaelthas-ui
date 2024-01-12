/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2020-12-18 16:05:16
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2022-04-22 09:33:56
 */

import {Axios as service} from "thoughtware-core-ui";

const Service = (url, data) => {
    return service.request({
        url: url,
        method: "post",
        data: data
    })
}

export {Service};

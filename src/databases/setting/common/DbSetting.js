import React from 'react';
import {renderRoutes} from "react-router-config";
import {withRouter} from "react-router-dom";
import "./DbSetting.scss"
import ProjectLayout from "../../../common/project/ProjectLayout";

const DbSetting = (props) => {

    const {match:{params}} = props;
    const dbId=params.id
    const router = [
        {
            name: '数据库信息',
            url: `/db/${dbId}/setting/dbProject`,
            key: "setting",
            encoded: "setting",
        },
        {
            name: '成员',
            url: `/db/${dbId}/setting/dbMember`,
            key: "kuMember",
            encoded: "kuMember",
        },
        {
            name: '权限',
            url: `/db/${dbId}/setting/DbRole`,
            key: "permissions",
            encoded: "permissions",
        },
        {
            name: '监控项',
            icon: 'monitor',
            url: `/db/${dbId}/setting/monitor`,
            key: "monitor",
            encoded: "monitor",
        },
        {
            name: '触发器',
            icon: 'trigger',
            url: `/db/${dbId}/setting/trigger`,
            key: "trigger",
            encoded: "trigger",
        },
        {
            name: '图形',
            icon: 'graphics',
            url: `/db/${dbId}/setting/graphics`,
            key: "graphics",
            encoded: "graphics",
        },
    ]

    return (
        <ProjectLayout {...props}
                       dataList={router}
        />
    );
};

export default withRouter(DbSetting);

import React from 'react';
import {renderRoutes} from "react-router-config";
import {withRouter} from "react-router-dom";
import "./SettingLayout.scss"
import ProjectLayout from "../../../common/project/ProjectLayout";

const SettingLayout = (props) => {
    const {match:{params}} = props;
    const internetId = params.id

    const router = [
        {
            name: '网络信息',
            url: `/internet/${internetId}/setting/inProject`,
            key: "inProject",
            encoded: "inProject",
        },
        {
            name: '成员',
            url: `/internet/${internetId}/setting/inMember`,
            key: "member",
            encoded: "member",
        },
        {
            name: '权限',
            url: `/internet/${internetId}/setting/inRole`,
            key: "permissions",
            encoded: "permissions",
        },
        {
            name: '监控项',
            icon: 'monitor',
            url: `/internet/${internetId}/setting/monitor`,
            key: "monitor",
            encoded: "monitor",
        },
        {
            name: '触发器',
            icon: 'trigger',
            url: `/internet/${internetId}/setting/trigger`,
            key: "trigger",
            encoded: "trigger",
        },
        {
            name: '图形',
            icon: 'graphics',
            url: `/internet/${internetId}/setting/graphics`,
            key: "graphics",
            encoded: "graphics",
        },
    ];
    return (
        <ProjectLayout {...props}
                       dataList={router}
        />
    );
};

export default withRouter(SettingLayout);

import React, {useState} from "react";
import {Dropdown, Menu, Modal, Popconfirm} from "antd";
import monitorStore from "../../host/configuration/monitor/store/MonitorStore";
import IconCommon from "../IconCommon";

const HideDelete = (props) => {

    const {deleteFn, operation} = props;

    const menu = (
        <Menu>
            <Menu.Item key={1}>
                <Popconfirm
                    title={`确定${operation}？`}
                    onConfirm={deleteFn}
                    okText='确定'
                    cancelText='取消'
                    placement="topRight"
                >
                    <div style={{cursor: "pointer", width: "30px"}}>{operation}</div>
                </Popconfirm>
            </Menu.Item>
        </Menu>
    )

    return (
        < >
            <Dropdown overlay={menu} placement="bottomRight">
                <span>
                    <IconCommon
                        icon={"more"}
                        className={"icon-s edit-icon"}
                    />
                </span>
            </Dropdown>
        </>
    )
}

export default HideDelete;
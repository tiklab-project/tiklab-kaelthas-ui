/**
 * @name: Dropdown 下拉
 * @author: limingliang
 * @date: 2025-6-12 14:30
 * @description：下拉
 * @update: 2025-6-12 14:30
 */

import React,{useState,useEffect,Fragment} from 'react';
import {Col, Dropdown, Menu, Table, Modal, Tooltip} from "antd";
import {
    DeleteOutlined,
    EditOutlined,
    EllipsisOutlined,
    ExclamationCircleOutlined,
    SettingOutlined
} from "@ant-design/icons";
const { confirm } = Modal;
import "./Dropdowns.scss"
const Dropdowns = (props) => {
    const {goPage,deleteMethod,value,type,size}=props


    const deletePop = (data) => {
        confirm({
            title: "确认删除",
            icon: <ExclamationCircleOutlined />,
            content: '',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            top:60,
            onOk() {
                deleteMethod(value.id)
            },
            onCancel() {
            },
        });
    }

    //跳转设置
    const goSet = (value) => {
        props.history.push(`/${type}/${value.id}/setting/monitor`)
    }

    /**
     * 操作下拉
     */
    const pullDown=(data) => (
        <Menu>
            <Menu.Item onClick={()=>goPage(data)} className={`${type==='data'?"drop-table-exec-data":'drop-table-exec'}`}>
                <div className='dro-nav-style'>
                    <div><EditOutlined /></div>
                    <div>编辑</div>
                </div>
            </Menu.Item>
            <Menu.Item  className={`${type==='data'?"drop-table-exec-data":'drop-table-exec'}`} onClick={()=>deletePop(data)}>
                <div className='dro-nav-style'>
                    <div><DeleteOutlined /></div>
                    <div>删除</div>
                </div>
            </Menu.Item>
            {
                type!=="data"&&
                <Menu.Item  className={`${type==='data'?"drop-table-exec-data":'drop-table-exec'}`} onClick={()=>goSet(data)}>
                    <div className='dro-nav-style'>
                        <div><SettingOutlined /></div>
                        <div>设置</div>
                    </div>
                </Menu.Item>
            }

        </Menu>
    );

    return(
        <Dropdown   overlay={()=>pullDown(value)}
                    placement="bottomRight"
                    trigger={['click']}
                 /*   getPopupContainer={e => e.parentElement}*/
        >
            <EllipsisOutlined style={{fontSize:size}} />
        </Dropdown>
    )

}
export default Dropdowns

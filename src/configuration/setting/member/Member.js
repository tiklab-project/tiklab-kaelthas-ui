import React, {useState} from 'react';
import "./Member.scss"
import {withRouter} from "react-router-dom";
import {Form, Input} from "antd";
import MemberTable from "./MemberTable";

const Member = (props) => {

    const data = [
        {
            key: '1',
            name: '张三',
            userName: 'mrzhang',
            department: '后端',
            role: 'admin',
            userDirectory: '内部目录'
        },
        {
            key: '2',
            name: '王五',
            userName: 'wangwu',
            department: '后端',
            role: 'admin',
            userDirectory: '内部目录',
        },
        {
            key: '3',
            name: '小明',
            userName: 'xiaoming',
            department: '后端',
            role: 'admin',
            userDirectory: '内部目录',
        },
        {
            key: '4',
            name: '小李',
            userName: 'xiaoli',
            department: '前端',
            role: 'admin',
            userDirectory: '内部目录',
        },
        {
            key: '5',
            name: '王土',
            userName: 'wangtu',
            department: '运维',
            role: 'admin',
            userDirectory: '内部目录',
        },
    ];

    const [dataList, setDataList] = useState(data);


    return (
        <div className="member-box-body-right">
            <div className="member-box-body-right-div">
                <div className="member-box-body-right-head">
                    <div className="member-box-body-head-text">
                        成员
                    </div>
                    <div>
                        添加成员
                    </div>
                </div>
                <div className="member-box-body-right-search">
                    <div>

                    </div>
                    <div>
                        <Input placeholder="搜索姓名,手机号,邮箱"/>
                    </div>
                </div>
                <div>
                    <MemberTable dataList={dataList} setDataList={setDataList}/>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Member);

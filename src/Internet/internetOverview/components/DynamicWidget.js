import React, {useEffect, useState} from "react";
import {Axios} from "thoughtware-core-ui";
import {observer} from "mobx-react";
import {Empty} from "antd";
import moment from "moment";
import "./DynamicList.scss"
import {useHistory} from "react-router";
import Profile from "../../../common/Profile";

/**
 * 首页中动态
 */
const DynamicWidget = (props) => {
    const {hostId,hostName} = props;

    const history = useHistory()

    const [data, setData] = useState([]);
    const [list, setList] = useState([]);
    const [count, setCount] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    useEffect(async () => {
        findList().then(data => {
            setData(data.dataList);
            setList(data.dataList);
            setTotalPage(data.totalPage)
        })
    }, []);

    /**
     * 查询日志列表
     */
    const findList = async (value) => {
        const params = {
            hostId: hostId,
            pageParam: {
                pageSize: 10,
                currentPage: 1
            },
            ...value,
            bgroup: "kaelthas"
        }
        let res = await Axios.post('/hostDynamic/findHostDynamicPage', params)
        return res.data;
    };

    // 动态路由跳转
    const goDynaLink = item => {
        if (item.link) {
            history.push(item.link.split("#")[1])
        }
    }

    const renderList = (item, index) => {
        const {logList, time} = item;
        return (
            <div key={index} className='dynamic-item-box'>
                <div className='dynamic-item-time'>
                    <div className={"dynamic-item-time-title"}>{time}</div>
                </div>
                {
                    logList && logList.map(logItem => {
                        const {name, action, user, time, data, id} = logItem
                        const dataObj = data && JSON.parse(data)
                        return (
                            <div key={id} className='dynamic-item-log mf-user-avatar'>
                                <div className='dynamic-item-log-time'>
                                    {moment(time).format("HH:mm")}
                                </div>
                                <div className={" display-flex-gap"}>
                                    <Profile userInfo={user}/>
                                    <div className='dynamic-item-log-info'>
                                        <div className='dynamic-item-log-info-name' onClick={() => goDynaLink(logItem)}>
                                            {user?.nickname || user?.name}{name}
                                        </div>
                                        <div className='dynamic-item-log-desc'>
                                            <div className='log-desc-action'> {hostName}</div>
                                            {dataObj?.message && <div className='log-desc-message'>{dataObj.message}</div>}
                                        </div>
                                    </div>
                                </div>


                            </div>
                        )
                    })
                }
            </div>
        )
    }

    const processList = (list) => {
        const groupedLogs = list.reduce((acc, log) => {
            const date = log.time.split(' ')[0];
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(log);
            return acc;
        }, {});

        const resultList = Object.keys(groupedLogs).map(date => ({
            time: date,
            logList: groupedLogs[date]
        }));


        return resultList.map((item, index) => renderList(item, index))

    }

    //加载更多
    const onLoadMore = () => {
        setCount(count + 1)

        if (count <= totalPage) {
            let params = {
                pageParam: {
                    pageSize: 10,
                    currentPage: count + 1
                }
            }

            findList(params).then(res => {
                const newData = data.concat(res.dataList);
                setList(newData);
                setData(newData);
            })
        }
    }

    //是否展示 加载更多
    const loadMore = () => {
        return count < totalPage ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <a onClick={onLoadMore}>加载更多</a>
            </div>
        ) : null;
    }

    return (

        <div className="mf-dynamic-center">
            {
                list && list.length > 0
                    ? processList(list)
                    : <Empty
                        imageStyle={{height: 100}}
                        description={<span>暂无动态</span>}
                    />
            }
            {
                loadMore()
            }
        </div>
    );
}

export default observer(DynamicWidget);
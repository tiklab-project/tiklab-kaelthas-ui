import {observer, Provider} from "mobx-react";
import React, {useEffect, useState} from "react";
import {DatePicker, Empty, Select,} from "antd";

import monitorLayoutStore from "../store/MonitorGraphicsStore";
import MonitoringItem from "../../../common/graphics/MonitoringItem";
import moment from "moment";
import {withRouter} from "react-router-dom";
import ChangeViewChart from "../../../common/graphics/ChangeViewChart";
import "./MonitorGraphics.scss"

const {RangePicker} = DatePicker;

const {Option} = Select;
const dateFormat = 'YYYY-MM-DD HH:mm';

const MonitorGraphics = () => {

    const {
        setSearchCondition,
        findInformationByGraphics,
        condition,
        setSearchNull,
        getDateTime,
    } = monitorLayoutStore;

    const [pageStatus, setPageStatus] = useState(1);

    useEffect(async () => {
        const hostId = localStorage.getItem("hostId");
        setSearchNull({
            hostId: hostId,
            beginTime: getDateTime()[0],
            endTime: getDateTime()[1]
        })

        await findInformationByGraphics();
        setSearchCondition({
            dataCate: null,
            id: hostId
        })
    }, []);

    const onChange = async (value, dateString) => {
        setSearchCondition({
            beginTime: dateString[0] + ":00",
            endTime: dateString[1] + ":00",
        })
        await findInformationByGraphics()
        setSearchCondition({
            beginTime: dateString[0] + ":00",
            endTime: dateString[1] + ":00",
        })
    };


    async function checkTime(value) {

        const checkTimeList = [];

        switch (value) {
            case 1:
                checkTimeList.push(moment().subtract(1, 'minutes').format(dateFormat), moment().format(dateFormat))
                await onChange(0, checkTimeList)
                break
            case 2:
                checkTimeList.push(moment().subtract(15, 'minutes').format(dateFormat), moment().format(dateFormat))
                await onChange(0, checkTimeList)
                break
            case 3:
                checkTimeList.push(moment().subtract(30, 'minutes').format(dateFormat), moment().format(dateFormat))
                await onChange(0, checkTimeList)
                break
            case 4:
                checkTimeList.push(moment().subtract(1, 'hours').format(dateFormat), moment().format(dateFormat))
                await onChange(0, checkTimeList)
                break
            case 5:
                checkTimeList.push(moment().subtract(3, 'hours').format(dateFormat), moment().format(dateFormat))
                await onChange(0, checkTimeList)
                break
            case 6:
                checkTimeList.push(moment().subtract(6, 'hours').format(dateFormat), moment().format(dateFormat))
                await onChange(0, checkTimeList)
                break
            case 7:
                checkTimeList.push(moment().subtract(12, 'hours').format(dateFormat), moment().format(dateFormat))
                await onChange(0, checkTimeList)
                break
            case 8:
                checkTimeList.push(moment().subtract(24, 'hours').format(dateFormat), moment().format(dateFormat))
                await onChange(0, checkTimeList)
                break
            case 9:
                setSearchCondition({
                    beginTime: getDateTime()[0],
                    endTime: getDateTime()[1],
                })
                await findInformationByGraphics();
                // await findHistory();
                break
        }
    }

    return (
        <Provider>
            <div className="details">
                <div className="details-body">
                    <div className="details-breadcrumb-table">
                        <div className="details-table-title">
                            <div className="details-search">
                                <div className="details-div">
                                    <RangePicker
                                        format={dateFormat}
                                        onChange={onChange}
                                        showTime
                                        defaultValue={[moment(getDateTime()[0], dateFormat), moment(getDateTime()[1], dateFormat)]}
                                    />
                                </div>
                                <div>
                                    <Select
                                        maxTagCount='responsive'
                                        placeholder="最近时间"
                                        onChange={(value) => checkTime(value)}
                                        allowClear
                                        style={{
                                            width: 150,
                                        }}
                                        defaultValue={9}
                                        onClear={() => checkTime()}
                                    >
                                        <Option value={9} key={9}>今天</Option>
                                        <Option value={1} key={1}>过去1分钟</Option>
                                        <Option value={2} key={2}>过去15分钟</Option>
                                        <Option value={3} key={3}>过去30分钟</Option>
                                        <Option value={4} key={4}>过去1小时</Option>
                                        <Option value={5} key={5}>过去3小时</Option>
                                        <Option value={6} key={6}>过去6小时</Option>
                                        <Option value={7} key={7}>过去12小时</Option>
                                        <Option value={8} key={8}>过去一天</Option>
                                    </Select>
                                </div>
                            </div>
                            <ChangeViewChart pageStatus={pageStatus} setPageStatus={setPageStatus}/>
                        </div>
                        <div className="layout-body-list">
                            {
                                condition && condition.length > 0 ?
                                    <div className="details-tabs-wrap">
                                        {
                                            condition.map((item, index) => {
                                                return (
                                                    <div key={index} className="item-tabs-item">
                                                        <MonitoringItem
                                                            reportType={pageStatus}
                                                            condition={item}
                                                            descTime={item[0].dataTimes}
                                                            index={index}
                                                        />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    :
                                    <Empty/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Provider>
    );
};

export default withRouter(observer(MonitorGraphics));
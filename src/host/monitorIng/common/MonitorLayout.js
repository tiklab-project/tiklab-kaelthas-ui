import {observer, Provider} from "mobx-react";
import React, {useEffect, useState} from "react";
import {Breadcrumb, Col, DatePicker, Empty, Row, Select,} from "antd";
import MonitoringDetails from "../components/MonitoringDetails";

import monitorLayoutStore from "../store/MonitorLayoutStore";
import MonitoringItem from "./MonitoringItem";
import moment from "moment";
import {withRouter} from "react-router-dom";
import ChangeViewChart from "./ChangeViewChart";

const {RangePicker} = DatePicker;

const {Option} = Select;
const dateFormat = 'YYYY-MM-DD HH:mm';

const MonitorLayout = () => {

    const {
        setSearchCondition,
        findInformationByGraphics,
        condition,
        setSearchNull,
        findHistory,
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
        await findHistory();
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
        await findHistory();
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
                await findHistory();
                break
        }
    }

    return (
        <Provider>
            <Row className="details">
                <Col className="details-body" sm={24} md={24} lg={{span: 24}} xl={{span: "22", offset: "1"}}
                     xxl={{span: "18", offset: "3"}}>
                    <div className="details-breadcrumb-table">
                        <div className="details-table-title">
                            <div className="details-search">
                                <div className="details-div">
                                    <RangePicker
                                        // style={{width: 300}}
                                        format={dateFormat}
                                        onChange={onChange}
                                        showTime
                                        defaultValue={[moment(getDateTime()[0], dateFormat), moment(getDateTime()[1], dateFormat)]}
                                    />
                                </div>
                                <div className="details-div">
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
                        {
                            pageStatus === 2 ?
                                <MonitoringDetails/>
                                :
                                <div className="layout-body-list">
                                    {
                                        condition && condition.length > 0 ?
                                            <div className="details-tabs-wrap">
                                                {
                                                    condition.map((item, index) => {
                                                        return (
                                                            <div key={index}>
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
                        }
                    </div>
                </Col>
            </Row>
        </Provider>
    );
};

export default withRouter(observer(MonitorLayout));
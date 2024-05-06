import {observer, Provider} from "mobx-react";
import React, {useEffect, useState} from "react";
import {Breadcrumb, Col, DatePicker, Empty, Row, Select,} from "antd";
import MonitoringDetails from "../components/MonitoringDetails";

import monitorLayoutStore from "../store/MonitorLayoutStore";
import MonitoringItem from "./MonitoringItem";
import moment from "moment";

const {RangePicker} = DatePicker;

const {Option} = Select;
const dateFormat = 'YYYY-MM-DD HH:mm';

const MonitorLayout = (props) => {

    function goBackHome() {
        props.history.push(`/monitoring`);
    }

    const {
        setSearchCondition,
        findInformationByGraphics,
        condition,
        setSearchNull,
        findMonitorForHost,
        findMonitorByCategories,
        hostState,
        setHostState,
        getDateTime,
        findInformationPage,
        total,
    } = monitorLayoutStore;

    const dataCategories = ['CPU', 'IO', 'memory', 'host', 'internet'];

    const [monitorDataSubclass, setMonitorDataSubclass] = useState([]);


    let monitorNameList = [];

    const [monitorNames, setMonitorNames] = useState(monitorNameList);

    useEffect(async () => {

        const hostId = localStorage.getItem("hostIdForMonitoring");

        setSearchNull({
            hostId: hostId,
            beginTime: getDateTime()[0],
            endTime: getDateTime()[1]
        })

        await findInformationByGraphics();

        await findMonitorForHost();

        setSearchCondition({
            dataCate: dataCategories,
            id: localStorage.getItem("hostIdForMonitoring")
        })
        const resData = await findMonitorByCategories();
        setMonitorDataSubclass([...resData])


        resData.map(item => {
            monitorNameList.push(item.id)
        })

        setMonitorNames([...monitorNameList])

    }, []);

    async function checkTabGraphics(activeKey) {
        setHostState(activeKey)

        if (activeKey === "2") {
            //根据主机id查询出主机下配置的图表有多少,根据图表查询对应的数据返回
            await findInformationByGraphics()
        }

    }

    const onChange = async (value, dateString) => {

        console.log(value)
        console.log(dateString[0])
        setSearchCondition({
            beginTime: dateString[0] + ":00",
            endTime: dateString[1] + ":00",
        })

        await findInformationByGraphics()

        setSearchCondition({
            beginTime: dateString[0] + ":00",
            endTime: dateString[1] + ":00",
        })
        await findMonitorForHost();

    };


    async function onCheckMonitor(value) {

        setSearchCondition({
            hostId: localStorage.getItem("hostIdForMonitoring"),
            monitorIdList: value
        })

        await findMonitorForHost();

        await findInformationByGraphics();
    }

    async function searchByDataCategories(value) {

        setSearchCondition({
            dataCate: value,
            id: localStorage.getItem("hostIdForMonitoring")
        })
        await findMonitorForHost();

        await findInformationByGraphics();

        //根据监控大类查询监控小类
        const resData = await findMonitorByCategories();
        setMonitorDataSubclass([...resData])

    }

    const showTabs = [
        {
            title: '列表展示',
            key: '1',
            icon: "showList"
        },
        {
            title: '图表展示',
            key: '2',
            icon: "graphicsList"
        }
    ]


    async function checkTime(value) {

        const checkTimeList = [];

        switch (value) {
            case 1:
                checkTimeList.push(moment().subtract(5, 'minutes').format(dateFormat), moment().format(dateFormat))
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
        }
    }

    function getSubclassName() {
        console.log(monitorDataSubclass)
        return monitorDataSubclass.map(item => ({
            label: item.name,
            key: item.id,
            value: item.id,
        }));
    }

    return (
        <Provider>
            <Row className="details">
                <Col className="details-body" sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <div className="details-breadcrumb-table">
                        <Breadcrumb>
                            <Breadcrumb.Item onClick={goBackHome}>
                                <span style={{cursor: "pointer"}}>Home</span>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>{"主机:" + localStorage.getItem("hostName")}</Breadcrumb.Item>
                            <Breadcrumb.Item>{"ip:" + localStorage.getItem("ip")}</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="details-table-title">
                            <div className="details-search">
                                <div className="details-div">
                                    <Select
                                        mode="multiple"
                                        maxTagCount='responsive'
                                        placeholder="请选择监控大类"
                                        onChange={(value) => searchByDataCategories(value)}
                                        allowClear={true}
                                        defaultValue={dataCategories}
                                        style={{
                                            width: 150,
                                        }}
                                        options={dataCategories && dataCategories.map((province) => ({
                                            label: province,
                                            value: province,
                                        }))}
                                    >
                                    </Select>
                                </div>

                                <div className="details-div">
                                    <Select
                                        mode="multiple"
                                        maxTagCount='responsive'
                                        placeholder="请选择您的监控小类"
                                        onChange={(value) => onCheckMonitor(value)}
                                        allowClear={true}
                                        defaultValue={monitorNames}
                                        style={{
                                            width: 300,
                                        }}
                                        options={monitorDataSubclass && monitorDataSubclass.map((item) => ({
                                            label: item.name,
                                            value: item.id,
                                        }))}
                                    >
                                    </Select>
                                </div>
                                <div className="details-div">
                                    <RangePicker
                                        style={{width: 400}}
                                        format={dateFormat}
                                        onChange={onChange}
                                        showTime
                                        defaultValue={[moment(getDateTime()[0], dateFormat), moment(getDateTime()[1], dateFormat)]}
                                    />

                                </div>
                                <div className="details-div">
                                    <Select
                                        maxTagCount='responsive'
                                        placeholder="请选择您的具体时间区间"
                                        onChange={(value) => checkTime(value)}
                                        allowClear
                                        style={{
                                            width: 300,
                                        }}
                                    >
                                        <Option value={1} key={1}>过去5分钟</Option>
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
                            <div className="details-tables">
                                {
                                    showTabs.map(item => {
                                        return <div
                                            className={`details-tabs-item ${hostState === item.key ? "details-tabs" : ""}`}
                                            key={item.key}
                                            onClick={() => checkTabGraphics(item.key)}
                                        >
                                            {item.title}
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                        <div className="layout-body-list">
                            {
                                hostState === '1' ?
                                    <MonitoringDetails findInformationPage={findInformationPage} total={total}/>
                                    :
                                    <div>
                                        {
                                            condition && condition.length > 0 ?
                                                <div className="details-tabs-wrap">
                                                    {
                                                        condition.map((item, index) => {
                                                            return (
                                                                <div key={index}>
                                                                    <MonitoringItem
                                                                        reportType={item[0].reportType}
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
                                                <Empty>
                                                    <span>没有数据</span>
                                                </Empty>
                                        }
                                    </div>
                            }
                        </div>
                    </div>
                </Col>
            </Row>
        </Provider>
    );
};

export default observer(MonitorLayout);
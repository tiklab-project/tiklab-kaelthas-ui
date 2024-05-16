import {observer, Provider} from "mobx-react";
import React, {useEffect, useState} from "react";
import {Breadcrumb, Col, DatePicker, Empty, Row, Select,} from "antd";
import MonitoringDetails from "../components/MonitoringDetails";

import monitorLayoutStore, {MonitorLayoutStore} from "../store/MonitorLayoutStore";
import MonitoringItem from "./MonitoringItem";
import moment from "moment";
import SelectItem from "../../../alarm/common/components/SelectItem";
import SelectSimple from "../../../alarm/common/components/Select";
import {withRouter} from "react-router-dom";

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
        findHistory,
        findMonitorByCategories,
        hostState,
        setHostState,
        getDateTime,
        findInformationPage,
        total,
        quickFilterValue,
        setQuickFilterValue
    } = monitorLayoutStore;

    const dataCategories = ['CPU', 'IO', 'memory', 'host', 'internet'];

    const [monitorDataSubclass, setMonitorDataSubclass] = useState([]);

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
        const resData = await findMonitorByCategories();
        setMonitorDataSubclass([...resData])

    }, []);

    async function checkTabGraphics(activeKey) {
        setHostState(activeKey)

        if (activeKey === "2") {
            //根据主机id查询出主机下配置的图表有多少,根据图表查询对应的数据返回
            setSearchCondition({
                beginTime: getDateTime()[0],
                endTime: getDateTime()[1]
            })
            await findInformationByGraphics()
        }

    }

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


    async function onCheckMonitor(value) {
        setSearchCondition({
            hostId: localStorage.getItem("hostId"),
            monitorIdList: value
        })

        await findHistory();

        await findInformationByGraphics();
    }

    async function searchByDataCategories(value) {

        setSearchCondition({
            dataCate: value,
            id: localStorage.getItem("hostId")
        })
        await findHistory();

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

    async function getSubclassName(value) {

        setQuickFilterValue(value);

        if (value === null){
            setSearchCondition({
                dataCate: null,
                id: localStorage.getItem("hostId")
            })
        }else {
            setSearchCondition({
                dataCate: value?.value,
                id: localStorage.getItem("hostId")
            })
        }

        await findHistory();

        await findInformationByGraphics();

        //根据监控大类查询监控小类
        const resData = await findMonitorByCategories();
        setMonitorDataSubclass([...resData])

        return monitorDataSubclass.map(item => ({
            label: item.name,
            key: item.id,
            value: item.id,
        }));
    }


    return (
        <Provider>
            <Row className="details">
                <Col className="details-body" sm={24} md={24} lg={{span: 24}} xl={{span: "22", offset: "1"}}
                     xxl={{span: "18", offset: "3"}}>
                    <div className="details-breadcrumb-table">
                        <Breadcrumb>
                            {/*<Breadcrumb.Item onClick={goBackHome}>
                                <span style={{cursor: "pointer"}}>监控</span>
                            </Breadcrumb.Item>*/}
                            <Breadcrumb.Item>主机:{localStorage.getItem("hostName")}</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="details-table-title">
                            <div className="details-search">
                                <div className="details-select">
                                    <SelectSimple name="quickFilter"
                                                  onChange={(value) => getSubclassName(value)}
                                                  title={`监控大类`}
                                                  ismult={false}
                                                  value={quickFilterValue}
                                                  suffixIcon={true}
                                    >
                                        {
                                            dataCategories.map(item => {
                                                return <SelectItem
                                                    value={item}
                                                    label={`${item}`}
                                                    key={item}

                                                />
                                            })
                                        }
                                    </SelectSimple>
                                </div>

                                <div className="details-select">
                                    <SelectSimple name="quickFilter"
                                                  onChange={(value) => onCheckMonitor(value)}
                                                  title={`监控小类`}
                                                  ismult={true}
                                                  suffixIcon={true}
                                    >
                                        {
                                            monitorDataSubclass.map(item => {
                                                return <SelectItem
                                                    value={item.id}
                                                    label={`${item.name}`}
                                                    key={item.id}
                                                />
                                            })
                                        }
                                    </SelectSimple>

                                </div>
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
                                        onClear={() => checkTime(9)}
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
                        {
                            hostState === '1' ?
                                <MonitoringDetails findInformationPage={findInformationPage} total={total}/>
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
                </Col>
            </Row>
        </Provider>
    );
};

export default withRouter(observer(MonitorLayout));
import React, {useEffect, useRef, useState} from 'react';
import {withRouter} from "react-router-dom";
import * as echarts from "echarts/core";
import monitoringDetailsStore from "../store/MonitoringDetailsStore";

const MonitoringGraphics = (props) => {

    const {resData,descTime} = props;

    const dom = useRef(null);

    const [dataList, setDataList] = useState([]);


    return (
        <div className='echarts'>
            <div id="scatter" className='chart' ref={dom} style={{width: 1000, height: 800}}>

            </div>
        </div>
    );
};

export default withRouter(MonitoringGraphics);
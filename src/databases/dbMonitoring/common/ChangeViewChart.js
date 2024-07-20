import React, {useEffect, useRef, useState} from 'react';
import {Button} from "antd";
import "./ChangeViewChart.scss"
import monitorLayoutStore from "../store/MonitorLayoutStore";

const ChangeViewChart = (props) => {

    const {setPageStatus} = props;

    const [listOpen, setListOpen] = useState(false);

    const [showType,setShowType] = useState({
        value: 2,
        path: "line",
        title: "折线图"
    });

    const dropdownRef = useRef(null);
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setListOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const viewList = [
        {
            value: 2,
            path: "table",
            title: "列表"
        },
        {
            value: 1,
            path: "line",
            title: "折线图"
        },
        {
            value: 3,
            path: "histogram",
            title: "柱状图"
        },
        {
            value: 4,
            path: "area",
            title: "面积图"
        }
    ];

    async function changeChartViewType(value) {
        setShowType(value)
        setPageStatus(value?.value)
        setListOpen(false)
    }

    function changeViewType() {
        setListOpen(!listOpen)
    }

    return (
        <div className="dropdown" ref={dropdownRef}>
            <Button onClick={changeViewType}>
                <svg className="svg-icon" aria-hidden="true">
                    <use xlinkHref={`#icon-${showType?.path}`}></use>
                </svg>
            </Button>
            {
                listOpen ? <div className="view-chart-model">
                        {
                            viewList.map(item => {
                                return <div
                                    key={item.path}
                                    className={`dropdown-item ${item.path === showType?.path ? "view-type-select" : ""}`}
                                    onClick={() => changeChartViewType(item)}>
                                    <svg className="svg-icon" aria-hidden="true">
                                        <use xlinkHref={`#icon-${item.path}`}></use>
                                    </svg>
                                    <div className="dropdown-item-title">
                                        {item.title}
                                    </div>
                                </div>
                            })
                        }
                    </div>
                    :
                    <></>
            }
        </div>
    );
};

export default ChangeViewChart;
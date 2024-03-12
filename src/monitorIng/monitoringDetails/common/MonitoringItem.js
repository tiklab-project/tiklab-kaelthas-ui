import React, {Fragment} from 'react';
import {withRouter} from "react-router-dom";
import DiscountedList from "../components/DiscountedList";
import HistogramList from "../components/HistogramList";
import AreaCharts from "../components/AreaCharts";

const MonitoringItem = (props) => {

    const {reportType} = props;

    return (
        <Fragment>
            {
                (()=> {
                    // console.log(props)
                    switch(reportType) {
                        case 0:
                            return <HistogramList {...props} />
                        case 1:
                            return <AreaCharts {...props} />
                        case 2:
                            return <DiscountedList {...props} />
                        default:
                            return
                    }
                })()
            }
        </Fragment>
    );
};

export default withRouter(MonitoringItem);
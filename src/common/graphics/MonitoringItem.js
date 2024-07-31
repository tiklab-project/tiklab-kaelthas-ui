import React, {Fragment} from 'react';
import {withRouter} from "react-router-dom";
import DiscountedList from "./DiscountedList";
import HistogramList from "./HistogramList";
import AreaCharts from "./AreaCharts";

const MonitoringItem = (props) => {

    const {reportType} = props;

    return (
        <Fragment>
            {
                (()=> {
                    switch(reportType) {
                        case 1:
                            return <DiscountedList {...props} />
                        case 3:
                            return <HistogramList {...props} />
                        case 4:
                            return <AreaCharts {...props} />
                        default:
                            return <HistogramList {...props}/>
                    }
                })()
            }
        </Fragment>
    );
};

export default withRouter(MonitoringItem);
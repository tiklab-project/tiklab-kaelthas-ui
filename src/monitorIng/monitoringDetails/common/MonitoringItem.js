import React, {Fragment} from 'react';
import {withRouter} from "react-router-dom";
import DiscountedList from "../components/DiscountedList";
import HistogramList from "../components/HistogramList";
import AreaCharts from "../components/AreaCharts";

const MonitoringItem = (props) => {

    const {reportType,index} = props;

    return (
        <Fragment>
            {
                (()=> {
                    switch(reportType) {
                        case 1:
                            return <HistogramList {...props} />
                        case 3:
                            return <AreaCharts {...props} />
                        case 4:
                            return <DiscountedList {...props} />
                        default:
                            return <HistogramList {...props}/>
                    }
                })()
            }
        </Fragment>
    );
};

export default withRouter(MonitoringItem);
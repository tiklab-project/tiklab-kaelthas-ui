

import React from 'react';
import "./ProjectLayout.scss"
import {renderRoutes} from "react-router-config";
import {withRouter} from "react-router-dom";
const ProjectLayout = (props) => {
    const {route,dataList,location:{pathname}}=props

    let url=pathname;

    function hrefConfiguration(item) {
        props.history.push(item.url)
    }

    return(
        <div className='project-layout'>
            <div className="project-layout-nav">
                {
                    dataList.map(item => {
                        return (
                            <div key={item.key}
                                 className={`project-layout-tab ${url === item.url ? "project-layout-active" : ""}`}
                                 onClick={() => hrefConfiguration(item)}
                            >
                                {item.name}
                            </div>
                        )
                    })
                }
            </div>
            {
                pathname.includes("/config/")|| pathname.includes("/configs/")?
                    <div className='project-layout-data project-layout-pd'>
                        {renderRoutes(route.routes)}
                    </div>:
                    <div className='project-layout-data '>
                        {renderRoutes(route.routes)}
                    </div>
            }
        </div>
    )

}
export default withRouter(ProjectLayout);

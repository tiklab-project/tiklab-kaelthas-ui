import React from 'react';
import TopList from "../../../common/TopList";
import LeftMenu from "../../../common/LeftMenu";

const Template = () => {
    return (
        <div>
            <TopList/>
            <div className="host-body" >
                <div className="box">
                    <LeftMenu/>
                    <div className="box-right">
                        <div className="box-host-body">
                            this Template body
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Template;
import React, { useEffect, useState, useRef } from "react";
import { withRouter } from "react-router";
import { observer, inject } from "mobx-react";
import "./WorkFilterQuick.scss"
import SelectSimple from "./Select";
import SelectItem from "./SelectItem";

const WorkFilterQuick = (props) => {


    const quickFilterList = [
        {
            value: "all",
            label: "全部"
        },
        {
            value: "resolved",
            label: "已解决"
        },
        {
            value: "unresolved",
            label: "未解决"
        },
    ]

    const selectMenu = (value) => {

        if (value) {
            switch (value) {
                case "all":
                    break;
                case "resolved":
                    break;
                case "unresolved":
                    break;
                default:
                    break;
            }
        }

    }



    return (<div className="work-quick-filter">
        <SelectSimple name="quickFilter"
            onChange={(value) => selectMenu(value)}
            title={`全部`}
            ismult={false}
            value={quickFilterList}
            suffixIcon={true}
        >
            {
                quickFilterList.map(item => {
                    return <SelectItem
                        value={item.value}
                        label={`${item.label}`}
                        key={item.value}

                    />
                })
            }
        </SelectSimple>

    </div>

    )
}
export default withRouter(inject("alarmPageStore")(observer(WorkFilterQuick)));
import React from "react";
import "./Listicon.scss";
import {CaretDownOutlined} from "@ant-design/icons";

const Listicon = ({text, colors}) => {
    return <span className={`mf-listname-icon2`}>
                {text && text}
            <CaretDownOutlined/>
            </span>

}

export default Listicon

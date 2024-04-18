import React from "react";
import "./Listicon.scss";

/**
 * 表格标题首字母，icon
 * @param text：标题
 * @param colors：颜色
 * @returns {JSX.Element}
 * @constructor
 */
const Listicon = ({text,colors}) => {
    return  <span className={`mf-listname-icon ${colors?`mf-icon-${colors}`:"mf-icon-1"}`}>
                {text && text.substring(0,1).toUpperCase()}
            </span>

}

export default Listicon

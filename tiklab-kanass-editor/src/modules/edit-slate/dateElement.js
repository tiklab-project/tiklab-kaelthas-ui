import React, { Fragment, useState } from "react";
import { DatePicker } from "antd";
import moment from 'moment';
import { ReactEditor } from "slate-react";
import { Transforms} from "slate";
const DateElement = (props) => {
    const { element, attributes, children,editor } = props;
    console.log(element)
    const [format, setFormat] = useState("YYYY-MM-DD");
    const [showTime, setShowTime] = useState(false);
    const [value, setValue] = useState(element.dateValue)
    const changTimeType = () => {
        const [showText, setShowText] = useState(false)
        const showTime = () => {
            setFormat("YYYY-MM-DD HH:mm:ss")
            setShowTime(true)
            setShowText(true)
        }
        const hiddenTime = () => {
            setFormat("YYYY-MM-DD")
            setShowTime(false)
            setShowText(false)
        }
        return <>
            {
                showText ? <div onClick={() => hiddenTime()}>
                    隐藏时间
                </div>
                    :
                    <div onClick={() => showTime()}>
                        显示时间
                    </div>
            }

        </>

    }

    const [select, setSelect] = useState()
    const changTime = (date, dateString) => {
        console.log(date, dateString)
        const [path] =  ReactEditor.findPath(editor,element);
        setSelect({
            offset: 0,
            path: [path]
        })
        setValue(dateString)
        Transforms.setNodes(
            editor,
            { type: "date", dateValue: dateString },
            {at: select},
        );
    }
    return <span>
        <span contentEditable={false}>
            <DatePicker
                format={format}
                renderExtraFooter={() => changTimeType()}
                showTime={showTime}
                value = {moment(value, format)}
                onChange = {(date, dateString) => changTime(date, dateString)}
            />
        </span>
        
        {children}
    </span>

}

export default DateElement;
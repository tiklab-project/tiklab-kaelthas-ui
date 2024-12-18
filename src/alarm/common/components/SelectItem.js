import React, {useEffect, useRef, useState} from "react";
import "./SelectItem.scss"
const SelectItem = (props) => {
    const {value, label, key, imgUrl, onChange, selectData, ismult, setShowDropDown, option, children} = props;
    const [checked, setChecked] = useState()
    const selectCheck = useRef()
    const getValue = (e) => {
        e.stopPropagation()
        // event.nativeEvent.stopImmediatePropagation()
        if (ismult) {
            onChange(e.target)
            setChecked(selectData.includes(value))
        } else {
            onChange({label: label, value: value}, option)
            setShowDropDown(false)
        }

    }

    const changeCheck = (e) => {
        e.stopPropagation()
        selectCheck.current.checked = !selectCheck.current.checked

        if (ismult) {
            onChange(selectCheck.current)
            setChecked(selectData.includes(value))
        } else {
            onChange({label: label, value: value}, option)
            setShowDropDown(false)
        }

    }
    useEffect(() => {
        if (ismult) {
            setChecked(selectData.includes(value))
        }

    }, [selectData])
    return (
        <div key={key} className={`select-item ${selectData?.value === value ? 'select-selected':''}`} onClick={(e) => changeCheck(e)}>
            {
                ismult ? <input type="checkbox"
                                id="select-check"
                                ref={selectCheck}
                                value={value}
                                className={`select-input`}
                                onClick={(e) => getValue(e)}
                                checked={checked}
                    />
                    :
                    /*<input type="radio"
                           id="select-check"
                           ref={selectCheck}
                           value={value}
                           className={`select-input`}
                           onClick={(e) => getValue(e)}
                           onChange={(e) => getValue(e)}
                           defaultChecked={selectData?.value === value ? true : false}

                    />*/
                    <div id="select-check"
                         ref={selectCheck}
                         className={`select-input`}
                         onClick={(e) => getValue(e)}
                         onChange={(e) => getValue(e)}
                         defaultChecked={selectData?.value === value ? true : false}
                    ></div>

            }
            {imgUrl && <img className="img-icon-right" src={`${imgUrl}`} width="15" height="15"/>}
            <div className="select-item-text">{label}</div>

        </div>
    )
}
export default SelectItem;
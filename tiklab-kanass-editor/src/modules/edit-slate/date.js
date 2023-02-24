import React,{useState} from "react";
import { inject,observer } from "mobx-react";
import { Transforms, Range, Editor, Text } from "slate";
import "./align.scss"

const DateEditor = (props) => {
    const {active, editor} = props;
    
    const insertDate = () => {
        // Transforms.select(editor, select); 
        const { selection } = editor
        const isCollapsed = selection && Range.isCollapsed(selection)
        const date = {
            type: 'date',
            dateValue: "2023-02-23",
            children: [{ text: "" }]
        }
        if (isCollapsed) {
            Transforms.insertNodes(editor, date)
        }
    }

    return (   
        <span className={`tool-item ${active ? "tool-active" : ""}`} onMouseDown = {()=> insertDate()} key="bold">
            <svg className="slate-iconfont" aria-hidden="true">
                <use xlinkHref="#icon-date"></use>
            </svg>
        </span>
    )
}

export default inject('slatestore')(observer(DateEditor))
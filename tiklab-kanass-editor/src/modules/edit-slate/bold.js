import React,{useState} from "react";
import { inject,observer } from "mobx-react";
import { Transforms, Editor, Text } from "slate";
import { Editable, withReact, useSlate, Slate } from 'slate-react'
import "./align.scss"

const BoldEditor = (props) => {
    const {active, editor} = props;
    
    const selectBold = (event) => {
        event.preventDefault();
        CustomEditor.toggleBoldMark(editor)
    }

    // 富文本方法
    const CustomEditor = {
        isBoldMarkActive(editor) {
            const [match] = Editor.nodes(editor, {
                match: (n) => n.bold === true,
                universal: true,
            });
    
            return !!match;
        },
        toggleBoldMark(editor) {
            console.log(editor)
            const isActive = CustomEditor.isBoldMarkActive(editor);
            Transforms.setNodes(
                editor,
                { bold: isActive ? null : true },
                { match: (n) => Text.isText(n), split: true }
            );
        }
    };

    return (   
        <span className={`tool-item ${active ? "tool-active" : ""}`} onMouseDown = {(event)=> selectBold(event)} key="bold">
            <svg className="slate-iconfont" aria-hidden="true">
                <use xlinkHref="#icon-bold"></use>
            </svg>
        </span>
    )
}

export default inject('slatestore')(observer(BoldEditor))
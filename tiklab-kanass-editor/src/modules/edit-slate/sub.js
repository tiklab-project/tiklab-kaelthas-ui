/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-16 14:47:06
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-10-27 17:15:04
 */
import React from "react";
import { Transforms, Editor, Text, Node } from "slate";
import { Popover  } from 'antd';
const SubEditor = (props) => {
    const {editor, active} = props;

    const selectSub = (event) => {
        event.preventDefault();
        CustomEditor.toggleSubMark(editor)
    }

    // 富文本方法
    const CustomEditor = {
        isSubMarkActive(editor) {
            const [match] = Editor.nodes(editor, {
                match: (n) => n.sub === true,
                universal: true,
            });
    
            return !!match;
        },
        toggleSubMark(editor) {
            const isActive = CustomEditor.isSubMarkActive(editor);
            Transforms.setNodes(
                editor,
                { sub: isActive ? null : true },
                { match: (n) => Text.isText(n), split: true }
            );
        }
    };

    return (   
        <span className={`tool-item ${active ? "tool-active" : ""}`} onMouseDown = {(event)=> selectSub(event)} key="sub">
            {/* <i className="iconfont iconsubscript-2"></i> */}
            <svg className="slate-iconfont" aria-hidden="true">
                <use xlinkHref="#icon-subscript-2"></use>
            </svg>
        </span>
    )
}
export default SubEditor;
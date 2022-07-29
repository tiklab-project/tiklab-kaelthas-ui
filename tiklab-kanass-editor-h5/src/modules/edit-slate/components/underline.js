/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-16 14:47:06
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-08-18 13:57:58
 */
import React from "react";
import { Transforms, Editor, Text, Node } from "slate";
import { inject, observer } from "mobx-react";
const UnderlineEditor = (props) => {
    const {editor} = props;
    const select = editor.selection;

    const selectUnderline = () => {
        event.preventDefault();
        if(!editor.selection){
            Transforms.select(editor, select);
        }
        CustomEditor.toggleUnderlineMark(editor)
    }

    // 富文本方法
    const CustomEditor = {
        isUnderlineMarkActive(editor) {
            const [match] = Editor.nodes(editor, {
                match: (n) => n.underline === true,
                universal: true,
            });
    
            return !!match;
        },
        toggleUnderlineMark(editor) {
            const isActive = CustomEditor.isUnderlineMarkActive(editor);
            Transforms.setNodes(
                editor,
                { underline: isActive ? null : true },
                { match: (n) => Text.isText(n), split: true }
            );
        }
    };

    return (   
        <div onMouseDown = {()=> selectUnderline()} className="botton-item">
            <span className="tool-item" key="underline">
                {/* <i className="iconfont iconunderline"></i> */}
                <svg aria-hidden="true" className="botton-item-icon">
                    <use xlinkHref="#icon-underline"></use>
                </svg>
            </span>
        </div>
    )
}
export default inject('slatestore')(observer(UnderlineEditor))
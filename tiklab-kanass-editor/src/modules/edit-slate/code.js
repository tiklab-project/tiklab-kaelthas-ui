/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-16 14:47:06
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-10-27 15:00:34
 */
import React, { useState } from "react";
import { Transforms, Editor } from "slate";
import "./align.scss"
import { inject, observer } from "mobx-react";
const CodeEditor = (props) => {
    const { editor, slatestore, active } = props;
    const { editorType, setEditorType } = slatestore;

    const selectCode = (event) => {
        event.preventDefault();
        CustomEditor.toggleCodeBlock(editor)
    }

    // 富文本方法
    const CustomEditor = {
        isCodeBlockActive(editor) {
            const [match] = Editor.nodes(editor, {
                match: (n) => n.type === "code",
            });
            return !!match;
        },
        toggleCodeBlock(editor) {
            const isActive = CustomEditor.isCodeBlockActive(editor);
            console.log(editor.selection);
            //, { type: "paragraph", children: [{ text: "" }] }
            Transforms.insertNodes(editor,
                { type: "code", codeValue: '',children: [{text: ""}]}
            );
            Transforms.insertNodes(editor,
                { type: "paragraph", children: [{ text: "" }]}
            );
            console.log(editor.selection);
        },
    };

    return (
        <span className={`tool-item ${active ? "tool-active" : ""}`} onMouseDown={(event) => selectCode(event)} key="code">
            <svg className="slate-iconfont" aria-hidden="true">
                <use xlinkHref="#icon-code-view"></use>
            </svg>
        </span>
    )
}
// export default CodeEditor;
export default inject('slatestore')(observer(CodeEditor))
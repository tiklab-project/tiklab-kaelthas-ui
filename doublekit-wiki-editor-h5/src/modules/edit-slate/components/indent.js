/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-16 14:47:06
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-10-28 17:31:28
 */
import React, { useState } from "react";
import { Transforms, Editor, Element as SlateElement, Text, Range } from "slate";
import { useSelected } from 'slate-react';
import "./indent.scss"
const withIndent = editor => {
    const selected = useSelected();
    const [indent] = Editor.nodes(editor, {
        match: (n) => n.type === 'indent',
    });
    const { isBlock } = editor
    editor.isBlock = element => {
        return element.type === 'indent' ? true : isBlock(element)
    }
    
    return editor
}
const IndentEditor = (props) => {
    const {editor} = props;
    const wrapIndent = (editor) => {
        event.preventDefault()
        CustomEditor.toggleIndentMark(editor)
    }
    const wrapUnIndent = (editor) => {
        event.preventDefault()
        CustomEditor.toggleUnIndentMark(editor)
    }
    const [indent,setIndent] = useState()
    const CustomEditor = {
        isIndentMarkActive(editor) {
            const [match] = Editor.nodes(editor, {
                match: n =>
                    !Editor.isEditor(n) && 
                    SlateElement.isElement(n) &&
                    n.type === "indent" ,
            })
            // console.log(match)
            // match && setIndent([...match])
            return match;
        },
        toggleIndentMark(editor) {
            const isActive = CustomEditor.isIndentMarkActive(editor)
            console.log(indent)
            Transforms.unwrapNodes(editor, {
                match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "indent",
                split: true,
            })
            const block = isActive ? { type: "indent",indent: parseInt(isActive[0].indent) + 2,children: [] } : { type: "indent",indent: "2",children: [] }
            Transforms.wrapNodes(editor, block)
        },
        toggleUnIndentMark(editor) {
            const isActive = CustomEditor.isIndentMarkActive(editor)
            Transforms.unwrapNodes(editor, {
                match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "indent",
                split: true,
            })
            const block = isActive ? { type: "indent",indent: parseInt(isActive[0].indent) - 2,children: [] } : { type: null }
            Transforms.wrapNodes(editor, block)
        }
    };
    return (   
        <div className="indent-editor">
             <div className="indent-item" onMouseDown = {(event) => wrapIndent(editor)}>
                <svg aria-hidden="true" className="botton-item-icon">
                    <use xlinkHref="#icon-indent-increase"></use>
                </svg>
            </div>
            <div className="indent-item" onMouseDown = {(event) => wrapUnIndent(editor)}>
                <svg aria-hidden="true" className="botton-item-icon">
                    <use xlinkHref="#icon-indent-decrease"></use>
                </svg>
            </div>
        </div>
        
        
    )
}
export default IndentEditor;

export { withIndent }
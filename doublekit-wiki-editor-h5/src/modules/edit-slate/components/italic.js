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
const ItalicEditor = (props) => {
    const {editor} = props;
    const select = editor.selection;

    const selectItalic = () => {
        event.preventDefault();
        
        if(!editor.selection){
            Transforms.select(editor, select);
        }
        CustomEditor.toggleItalicMark(editor)
    }

    // 富文本方法
    const CustomEditor = {
        
        isItalicMarkActive(editor) {
            const [match] = Editor.nodes(editor, {
                match: (n) => n.italic === true,
                universal: true,
            });
    
            return !!match;
        },
        toggleItalicMark(editor) {
            
            const isActive = CustomEditor.isItalicMarkActive(editor);
            Transforms.setNodes(
                editor,
                { italic: isActive ? null : true },
                { match: (n) => Text.isText(n), split: true }
            );
        }
    };

    return (   
        <div onMouseDown = {(event)=> selectItalic(event)} className="botton-item">
          <span className="tool-item"  key="italic">
            <svg aria-hidden="true" className="botton-item-icon">
                <use xlinkHref="#icon-italic"></use>
            </svg>
        </span>  
        </div>
        
    )
}
export default inject('slatestore')(observer(ItalicEditor))
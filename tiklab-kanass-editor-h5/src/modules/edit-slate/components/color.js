 /*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-16 14:47:06
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2022-04-23 15:40:17
 */
import React,{useState} from "react";
import { Transforms, Editor, Text, Node } from "slate";
import "./color.scss"
import { inject,observer } from "mobx-react";
const ColorEditor = (props) => {
    const {editor,slatestore} = props;
    const select = editor.selection;

    const colors = [
        {   
            key: "#333333",
            value: "#icon-font-black"
        },
        {   
            key: "#cdcdcd",
            value: "#icon-font-grey"
        },
        {   
            key: "#ff0000",
            value: "#icon-font-red"
        },
        {   
            key: "#f4ea2a",
            value: "#icon-font-yellow-copy"
        },
        {   
            key: "#1afa29",
            value: "#icon-font-green"
        },
        {   
            key: "#0ddcd0",
            value: "#icon-font-indigo"
        },
        {   
            key: "#0000ff",
            value: "#icon-font-blue"
        },
        {   
            key: "#ff00ff",
            value: "#icon-font-purple"
        },
    ]

    const selectColor = (value) => {
        event.preventDefault();
        if(!editor.selection){
            Transforms.select(editor, select);
        }
        CustomEditor.toggleColorMark(editor,value)
    }

    // 富文本方法
    const CustomEditor = {
        isColorMarkActive(editor) {
            const [match] = Editor.nodes(editor, {
                match: (n) => n.color === true,
                universal: true,
            });
    
            return !!match;
        },
        toggleColorMark(editor,color) {
            const isActive = CustomEditor.isColorMarkActive(editor,color);
            Transforms.setNodes(
                editor,
                { color: isActive ? null : color },
                { match: (n) => Text.isText(n), split: true }
            );
            // setIsVisible(!isVisible)
            // //setEditorType("")
        }
    };

    return (
        <div className="color-editor" key="color">
            <div className="color-box">
                {
                    colors.map((item,index)=> {
                        return <div 
                                className="color-item"  
                                key={item.key}
                                onMouseDown = {(event)=>selectColor(item.key)}
                                
                            >
                                 <svg aria-hidden="true" className="botton-item-icon">
                                    <use xlinkHref={item.value}></use>
                                </svg>
                            </div>
                    })
                }
            </div>
        </div>
    )
}
export default inject('slatestore')(observer(ColorEditor))
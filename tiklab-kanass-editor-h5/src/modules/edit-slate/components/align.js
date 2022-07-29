/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-16 14:47:06
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-10-27 15:00:34
 */
import React,{useState} from "react";
import { Transforms, Editor, Element } from "slate";
import "./align.scss"
import { inject,observer } from "mobx-react";
const AlignEditor = (props) => {
    const {editor,slatestore} = props;
    const select = editor.selection;

    const aligns = [
        {   
            value: "left",
            icon: "#icon-align-left"
        },
        {   
            value: "right",
            icon: "#icon-align-right"
        },
        {   
            value: "justify",
            icon: "#icon-align-justify"
        },
        {   
            value: "center",
            icon: "#icon-align-center"
        },
    ]
   
    const selectAlign = (value) => {
        event.preventDefault();
        if(!editor.selection){
            Transforms.select(editor, select);
        }
        CustomEditor.toggleAlignMark(editor,value)
    }

    // 富文本方法
    const CustomEditor = {
        isAlignMarkActive(editor,align) {
            const [match] = Editor.nodes(editor, {
                match: n =>
                    !Editor.isEditor(n) &&
                    Element.isElement(n) &&
                    n.type === "align" && n.align === align,
            })
            return !!match;
        },
        toggleAlignMark(editor,align) {
            const isActive = CustomEditor.isAlignMarkActive(editor,align);
            Transforms.unwrapNodes(editor, {
                match: n => !Editor.isEditor(n) && Element.isElement(n) && n.type === "align",
                split: true,
            })
            const block = { type: "align",align: align, children: [] }
            Transforms.wrapNodes(editor, block)
            // setIsVisible(!isVisible)
            //setEditorType("")
        }
    };

    return (
        <div className="align-editor" key="align">
            <div className="align-box">
                {
                    aligns.map((item,index)=> {
                        return <div 
                                className="align-item"  
                                key={item.value}
                                onMouseDown = {(event)=>selectAlign(item.value)}
                            >
                                <svg aria-hidden="true" className="botton-item-icon">
                                    <use xlinkHref= {item.icon}></use>
                                </svg>
                            </div>
                    })
                }
            </div>
        </div>
    )
}
export default inject('slatestore')(observer(AlignEditor))
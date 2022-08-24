/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2022-04-23 19:10:33
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2022-04-25 09:02:42
 */
import React, { useEffect, useState } from "react";
import "./fontMenuList.scss";
import { Transforms, Editor, Text } from "slate";
import ItalicEditor from "../components/italic";
import StrikeEditor from "../components/strike";
import UnderlineEditor from "../components/underline";
import ColorEditor from "../components/color";
import BackgroundColor from "../components/backgroundColor"
import AlignEditor from "../components/align";
import IndentEditor from "../components/indent";
import UnorderedEditor from "../components/unorderedEditor";
import { ReactEditor } from "slate-react";
const FontMenuList = (props) => {
    const {editor} = props;
    // console.log(editor)
    const [select, setEditorSelect] = useState(editor.selection)
    // useEffect(()=> {
    //     if(editor && editor.select){
    //         setEditorSelect(editor)
    //     }
        
    // })
    // const [sbwy,setSbwy] = useState(editor)

    const CustomEditor = {
        isBoldMarkActive(editor) {
            const [match] = Editor.nodes(editor, {
                match: (n) => n.bold === true,
                universal: true,
            });

            return !!match;
        },

        toggleBoldMark(editor) {
            Transforms.select(editor, select);
            const isActive = CustomEditor.isBoldMarkActive(editor);
            Transforms.setNodes(
                editor,
                { bold: isActive ? null : true },
                { match: (n) => Text.isText(n), split: true }
            );


        }
    };
    return (
        <div className="font-menu-list">
            <div className="font-style">
                <div className="font-style-name">文字样式</div>
                <div className="font-style-botton">
                    <div 
                        className="botton-item"
                        onMouseDown={() => {
                            event.preventDefault();
                            
                            CustomEditor.toggleBoldMark(editor);
                            
                        }}
                    >
                        <svg aria-hidden="true" className="botton-item-icon">
                            <use xlinkHref="#icon-bold"></use>
                        </svg>
                    </div>
                    <ItalicEditor editor={editor}/>
                    <StrikeEditor editor={editor}/>
                    
                    <UnderlineEditor editor={editor}/>
                </div>
            </div>

            <div className="font-color">
                <div className="font-style-name">字体颜色</div>
                <ColorEditor editor = {editor}/>
            </div>

            <div className="font-background">
                <div className="font-style-name">背景颜色</div>
                <BackgroundColor editor = {editor}/>
            </div>

            <div className="font-background">
                <div className="font-style-name">段落样式</div>
                <AlignEditor editor = {editor}/>
            </div>

            <div className="font-background">
                <div className="font-style-name">缩进</div>
                <IndentEditor editor = {editor}/>
            </div>

            {/* <div className="font-background">
                <div className="font-style-name">列表</div>
                <UnorderedEditor editor = {editor}/>
            </div> */}
        </div>
    )
}
export default FontMenuList;
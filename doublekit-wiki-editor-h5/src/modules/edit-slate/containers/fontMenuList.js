/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2022-04-23 19:10:33
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2022-04-25 09:02:42
 */
import React from "react";
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
const FontMenuList = (props) => {
    const {editor} = props;
    const CustomEditor = {
        isBoldMarkActive(editor) {
            const [match] = Editor.nodes(editor, {
                match: (n) => n.bold === true,
                universal: true,
            });

            return !!match;
        },

        isCodeBlockActive(editor) {
            const [match] = Editor.nodes(editor, {
                match: (n) => n.type === "code",
            });

            return !!match;
        },

        isAntdButtonBlockActive(editor) {
            const [match] = Editor.nodes(editor, {
                match: (n) => n.type === "antdButton",
            });

            return !!match;
        },

        toggleBoldMark(editor) {
            const isActive = CustomEditor.isBoldMarkActive(editor);
            Transforms.setNodes(
                editor,
                { bold: isActive ? null : true },
                { match: (n) => Text.isText(n), split: true }
            );


        },

        toggleCodeBlock(editor) {
            const isActive = CustomEditor.isCodeBlockActive(editor);
            Transforms.setNodes(
                editor,
                { type: isActive ? null : "code" },
                { match: (n) => Editor.isBlock(editor, n) }
            );
        },

        toggleAntdButtonBlock(editor) {
            const isActive = CustomEditor.isAntdButtonBlockActive(editor);
            Transforms.setNodes(
                editor,
                { type: isActive ? null : "antdButton" },
                { match: (n) => Editor.isBlock(editor, n) }
            );
        },
    };
    return (
        <div className="font-menu-list">
            <div className="font-style">
                <div className="font-style-name">文字样式</div>
                <div className="font-style-botton">
                    <div 
                        className="botton-item"
                        onMouseDown={(event) => {
                            event.preventDefault();
                            CustomEditor.toggleBoldMark(editor);
                        }}
                    >
                        <svg aria-hidden="true" className="botton-item-icon">
                            <use xlinkHref="#icon-bold"></use>
                        </svg>
                    </div>
                    <div className="botton-item">
                        <ItalicEditor editor={editor} />
                    </div>
                    <div className="botton-item">
                        <StrikeEditor editor={editor} />
                    </div>
                    <div className="botton-item">
                        
				        <UnderlineEditor editor={editor} />

                    </div>
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

            <div className="font-background">
                <div className="font-style-name">列表</div>
                <UnorderedEditor editor = {editor}/>
            </div>
        </div>
    )
}
export default FontMenuList;
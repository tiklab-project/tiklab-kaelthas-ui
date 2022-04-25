/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2022-04-23 16:56:04
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2022-04-23 19:53:49
 */
import React, { useMemo, useState, useCallback, Fragment, useImperativeHandle, useEffect } from "react";
import { createEditor, Transforms, Editor, Text, Node } from "slate";
import "./editorMenu.scss"
import AttUpload from "../components/upload";
import ColorEditor from "../components/color"
import HeadEditor from "../components/head"
import FontSize from "../components/fontSize"
import ItalicEditor from "../components/italic"
import UnderlineEditor from "../components/underline"
import StrikeEditor from "../components/strike"
import LineHeightEditor from "../components/lineHeight"
import BackgroundColor from "../components/backgroundColor"
import LinkEditor from "../components/link"
import TableEditor from "../components/table/table"
import ImageEditor from "../components/image"
import CheckListsEditor from "../components/checkListsEditor"
import UnorderedEditor from "../components/unorderedEditor"
import AlignEditor from "../components/align"
import DividerEditor from "../components/divider"
import IndentEditor from "../components/indent";
import Emoji from "../components/emoji";
import SupEditor from "../components/sup";
import SubEditor from "../components/sub";
import BrEditor, { withBr } from "../components/br";
import FontMenuList from "./fontMenuList";
const EditorMenu = (props) => {
    const { editor } = props;
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
        <div>
            <div className="edit-toolbar">
                <div className="tool-item">
                    <svg aria-hidden="true" className="tool-item-icon">
                        <use xlinkHref="#icon-a-xinjiantianjia"></use>
                    </svg>
                </div>
                <div className="tool-item">
                    <svg aria-hidden="true" className="tool-item-icon">
                        <use xlinkHref="#icon-tupian"></use>
                    </svg>
                </div>
                <div className="tool-item">
                    <svg aria-hidden="true" className="tool-item-icon">
                        <use xlinkHref="#icon-attachment-2"></use>
                    </svg>
                </div>
                <div className="tool-item">
                    <svg aria-hidden="true" className="tool-item-icon">
                        <use xlinkHref="#icon-emphasis-cn"></use>
                    </svg>
                </div>
                <div className="tool-item">
                    <svg aria-hidden="true" className="tool-item-icon">
                        <use xlinkHref="#icon-list-unordered"></use>
                    </svg>
                </div>
                <div className="tool-item">
                    <svg aria-hidden="true" className="tool-item-icon">
                        <use xlinkHref="#icon-guanbi"></use>
                    </svg>
                </div>
                <div className="tool-item">
                    <svg aria-hidden="true" className="tool-item-icon">
                        <use xlinkHref="#icon-select2"></use>
                    </svg>
                </div>
                <div className="tool-item">
                    <svg aria-hidden="true" className="tool-item-icon">
                        <use xlinkHref="#icon-gengduo"></use>
                    </svg>
                </div>
            </div>
            <div>
                <FontMenuList />
            </div>
        </div>

    );
}
export default EditorMenu;
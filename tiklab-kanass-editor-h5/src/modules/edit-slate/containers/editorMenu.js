/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2022-04-23 16:56:04
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2022-04-23 19:53:49
 */
import React, {useState} from "react";
import { Transforms, Editor, Text, Node } from "slate";
import "./editorMenu.scss";
import { Slate, Editable, withReact,useFocused, ReactEditor } from "slate-react";
import FontMenuList from "./fontMenuList";
import ImageMenu from "./imageMenu";
import CheckListsEditor from "../components/checkListsEditor";
import UnorderedEditor from "../components/unorderedEditor";
import HeadEditor from "../components/head"
const EditorMenu = (props) => {
    const { editor, focused, setFocused } = props;
    const [menuType,setMenuType] = useState();
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
    const showFocus = (event) => {
        
        event.preventDefault();
        console.log(editor)
        setFocused(false);
        setMenuType('fontType')
        ReactEditor.blur(editor)
        
    }

    const showImage = (event) => {
        event.preventDefault();
        console.log(editor)
        setFocused(false);
        setMenuType('image')
        ReactEditor.blur(editor)
        
    }
    const showHead = (event) => {
        event.preventDefault();
        setFocused(false);
        setMenuType('head')
        ReactEditor.blur(editor)
        
    }

    return (
        <div className="edit-toolbar" >
            <div className="edit-toolbar-top" >
                <div className="tool-item" onMouseDown={(event) => showImage(event)}>
                    <svg aria-hidden="true" className="tool-item-icon">
                        <use xlinkHref="#icon-a-xinjiantianjia"></use>
                    </svg>
                </div>
                {/* <div className="tool-item">
                    <svg aria-hidden="true" className="tool-item-icon">
                        <use xlinkHref="#icon-tupian"></use>
                    </svg>
                </div>
                <div className="tool-item">
                    <svg aria-hidden="true" className="tool-item-icon">
                        <use xlinkHref="#icon-attachment-2"></use>
                    </svg>
                </div> */}
                <div className="tool-item"  onMouseDown={(event) => showHead(event)}>
                    <svg aria-hidden="true" className="tool-item-icon">
                        <use xlinkHref="#icon-heading"></use>
                    </svg>
                </div>
                
                <div className="tool-item" onMouseDown={(event) => showFocus(event)}>
                    <svg aria-hidden="true" className="tool-item-icon">
                        <use xlinkHref="#icon-emphasis-cn"></use>
                    </svg>
                </div>
                <UnorderedEditor editor = {editor}/>
               
                <div className="tool-item">
                    
                    <CheckListsEditor editor = {editor}/>
                </div>
                <div className="tool-item">
                    <svg aria-hidden="true" className="tool-item-icon">
                        <use xlinkHref="#icon-guanbi"></use>
                    </svg>
                </div>
                <div className="tool-item">
                    <svg aria-hidden="true" className="tool-item-icon">
                        <use xlinkHref="#icon-gengduo"></use>
                    </svg>
                </div>
            </div>
            <div className="edit-tool-bottom">
                {/* <FontMenuList editor = {editor} /> */}
                {
                    !focused && menuType === "fontType" ? <FontMenuList editor = {editor} /> : null
                }
                {
                    !focused && menuType === "image" ? <ImageMenu editor = {editor} /> : null
                }
                {
                    !focused && menuType === "head" ? <HeadEditor editor = {editor}/> : null
                }
                {/* <HeadEditor edi/>tor = {editor}/>  */}
            </div>
        </div>

    );
}
export default EditorMenu;
/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2022-04-23 13:34:34
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2022-04-23 14:20:48
 */
import React, { Fragment, useState } from "react";
import { createEditor } from "slate";
import { Editable, Slate, withReact } from "slate-react";
import Editor from "../edit-slate/editor";
import Menu from "../edit-slate/editorBigMenu";
import EditorContent from "../edit-slate/editorBigContent"
import EditorEdit from "../edit-slate/editorBigMenu";
import PreviewEditor from "../edit-slate/previewEditor";
// showMenu = {true}
const ExampleEditor = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [value, setValue] = useState([
        {
            type: "paragraph",
            children: [{ text: "kkkk" }],
        }
        // ,
        // {   
        //     type: "code",
        //     codeValue: "ss\nadad\n\ns909\n<div></div>",
        //     children: [{ text: "ww" }]
        // }
    ])
    const [editor] = useState(() => withReact(createEditor()))

    const [initialValue, setInitialValue] = useState([
        {
            type: 'paragraph',
            children: [{ text: 'A line of text in a paragraph.' }],
        },
       
    ])

    const submit = (value) => {
        setValue(value)
    }
    return (
        <Fragment>
            <div onClick={() => { setShowMenu(!showMenu) }}>确定</div>
            <Menu editor = {editor}/>
            <EditorContent 
                value={value}
                onChange={value => submit(value)}
                editor = {editor}
            />
        </Fragment>

    )
}
export default ExampleEditor;
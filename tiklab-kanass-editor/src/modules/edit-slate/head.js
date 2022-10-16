/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-16 14:47:06
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-12-20 15:03:58
 */
/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-16 14:47:06
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-08-16 16:10:30
 */
import React,{ useState } from "react";
import { Transforms, Editor, Text, Element as SlateElement, } from "slate";
import { Divider, Select } from 'antd';
import "./head.scss"
import { inject,observer } from "mobx-react";
const { Option } = Select;

const HeadEditor = (props) => {
    const {editor, slatestore, editorValue} = props;
    const {editorType,setEditorType} = slatestore;
    // const [isVisible,setIsVisible] = useState(false)
    const showBox = (event) => {
        event.preventDefault();
        // setIsVisible(!isVisible)
        if(editorType === "head") {
            setEditorType("")
        }else {
            const data = "head"
            setEditorType(data)
        }
    }
    const selectHead = (value) => {
        CustomEditor.toggleHeadMark(editor,value)
    }

    // 富文本方法
    const CustomEditor = {
        isHeadMarkActive(editor, value) {
            const [match] = Editor.nodes(editor, {
                match: (n) => n.type === "head" && n.head === value,
                universal: true,
            });
    
            return !!match;
        },
        toggleHeadMark(editor,value) {
            const isActive = CustomEditor.isHeadMarkActive(editor, value);
            
            // Transforms.unwrapNodes(editor, {
            //     match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "head",
            //     split: true,
            // })

            if (!isActive && value !== "p") {
                const block = { type: "head", children: [] }
                const uuid = (Math.random() + new Date().getTime()).toString(32).slice(0,8)
                // Transforms.wrapNodes(editor, block);
                Transforms.setNodes(
                    editor,
                    { type: "head", head: value, id: uuid}
                    // { match: (n) =>  Editor.isBlock(editor, n) }
                );
                // Transforms.wrapNodes(editor, block)
            }else {
                Transforms.setNodes(
                    editor,
                    {type: "paragraph"},
                    { match: (n) =>  Editor.isBlock(editor, n)}
                );
            }
            setEditorType("")
        }
    }

    const selectContent= (value) => {
        CustomContentEditor.togglContentMark(editor,value)
    }

    // 富文本方法
    const CustomContentEditor = {
        isContentMarkActive(editor) {
            const [match] = Editor.nodes(editor, {
                match: (n) => n.paragraph === true,
                universal: true,
            });
    
            return !!match;
        },
        togglContentMark(editor,value) {
            const isActive = CustomContentEditor.isContentMarkActive(editor);

            Transforms.setNodes(
                editor,
                { type: isActive ? null : "paragraph", paragraph: value},
                { match: (n) =>  Editor.isBlock(editor, n) }
            );

            if (!isActive) {
                const block = { type: "paragraph", children: [] }
                Transforms.wrapNodes(editor, block)
            }
            setEditorType("")
        }
    }


    return (
        <div className="head-editor" key="head">
            <div onMouseDown={(event) => showBox(event)} className = "head-botton">
                文本样式
			</div>
            {
                editorType === "head" && <div className="head-box">
                    <div className={`head-item`} 
                        key = "h1" 
                        onMouseDown = {()=> selectHead("h1")} 
                    >
                        <h1>标题1</h1>
                    </div>
                    <div className="head-item" key = "h2" onMouseDown = {()=> selectHead("h2")}><h2>标题2</h2></div>
                    <div className="head-item" key = "h3" onMouseDown = {()=> selectHead("h3")}><h3>标题3</h3></div>
                    <div className="head-item" key = "h4" onMouseDown = {()=> selectHead("h4")}><h4>标题4</h4></div>
                    <div className="head-item" key = "h5" onMouseDown = {()=> selectHead("h5")}><h5>标题5</h5></div>
                    <div className="head-item" key = "h6" onMouseDown = {()=> selectHead("h6")}><h6>标题6</h6></div>
                    <div className="head-item" key = "p" onMouseDown = {()=> selectHead("p")}><h6>正文</h6></div>
                </div>
            }
        </div>
        
    )
}
// export default HeadEditor;
export default inject('slatestore')(observer(HeadEditor))
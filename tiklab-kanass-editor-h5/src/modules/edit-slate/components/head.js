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
import { Transforms, Editor, Element as SlateElement, } from "slate";
import { Divider, Select } from 'antd';
import "./head.scss"
import { inject,observer } from "mobx-react";
const { Option } = Select;

const HeadEditor = (props) => {
    const {editor, slatestore} = props;
    const {editorType,setEditorType} = slatestore;
    // const [isVisible,setIsVisible] = useState(false)
    const [select, setEditorSelect] = useState(editor.selection)
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
        isHeadMarkActive(editor) {
            const [match] = Editor.nodes(editor, {
                match: (n) => n.head === true,
                universal: true,
            });
    
            return !!match;
        },
        toggleHeadMark(editor,value) {
            Transforms.select(editor, select);
            const isActive = CustomEditor.isHeadMarkActive(editor);
            Transforms.unwrapNodes(editor, {
                match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && (n.type === "numbered-list" || n.type === "bulleted-list" ),
                split: true,
            })

            Transforms.setNodes(
                editor,
                { type: isActive ? null : "head", head: value},
                { match: (n) =>  Editor.isBlock(editor, n) }
            );

            if (!isActive) {
                const block = { type: "head", children: [] }
                Transforms.wrapNodes(editor, block)
            }
        }
    }

    return (
        <div className="head-editor" key="head">
            <div className = "head-title">
                标题
			</div>
            <div className="head-box">
                <div className={`head-item`} 
                    key = "h1" 
                    onMouseDown = {()=> selectHead("h1")} 
                >
                    <h1 className="head-content">标题1</h1>
                </div>
                <div className="head-item" key = "h2" onMouseDown = {()=> selectHead("h2")}><h2 className="head-content">标题2</h2></div>
                <div className="head-item" key = "h3" onMouseDown = {()=> selectHead("h3")}><h3 className="head-content">标题3</h3></div>
                <div className="head-item" key = "h4" onMouseDown = {()=> selectHead("h4")}><h4 className="head-content">标题4</h4></div>
                <div className="head-item" key = "h5" onMouseDown = {()=> selectHead("h5")}><h5 className="head-content">标题5</h5></div>
                <div className="head-item" key = "h6" onMouseDown = {()=> selectHead("h6")}><h6 className="head-content">标题6</h6></div>
            </div>
        </div>
        
    )
}
// export default HeadEditor;
export default inject('slatestore')(observer(HeadEditor))
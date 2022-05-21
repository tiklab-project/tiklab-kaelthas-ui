/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-16 14:47:06
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-08-27 18:22:14
 */
import React,{ Fragment,useState } from "react";
import { Transforms, Editor, Location, Point,Element as SlateElement,Range } from "slate";
import "./image.scss"
const withImage = editor => {
    const { insertData, insertText, isVoid,isInline } = editor
    editor.isVoid = element => {
        return element.type === 'image' ? true : isVoid(element)
    }
    editor.isInline = element => {
        return element.type === 'attachment' ? true : isInline(element)
    }
    // editor.insertText = text => {
    //     if (text) {
    //         wrapImage(editor, text)
    //     } else {
    //         insertText(text)
    //     }
    // }
    // editor.insertData = data => {
    //     const text = data.getData('text/plain')

    //     if (text) {
    //         wrapImage(editor, text)
    //     } else {
    //         insertData(data)
    //     }
    // }
    return editor
}

const ImageEditor = (props) => {
    const {editor} = props;
    const [showFrom,setShowFrom] = useState(false)
    const [select,setImageAnchor] = useState()
    const insertImage = (editor) => {
        console.log(editor)
        event.preventDefault()
        setImageAnchor(editor.selection)
        // setShowFrom(!showFrom)
        
    }
    
    const submit = (editor) => {
        const url = document.getElementsByName("image-url")[0].value;
        if (select) {
            wrapImage(editor, url)
        }
        // setShowFrom(!showFrom)
    }
    const isImageActive = editor => {
        const [image] = Editor.nodes(editor, {
            match: n =>
                !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'image',
        })
        return !!image
    }
    
    const unwrapImage = editor => {
        Transforms.unwrapNodes(editor, {
        match: n =>
            !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'image',
        })
    }
    
    const wrapImage = (editor, url) => {
        if (isImageActive(editor)) {
            unwrapImage(editor)
        }
        Transforms.select(editor, select); 
        const { selection } = editor
        const isCollapsed = selection && Range.isCollapsed(selection)
        const image = {
            type: 'image',
            url,
            children: isCollapsed ? [{ text: "" }] : [],
        }
        if (isCollapsed) {
            Transforms.insertNodes(editor, image)
        } 
        // else {
        //     Transforms.wrapNodes(editor, image, { split: true })
        //     Transforms.collapse(editor, { edge: 'end' })
        // }
    }
    const handleInputChange = (event) =>{
        // 获取当前选中的文件
        const file = event.target.files[0];
        const imgMasSize = 1024 * 1024 * 10; // 10MB

        // 检查文件类型
        if (['jpeg', 'png', 'gif', 'jpg'].indexOf(file.type.split("/")[1]) < 0) {
            // 自定义报错方式
            // Toast.error("文件类型仅支持 jpeg/png/gif！", 2000, undefined, false);
            return;
        }

        // 文件大小限制
        if (file.size > imgMasSize) {
            // 文件大小自定义限制
            // Toast.error("文件大小不能超过10MB！", 2000, undefined, false);
            return;
        }

        // 判断是否是ios
        // if (!!window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        //     // iOS
        //     // transformFileToFormData(file);
        //     console.log(file)
        //     return;
        // }
        upload(file).then(res => {
            console.log(res)
        })

        // 图片压缩之旅
        // transformFileToDataUrl(file);
    }
    return (
        // <div className="image-tool" key="image">
        //     <span className="tool-item" 
        //         onMouseDown = {(event) => 
        //             {
                        
        //                 insertImage(editor)
        //             }
        //         }
        //     >
        //         <i className="iconfont iconimage"></i>
        //     </span>
        //     {
        //         showFrom &&  <div className="image-from">
        //             <span>url: </span><input type="text" name="image-url"/>
        //             <div onClick={() => submit(editor)}>确定</div>
        //         </div>
        //     }   
        // </div>
        <div className="attachment ">
            <input type="file" name="image" accept="image/*" onChange= {(event) => handleInputChange(event)} />
            <div className="attachment-botton">附件</div>
        </div>
        
    )
}
export default ImageEditor;

export {withImage};

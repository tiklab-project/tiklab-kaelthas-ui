/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-16 09:08:38
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2022-04-23 14:02:38
 */
import React, { useState } from 'react';
import { Point, Transforms, Editor, Element as SlateElement, Range } from 'slate'
import "./upload.scss";
// const { TabPane } = Tabs;
const AttUpload = (props) => {
	const { editor,upload } = props
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [select, setImageAnchor] = useState(editor.selection)
	console.log(editor)
	const showModal = (event) => {
		event.preventDefault();
		console.log(editor)
		if(editor.selection){
			setImageAnchor(editor.selection)
		}
	};

	const handleInputChange = (event) =>{
        // 获取当前选中的文件
        const file = event.target.files[0];
        const imgMasSize = 1024 * 1024 * 10; // 10MB

        // 检查文件类型
        if (file && file.type && ['jpeg', 'png', 'gif', 'jpg', 'plain'].indexOf(file.type.split("/")[1]) < 0) {
           
            return;
        }

        // 文件大小限制
        if (file.size > imgMasSize) {
            return;
        }
		console.log(file)
        upload(file).then(res => {
            if(res.data.code === 0){
				const type = res.data.data.fileMeta.fileType;
				const imgUrl = (base_url === "/" ? window.location.origin : base_url);
				if (select) {
					if(type === "txt") {
						wrapAttachment(editor, `${imgUrl}/file/${res.data.data.fileName}`, res.data.data.fileMeta.originFileName)
					}else if(type === "png" || type === "jpeg" || type === "jpg"){
						wrapImage(editor, `${imgUrl}/file/${res.data.data.fileName}`)
					}
					
				}
			}
        })

        // 图片压缩之旅
        // transformFileToDataUrl(file);
    }



	const wrapImage = (editor, url) => {
		Transforms.select(editor, select);
		const { selection } = editor
		const isCollapsed = selection && Range.isCollapsed(selection)
		let editorEnd = Editor.end(editor, []); 
		let [selectionStart, selectionEnd] = Range.edges(selection); 
		let isEditorEnd = false; 
		if (selection) { 
			if (Point.equals(editorEnd, selectionEnd)){ 
				isEditorEnd = true; 
			} 
		}
		
		const image = {
			type: 'image',
			url,
			children: isCollapsed ? [{ text: "" }] : [],
		}
		if (isCollapsed) {
			Transforms.insertNodes(editor, image)
			editor.insertBreak(editor)
			setIsModalVisible(false);

		}
		if(isCollapsed && isEditorEnd) {
			Transforms.insertNodes(editor, {type: 'paragraph', children: [{ text: '' }]}); 
			// Transforms.select(editor, editorEnd); 
			setIsModalVisible(false);
			let anchor = selection.anchor;
			let path = anchor.path.map((item) => item);
			path[path.length - 2]+=2;
		}
	}

	const wrapAttachment = (editor, url, fileName) => {
		Transforms.select(editor, select);
		const { selection } = editor
		const isCollapsed = selection && Range.isCollapsed(selection)
		let editorEnd = Editor.end(editor, []); 
		let [selectionStart, selectionEnd] = Range.edges(selection); 
		let isEditorEnd = false; 
		if (selection) { 
			if (Point.equals(editorEnd, selectionEnd)){ 
				isEditorEnd = true; 
			} 
		}
		
		const attachment = {
			type: 'attachment',
			url,
			children: isCollapsed ? [{ text: fileName }] : [],
		}
		if (isCollapsed) {
			Transforms.insertNodes(editor, attachment)
			setIsModalVisible(false);
		}
	}
	return (
		<div className="attachment" onMouseDown = {(event) => showModal(event)}>
			<input type="file" name="image" accept="file" onChange= {(event) => handleInputChange(event)} className = "attachment-input"/>
			<div className="attachment-botton">附件</div>
		</div>
	);
};

export default AttUpload;


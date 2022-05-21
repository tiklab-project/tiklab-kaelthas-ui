/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-16 09:08:38
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2022-04-23 14:02:38
 */
import React, { useState } from 'react';
import { Modal, Upload, message, Input, Form, Button } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { Point, Transforms, Editor, Element as SlateElement, Range } from 'slate'
import "./upload.scss"
import Tabs from "./tabs"
const { Dragger } = Upload;
// const { TabPane } = Tabs;
const AttUpload = (props) => {
	const { editor,upload } = props
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [select, setImageAnchor] = useState()
	console.log(editor)
	const showModal = (event) => {
		event.preventDefault();
		setImageAnchor(editor.selection)
		// setIsModalVisible(!isModalVisible);
	};

	const handleOk = () => {
		setIsModalVisible(false);

	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};
	const ticket = "";
	const handleInputChange = (event) =>{
        // 获取当前选中的文件
        const file = event.target.files[0];
        const imgMasSize = 1024 * 1024 * 10; // 10MB

        // 检查文件类型
        if (file && file.type && ['jpeg', 'png', 'gif', 'jpg', 'plain'].indexOf(file.type.split("/")[1]) < 0) {
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
            if(res.data.code === 0){
				const type = res.data.data.fileMeta.fileType;
				if (select) {
					if(type === "txt") {
						wrapAttachment(editor, `${base_url}/file/${res.data.data.fileName}`)
					}else if(type === "png" || type === "jpeg" || type === "jpg"){
						wrapImage(editor, `${base_url}/file/${res.data.data.fileName}`)
					}
					
				}
			}
        })

        // 图片压缩之旅
        // transformFileToDataUrl(file);
    }

	const onFinish = (value) => {
		console.log(value)
		wrapImage(editor, "http://127.0.0.1:3001/images/logo.png")
		setIsModalVisible(false);
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
			// Transforms.select(editor, {path,offset: 0 });
			// Transforms.select(editor,{
			// 	anchor: { path: [2, 0], offset: 0 },
			// 	focus: { path: [2, 0], offset: 0 },
			// })
			// console.log(editor.selection)
		}
	}

	const wrapAttachment = (editor, url) => {
		debugger
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
			children: isCollapsed ? [{ text: "" }] : [],
		}
		if (isCollapsed) {
			Transforms.insertNodes(editor, attachment)
			setIsModalVisible(false);
		}
	}
	return (
		// <div className = "upload-editor" key="upload">
		// 	<span onMouseDown={(event) => showModal(event)}>
		// 		<i className="iconfont iconimage" style={{fontWeight: 600}}></i>
		// 	</span>
		// 	{
		// 		isModalVisible && <div className="upload-box">
		// 			<Tabs>
		// 				<div name="本地文件" key = "1">
		// 					<Dragger {...params}>
		// 						<p className="ant-upload-drag-icon">
		// 							<InboxOutlined />
		// 						</p>
		// 						<p className="ant-upload-text">点击上传</p>
		// 						<p className="ant-upload-hint">
		// 							支持拖拽上传
		// 						</p>
		// 					</Dragger>
		// 				</div>
		// 				<div name="网络文件" className="upload-url" key="2">
		// 					<Form
		// 						name="basic"
		// 						labelCol={{ span: 8 }}
		// 						wrapperCol={{ span: 16 }}
		// 						initialValues={{ remember: true }}
		// 						onFinish={onFinish}
		// 					>
		// 						<Form.Item
		// 							label="url"
		// 							name="url"
		// 							rules={[{ required: true, message: '请输入地址' }]}
		// 						>
		// 							<Input />
		// 						</Form.Item>
		// 						<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
		// 							<Button type="primary" htmlType="submit">
		// 								确定
		// 							</Button>
		// 						</Form.Item>
		// 					</Form>
		// 				</div>
		// 			</Tabs>
		// 		</div>
		// 	}
		// </div>
		<div className="attachment" onMouseDown = {(event) => showModal(event)}>
			<input type="file" name="image" accept="file" onChange= {(event) => handleInputChange(event)} />
			<div className="attachment-botton">附件</div>
		</div>
	);
};

export default AttUpload;


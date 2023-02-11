import React, { useMemo, useState, useCallback, Fragment, useImperativeHandle, useEffect, useRef } from "react";
import { createEditor, Transforms, Editor, Text, Node } from "slate";
import { inject, observer, Provider } from "mobx-react";
import renderElement from "../components/renderElement"
import "./editor.scss";
import { Slate, Editable, withReact,useFocused, ReactEditor } from "slate-react";

import { withLinks } from "../components/link"
import { withImage } from "../components/image"
import { withChecklists } from "../components/checkListsEditor"
import { withDivider } from "../components/divider"
import { withEmoji } from "../components/emoji";
import {withUnordered} from "../components/unorderedEditor"
import Leaf from "../components/leaf"
import withTables from "../components/table/withTables"
import EditorMenu from "./editorMenu";
import "../../../assets/index"
import { store } from "../../../stores";
// 定义我们的应用…
const DocumentEditor = observer((props) => {
	console.log(props)
	const { onChange, value, showMenu} = props;

	const [editor] = useState(() => withUnordered(withEmoji(withDivider(withChecklists(withImage(withTables(withLinks(withReact(createEditor())))))))));
	// 设置应用创建时的初始状态。
	// Define a leaf rendering function that is memoized with `useCallback`.
	const [focused,setFocused ] = useState(false);
	const windowInnerHerght = document.documentElement.clientHeight;
	
	const renderLeaf = useCallback((props) => {
		return <Leaf {...props} />;
	}, []);

	const focusEidtor = (event) => {
		// console.log("ewwrwr",ReactEditor.isFocused(editor))
		// 
		// event.preventDefault()
		setFocused(true);
		// focusIos()
		console.log(document.documentElement.clientHeight)
		console.log(document.body.clientHeight)
		ReactEditor.focus(editor)
		// console.log(ReactEditor.toDOMNode(editor, editor))
		return 0;

	}

	const keyOut = () => {
		document.getElementById("editorEdit").clientHeight
		console.log(document.documentElement.clientHeight, document.body.clientHeight, document.getElementById("editorEdit"))
	}

	const focusIos = () => {
			// isIOS(）是判断是否为ios，是进行处理，不是将定位改为固定定位即可
		const ua = window.navigator.userAgent.toLocaleLowerCase();
		const isIOS = /iphone|ipad|ipod/.test(ua);

		if (isIOS) {
		// 监听窗口大小的变化
			window.visualViewport.addEventListener('resize', () => {
				var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
				// window.innerHeight，返回窗口的文档显示区的高度
				// window.visualViewport.height：返回视觉视口的高度所对应的 CSS 像素数。
				if (window.innerHeight - window.visualViewport.height > 0) {
				document.getElementsByClassName('edit-toolbar')[0].style.bottom =
					window.innerHeight -
					window.visualViewport.height -
					Math.abs(window.innerHeight - windowInnerHerght) -
					scrollHeight +
					'px';
					return;
				}
			});
		};
	}

		
	return (
		<Provider {...store}>
		<div id = "editorEdit">
			<Slate
				editor={editor}
				value={value}
				onChange={(value) => onChange(value)}
				className="slate" 
			>
				
				{
					showMenu ?  <EditorMenu 
						editor={editor} 
						focused = {focused} 
						setFocused = {setFocused}
					/> : null
				}
				<Editable 
					renderElement= {useCallback(renderElement, [])} 
					renderLeaf= {renderLeaf} 
					className="edit-box" 
					onMouseDown = {event => focusEidtor(event)} 
					onClick = {() => keyOut()}
					readOnly= {!showMenu}
					// onBlur = {() => {setFocused(false)}}
				/> 
				
			</Slate>
		</div>
		</Provider>

	);
});
export default DocumentEditor;

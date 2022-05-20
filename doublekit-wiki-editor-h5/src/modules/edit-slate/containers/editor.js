import React, { useMemo, useState, useCallback, Fragment, useImperativeHandle, useEffect, useRef } from "react";
import { createEditor, Transforms, Editor, Text, Node } from "slate";
import { inject, observer } from "mobx-react";
import renderElement from "../components/renderElement"
import "./editor.scss";
import { Slate, Editable, withReact,useFocused, ReactEditor } from "slate-react";

import { withLinks } from "../components/link"
import { withImage } from "../components/image"
import { withChecklists } from "../components/checkListsEditor"
import { withDivider } from "../components/divider"
import { withEmoji } from "../components/emoji"
import Leaf from "../components/leaf"
import withTables from "../components/table/withTables"
import EditorMenu from "./editorMenu";

// 定义我们的应用…
const DocumentEditor = (props) => {
	const { onChange, value, slatestore } = props;
	const {setShowMenu,showMenu} = slatestore;
	const [editor] = useState(() => withEmoji(withDivider(withChecklists(withImage(withTables(withLinks(withReact(createEditor()))))))));
	// 设置应用创建时的初始状态。
	// Define a leaf rendering function that is memoized with `useCallback`.
	const [focused,setFocused ] = useState(true);
	const eidtableRef = useRef();
	const renderLeaf = useCallback((props) => {
		return <Leaf {...props} />;
	}, []);
 
	const sb = (event) => {
		// console.log("ewwrwr",ReactEditor.isFocused(editor))
		// 
		// event.preventDefault()
		setFocused(true);
		console.log("sb1")
		// ReactEditor.focus(editor)
		// console.log(ReactEditor.toDOMNode(editor, editor))
		return 0;

	}
	const [isReadOnly, setIsReadOnly] = useState(false)
	return (
		<div>
			<div className="title">
				<svg aria-hidden="true" className="back-icon">
					<use xlinkHref="#icon-fanhui"></use>
				</svg>
			</div>
			<Slate
				editor={editor}
				value={value}
				onChange={(value) => onChange(value)}
				readOnly= {isReadOnly}
				
				// onChange={(value) => setValue(value)}
			>

				<Editable renderElement= {useCallback(renderElement, [])} renderLeaf= {renderLeaf} className="edit-box" onMouseDown = {event => sb(event)}/>
				<EditorMenu 
					editor={editor} 
					focused = {focused} 
					setFocused = {setFocused}
				/>
			</Slate>
		</div>

	);
};
export default inject('slatestore')(observer(DocumentEditor))

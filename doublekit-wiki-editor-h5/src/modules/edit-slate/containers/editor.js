import React, { useMemo, useState, useCallback, Fragment, useImperativeHandle, useEffect } from "react";
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
	const renderLeaf = useCallback((props) => {
		return <Leaf {...props} />;
	}, []);
 
	const focus = useFocused();
	console.log(useFocused())
	const onClick = () => {
		console.log("ewwrwr",ReactEditor.isFocused(),focus)
		// setShowMenu(!showMenu)
	}
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
			// onChange={(value) => setValue(value)}
			>

				<Editable renderElement={useCallback(renderElement, [])} renderLeaf={renderLeaf} className="edit-box" onClick={onClick}/>
				<EditorMenu editor={editor} showMenu = {showMenu} />
			</Slate>
		</div>

	);
};
export default inject('slatestore')(observer(DocumentEditor))

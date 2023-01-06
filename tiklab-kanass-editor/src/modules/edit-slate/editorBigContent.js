import React, { useMemo, useState, useCallback, Fragment, useImperativeHandle, useEffect } from "react";
import { createEditor, Transforms, Editor, Text, Location, PointRef } from "slate";
import "./editorBig.scss";
// Import the Slate components and React plugin.
import { Slate, Editable, withReact, ReactEditor, useSlateStatic } from "slate-react";


import LinkEditor, { withLinks } from "./link"
import ImageEditor, { withImage } from "./image"
import CheckListsEditor, { withChecklists } from "./checkListsEditor"
import DividerEditor, { withDivider } from "./divider"
import Emoji, { withEmoji } from "./emoji"
import { inject, observer } from "mobx-react";
import renderElement from "./renderElement"
import Leaf from "./leaf"
import withTables from "./table/table/withTables"

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

// 定义我们的应用…
const EditorBigContent = (props) => {
	const { onChange, value, focusEditor, minHeight, editor } = props;
	const renderLeaf = useCallback((props) => {
		return <Leaf {...props} />;
	}, []);

	useEffect(() => {
		if (focusEditor) {
			// ReactEditor.focus(editor);
			return;
		}

	}, [])

	const setTree = () => {
		let paddingHead = [0, 0, 0, 0, 0, 0]

		const heads = value.filter(item => item.type === "head")
		heads.map(item => {
			switch (item.head) {
				case "h1":
					paddingHead[0] = 1;
					break;
				case "h2":
					paddingHead[1] = 1;
					break;
				case "h3":
					paddingHead[2] = 1;
					break;
				case "h4":
					paddingHead[3] = 1;
					break;
				case "h5":
					paddingHead[4] = 1;
					break;
				case "h6":
					paddingHead[5] = 1;
					break;
				default:
					break;
			}
		});
		let paddingLength = [0, 0, 0, 0, 0, 0];
		paddingLength[0] = paddingHead[0];
		paddingLength[1] = paddingLength[0] + paddingHead[1];
		paddingLength[2] = paddingLength[1] + paddingHead[2];
		paddingLength[3] = paddingLength[2] + paddingHead[3];
		paddingLength[4] = paddingLength[3] + paddingHead[4];
		paddingLength[5] = paddingLength[4] + paddingHead[5];
		return paddingLength;
	}

	const jump = (id) => {
		document.getElementById(id).scrollIntoView(true);
	}
	const categray = (item, index) => {
		let head = setTree();
		switch (item.head) {
			case "h1":
				return <div key={index} className="catelog-list" style={{ paddingLeft: head[0] * 10 }} onClick={() => jump(item.id)}>{item.children[0].text}</div>
			case "h2":
				return <div key={index} className="catelog-list" style={{ paddingLeft: head[1] * 10 }} onClick={() => jump(item.id)}>{item.children[0].text}</div>
			case "h3":
				return <div key={index} className="catelog-list" style={{ paddingLeft: head[2] * 10 }} onClick={() => jump(item.id)}>{item.children[0].text}</div>
			case "h4":
				return <div key={index} className="catelog-list" style={{ paddingLeft: head[3] * 10 }} onClick={() => jump(item.id)}>{item.children[0].text}</div>
			case "h5":
				return <div key={index} className="catelog-list" style={{ paddingLeft: head[4] * 10 }} onClick={() => jump(item.id)}>{item.children[0].text}</div>
			case "h6":
				return <div key={index} className="catelog-list" style={{ paddingLeft: head[5] * 10 }} onClick={() => jump(item.id)}>{item.children[0].text}</div>
		}
	}

	const clickKey = (event) => {
		switch (event.keyCode) {
			case 13:
				const [match] = Editor.nodes(editor, {
					match: n => n.type === 'head',
				})
				console.log(match)
				if (match && match[0].type === "head") {
					Transforms.setNodes(
						editor,
						{ type: 'paragraph' }
					)
				}
				break;

			default:
				break;
		}
	}

	return (
		<Slate
			editor={editor}
			value={value}
			onChange={(value) => onChange(value)}
		>

			<Editable
				renderElement={useCallback((props) => renderElement(props, editor), [])}
				renderLeaf={renderLeaf}
				className="edit-box"
				style={{ minHeight: minHeight }}
				onKeyUp={event => clickKey(event)}
			/>
		</Slate>


	);
};
export default inject('slatestore')(observer(EditorBigContent))
import React, { useMemo, useState, useCallback, Fragment, useImperativeHandle, useEffect } from "react";
import { createEditor, Transforms, Editor, Text, Location, PointRef } from "slate";
import "./editor.scss";
// Import the Slate components and React plugin.
import { Slate, Editable, withReact, ReactEditor, useSlateStatic } from "slate-react";

import AttUpload from "./upload";
import ColorEditor from "./color"
import HeadEditor from "./head"
import FontSize from "./fontSize"
import ItalicEditor from "./italic"
import CodeEditor from "./code"
import UnderlineEditor from "./underline"
import StrikeEditor from "./strike"
import LineHeightEditor from "./lineHeight"
import BackgroundColor from "./backgroundColor"
import LinkEditor, { withLinks } from "./link"
import TableEditor from "./table/table/table"
import ImageEditor, { withImage } from "./image"
import CheckListsEditor, { withChecklists } from "./checkListsEditor"
import UnorderedEditor from "./unorderedEditor"
import AlignEditor from "./align"
import DividerEditor, { withDivider } from "./divider"
import IndentEditor from "./indent"
import Emoji, { withEmoji } from "./emoji"
// import { withHistory } from 'slate-history'
import { inject, observer } from "mobx-react";
import renderElement from "./renderElement"
import Leaf from "./leaf"
import withTables from "./table/table/withTables"
import SupEditor from "./sup"
import SubEditor from "./sub";
import CodeBlock from "./codeBlock"

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
const DocumentEditor = (props) => {
	const { onChange, value, focusEditor, minHeight } = props;
	const editor = useMemo(
		() => withEmoji(withDivider(withChecklists(withImage(withTables(withLinks(withReact(createEditor()))))))),
		[]
	);
	// 设置应用创建时的初始状态。
	// Define a leaf rendering function that is memoized with `useCallback`.
	const renderLeaf = useCallback((props) => {
		return <Leaf {...props} />;
	}, []);

	// const onClick = () => {
	// 	console.log("dsfsf")
	// 	setShowMenu(false)
	// }
	useEffect(() => {
		if (focusEditor) {
			ReactEditor.focus(editor);
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
				return <div key={index} className="categray-list" style={{ paddingLeft: head[0] * 10 }} onClick={() => jump(item.id)}>{item.children[0].text}</div>
			case "h2":
				return <div key={index} style={{ paddingLeft: head[1] * 10 }} onClick={() => jump(item.id)}>{item.children[0].text}</div>
			case "h3":
				return <div key={index} style={{ paddingLeft: head[2] * 10 }} onClick={() => jump(item.id)}>{item.children[0].text}</div>
			case "h4":
				return <div key={index} style={{ paddingLeft: head[3] * 10 }} onClick={() => jump(item.id)}>{item.children[0].text}</div>
			case "h5":
				return <div key={index} style={{ paddingLeft: head[4] * 10 }} onClick={() => jump(item.id)}>{item.children[0].text}</div>
			case "h6":
				return <div key={index} style={{ paddingLeft: head[5] * 10 }} onClick={() => jump(item.id)}>{item.children[0].text}</div>
		}
	}

	const clickKey = (event) => {
		switch (event.keyCode) {
			case 13:
				const [match] = Editor.nodes(editor, {
					match: n => n.type === 'head',
				})
				if (!!match) {
					Transforms.setNodes(
						editor,
						{ type: !!match ? null : 'paragraph' },
						{ match: n => Editor.isBlock(editor, Editor) }
					)
				}
				break;
			default:
				break;
		}
	}

	return (
		<Fragment>
			<div className="edit">
				<div>
					<Slate
						editor={editor}
						value={value}
						onChange={(value) => onChange(value)}

					// onChange={(value) => setValue(value)}
					>
						<div className="edit-toolbar">
							<span
								className="tool-item"
								onMouseDown={(event) => {
									event.preventDefault();
									CustomEditor.toggleBoldMark(editor);
								}}
							>
								{/* <i className="iconfont iconbold"></i> */}
								<svg className="slate-iconfont" aria-hidden="true">
									<use xlinkHref="#icon-bold"></use>
								</svg>
							</span>
							{/* <span
							className="tool-item"
							onMouseDown={(event) => {
								event.preventDefault();
								CustomEditor.toggleCodeBlock(editor);
							}}
						>
							<svg className="slate-iconfont" aria-hidden="true">
								<use xlinkHref="#icon-code-view"></use>
							</svg>
						</span> */}
							<CodeEditor editor={editor} />
							<ItalicEditor editor={editor} />
							<UnderlineEditor editor={editor} />
							<StrikeEditor editor={editor} />
							<SupEditor editor={editor} />
							<SubEditor editor={editor} />
							<CheckListsEditor editor={editor} />
							{/* <BrEditor editor={editor} /> */}

							<AttUpload editor={editor} />



							<LinkEditor editor={editor} />
							<TableEditor editor={editor} />

							<UnorderedEditor editor={editor} />
							<DividerEditor editor={editor} />
							<IndentEditor editor={editor} />
							<Emoji editor={editor} />

							<AlignEditor editor={editor} />
							<ColorEditor editor={editor} />
							<BackgroundColor editor={editor} />
							<HeadEditor editor={editor} editorValue={value} />
							<FontSize editor={editor} />
							<LineHeightEditor editor={editor} />
						</div>

						<Editable
							renderElement={useCallback((props) => renderElement(props, editor), [])}
							renderLeaf={renderLeaf}
							className="edit-box"
							style={{ minHeight: minHeight }}
							onKeyUp={event => clickKey(event)}
							onFocus = {() => console.log(editor, Location, PointRef.current)}
						// readOnly= {sh owMenu}
						/>
					</Slate>
				</div>
				<div className="edit-catalog">
					<div className="catelog-title">目录</div>
					<div>
						{
							value && value.length > 0 && value.map((item, index) => {
								if (item.type === "head") {
									return categray(item, index)
								} else {
									return null
								}
							})
						}
					</div>
				</div>
				
			</div>
		</Fragment>


	);
};
export default inject('slatestore')(observer(DocumentEditor))
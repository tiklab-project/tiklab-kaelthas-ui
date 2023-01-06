import React, { useMemo, useState, useCallback, Fragment, useImperativeHandle, useEffect } from "react";
import { createEditor, Transforms, Editor, Text, Location, PointRef } from "slate";
import "./editorBig.scss";
// Import the Slate components and React plugin.
import { withReact } from "slate-react";

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
// const editor = useMemo(
// 	() => withEmoji(withDivider(withChecklists(withImage(withTables(withLinks(withReact(createEditor()))))))),
// 	[]
// );
// 定义我们的应用…
const EditorBigMenu = (props) => {
	const { value, height, editor } = props;
	

	return (
		<Fragment>
			<div className="edit-big" style={{ height: height }}>
				<div>
					<div className="edit-big-toolbar">
						<span
							className="tool-item"
							onMouseDown={(event) => {
								event.preventDefault();
								CustomEditor.toggleBoldMark(editor);
							}}
						>
							<svg className="slate-iconfont" aria-hidden="true">
								<use xlinkHref="#icon-bold"></use>
							</svg>
						</span>
						<CodeEditor editor={editor} />
						<ItalicEditor editor={editor} />
						<UnderlineEditor editor={editor} />
						<StrikeEditor editor={editor} />
						<SupEditor editor={editor} />
						<SubEditor editor={editor} />
						<CheckListsEditor editor={editor} />
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
				</div>
			</div>
		</Fragment>


	);
};
export default inject('slatestore')(observer(EditorBigMenu))
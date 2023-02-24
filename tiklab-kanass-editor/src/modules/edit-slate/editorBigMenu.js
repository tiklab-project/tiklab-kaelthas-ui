import React, { useMemo, useState, useCallback, Fragment, useImperativeHandle, useEffect, Children } from "react";
import "./editorBig.scss";
import { Editable, withReact, useSlate, Slate } from "slate-react";
import { createEditor, Transforms, Editor, Element as SlateElement } from "slate";


import AttUpload from "./upload";
import ColorEditor from "./color"
import HeadEditor from "./head"
import FontSize from "./fontSize"
import ItalicEditor from "./italic"
import BoldEditor from "./bold"
import CodeEditor from "./code"
import UnderlineEditor from "./underline"
import StrikeEditor from "./strike"
import LineHeightEditor from "./lineHeight"
import BackgroundColor from "./backgroundColor"
import LinkEditor, { withLinks } from "./link"
import TableEditor from "./table/table/table"
import CheckListsEditor, { withChecklists } from "./checkListsEditor"
import UnorderedEditor from "./unorderedEditor"
import AlignEditor from "./align"
import DividerEditor, { withDivider } from "./divider"
import IndentEditor from "./indent"
import Emoji, { withEmoji } from "./emoji"
import { inject, observer } from "mobx-react";
import SupEditor from "./sup"
import SubEditor from "./sub"
import Date from "./date";
import CodeBlock from "./codeBlock"


// 定义我们的应用…
const EditorBigMenu = (props) => {
	const { value, height } = props;

	const editor = useSlate()
	const isMarkActive = (editor, format) => {
		const marks = Editor.marks(editor)
		return marks ? marks[format] === true : false
	}

	const isBlockActive = (editor, format, blockType) => {
		const { selection } = editor
		if (!selection) return false

		
		const [match] = Array.from(
			Editor.nodes(editor, {
				at: Editor.unhangRange(editor, selection),
				match: n =>
					!Editor.isEditor(n) &&
					SlateElement.isElement(n) &&
					n[blockType] === format,
			})
		)
		console.log(match)
		return !!match
	}

	const isAlignActive = (editor, blockType) => {
		const { selection } = editor
		if (!selection) return false

		const [match] = Array.from(
			Editor.nodes(editor, {
				at: Editor.unhangRange(editor, selection),
				match: n =>
					!Editor.isEditor(n) &&
					SlateElement.isElement(n) &&
					n.type === blockType
			})
		)
		const type = match ? match[0][blockType] : null;

		return type
	}

	const isColorActive = (editor, format) => {
		const marks = Editor.marks(editor)
		return marks ? marks[format] : null
	}

	// useEffect(() => {
	//     isAlignActive(editor, "left")
	//     return
	// },[])

	return (
		<div className="edit-big" style={{ height: height }}>
			<div className="edit-big-toolbar">
				<BoldEditor editor={editor} active={isMarkActive(editor, "bold")} />
				<CodeEditor editor={editor} active={isBlockActive(editor, "code", "type")} />
				<ItalicEditor editor={editor} active={isMarkActive(editor, "italic")} />
				<UnderlineEditor editor={editor} active={isMarkActive(editor, "underline")} />
				<StrikeEditor editor={editor} active={isMarkActive(editor, "strike")} />
				<SupEditor editor={editor} active={isMarkActive(editor, "sup")} />
				<SubEditor editor={editor} active={isMarkActive(editor, "sub")} />
				<CheckListsEditor editor={editor} active={isBlockActive(editor, "check-list-item", "type")} />
				<DividerEditor editor={editor} />

				<IndentEditor editor={editor} isBlockActive={isBlockActive} />
				<UnorderedEditor editor={editor} isBlockActive={isBlockActive} />
				<div className="block-menu">
					<Date editor={editor} />
					<LinkEditor editor={editor} />
					<TableEditor editor={editor} />
					<Emoji editor={editor} />
					<AttUpload editor={editor} />

				</div>

				<div className="dropdown-menu">
					<AlignEditor editor={editor} isAlignActive={isAlignActive} active={isAlignActive(editor, "align")} />
					<ColorEditor editor={editor} active={isColorActive(editor, "color")} />
					<BackgroundColor editor={editor} active={isColorActive(editor, "backgroundColor")} />
				</div>


				<HeadEditor editor={editor} editorValue={value} active={isAlignActive(editor, "head")} />
				<FontSize editor={editor} active={isColorActive(editor, "fontSize")} />
				<LineHeightEditor editor={editor} active={isColorActive(editor, "lineHeight")} />
			</div>
		</div>
	);
};
export default inject('slatestore')(observer(EditorBigMenu))
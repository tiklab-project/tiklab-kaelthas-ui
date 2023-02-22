import React, { useMemo, useState, useCallback, Fragment, useImperativeHandle, useEffect, Children } from "react";
import "./editorBig.scss";
import EditorBigMenu from "./editorBigMenu";
import { Editable, withReact, useSlate, Slate } from "slate-react";
import { createEditor, Transforms, Editor, Text, Location, PointRef } from "slate";


import Leaf from "./leaf"

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
import SubEditor from "./sub";
import CodeBlock from "./codeBlock"


// 定义我们的应用…
const EditorBig = (props) => {
	const { value, height, editor, children, onChange } = props;

	return (
		<Slate
			editor={editor}
			value={value}
			onChange={(value) => onChange(value)}
		>
			<EditorBigMenu editor={editor} />
			{children}
		</Slate>


	);
};
export default inject('slatestore')(observer(EditorBig))
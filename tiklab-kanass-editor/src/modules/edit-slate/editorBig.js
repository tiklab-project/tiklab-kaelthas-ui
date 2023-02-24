import React, { useMemo, createContext } from "react";
import "./editorBig.scss";
import EditorBigMenu from "./editorBigMenu";
import { withReact, Slate } from "slate-react";
import { createEditor } from "slate";
import { inject, observer } from "mobx-react";
import { withImage } from "./upload";
import { withHistory } from 'slate-history'
export const EditorContext = createContext()
// 定义我们的应用…
const EditorBig = (props) => {
	const { value, height, children, onChange } = props;
	const editor = useMemo(() => withHistory(withImage(withReact(createEditor()))), [])
	console.log(value)
	return (
		<Slate
			editor={editor}
			value={value}
			onChange={(value) => onChange(value)}
		>
			<EditorBigMenu editor={editor} />
			<EditorContext.Provider value = {editor}>
				{children}
			</EditorContext.Provider>
		</Slate>
	);
};
export default inject('slatestore')(observer(EditorBig))
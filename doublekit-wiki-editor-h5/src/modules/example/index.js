/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2022-04-23 13:34:34
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2022-04-23 16:16:47
 */
import React, {useState} from "react";
import Editor from "../edit-slate/containers/editor";

const ExampleEditor = () => {
    const [value, setValue] = useState([
		{
			type: "paragraph",
			children: [{ text: "" }],
		},
	])
    return (
        <div>
            <Editor value = {value} onChange = {setValue}/>
        </div>
    )
}
export default ExampleEditor;
import React, {useState} from "react";
import {UnControlled as ReactCodeMirror} from 'react-codemirror2';
import {Editor, Transforms} from "slate";
import { Slate, Editable, withReact, ReactEditor } from "slate-react";
import "./codeBlock.scss"
import 'codemirror/lib/codemirror.js';

import 'codemirror/addon/selection/selection-pointer';
import 'codemirror/addon/hint/html-hint';
import 'codemirror/addon/hint/xml-hint';
import 'codemirror/mode/css/css.js'

import 'codemirror/addon/fold/foldcode.js';  // 代码折叠
import 'codemirror/addon/fold/foldgutter.js'; // 代码折叠
import 'codemirror/addon/fold/brace-fold.js'; // 代码折叠
import 'codemirror/addon/fold/comment-fold.js'; // 代码折叠
import 'codemirror/addon/hint/javascript-hint.js'; // 自动提示
import 'codemirror/addon/hint/show-hint.js';   // 自动提示
import 'codemirror/addon/lint/lint.js';  // 错误校验
import 'codemirror/addon/lint/javascript-lint.js';  // js错误校验
import 'codemirror/addon/selection/active-line.js';  // 当前行高亮
import 'codemirror/mode/javascript/javascript.js'
// css
import 'codemirror/addon/fold/foldgutter.css';  // 代码折叠
import 'codemirror/addon/hint/show-hint.css';  // 自动提示
import 'codemirror/addon/lint/lint.css'  // 代码错误提示
import 'codemirror/lib/codemirror.css' // 编辑器样式
import 'codemirror/theme/idea.css'  // 主题: idea

import 'codemirror/mode/textile/textile';
import 'codemirror/mode/xml/xml';

const CodeBlock = (props) => {
    const { editor,element,children,ediTextRef} = props;

    // console.log(props, element)
    const [codeValue, setCodeValue] = useState();

    const [select, setSelect] = useState()
    const onFocus = ()=>{
        const [path] =  ReactEditor.findPath(editor,element);
        setSelect({
            offset: 0,
            path: [path]
        })
        console.log(ReactEditor.findPath(editor,element))
    }

    const changeCode = (value) => {
        console.log(editor.selection, element, props);
        Transforms.setNodes(
            editor,
            { type: "code", codeValue: value },
            {at: select},
        );
    }
    
    return (
        <div 
            className="code-block"
            contentEditable = {false} suppressContentEditableWarning
        >
            <ReactCodeMirror
                // ref={ediTextRef}
                value={element.codeValue}
                options={{
                    mode: { name: 'javascript', json: true },
                    theme: 'material',
                      lineNumbers: true,
                      autofocus: true,//自动获取焦点
                      styleActiveLine: true,//光标代码高亮
                      smartIndent: true,  //自动缩进
                      start: true,
                      lineWrapping: true,
                      foldGutter: true,
                      indentUnit:4,
                    // theme: 'idea',
                    // lineWiseCopyCut: true,
                    // autofocus: true, //自动获取焦点
                    // styleActiveLine: true, //光标代码高亮
                    // lineNumbers: true, //显示行号
                    // smartIndent: true, //自动缩进
                    // lineWrapping: true,
                    // foldGutter: true,
                    // matchBrackets: true,

                    // // readOnly:{readOnly},
                    // indentUnit:4,
                    // // fullScreen: true,//全屏
                    // gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'], //end
                }}
                // 设置尺寸
                editorDidMount={(editor) => {

                    editor.setSize('auto', 'auto');
                }}
                // onBeforeChange={(editor, data, value) => {}}
                onChange={(codeEditor, data, value) => changeCode(value)}
                onFocus = {() => onFocus()}
                // onBlur={onBlur}
            />
        </div>

    );
};

export default CodeBlock;





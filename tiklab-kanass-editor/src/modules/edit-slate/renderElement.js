/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-01 15:46:03
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2022-04-23 14:09:20
 */
import React, { useCallback, Fragment } from "react";
import { Button } from "antd";
import AntTable from "./tableAntd";
import HeadElement from "./headElement"
import ImageElement from "./imageElement"
import AttachmentElement from "./attachmentElement"
import CheckListItemElement from "./check-lists"
import EmojiElement from "./emojiElement"
import TableElement from "./table/table/tableElement"
import CodeBlock from "./codeBlock"
import "./renderElement.scss"
const renderElement = (props, editor) => {
    const { element, attributes, children } = props;

    const DefaultElement = (props) => {
        return <p {...props.attributes} key="ab">{props.children}</p>;
    };
    switch (element.type) {
        case "code":
            return <CodeBlock {...props} editor={editor} />;
        case "head":
            return <HeadElement {...props} head={element.head} id={element.id} />;
        case "link":
            return <a {...attributes} href={element.url}>{children}</a>;
        case "image":
            return <ImageElement {...props} />;
        // case "br":
        //     return <br/>;
        case "attachment":
            return <AttachmentElement {...props} />;
        case 'check-list-item':
            return <CheckListItemElement {...props} />
        case 'ol-list-item':
            return <UnorderedItemElement {...props} />
        case 'bulleted-list':
            return <ul {...attributes}>{children}</ul>
        case 'list-item':
            return <li {...attributes}>{children}</li>
        case 'numbered-list':
            return <ol {...attributes}>{children}</ol>
        case "align":
            return <div {...attributes} style={{ textAlign: element.align }}>{children}</div>;
        case 'block-quote':
            return <blockquote {...attributes}>{children}</blockquote>
        case "divider":
            return <Fragment><hr />{children}</Fragment>
        case "indent":
            return <div
                {...attributes}
                style={{ paddingLeft: `${element.indent}em` }}
            >
                {children}
            </div>
        case "emoji":
            return <EmojiElement {...props} />
        case "table":
            return <TableElement {...props}>{children}</TableElement>
        default:
            return <DefaultElement {...props} />;
    }
};

export default renderElement;
/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-17 13:17:43
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2022-01-25 09:27:24
 */
import React, { useMemo, useState, useCallback, Fragment } from "react";
import "./emojiElement.scss"
const EmojiElement = (props) => {
	const { element, attributes, children } = props;
	return <Fragment>
		<span {...attributes} className="emoji-element" contentEditable={false}>
			<img src={element.src} alt="" className="emoji-img" />
			{children}
		</span>
	</Fragment>

};

export default EmojiElement;
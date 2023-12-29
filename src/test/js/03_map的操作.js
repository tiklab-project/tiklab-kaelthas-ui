import React from "react";
import ReactDOM from "react-dom";

const myArr = ['apple','banana','orange'];
const myList = myArr.map((item)=><p>{item}</p>)

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(myList);

import React from "react";
import "./imageMenu.scss"
const ImageMenu = () => {
    const photograph = () => {
        const supportedConstraints = navigator;
        console.log(supportedConstraints)
        // navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
        //     /* 使用这个stream stream */

        //     }).catch(function(err) {
        //     /* 处理error */
        //     }
        // );
            
    }
    return <div className="file">
        <div className="camera" onClick={() =>photograph()}>
            拍摄
        </div>
        <div className="attachment ">
            附件
        </div> 
    </div>
}
export default ImageMenu;
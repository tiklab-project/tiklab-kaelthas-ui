import React from "react";
import "./imageMenu.scss";
import { inject, observer } from "mobx-react";
import AttUpload from "../components/upload"
const ImageMenu = (props) => {
    // const supportedConstraints = navigator.mediaDevices.getSupportedConstraints();
    // console.log(supportedConstraints)

    const { slatestore,editor } = props;
    console.log(editor)
    const { upload } = slatestore;
    //拍照
    const photograph = () => {
        var constraints = { audio: true, video: { width: 1280, height: 720 } };

        navigator.mediaDevices.getUserMedia(constraints)
            .then(function (mediaStream) {
                // var video = document.querySelector('video');
                // video.srcObject = mediaStream;
                // video.onloadedmetadata = function (e) {
                //     video.play();
                // };
            })
            .catch(function (err) { console.log(err.name + ": " + err.message); });
    }



    return <div className="file">
        <div className="camera" onClick={() => photograph()}>
            拍摄
        </div>
        {/* <div className="attachment ">
            <input type="file" name="image" accept="image/*" onChange= {(event) => handleInputChange(event)} />
            <div className="attachment-botton">附件</div>
        </div> */}
        <div>
            {/* {supportedConstraints ? supportedConstraints: "adad"} */}
            <AttUpload upload = {upload} editor = {editor}/>
        </div>
    </div>
}
// export default ImageMenu;
export default inject('slatestore')(observer(ImageMenu))
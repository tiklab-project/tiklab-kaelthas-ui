import React,{useState,useEffect} from 'react';
import {Modal} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import Btn from "../btn/Btn";
import "./Modal.scss";





/**
 * 弹出框
 * @param props
 * @constructor
 */
const Modals = props => {

    const {title,children,...res} = props

    const [height,setHeight] = useState(0)

    useEffect(()=>{
        setHeight(autoHeight())
        return ()=>{
            window.onresize = null
        }
    },[height])

    window.onresize=() =>{
        setHeight(autoHeight())
    }

    /**
     * 监听浏览器高度
     * @returns {number}
     */
     const autoHeight = () =>{
        let winHeight=0
        if (window.innerHeight)
            winHeight = window.innerHeight
        else if ((document.body) && (document.body.clientHeight))
            winHeight = document.body.clientHeight
        if (document.documentElement && document.documentElement.clientHeight)
            winHeight = document.documentElement.clientHeight
        return winHeight-120
    }

    const style = {
        maxWidth: 'calc(100vw - 120px)',
        maxHeight: 'calc(100vh - 120px)',
        marginRight: 'auto',
        marginLeft: 'auto',
        position: 'absolute',
        top: 60,
        right: 0,
        left: 0,
        height:'100%',
        display:"flex",
        flexDirection: 'column'
    }
    return (
        <Modal
            style={style}
            bodyStyle={{padding:0}}
            wrapClassName={'tiklab_modal'}
            {...res}
        >
            <div className='kealthas-modal'>
                <div className='kealthas-modal-up'>
                    <div>{title}</div>
                    <Btn
                        title={<CloseOutlined style={{fontSize:16}}/>}
                        type="text"
                        onClick={res.onCancel}
                    />
                </div>
                <div className='kealthas-modal-content'>
                    {children}
                </div>
            </div>
        </Modal>
    )

}

export default Modals

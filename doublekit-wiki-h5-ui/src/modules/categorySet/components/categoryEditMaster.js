import React, { useEffect, useState } from "react";
import { SafeArea, Picker, TextArea } from 'antd-mobile';
import "./categoryEditMaster.scss"
import { withRouter } from "react-router";
import { inject, observer } from "mobx-react";
// const { TextArea } = Input;
const CategoryEditMaster = (props) => {
    const masterName = props.match.params.master
    const [master, setMaster] = useState(masterName);
    const id = localStorage.getItem("respositoryId");
    const { categorySetStore } = props;
    const { updateCategory, userList, findAllUser } = categorySetStore;
    const [visible, setVisible] = useState(false);
    const categoryId = localStorage.getItem("categoryId");
    useEffect(() => {
        findAllUser().then(res => {
            if (res.code === 0) {
                // setMaster(r)
            }
        })
    }, [])
    const submit = () => {
        console.log(master)
        const params = {
            id: categoryId,
            master: {id: master[0]}
        }
        updateCategory(params).then(data => {
            if (data.code === 0) {
                props.history.goBack()
            }
        })
    }
    return (
        <div className="category-editmaster">
            <div style={{ background: '#ace0ff' }}>
                <SafeArea position='top' />
            </div>
            <div className="category-editmaster-top">
                <svg className="category-editmaster-icon-logo" aria-hidden="true" onClick={() => props.history.goBack()}>
                    <use xlinkHref="#icon-left"></use>
                </svg>
                <div className="category-editmaster-title">修改负责人</div>
                <div onClick={() => submit()} style={{ color: "#5D70EA" }}>确定</div>
            </div>
            <div className="category-editmaster-box">


                <div className="category-editmaster-item" onClick={() => setVisible(true)}>
                    <div>负责人</div>
                    <div className="item-right">
                        <Picker
                            columns={[userList]}
                            visible={visible}
                            onClose={() => {
                                setVisible(false)
                            }}
                            // value={master}
                            onConfirm={value => {
                                setMaster(value)
                                console.log(value[0])
                            }}
                        >  
                        {
                            value => value.length > 0 ? <div>{value[0].label}</div> : <div> {master}</div>
                        }
                        </Picker>

                        
                        <svg className="category-set-icon" aria-hidden="true">
                            <use xlinkHref="#icon-right"></use>
                        </svg>
                    </div>
                </div>


            </div>

        </div>
    )
}

export default withRouter(inject("categorySetStore")(observer(CategoryEditMaster)));
import React, { useEffect, useState } from "react";
import { Form,Input,Button,TextArea,Selector,Picker,NavBar} from 'antd-mobile';
import "./wikiRepositoryAdd.scss";
import { CloseCircleFill } from 'antd-mobile-icons';
import { inject, observer } from "mobx-react";
const WikiRepositoryAdd = (props) => {
    const {wikirepositoryStore} = props;
    const {findAllUser, userList, addWikilist} = wikirepositoryStore;
    const [wikiMaterPickerVisible, setWikiMaterPickerVisible] = useState(false)
    const [form] = Form.useForm();
    useEffect(() => {
        
        findAllUser()
    }, [])
    
    const createResposity = (values) => {
        console.log(values)
        const param = {
            name: values.name,
            limits: values.limits[0],
            master:  {id: values.master[0]},
            desc: values.desc
        }
        addWikilist(param);
    }
    const back = () => {
        props.history.goBack();
    }
    return (
        <div className="repository-add">
            <div className="repository-add-top">
                <NavBar onBack={back}>创建知识库</NavBar>
            </div>
            <Form
                footer={
                    <Button block type='submit' color='primary' size='large'>
                        提交
                    </Button>
                }
                onFinish={(value) => createResposity(value)}
                style={{"--border-inner": "0"}}
                
            >
                <Form.Item
                    name='name'
                    label='知识库标题'
                    rules={[{ required: true, message: '标题不能为空' }]}
                >
                    <Input className="repository-desc-text" placeholder='请输入标题' />
                </Form.Item>

                <Form.Item name='desc' label='知识库描述'>
                    <TextArea
                        placeholder='请输入知识库描述'
                        maxLength={100}
                        rows={2}
                        showCount
                        className="repository-desc-text"
                    />
                </Form.Item>
                <Form.Item name='limits' label='可见人员'>
                    <Selector
                        options={[
                            { label: '全部成员', value: '0' },
                            { label: '知识库成员', value: '1' },
                        ]}
                    />
                </Form.Item>
                <Form.Item 
                    name='master' 
                    label='负责人'
                    trigger='onConfirm'
                    // arrow={
                    //     form.getFieldValue('reporter') ? (
                    //         <CloseCircleFill
                    //             style={{
                    //                 color: 'var(--adm-color-light)',
                    //                 fontSize: 14,
                    //             }}
                    //             onClick={e => {
                    //                 e.stopPropagation()
                    //                 form.setFieldsValue({ master: null })
                    //             }}
                    //         />
                    //     ) : (
                    //         true
                    //     )
                    // }
                    onClick={() => {
                        setWikiMaterPickerVisible(true)
                    }}
                >  
                    <Picker
                        style={{
                            '--title-font-size': '13px',
                            '--header-button-font-size': '13px',
                            '--item-font-size': '13px',
                            '--item-height': '30px',
                        }}
                        columns={[userList]}
                        visible={wikiMaterPickerVisible}
                        onClose={() => {
                            setWikiMaterPickerVisible(false)
                        }}
                    >
                        {
                            value => value.length > 0 ? <div>{value[0].label}</div> : <div>请选择负责人</div>
                        }
                    </Picker>
                </Form.Item>
            </Form>
        </div>
    )
}

export default inject("wikirepositoryStore")(observer(WikiRepositoryAdd));
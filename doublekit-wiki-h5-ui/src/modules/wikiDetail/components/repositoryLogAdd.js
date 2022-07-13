import React, { useEffect, useState } from "react";
import { Form,Input,Button,Modal,Selector,Picker,NavBar} from 'antd-mobile';
import "./repositoryLogAdd.scss";
import { CloseCircleFill } from 'antd-mobile-icons';
import { inject, observer } from "mobx-react";
const RepositoryLogAdd = (props) => {
    const {wikirepositoryStore, wikiCatalogueStore,repositoryId, initList,setVisibleAdd, parentCategoryId} = props;
    const {findAllUser, userList} = wikirepositoryStore;
    const {createCategory, findWikiCatalogue} = wikiCatalogueStore;
    const [wikiMaterPickerVisible, setWikiMaterPickerVisible] = useState(false)
    const [form] = Form.useForm();
    useEffect(() => {
        findAllUser()
    }, [])
    
    const createResposity = (values) => {
        console.log(values)
        const param = {
            name: values.name,
            master:  {id: values.master[0]},
            formatType: "category",
            repository: {
                id: repositoryId
            },
            parentCategory: {
                id: parentCategoryId
            }
        }
        createCategory(param).then(res => {
            if(res.code === 0){
                // findWikiCatalogue(repositoryId)
                initList()
                setVisibleAdd(false)
            }
        });
    }

    return (
            <Form
                footer={
                    <Button block type='submit' color='primary' size='middle'>
                        提交
                    </Button>
                }
                onFinish={(value) => createResposity(value)}
                style={{"--border-inner": "0", "--border-top": "0"}}
                
            >
                <Form.Item
                    name='name'
                    label='标题'
                    rules={[{ required: true, message: '标题不能为空' }]}
                >
                    <Input className="repositoryLog-desc-text" placeholder='请输入标题' />
                </Form.Item>
                <Form.Item 
                    name='master' 
                    label='负责人'
                    trigger='onConfirm'
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
        // </Modal>
    )
}

export default inject("wikirepositoryStore", "wikiCatalogueStore")(observer(RepositoryLogAdd));
import React, { useState } from "react";
import { Form, Menu, Dropdown } from "antd";
import CategoryAdd from "./CategoryAdd";
import { appendNodeInTree } from "../../../common/utils/treeDataAction";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router";
import { getUser } from "tiklab-core-ui";

const AddDropDown = (props) => {
    const [form] = Form.useForm();
    const { category, categoryStore } = props;
    const repositoryId = props.match.params.repositoryId;
    const userId = getUser().userId;
    const treePath = category ? 
        (category.treePath ? category.treePath + category.id + ";" :  category.id + ";") : null;
    const [addModalVisible, setAddModalVisible] = useState()
    const [userList, setUserList] = useState()
    const [catalogue, setCatalogue] = useState()
    const [contentValue, setContentValue] = useState()
    const { repositoryCatalogueList, setRepositoryCatalogueList,
        createDocument, findDmUserList, findDocument } = categoryStore;

    const addMenu = () => {
        return <Menu onClick={(value) => selectAddType(value)}>
            <Menu.Item key="category">
                <div className="content-add-menu">
                    <svg className="content-add-icon" aria-hidden="true">
                        <use xlinkHref="#icon-folder"></use>
                    </svg>
                    目录
                </div>

            </Menu.Item>
            <Menu.Item key="document">
                <div className="content-add-menu">
                    <svg className="content-add-icon" aria-hidden="true">
                        <use xlinkHref="#icon-file"></use>
                    </svg>
                    文档
                </div>

            </Menu.Item>
            <Menu.Item key="markdown">
                <div className="content-add-menu">
                    <svg className="content-add-icon" aria-hidden="true">
                        <use xlinkHref="#icon-minmap"></use>
                    </svg>
                    Markdown
                </div>
            </Menu.Item>
        </Menu>
    }
    const selectAddType = (value) => {
        if (value.key === "category") {
            if(category){
               setCatalogue({id: category.id, dimension: category.dimension}) 
            }
            
            setAddModalVisible(true)
            findDmUserList(repositoryId).then(data => {
                setUserList(data)
            })
            form.setFieldsValue({
                formatType: value.key
            })
            return
        }

        let params = {
            name: "未命名文档",
            wikiRepository: { id: repositoryId },
            master: { id: userId },
            typeId: "document",
            formatType: "document",
            dimension: category? category.dimension + 1 : 1,
            wikiCategory: { 
                id: category ? category.id : null, 
                treePath:  category ? category.treepath : null
            },
            treePath : treePath
        }
        if (value.key === "document") {
            params.typeId = "document"
        }
        if (value.key === "markdown") {
            params.typeId = "markdown";
            params.details = JSON.stringify([
                {
                    type: "code",
                    children: [
                        {
                            type: 'paragraph',
                            children: [
                                {
                                    text: '',
                                },
                            ],
                        },
                    ]
                }
            ])
        }
        if (value.key !== "category") {
            createDocument(params).then((data) => {
                if (data.code === 0) {
                    findDocument(data.data).then(res => {
                        const list = appendNodeInTree(category?.id, repositoryCatalogueList, [res.data])
                        setRepositoryCatalogueList([...list])
                    })
                    // if (!isExpandedTree(id)) {
                    //     setExpandedTree(expandedTree.concat(id));
                    // }
                    if (value.key === "document") {
                        props.history.push(`/index/repositorydetail/${repositoryId}/doc/${data.data}`)
                    }
                    if (value.key === "markdown") {
                        props.history.push(`/index/repositorydetail/${repositoryId}/markdownEdit/${data.data}`)
                    }

                    // 左侧导航
                    // setSelectKey(data.data)
                }
            })
        }


    }
    return (
        <>
            <Dropdown overlay={() => addMenu()} placement="bottomLeft">
                <svg className="img-icon" aria-hidden="true">
                    <use xlinkHref="#icon-plusBlue"></use>
                </svg>
            </Dropdown>

            <CategoryAdd
                setAddModalVisible={setAddModalVisible}
                addModalVisible={addModalVisible}
                form={form}
                category={category}
                contentValue={contentValue}
                treePath = {treePath}
                // setSelectKey={setSelectKey}
                userList={userList}
                {...props}
            />
        </>

    )
}

export default withRouter(inject("categoryStore")(observer(AddDropDown)));
import { Input, Tree, Modal } from 'antd';
import React, { Fragment, useMemo, useState } from 'react';
import "./ShareListModal.scss";
import ShareModal from './ShareModal';
import { inject, observer } from "mobx-react";
const { TreeNode } = Tree;
const ShareListModal = (props) => {
    const { shareListVisible, setShareListVisible, repositoryCatalogueList, commentStore } = props;
    const [documentIds, setDocumentIds] = useState([])
    const [categoryIds, setCateGoryIds] = useState([])
    const [shareVisible, setShareVisible] = useState(false)
    const { createShare, updateShare} = commentStore;

    const onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };
    const onCheck = (checkedKeys, info) => {
        console.log('onCheck', checkedKeys, info);
        const list = info.checkedNodes;
        let documents = [];
        let categorys = []
        list.map(item => {
            if(item?.formatType === "document"){
                documents.push(item.id)
            }else {
                categorys.push(item.key)
            }
        })
        setDocumentIds(documents)
        setCateGoryIds(categorys)

        console.log(documents, categorys)

    };
    const onFinish = () => { 
        setShareVisible(true)
    }
    const renderTreeNodes = data =>
        data.map(item => {
            if (item.children) {
                return (
                    <TreeNode 
                        title={item.name} 
                        key={item.id} 
                        dataRef={item}
                        icon={({ selected }) => <Icon type={selected ? 'frown' : 'frown-o'} />}
                        >
                        {renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode title={item.name}  key={item.id} {...item} dataRef={item} />;
        });
    return (
        <Fragment>
            <Modal
                title="选择移动目录"
                visible={shareListVisible}
                cancelText = "取消"
                okText = "确认"
                onOk={() => onFinish()}
                onCancel={() => setShareListVisible(false)}
            >
                
                <Tree checkable onSelect={onSelect}
                    onCheck={onCheck}>
                    {renderTreeNodes(repositoryCatalogueList)}
                </Tree>
            </Modal>
            <ShareModal documentIds = {documentIds} categoryIds = {categoryIds} shareVisible={shareVisible} setShareVisible={setShareVisible} createShare={createShare} updateShare={updateShare} />
        </Fragment>
        

    );
};

export default inject("commentStore")(observer(ShareListModal));
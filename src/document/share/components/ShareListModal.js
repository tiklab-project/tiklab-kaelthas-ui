import { Tree, Modal, message } from 'antd';
import React, { useState } from 'react';
import "./ShareListModal.scss";
import ShareModal from './ShareModal';
import { observer } from "mobx-react";
import CommentStore from "../../document/store/CommentStore";
const { TreeNode } = Tree;
const ShareListModal = (props) => {
    const { shareListVisible, setShareListVisible, repositoryCatalogueList } = props;
    const [documentIds, setDocumentIds] = useState([])
    const [categoryIds, setCateGoryIds] = useState([])
    const [shareVisible, setShareVisible] = useState(false)
    const { createShare, updateShare } = CommentStore;

    const onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };
    const onCheck = (checkedKeys, info) => {
        console.log('onCheck', checkedKeys, info);
        const list = info.checkedNodes;
        let documents = [];
        let categorys = []
        list.map(item => {
            if (item?.formatType === "document") {
                documents.push(item.key)
            } else {
                categorys.push(item.key)
            }
        })
        setDocumentIds(documents)
        setCateGoryIds(categorys)
        // console.log(documentIds,categoryIds )

    };
    const onFinish = () => {
        if(documentIds.length > 0 || categoryIds.length > 0){
            setShareVisible(true) 
            console.log(documentIds,categoryIds )
        }else {
            message.warn("请选择要分享的目录或文档")
        }
        
    }
    const renderTreeNodes = data =>
        data?.map(item => {
            if (item.children) {
                return (
                    <TreeNode
                        title={item.name}
                        key={item.id}
                        dataRef={item}
                        formatType={item.formatType}
                        icon={({ formatType }) => {
                            return <svg className="share-icon" aria-hidden="true">
                                <use xlinkHref={formatType === "document" ? "#icon-file" : "#icon-folder"} ></use>
                            </svg>
                        }}
                    >
                        {renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode
                title={item.name}
                icon={({ formatType }) => {
                    return <svg className="share-icon" aria-hidden="true">
                        <use xlinkHref={formatType === "document" ? "#icon-file" : "#icon-folder"} ></use>
                    </svg>
                }}
                formatType={item.formatType}
                key={item.id}
                dataRef={item}
            />;
        });
    return (
        <div className="share-list-modal">
            <Modal
                title="选择分享目录"
                visible={shareListVisible}
                cancelText="取消"
                okText="确认"
                onOk={() => onFinish()}
                onCancel={() => setShareListVisible(false)}
            >
                <div className="share-list">
                    <Tree checkable showIcon onSelect={onSelect}
                        onCheck={onCheck}>
                        {renderTreeNodes(repositoryCatalogueList)}
                    </Tree>
                </div>


            </Modal>
            <ShareModal documentIds={documentIds} categoryIds={categoryIds} shareVisible={shareVisible} setShareVisible={setShareVisible} createShare={createShare} updateShare={updateShare} />
        </div>


    );
};

export default observer(ShareListModal);
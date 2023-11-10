const appendNodeInTree = (id, tree, obj, setType) => {
    if (id) {
        tree.forEach(ele => {
            if (ele.id === id) {
                switch (setType) {
                    case "inset":
                        ele.children ? ele.children.push(...obj) : ele.children = obj;
                        break;
                    case "overview":
                        ele.children = obj
                        break;
                    default:
                        ele.children ? ele.children.push(...obj) : ele.children = obj;
                        break
                }
            } else {
                if (ele.children) {
                    appendNodeInTree(id, ele.children, obj, setType)
                }
            }
        })
    } else {
        tree.push(...obj)
    }

    return tree
}

const removeNodeInTree = (tree, id, sort) => { // 通过id从数组（树结构）中移除元素
    if (!tree || !tree.length) {
        return
    }

    for (let i = 0; i < tree.length; i++) {
        if (tree[i].id === id) {
            tree.splice(i, 1);
        }
        
        removeNodeInTree(tree[i].children, id)
    }
}


const removeNodeAndSort = (tree, id, sort) => { // 通过id从数组（树结构）中移除元素
    if (!tree || !tree.length) {
        return
    }
    if (id === "nullString") {
        tree.splice(sort, 1)
        tree.map((item) => {
            if (item.sort > sort) {
                item.sort = item.sort - 1
            }
            return item;
        })
    } else {
        tree.forEach(ele => {
            if (ele.id === id) {
                ele.children.splice(sort, 1)
                ele.children.map((item) => {
                    if (item.sort > sort) {
                        item.sort = item.sort - 1
                    }
                })
            } else {
                if (ele.children) {
                    removeNodeAndSort(ele.children, id, sort)
                }
            }
        })
    }
    return tree;
}

const insertNodeAndSort = (tree, id, sort, node) => { // 通过id从数组（树结构）中移除元素
    if (!tree || !tree.length) {
        return
    }
    if (id === "nullString") {
        tree.splice(sort, 0, node)
        tree.map((item) => {
            if (item.sort >= sort) {
                item.sort = item.sort + 1
            }
        })
    } else {
        tree.forEach(ele => {
            if (ele.id === id) {
                ele.children.splice(sort, 0, node)
                console.log(ele.children)
                ele.children.map((item) => {
                    if (item.sort >= sort) {
                        item.sort = item.sort + 1
                    }
                })
            } else {
                if (ele.children) {
                    insertNodeAndSort(ele.children, id, sort, node)
                }
            }
        })
    }
    return tree;
}
const updataTreeSort = (tree, params, node) => { // 通过id从数组（树结构）中移除元素
    const { oldParentId, oldSort, parentId, sort } = params;
    const tree1 = removeNodeAndSort(tree, oldParentId, oldSort)
    console.log(node)
    const tree2 = insertNodeAndSort(tree1, parentId, sort, node)
    console.log(tree2)
}

const findNodeById = (tree, params) => {
    console.log("findNodeById", params)
    const { id, sort, dimension, oldDimension } = params;
    let node = null;
    let state = false;
    const readTree = (_tree, id) => {
        if (state) return;
        console.log(_tree)
        if(!_tree) return
        for (let i = 0; i < _tree.length; i++) {
            
            if (_tree[i].id === id) {
                state = true;
                node = _tree[i];
            } else {
                _tree[i].children !== null && readTree(_tree[i].children, id);
            }
        }
    };
    readTree(tree, id);
    if (node) {
        node.sort = sort;
        node.dimension = dimension;
        if (node.formatType === "category") {
            node.parentWikiCategory = params.parentWikiCategory;
        } else {
            node.wikiCategory = params.wikiCategory;
        }
        const distence = dimension - oldDimension;
        console.log(dimension, oldDimension)
        updateNode(node.children, distence)
    }
    return node;
};


const updateNode = (node, distence) => {
    if (!node || !node.length) {
        return
    }
    node.forEach(item => {
        item.dimension = item.dimension + distence;
        if(item.children != null){
            updateNode(item.children)
        }
        
        return item;
    })
}
export { appendNodeInTree, removeNodeInTree,removeNodeAndSort,  updataTreeSort, findNodeById };
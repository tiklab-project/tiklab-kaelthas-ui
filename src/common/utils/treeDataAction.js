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

const removeNodeInTree = (tree, id) => { // 通过id从数组（树结构）中移除元素
    if (!tree || !tree.length) {
        return
    }
    for (let i = 0; i < tree.length; i++) {
        if (tree[i].id === id) {
            tree.splice(i, 1);
            break;
        }
        removeNodeInTree(tree[i].children, id)
    }
}

export { appendNodeInTree, removeNodeInTree };
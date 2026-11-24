class Node {
  constructor() {
    this.data = null;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    this.arr = this.sortRemoveDups(arr);
    this.root = this.buildTree(arr);
  }

  sortRemoveDups(array) {
    array.sort((a, b) => a - b);
    let newArr = [];
    for (const num of array) {
      if (newArr.includes(num)) {
        continue;
      }
      newArr.push(num);
    }

    return newArr;
  }

  buildTree(array) {
    // Method must turn our tree into a balanced binary tree (meaning heights of both left and right side must be similar)
    // -preventing the tree from becoming too deep on one side.
    array = this.sortRemoveDups(array);
    if (array.length === 0) return null;
    const mid = Math.floor(array.length / 2);

    const node = new Node();
    node.data = array[mid];
    node.left = this.buildTree(array.slice(0, mid));
    node.right = this.buildTree(array.slice(mid + 1, array.length));

    return node;
  }

  includes(node, value) {
    //base base
    // search left, search right (for right and left)
    // return true
    if (node === null) return false;
    if (node.data === value) return true;

    if (value < node.data) {
      return this.includes(node.left, value);
    } else {
      return this.includes(node.right, value);
    }
  }

  insert(node, value) {
    if (node === null) {
      let newNode = new Node();
      newNode.data = value;
      return newNode;
    }
    if (node === value) return node;
    if (value < node.data) {
      node.left = this.insert(node.left, value);
    } else {
      node.right = this.insert(node.right, value);
    }
    return node;
  }
  deleteItem(value) {}
  inOrderForEach(callback) {}
  preOrderForEach(callback) {}
  postOrderForEach(callback) {}
  height(value) {}
  depth(value) {}
  isBalanced() {}
  rebalance() {}
}

// const tree = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);
const tree = new Tree([1, 2, 3, 5, 6, 4]);
// console.log(tree.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])); //dupes are 4,7,9

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

// prettyPrint(
//   tree.buildTree([[1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]]),
// );
// console.log(tree.arr);
prettyPrint(tree.root);
// console.log(tree.root);

// console.log(tree.includes(tree.root, 12));
tree.insert(tree.root, 7);
prettyPrint(tree.root);

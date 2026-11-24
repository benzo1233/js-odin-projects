class Node {
  constructor(data = null) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    this.arr = this.sortRemoveDups(arr);
    this.root = this.#buildTree(this.arr);
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

  #buildTree(array) {
    if (array.length === 0) return null;
    const mid = Math.floor(array.length / 2);
    const node = new Node();
    node.data = array[mid];
    node.left = this.#buildTree(array.slice(0, mid));
    node.right = this.#buildTree(array.slice(mid + 1, array.length));

    return node;
  }

  includes(value) {
    let node = this.root;
    while (node !== null) {
      if (node.data === value) return true;

      if (node.data > value) {
        node = node.left;
      } else {
        node = node.right;
      }
    }
    return false;
  }

  insert(value) {
    let node = this.root;

    while (true) {
      if (node === null) {
        let newNode = new Node();
        newNode.data = value;
        return;
      }
      if (node.data === value) return;
      if (value < node.data) {
        if (node.left === null) {
          const newNode = new Node(value);
          node.left = newNode;
          return;
        }
        node = node.left;
      } else if (node.right === null) {
        const newNode = new Node(value);
        node.right = newNode;
        return;
      }
      node = node.right;
    }

    // Add node as arg
    // if (node === null) {
    //   let newNode = new Node();
    //   newNode.data = value;
    //   return newNode;
    // }
    // if (node.data === value) return node;
    // if (value < node.data) {
    //   node.left = this.insert(node.left, value);
    // } else {
    //   node.right = this.insert(node.right, value);
    // }
    // return node;
  }

  deleteItem(value) {
    let node = this.root;
    let parent = null;
    let lastMove = null;
    let targetNode = null;

    if (node === null) return;

    while (node !== null) {
      if (node.data === value) {
        targetNode = node;
        break;
      }

      parent = node;
      if (node.data > value) {
        node = node.left;
        lastMove = "l";
      } else {
        node = node.right;
        lastMove = "r";
      }
    }

    // Handles No Children
    if (targetNode.right === null && targetNode.left === null) {
      if (lastMove === "r") {
        parent.right = null;
      } else {
        parent.left = null;
      }
    }

    // Handles if has one Child
    const replacement = targetNode.left ?? targetNode.right;
    if (lastMove === "r") {
      parent.right = replacement;
    } else {
      parent.left = replacement;
    }
  }
  inOrderForEach(callback) {}
  preOrderForEach(callback) {}
  postOrderForEach(callback) {}
  height(value) {}
  depth(value) {}
  isBalanced() {}
  rebalance() {}
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }
  prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

// const tree = new Tree([1, 2, 3, 5, 6, 4, 7, 100, 200, 300]);
// tree.insert(7);
// prettyPrint(tree.root);

// tree.deleteItem(100);
// prettyPrint(tree.root);

// Tree 2
const tree2 = new Tree([1, 2, 3, 5, 6, 4, 7]);
prettyPrint(tree2.root);
console.log("=======")
tree2.deleteItem(7);
prettyPrint(tree2.root);

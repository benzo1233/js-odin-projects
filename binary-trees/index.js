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

  // Note: Insert always inserts at the bottom of the tree, for e.g. given 1,3,5. Inserting 4, connects node 5's left pointer to our new node of 4
  insert(value) {
    let node = this.root;

    while (true) {
      if (node === null) {
        let newNode = new Node();
        newNode.data = value;
        return;
      }

      //exit if the val we are inserting already exists
      if (node.data === value) return;

      //traverse left
      if (value < node.data) {
        if (node.left === null) {
          const newNode = new Node(value);
          node.left = newNode;
          return;
        }
        node = node.left;
      } else {
        //traverse right
        if (node.right === null) {
          const newNode = new Node(value);
          node.right = newNode;
          return;
        }
        node = node.right;
      }
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
    let targetNode = null;
    if (node === null) return;

    //Find node we are looking to delete and set it to targetNode
    while (node !== null) {
      if (node.data === value) {
        targetNode = node;
        break;
      }

      parent = node;
      if (node.data > value) {
        node = node.left;
      } else {
        node = node.right;
      }
    }

    if (targetNode === null) return "Target not found";

    // Handles No Children
    if (targetNode.right === null && targetNode.left === null) {
      if (parent === null) {
        this.root = null;
        return;
      }
      targetNode.data < parent.data
        ? (parent.left = null)
        : (parent.right = null);
      return;
    }

    // Handle if Target has two children
    if (targetNode.right !== null && targetNode.left !== null) {
      let [successor, succParent] = this.findSuccessor(targetNode);
      targetNode.data = successor.data;

      if (succParent.left === successor) {
        succParent.left = successor.right;
      } else {
        succParent.right = successor.right;
      }
      return;
    }

    // Handles if Target has one Child
    const replacement = targetNode.left ?? targetNode.right;
    if (parent === null) {
      this.root = replacement;
      // targetNode.data < parent.data
      //   ? (targetNode.left = null)
      //   : (targetNode.right = null);

      return;
    }
    targetNode.data < parent.data
      ? (parent.left = replacement)
      : (parent.right = replacement);
  }

  levelOrderForEach(callback) {
    let node = this.root;
    if (node === null) return;

    const queue = [node];
    while (queue.length > 0) {
      const curr = queue.shift();
      if (curr.left !== null) {
        queue.push(curr.left);
      }
      if (curr.right !== null) {
        queue.push(curr.right);
      }
      callback(curr.data);
    }
  }

  // Left -> Root -> Right
  inOrderForEach(callback) {
    if (typeof callback !== "function") return "NOT FUNCTION";
    traverse(this.root);

    function traverse(node) {
      if (node === null) return;

      traverse(node.left);
      callback(node.data);
      traverse(node.right);
    }
  }

  // Root -> Left -> Right
  preOrderForEach(callback) {
    if (typeof callback !== "function") return "NOT FUNCTION";
    traverse(this.root);

    function traverse(node) {
      if (node === null) return;

      callback(node.data);
      traverse(node.left);
      traverse(node.right);
    }
  }

  // Left -> Right -> Root
  postOrderForEach(callback) {
    if (typeof callback !== "function") return "NOT FUNCTION";
    traverse(this.root);

    function traverse(node) {
      if (node === null) return;

      traverse(node.left);
      traverse(node.right);
      callback(node.data);
    }
  }

  height(value) {
    let node = this.root;
    let targetNode = null;

    while (node !== null) {
      if (node.data === value) {
        targetNode = node;
        break;
      }

      if (node.data > value) {
        node = node.left;
      } else {
        node = node.right;
      }
    }

    if (targetNode === null) return undefined;
    function findHeight(node) {
      if (node === null) {
        return -1;
      }

      return 1 + Math.max(findHeight(node.left), findHeight(node.right));
    }
    return findHeight(targetNode);
  }

  depth(value) {
    let depth = 0;
    let node = this.root;
    while (node !== null) {
      if (node.data === value) return depth;

      if (node.data > value) {
        node = node.left;
      } else {
        node = node.right;
      }
      depth += 1;
    }
    return undefined;
  }

  isBalanced() {
    function findHeight(node) {
      if (node === null) {
        return 0;
      }

      const left = findHeight(node.left);
      if (left === -1) return -1;

      const right = findHeight(node.right);
      if (right === -1) return -1;

      if (Math.abs(left - right) > 1) {
        return -1;
      }

      return 1 + Math.max(left, right);
    }

    return findHeight(this.root) !== -1;
  }

  rebalance() {
    let rebalanced = [];
    this.inOrderForEach((val) => rebalanced.push(val));
    this.root = this.#buildTree(rebalanced);
    this.arr = this.sortRemoveDups(rebalanced);
  }

  // Either is fine:
  // In-order predecessor: Largest value smaller than the current node.
  // In-order successor: Smallest value larger than the current node.
  findSuccessor(node) {
    let parent = node;
    node = node.right;
    if (node === null) return;
    while (node.left !== null) {
      parent = node;
      node = node.left;
    }
    return [node, parent];
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }
  prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

// TEST
// const tree3 = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
const tree = new Tree([10]);
[20, 30].forEach((value) => tree.insert(value));
prettyPrint(tree.root);
// tree3.deleteItem(1);
// prettyPrint(tree3.root);

// console.log(tree3.inOrderForEach((val) => console.log(val)));
// console.log(tree3.preOrderForEach((val) => console.log(val)));
// console.log(tree3.postOrderForEach((val) => console.log(val)));
// tree3.levelOrderForEach((val) => console.log(val));

// console.log(tree3.height(3));
// tree3.deleteItem(8);
// prettyPrint(tree3.root);
console.log(tree.isBalanced());
tree.rebalance();

prettyPrint(tree.root);
console.log(tree.isBalanced());

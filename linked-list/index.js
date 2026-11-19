class Node {
  constructor(val = null, nextNode = null) {
    this.val = val;
    this.nextNode = nextNode;
  }
}
class LinkedList {
  constructor() {
    this.head = null;
  }

  append(value) {
    const node = new Node(value);
    if (this.head === null) {
      this.head = node;
    } else {
      // get last node
      let current = this.head;
      while (current.nextNode !== null) {
        current = current.nextNode;
      }
      current.nextNode = node;
    }
  }

  prepend(value) {
    const node = new Node(value);
    if (this.head === null) {
      this.head = node;
    } else {
      node.nextNode = this.head;
      this.head = node;
    }
  }

  size() {
    if (this.head === null) return 0;

    let count = 1;
    let current = this.head;
    while (current.nextNode !== null) {
      current = current.nextNode;
      count++;
    }

    return count;
  }

  headOfList() {
    if (this.head === null) return;
    return this.head;
  }

  tail() {
    if (this.head === null) return;
    let current = this.head;
    while (current.nextNode !== null) {
      current = current.nextNode;
    }
    return current;
  }

  at(index) {
    let current = this.head;
    let num = 0;
    while (current.nextNode !== null && num < index) {
      current = current.nextNode;
      num++;
    }
    return current;
  }

  pop() {
    if (this.head === null) return;
    let popped = this.head.val;
    this.head = this.head.nextNode;

    return popped;
  }

  contains(value) {
    let current = this.head;
    while (current.nextNode !== null) {
      if (current.val === value) {
        return true;
      }
      current = current.nextNode;
    }
    return false;
  }

  findValue(value) {
    let idx = 0;
    let current = this.head;
    while (current.nextNode !== null) {
      if (current.val === value) {
        return idx;
      }
      idx++;
      current = current.nextNode;
    }
    return -1;
  }

  toString() {
    let result = "";
    let current = this.head;
    while (current) {
      result += `( ${current.val} ) -> `;
      current = current.nextNode;
    }

    result += `null`;
    return result;
  }
  insertAt(index = 0, ...values) {
    if (index < 0 || index > this.size()) return new Error("out of bounds");
    if (index == 0) {
      for (let i = values.length - 1; i >= 0; i--) {
        this.prepend(values[i]);
      }
      return;
    }

    for (const value of values) {
      const newNode = new Node(value);
      const current = this.at(index - 1);
      const nextInLine = current.nextNode ?? null;

      current.nextNode = newNode;
      newNode.nextNode = nextInLine;
      index++;
    }
  }

  removeAt(index) {
    if (index < 0 || index > this.size() - 1) return new Error("out of bounds");
    if (index == 0) {
      this.head = this.head.nextNode;
      return;
    }

    const curr = this.at(index - 1);
    curr.nextNode = curr.nextNode.nextNode;
  }
}

const list = new LinkedList();
list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");
console.log(list.toString());
list.insertAt(1, "rooof", "meowww");
list.removeAt(1);
console.log(list.toString());

module.exports = { LinkedList };

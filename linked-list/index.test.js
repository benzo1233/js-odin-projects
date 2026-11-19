const { LinkedList } = require("./index");

function expectValues(list, values) {
  let current = list.head;
  for (const value of values) {
    expect(current).not.toBeNull();
    expect(current.val).toBe(value);
    current = current.nextNode;
  }
  expect(current).toBeNull();
}

describe("LinkedList", () => {
  test("append adds nodes to the end of the list", () => {
    const list = new LinkedList();
    list.append("dog");
    list.append("cat");

    expect(list.head.val).toBe("dog");
    expect(list.head.nextNode.val).toBe("cat");
    expect(list.head.nextNode.nextNode).toBeNull();
  });

  test("prepend adds nodes to the beginning of the list", () => {
    const list = new LinkedList();
    list.prepend("dog");
    list.prepend("cat");

    expect(list.head.val).toBe("cat");
    expect(list.head.nextNode.val).toBe("dog");
    expect(list.head.nextNode.nextNode).toBeNull();
  });
});

describe("LinkedList unfinished methods", () => {
  let list;

  beforeEach(() => {
    list = new LinkedList();
    list.append("dog");
    list.append("cat");
    list.append("parrot");
  });

  test("size returns the number of nodes", () => {
    expect(new LinkedList().size()).toBe(0);
    expect(list.size()).toBe(3);
  });

  test("head returns the first node", () => {
    expect(list.headOfList().val).toBe("dog");
  });

  test("tail returns the last node", () => {
    expect(list.tail().val).toBe("parrot");
  });

  test("at returns the node at an index", () => {
    expect(list.at(1).val).toBe("cat");
  });

  test("pop removes and returns the head value", () => {
    expect(list.pop()).toBe("dog");
    expect(list.head.val).toBe("cat");
    expect(list.head.nextNode.val).toBe("parrot");
    expect(new LinkedList().pop()).toBeUndefined();
  });

  test("contains checks whether a value is present", () => {
    expect(list.contains("cat")).toBe(true);
    expect(list.contains("snake")).toBe(false);
  });

  test("findValue returns the index, or null when absent", () => {
    expect(list.findValue("cat")).toBe(1);
    expect(list.findValue("snake")).toBe(-1);
  });

  test("toString formats the nodes", () => {
    expect(list.toString()).toBe("( dog ) -> ( cat ) -> ( parrot ) -> null");
  });

  describe("insertAt", () => {
    test("inserts multiple values in order at index 1", () => {
      list.insertAt(1, "snake", "turtle");
      expectValues(list, ["dog", "snake", "turtle", "cat", "parrot"]);
    });

    test("inserts at index 0", () => {
      list.insertAt(0, "snake", "turtle");
      expectValues(list, ["snake", "turtle", "dog", "cat", "parrot"]);
    });

    test("inserts at the end of the list", () => {
      list.insertAt(3, "snake", "turtle");
      expectValues(list, ["dog", "cat", "parrot", "snake", "turtle"]);
    });

    test("inserts at index 0 in an empty list", () => {
      const empty = new LinkedList();
      empty.insertAt(0, "snake", "turtle");
      expectValues(empty, ["snake", "turtle"]);
    });

    test.each([-1, 4])("returns an error for index %i", (index) => {
      expect(list.insertAt(index, "snake")).toEqual(new Error("out of bounds"));
      expectValues(list, ["dog", "cat", "parrot"]);
    });
  });

  describe("removeAt", () => {
    test.each([
      [0, ["cat", "parrot"]],
      [1, ["dog", "parrot"]],
      [2, ["dog", "cat"]],
    ])("removes the node at index %i", (index, expected) => {
      list.removeAt(index);
      expectValues(list, expected);
    });

    test("removes the only node", () => {
      const single = new LinkedList();
      single.append("dog");
      single.removeAt(0);
      expectValues(single, []);
    });

    test.each([-1, 3])("returns an error for index %i", (index) => {
      expect(list.removeAt(index)).toEqual(new Error("out of bounds"));
      expectValues(list, ["dog", "cat", "parrot"]);
    });

    test("returns an error for index 0 in an empty list", () => {
      expect(new LinkedList().removeAt(0)).toEqual(new Error("out of bounds"));
    });
  });
});

class BTreeNode {
  constructor(leaf = false) {
    this.keys = [];
    this.values = [];
    this.children = [];
    this.leaf = leaf;
  }
}

class BTree {
  constructor(order = 3) {
    this.root = new BTreeNode(true);
    this.order = order;
  }

  search(node, key) {
    let i = 0;
    while (i < node.keys.length && key > node.keys[i]) i++;
    if (i < node.keys.length && key === node.keys[i]) {
      return node.values[i];
    }
    if (node.leaf) return null;
    return this.search(node.children[i], key);
  }

  get(key) {
    return this.search(this.root, key);
  }

  insert(key, value) {
    const root = this.root;
    if (root.keys.length === 2 * this.order - 1) {
      const newRoot = new BTreeNode(false);
      newRoot.children.push(this.root);
      this.splitChild(newRoot, 0);
      this.root = newRoot;
    }
    this.insertNonFull(this.root, key, value);
  }

  insertNonFull(node, key, value) {
    let i = node.keys.length - 1;
    if (node.leaf) {
      while (i >= 0 && key < node.keys[i]) {
        node.keys[i + 1] = node.keys[i];
        node.values[i + 1] = node.values[i];
        i--;
      }
      node.keys[i + 1] = key;
      node.values[i + 1] = value;
    } else {
      while (i >= 0 && key < node.keys[i]) i--;
      i++;
      if (node.children[i].keys.length === 2 * this.order - 1) {
        this.splitChild(node, i);
        if (key > node.keys[i]) i++;
      }
      this.insertNonFull(node.children[i], key, value);
    }
  }

  splitChild(parent, i) {
    const order = this.order;
    const child = parent.children[i];
    const newNode = new BTreeNode(child.leaf);
    parent.keys.splice(i, 0, child.keys[order - 1]);
    parent.values.splice(i, 0, child.values[order - 1]);
    parent.children.splice(i + 1, 0, newNode);
    newNode.keys = child.keys.splice(order, order - 1);
    newNode.values = child.values.splice(order, order - 1);
    child.keys.splice(order - 1, 1);
    child.values.splice(order - 1, 1);
    if (!child.leaf) {
      newNode.children = child.children.splice(order);
    }
  }

  getAllValues() {
    const results = [];
    this.traverse(this.root, results);
    return results;
  }

  traverse(node, results) {
    for (let i = 0; i < node.keys.length; i++) {
      if (!node.leaf) this.traverse(node.children[i], results);
      results.push(node.values[i]);
    }
    if (!node.leaf) this.traverse(node.children[node.keys.length], results);
  }
}

module.exports = { BTree };
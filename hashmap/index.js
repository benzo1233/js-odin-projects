class hashmap {
  constructor() {
    this.capacity = 16;
    this.loadfactor = 0.75;
    this.len = 0;
    this.bucket = Array.from({ length: this.capacity }, () => []);
  }

  resize(old, key) {
    const newBucket = Array.from({ length: this.capacity }, () => []);

    old.map((item) => {
      if (item.length === 0) return;

      const key = item[0];
      const val = item[1];
      const idx = this.hash(key);
      newBucket[idx] = [key, val];
    });

    return newBucket;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const threshold = this.capacity * this.loadfactor;
    if (this.len + 1 > threshold) {
      this.capacity = this.capacity * 2;

      const old = this.bucket;
      const newBucket = this.resize(old, key);
      this.bucket = newBucket;
    }

    const idx = this.hash(key);
    const bucket = this.bucket[idx];
    if (bucket.length !== 0) {
      this.bucket[idx] = [key, value];
      return;
    }
    this.bucket[idx] = [key, value];
    this.len++;
  }

  get(key) {
    const idx = this.hash(key);
    const bucket = this.bucket[idx];
    if (bucket.length === 0 || bucket[0] !== key) {
      return;
    }
    //return val
    return this.bucket[idx][1];
  }

  has(key) {
    const idx = this.hash(key);
    if (this.bucket[idx][0] === key) {
      return true;
    }
    return false;
  }

  remove(key) {
    const idx = this.hash(key);
    const bucket = this.bucket[idx];
    if (bucket[0] === key) {
      this.bucket[idx] = [];
      this.len--;
      return true;
    }
    return false;
  }

  length() {
    return this.len;
  }

  clear() {
    this.bucket = Array.from({ length: this.capacity }, () => []);
    this.len = 0;
  }

  keys() {
    // return Object.keys(this.bucket);
    let res = [];
    for (const item of this.bucket) {
      if (item.length !== 0) {
        res.push(item[0]);
      }
    }
    return res;
  }
  values() {
    // return Object.values(this.bucket);
    let res = [];
    for (const item of this.bucket) {
      if (item.length !== 0) {
        res.push(item[1]);
      }
    }
    return res;
  }
  entries() {
    // return Object.entries(this.bucket);
    return this.bucket.filter((item) => item.length !== 0);
  }
}

const test = new hashmap();
test.set("0", "value 0");
test.set("1", "value 1");
test.set("2", "value 2");
test.set("3", "value 3");
test.set("4", "value 4");
test.set("5", "value 5");
test.set("6", "value 6");
test.set("7", "value 7");
test.set("8", "value 8");
test.set("9", "value 9");
test.set(":", "value 10");
test.set(";", "value 11");

// console.log(test.get(";"));
// console.log(test.has(";"));
// console.log(test.has(";;;"));

// Test Remove
// console.log(test.length());
// console.log(test.remove(";"));
// console.log(test.length());

console.log(test.length());
test.set(";;", "value 12"); //should push the capacity past the threshold
console.log(test.length());

console.log(`capacity should be 32:  ${test.capacity}`); //capacity here should be 32 (double from 16)

// console.log(test.keys());
// console.log(test.values());

console.log(test.entries());
test.clear();
console.log(test.entries());
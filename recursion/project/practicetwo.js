// Write fibonacci iteratively and then recursively
// Write Merge Sort iteratively and then recursively

// fibonacci iterative
function fibonacci(num) {
  if (num == 1) return 0;
  if (num == 2) return 1;

  let i = 0;
  let j = 1;
  num = num - 2;

  for (let k = 0; k < num; k++) {
    let prev = j;
    j = i + j;
    i = prev;
  }

  return j;
}

// TODO: RECURSIVE fibonacii

function fibRec(num) {
  if (num <= 2) return num - 1;
  return fibonacci(num - 1) + fibonacci(num - 2);
}

// TODO: RECURSIVE mergeSort

function mergeSort(array) {
  if (array.length <= 1) return array; 

  let l = 0;
  let mid = Math.floor(array.length / 2);
  let h = array.length;

  // if (l < h) { //redunant
    const left = mergeSort(array.slice(l, mid));
    const right = mergeSort(array.slice(mid, h));
    return mergeHelper(left, right);
  // }
}

function mergeHelper(arr1, arr2) {
  let res = [];
  let r = 0;
  let l = 0;

  while (l < arr1.length && r < arr2.length) {
    if (arr1[l] < arr2[r]) {
      res.push(arr1[l]);
      l++;
    } else {
      res.push(arr2[r]);
      r++;
    }
  }

  if (l < arr1.length) {
    while (l < arr1.length) {
      res.push(arr1[l]);
      l++;
    }
  }
  if (r < arr2.length) {
    while (r < arr2.length) {
      res.push(arr2[r]);
      r++;
    }
  }

  return res;
}

module.exports = { fibonacci, fibRec, mergeSort };

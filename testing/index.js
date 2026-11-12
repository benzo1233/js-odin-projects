export function capitalize(str) {
  const capitalStr = str.charAt(0).toUpperCase() + str.slice(1);
  return capitalStr;
}

export function reverseString(str) {
  let newString = "";
  const stack = [];

  for (let i = str.length - 1; i >= 0; i--) {
    const c = str[i];
    stack.push(c);
  }

  newString = stack.join("");
  return newString;
}

export const calc = {
  add(x, y) {
    return x + y;
  },
  sub(x, y) {
    return x - y;
  },
  multi(x, y) {
    return x * y;
  },
  divid(x, y) {
    return x / y;
  },
};

export function caesarCiphor(msg, shift) {
  const alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  let encodedStr = [];
  for (let i = 0; i < msg.length; i++) {
    const char = msg[i];

    if (!/[a-zA-Z]/.test(char)) {
      encodedStr.push(char);
      continue;
    }

    const toLower = char.toLowerCase();
    const idx = alphabet.indexOf(toLower);
    const shifted = alphabet[(idx + shift) % 26];
    let isUpper = char !== toLower ? true : false;
    const res = isUpper ? shifted.toUpperCase() : shifted;
    encodedStr.push(res);
  }

  return encodedStr.join("");
}

export function analyzeArray(arr) {
  let sum = arr.reduce((accum, curr) => {
    return accum + curr;
  }, 0);

  let avg = sum / arr.length;
  return {
    average: avg,
    min: Math.min(...arr),
    max: Math.max(...arr),
    length: arr.length,
  };
}

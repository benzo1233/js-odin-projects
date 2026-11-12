// function collatz(n, count) {
//   if (n == 1) {
//     return count;
//   } else if (n % 2 == 0) {
//     return callatz(n / 2, (count = count + 1));
//   } else {
//     return callatz(3 * n + 1, (count = count + 1));
//   }
// }

function collatz(n) {
  // Base case
  if (n === 1) {
    return 0;
  }
  // Even numbers
  else if (n % 2 === 0) {
    return 1 + collatz(n / 2);
  }
  // Odd numbers
  else {
    return 1 + collatz(3 * n + 1);
  }
}

console.log(collatz(50, 0));

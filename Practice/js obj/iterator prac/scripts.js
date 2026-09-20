/*
=== Q1: Write the code, one line for each action ===

Create an empty object user.
Add the property name with the value John.
Add the property surname with the value Smith.
Change the value of the name to Pete.
Remove the property name from the object. 
*/

const user = {};
user.name = "john pork";
user.surname = "smith";
user.name = "Pete";
delete user.name;



// === Q2: Write the function isEmpty(obj) which returns true if the object has no properties, false otherwise.===
function isEmpty(obj) {
  for (let key in obj) {
    return false;
  }
  return true;

  // OR
  // if (Object.keys(obj).length === 0) {
  //     return true;
  // }
  // return false;
}
/**
let schedule = {};
alert( isEmpty(schedule) ); // true
schedule["8:30"] = "get up";
alert( isEmpty(schedule) ); // false
 */



// We have an object storing salaries of our team:
//=== Q3: Write the code to sum all salaries and store in the variable sum. Should be 390 in the example above. ===

let salaries = {
  John: 100,
  Ann: 160,
  Pete: 130,
};

//Write Code Here

function sum(obj) {
  let sum = 0;
  for (let key in obj) {
    sum += obj[key];
  }

  return sum;
}

// console.log(sum(salaries));



// === Q4: before the call ===
let menu = {
  width: 200,
  height: 300,
  title: "My menu",
};

// Go vals for keys and multiply by 2 if val is a #
// console.log(multiplyNumeric(menu));

function multiplyNumeric(obj) {
  //Add Code:
  for (let key in obj) {
    if (typeof obj[key] === "number") {
      obj[key] *= 2;
    }
  }
  return obj;
}

// // after the call
/*
menu = {
  width: 400,
  height: 600,
  title: "My menu"
};
*/



// === Q5: Map to names, Convert object names to array list ===
/* 
let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 28 };

// let users = [ john, pete, mary ];

// Write Code here...
let names = users.map((item) => item.name);

console.log( names ); // John, Pete, Mary
*/



// === Q6: Map to Objects ===
//  Write the code to create another array from it, of objects with id and fullName, where fullName is generated from name and surname.

// let john = { name: "John", surname: "Smith", id: 1 };
// let pete = { name: "Pete", surname: "Hunt", id: 2 };
// let mary = { name: "Mary", surname: "Key", id: 3 };

// let users = [ john, pete, mary ];

// //we need () around {} to return a object, otherwise js thinks {} is a function body.
// let usersMapped = users.map((item) => ({
//     fullName : item.name + " " + item.surname,
//     id : item.id,
// }));

// /* ref end
// usersMapped = [
//   { fullName: "John Smith", id: 1 },
//   { fullName: "Pete Hunt", id: 2 },
//   { fullName: "Mary Key", id: 3 }
// ]
// */

// console.log( usersMapped[0].id ) // 1
// console.log( usersMapped[0].fullName ) // John Smith



// === Q7: Sort Users by Age (Ascending) ===
// let john = { name: "John", age: 25 };
// let pete = { name: "Pete", age: 30 };
// let mary = { name: "Mary", age: 28 };

// let arr = [pete, john, mary];

// function sortByAge(arr) {
//   arr.sort((a, b) => a.age - b.age);
//   return arr;
// }

// console.log(sortByAge(arr));
// now: [john, mary, pete]


// === Q8: Get Average Age ===
let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 29 };

let arr = [ john, pete, mary ];

function getAverageAge (arr) {
    // return arr.reduce((acc, item) => { return acc + item.age; }, 0) / arr.length;
    return arr.reduce((acc, item) => acc + item.age, 0) / arr.length; //Implicit Return
}

// alert( getAverageAge(arr) ); // (25 + 30 + 29) / 3 = 28



// === Q8: Create Keyed object from array ===
let users = [
  {id: 'john', name: "John Smith", age: 20},
  {id: 'ann', name: "Ann Smith", age: 24},
  {id: 'pete', name: "Pete Peterson", age: 31},
];

function groupById (users) {
    return users.reduce((acc, user) => {
        acc[user.id] = user;
        return acc;
    });
}

let usersById = groupById(users);
console.log(usersById);
// after the call we should have:
// usersById = {
//   john: {id: 'john', name: "John Smith", age: 20},
//   ann: {id: 'ann', name: "Ann Smith", age: 24},
//   pete: {id: 'pete', name: "Pete Peterson", age: 31},
// }

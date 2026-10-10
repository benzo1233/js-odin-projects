// Index.js
// import { createToDo } from './createItem.js'
import { addItemToView } from './dom.js'
import { loadTodos } from './localStorage.js'
import { initDialog } from './dialog.js'
import './dialog.js'
import '../styles.css'

let todos = loadTodos();
todos.forEach(addItemToView);   // render what's already saved

initDialog(todos);
// const item = createToDo("Gym", "Leg Day", "tomorrow", 5, "Hit glutes, hams, quads");
// const button = document.querySelector("#addTask");

// button.addEventListener("click", (e) => {
//     todos.push(item);
//     saveTodos(todos);
//     addItemToView(item);
// });






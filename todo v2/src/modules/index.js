// Index.js
import { createToDo } from './createItem.js'
import { addItemToView } from './dom.js'
import { loadTodos, saveTodos } from './localStorage.js'
import './dialog.js'
import '../styles.css'

let todos = loadTodos();
todos.forEach(addItemToView);   // render what's already saved

const item = createToDo("Gym", "Leg Day", "tomorrow", 5, "Hit glutes, hams, quads");
const button = document.querySelector("#addTask");

button.addEventListener("click", (e) => {
    todos.push(item);
    saveTodos(todos);
    addItemToView(item);
});






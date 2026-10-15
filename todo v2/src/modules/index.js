import { addItemToView } from './dom.js'
import { loadTodos } from './localStorage.js'
import { initTodos, initProject } from './dialog.js'
import './dialog.js'
import '../styles.css'

let todos = loadTodos();
todos.forEach(addItemToView);   // render what's already saved

initTodos(todos);
initProject();









import { renderItem } from './render.js'
import { loadTodos } from './localStorage.js'
import { initTodos, initProject } from './controller.js'
import './controller.js'
import '../styles.css'

let todos = loadTodos();
todos.forEach(renderItem);   // render what's already saved

initTodos(todos);
initProject();









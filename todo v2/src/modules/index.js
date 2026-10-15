import { addItemToView } from './dom.js'
import { loadTodos } from './localStorage.js'
import { initDialog } from './dialog.js'
import './dialog.js'
import '../styles.css'

let todos = loadTodos();
todos.forEach(addItemToView);   // render what's already saved

initDialog(todos);







import { renderProject } from './render.js'
import { loadProjects } from './localStorage.js'
import { initTodos, initProject, createProjectTab} from './controller.js'
import './controller.js'
import '../styles.css'
import { setProjects } from './state.js'

let projects = loadProjects();
setProjects(projects);
projects.forEach(renderProject);   // render what's already saved
projects.forEach(createProjectTab);   // rebuild sidebar tabs for saved projects

initTodos(projects);
initProject();









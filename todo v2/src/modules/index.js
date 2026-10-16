import { loadProjects } from './localStorage.js'
import { setActiveProject, setProjects } from './state.js'
import { renderProject } from './render.js'
import { initTodos, initProject, addProjectTab } from './controller.js'
import './controller.js'
import '../styles.css'

// Retrieves data from LocalStor -> Rebuild State
let projects = loadProjects();
setProjects(projects);

// When user refresh, reloads the first project
if (projects.length > 0) {
    setActiveProject(projects[0].id);
    renderProject(projects[0]);
}

// Rerender Tabs 
for (const project of projects) {
    addProjectTab(project);
}

// Initializes event listeners for dialog, adding todos & projects
initTodos(projects);
initProject();









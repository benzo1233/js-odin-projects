import { loadProjects, saveProjectLocally } from './localStorage.js'
import { addProject, getAllProjects, setActiveProject, setProjects } from './state.js'
import { renderProject } from './render.js'
import { initTodos, initProject, addProjectTab } from './controller.js'
import './controller.js'
import '../styles.css'

import { createProject } from './factories.js'

// Retrieves data from LocalStor -> Rebuild State
let projects = loadProjects();
setProjects(projects);

// Hardcoded Default Pg
let home = projects.find(project => project.id === "Home");

if (!home) {
    home = createProject("Home", "Default Todo");
    home.id = "Home";        // override the random UUID with our fixed id
    addProject(home);          // only register it in state.js when it's new
    saveProjectLocally(getAllProjects());
}

addProjectTab(home);
setActiveProject(home.id);
renderProject(home);

// Reload all tabs
for (const project of projects) {
    if (project.id !== "Home") {
        addProjectTab(project);
    }
}

// Initializes event listeners for dialog, adding todos & projects
initTodos();
initProject();









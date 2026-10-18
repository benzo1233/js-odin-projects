import { addProject, getProject, getAllProjects, getActiveProjectId, setActiveProject } from './state.js'
import { createTodo, createProject } from './factories.js'
import { renderProject, createProjectTab } from './render.js'
import { saveProjectLocally } from './localStorage.js'


export function initTodos() {
    const dialog = document.querySelector("#todo-dialog");
    const form = document.querySelector("#todo-form");
    const openBtn = document.querySelector("#addTask")
    const closeBtn = document.querySelector("#closeBtn")

    // openBtn.addEventListener("click", () => {
    //     dialog.showModal();
    // });

    closeBtn.addEventListener("click", () => {
        dialog.close();
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(form);

        const todo = createTodo(
            formData.get("title"),
            formData.get('description'),
            formData.get('duedate'),
            Number(formData.get('priority')),
            formData.get('notes'),
        );

        const currActiveProject = getProject(getActiveProjectId());
        currActiveProject.todos.push(todo);
        renderProject(currActiveProject);
        saveProjectLocally(getAllProjects());

        dialog.close();
    });
}


export function initProject() {
    const dialog = document.querySelector("#project-dialog");
    const form = document.querySelector("#project-form");
    const openBtn = document.querySelector("#addProject")
    const closeBtn = document.querySelector("#projectCloseBtn")

    openBtn.addEventListener("click", () => {
        dialog.showModal();
    });

    closeBtn.addEventListener("click", () => {
        dialog.close();
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(form);

        const newProject = createProject(
            formData.get("projectName"),
            formData.get("projectDescription")
        );

        addProject(newProject);
        setActiveProject(newProject.id);
        saveProjectLocally(getAllProjects());
        renderProject(newProject);
        addProjectTab(newProject);

        dialog.close();
    });
}

// Sets project as Active and Renders, (Improve? too many responsibilities?)
export function addProjectTab(project) {
    const tab = createProjectTab(project);
    tab.addEventListener("click", () => {
        setActiveProject(project.id);
        renderProject(project);
    });
}

// NEW ===============================

const sidebar = document.querySelector("#sidebar");

sidebar.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) { return };

    const action = actions[btn.dataset.action];

    

});

const actions = { 
    "addTask": openTaskDialog(),
}

function openTaskDialog() {
    const dialog = document.querySelector("#todo-dialog");
    dialog.showModal();
};
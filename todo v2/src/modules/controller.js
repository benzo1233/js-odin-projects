import { createTodo, createProject } from './factories.js'
import { renderProject } from './render.js'
import { saveProjectLocally } from './localStorage.js'
import { addProject, getProject, getAllProjects, getActiveProjectId, setActiveProject } from './state.js'


export function initTodos() {
    const dialog = document.querySelector("#todo-dialog");
    const form = document.querySelector("#todo-form");
    const openBtn = document.querySelector("#addTask")
    const closeBtn = document.querySelector("#closeBtn")

    openBtn.addEventListener("click", () => {
        dialog.showModal();
    });

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

        const project = getProject(getActiveProjectId());
        project.todos.push(todo);
        renderProject(project);
        saveProjectLocally(getAllProjects());

        dialog.close();
    });
}


export function initProject() {
    const addProjectBtn = document.querySelector("#addProject");

    addProjectBtn.addEventListener("click", () => {
        const newProject = createProject();
        addProject(newProject);
        setActiveProject(newProject.id);
        renderProject(newProject);
        saveProjectLocally(getAllProjects());
        createProjectTab(newProject);
    });
}


export function createProjectTab(project) {
    const sidebar = document.querySelector("#sidebar");

    const projectTabBtn = document.createElement("button");
    projectTabBtn.textContent = project.title || "Project";
    sidebar.appendChild(projectTabBtn);

    projectTabBtn.addEventListener("click", () => {
        setActiveProject(project.id);
        renderProject(project);
    });
}


import { addProject, getProject, getAllProjects, getActiveProjectId, setActiveProject } from './state.js'
import { createTodo, createProject } from './factories.js'
import { renderProject, createProjectTab } from './render.js'
import { saveProjectLocally } from './localStorage.js'


export function appInit() {
    initTodoForm();
    initProjectForm();
    initSideBarHandler();
    initTodoDetailsHandler();
}

function initTodoForm() {
    const dialog = document.querySelector("#todo-dialog");
    const form = document.querySelector("#todo-form");

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
        form.reset();
    });
}


function initProjectForm() {
    const dialog = document.querySelector("#project-dialog");
    const form = document.querySelector("#project-form");

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
        form.reset();
    });
}

// Sets project as Active and Renders, (Improve? too many responsibilities?)
export function addProjectTab(project) {
    const tab = createProjectTab(project);
    tab.addEventListener("click", () => {
        setActiveProject(project.id);
        renderProject(project);
    });
    return tab;
}

function initSideBarHandler() {
    const sidebar = document.querySelector("#sidebar");
    
    sidebar.addEventListener("click", (e) => {
        const btn = e.target.closest("button");

        if (!btn) { return };
        const action = actions[btn.dataset.action];
        if (action) { action() };

        // showcase active projectTab
        const tab = e.target.closest(".project-tab");
        if (!tab) return;
        sidebar.querySelectorAll(".project-tab").forEach((bar) => {
            bar.classList.remove("active");
        });

        tab.classList.add("active")
    });

    const actions = {
        "openTaskDialog": openTaskDialog,
        "closeTaskDialog": closeTaskDialog,
        "openProjectDialog": openProjectDialog,
        "closeProjectDialog": closeProjectDialog,
    }

    function openTaskDialog() {
        document.querySelector("#todo-dialog").showModal();
    };
    function closeTaskDialog() {
        document.querySelector("#todo-dialog").close();
    };
    function openProjectDialog() {
        document.querySelector("#project-dialog").showModal();
    };
    function closeProjectDialog() {
        document.querySelector("#project-dialog").close();
    };
}

function initTodoDetailsHandler() {
    const container = document.querySelector("#container");
    container.addEventListener('click', e => {
        if (e.target.classList.contains('toggle')) {
            e.target.closest('.todoItem').classList.toggle('open');
        }
        const check = e.target.closest('.todo-check');
        if (check) {
            const project = getProject(getActiveProjectId());
            let todo = project.todos.find(todo => todo.id === check.dataset.todoId);

            if (!todo) { return }
            todo.completed = todo.completed ? false : true;
            saveProjectLocally(getAllProjects());
        }
    });
}
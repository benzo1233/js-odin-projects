import { createToDo, createProject} from './factories.js'
import { renderItem, renderProject} from './render.js'
import { saveTodos } from './localStorage.js'
import { addProject, getProject , getActiveProjectId, setActiveProject} from './state.js'


export function initTodos(todos) {
    const dialog = document.querySelector("#todo-dialog");
    const form = document.querySelector("#todo-form");
    const openbtn = document.querySelector("#addTask")
    const closeBtn = document.querySelector("#closeBtn")

    openbtn.addEventListener("click", () => {
        dialog.showModal();
    });

    closeBtn.addEventListener("click", () => {
        dialog.close();
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        const todo = createToDo(
            formData.get("title"),
            formData.get('description'),
            formData.get('duedate'),
            Number(formData.get('priority')),
            formData.get('notes'),
        );

        const project = getProject(getActiveProjectId());
        project.todos.push(todo);
        renderProject(project);

        dialog.close();
    });
}


export function initProject() {
    const sidebar = document.querySelector("#sidebar");
    const addProjectBtn = document.querySelector("#addProject");

    addProjectBtn.addEventListener("click", () => {
        const project = createProject();
        addProject(project);
        setActiveProject(project.id);
        renderProject(project);
        
        // Create Sidebar Tab 
        const btn = document.createElement("button");
        btn.textContent = "test";
        sidebar.appendChild(btn);

        btn.addEventListener("click", () => {
            setActiveProject(project.id);
            renderProject(project);
        });
    });
}



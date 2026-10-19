import { parseISO, format } from "date-fns"

const container = document.querySelector("#container");
const sidebar = document.querySelector("#sidebar");

function renderTodo(todo) {
    console.log(todo);

    const div = document.createElement("div");
    div.className = 'todo';

    const title = document.createElement("h2");
    title.textContent = todo.title;

    const description = document.createElement("p");
    description.textContent = todo.description;

    const btn = document.createElement("button");
    btn.className = 'toggle';
    btn.textContent = '▼';

    div.append(title, description, btn);

    // DIVIDOR
    const details = document.createElement("div");
    details.className = 'todo-details'

    const dueDate = document.createElement("p");
    dueDate.textContent = format(parseISO(todo.dueDate), "MMM dd, yyyy h:mm a");

    const priority = document.createElement("p");
    priority.textContent = `Priority: ${todo.priority}`;

    const notes = document.createElement("p");
    notes.textContent = `Notes: ${todo.notes}`;

    details.append(dueDate, priority, notes);

    div.append(details);
    container.append(div);

}

export function renderProject(project) {
    console.log(project)

    container.innerHTML = '';
    for (const todo of project.todos) {
        renderTodo(todo);
    }
}

export function createProjectTab(project) {
    const projectTabBtn = document.createElement("button");
    projectTabBtn.classList.add("project-tab")
    projectTabBtn.textContent = project.title || "Project";
    sidebar.appendChild(projectTabBtn);

    return projectTabBtn;
}



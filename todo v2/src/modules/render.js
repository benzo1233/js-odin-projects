import { parseISO, format } from "date-fns"

const container = document.querySelector("#container");
const sidebar = document.querySelector("#sidebar");

function createTodo(todo) {
    console.log(todo);

    const todoElement = document.createElement("div");
    todoElement.className = 'todoItem';
    todoElement.dataset.todoId = todo.id;


    // todoItem CheckBox 
    const check = document.createElement("input");
    check.type = "checkbox";
    check.className = "todo-check";
    // check.dataset.todoId = todo.id;
    check.checked = todo.completed;

    // Header
    const header = document.createElement("div");

    const title = document.createElement("h2");
    title.textContent = todo.title;

    const description = document.createElement("p");
    description.classList.add("description");
    description.textContent = todo.description;

    header.append(title, description);

    // Delete Btn
    const containerBtn = document.createElement("div");
    containerBtn.classList.add("containerBtn");

    const deleteBtn = document.createElement("button");
    deleteBtn.className = 'delete';
    deleteBtn.textContent = "🗑️";

    // Toggle Btn
    const toggleBtn = document.createElement("button");
    toggleBtn.className = 'toggle';
    toggleBtn.textContent = '▼';

    containerBtn.append(deleteBtn, toggleBtn);
    todoElement.append(check, header, containerBtn);

    // Details popdown
    const details = document.createElement("div");
    details.className = 'todo-details'

    const dueDate = document.createElement("p");
    dueDate.textContent = format(parseISO(todo.dueDate), "MMM dd, yyyy h:mm a");

    const priority = document.createElement("p");
    priority.textContent = `Priority: ${todo.priority}`;

    const notes = document.createElement("p");
    notes.textContent = `Notes: ${todo.notes}`;

    // Append Content
    details.append(dueDate, priority, notes);
    todoElement.append(details);

    return todoElement;

}

export function renderProject(project) {
    console.log(project)

    container.innerHTML = '';

    // Create Header to show what project we r on
    const header = document.createElement("div");
    header.textContent = "myProjects / " + project.title;
    header.classList.add("project-header");
    container.append(header);

    if (!project.todos) { return }
    for (const todo of project.todos) {
        container.append(createTodo(todo));
    }
}

export function createProjectTab(project) {
    const projectTabBtn = document.createElement("button");
    projectTabBtn.classList.add("project-tab")
    projectTabBtn.textContent = "# " + project.title || "# " + "Project";
    sidebar.appendChild(projectTabBtn);

    return projectTabBtn;
}



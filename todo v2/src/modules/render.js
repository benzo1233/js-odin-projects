import { parseISO, format } from "date-fns"

const container = document.querySelector("#container");
const sidebar = document.querySelector("#sidebar");

function renderTodo(todo) {
    console.log(todo);

    const todoElement = document.createElement('p');
    todoElement.textContent =
        `${todo.title} 
        - ${todo.description} 
        - Due: ${format(parseISO(todo.dueDate), "MMM dd, yyyy h:mm a")} 
        - Priority: ${todo.priority}
        - Notes: ${todo.notes}`;

    container.appendChild(todoElement);
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
    projectTabBtn.textContent = project.title || "Project";
    sidebar.appendChild(projectTabBtn);

    return projectTabBtn;
}



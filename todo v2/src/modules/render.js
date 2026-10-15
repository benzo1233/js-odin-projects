const container = document.querySelector("#container");
const sidebar = document.querySelector("#sidebar");

export function renderTodo(todo) {
    console.log(todo);

    const todoElement = document.createElement('p');
    todoElement.textContent = `${todo.title} - ${todo.description} - Due: ${todo.dueDate} - Priority: ${todo.priority} - Notes: ${todo.notes}`;
    container.appendChild(todoElement);
}

export function renderProject(project) {
    console.log(project)

    container.innerHTML = '';
    for (const todo of project.todos) {
        renderTodo(todo);
    }
}



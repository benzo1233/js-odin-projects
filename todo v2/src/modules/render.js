const container = document.querySelector("#container");
const sidebar = document.querySelector("#sidebar");

export function renderItem(item) {
    console.log(item);

    const p = document.createElement('p');
    p.textContent = `${item.title} - ${item.des} - Due: ${item.dueDate} - Priority: ${item.priority} - Notes: ${item.notes}`;
    container.appendChild(p);
}

export function renderProject(project) {
    console.log(project)

    container.innerHTML = '';
    for (const todo of project.todos) {
        renderItem(todo);
    }
}



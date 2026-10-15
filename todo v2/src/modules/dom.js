const container = document.querySelector("#container");
const sidebar = document.querySelector("#sidebar");

export function addItemToView (item) {
    console.log(item);
    const p = document.createElement('p');
    p.textContent = `${item.title} - ${item.des} - Due: ${item.dueDate} - Priority: ${item.priority} - Notes: ${item.notes}`;
    container.appendChild(p);
}

export function addProjectToView (project) {
    console.log("WORKING!!!")
    const btn = document.createElement("button");
    btn.textContent = "test";
    sidebar.appendChild(btn);
}

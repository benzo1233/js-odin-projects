
const container = document.querySelector("#container");

export function addItemToView (item) {
    console.log(item);
    const p = document.createElement('p');
    p.textContent = `${item.title} - ${item.des} - Due: ${item.dueDate} - Priority: ${item.priority} - Notes: ${item.notes}`;
    container.appendChild(p);
}

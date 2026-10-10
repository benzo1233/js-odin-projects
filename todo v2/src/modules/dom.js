
const container = document.querySelector("#container");

export function addItemToView (item) {
    console.log(item);
    const p = document.createElement('p');
    p.textContent = item.notes;
    container.appendChild(p);
}

import { page } from "./info.js"

export function createContact() {
    const container = document.createElement("div");
    const obj = page.contact;

    Object.values(obj).forEach((value) => {
        const div = document.createElement("p");
        div.textContent = value;
        container.appendChild(div);
    });

    return container;
}
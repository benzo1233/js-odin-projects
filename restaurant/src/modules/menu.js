import { page } from "./info.js"

export function createMenu() {
    const container = document.createElement("div");
    const obj = page.menu;

    Object.values(obj).forEach((value) => {
        value.forEach((item)=> {
            const div = document.createElement("p");
            div.textContent = item;
            container.appendChild(div);
        });
    });

    return container;
}

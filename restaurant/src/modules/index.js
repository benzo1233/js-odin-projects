import "../styles.css"
import { createHomePage } from "./home.js"
import { createMenu } from "./menu.js"
import { createContact } from "./contact.js"

console.log("Working....");
const content = document.querySelector("#content");

function render(id) {
    content.innerHTML = "";
    if (id === "home") {
        content.appendChild(createHomePage());
    } else if (id === "menu") {
        content.appendChild(createMenu());
    } else {
        content.appendChild(createContact());
    }
}

const nav = document.querySelector("nav");
nav.addEventListener("click", (e) => {
    render(e.target.id);
});


render("home");
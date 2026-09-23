import "./styles.css"
import homeImg from "./imgs/istockphoto-1388791676-612x612.jpg";

console.log("Working....");
const content = document.querySelector("#content");

const page = {
    homepage: {
        title: "",
        content: "",
        hours: "Mon-Fri, 3pm - 9:30pm",
        location: "134 West St, West Side Brooklyn",
    },

    menu: {
        bev: ["Sommelier's Wine Pairing", "Sparkling Elderflower Cordial", "Estate Reserve Champagne", "Yuzu & Basil Spritz", "Single-Origin Espresso", "Barrel-Aged Old Fashioned"],
        sides: ["Truffle Pommes Purée", "Charred Heirloom Carrots with Brown Butter", "Foie Gras Torchon", "Burrata with Aged Balsamic", "Roasted Bone Marrow", "Shaved Fennel & Citrus Salad"],
        entree: ["Pan-Seared Foie Gras with Fig Reduction", "Wagyu Beef Wellington", "Butter-Poached Maine Lobster", "Duck Confit with Cherry Gastrique", "Wild Mushroom Risotto with Black Truffle", "Dry-Aged Ribeye with Red Wine Jus"],

    },
    contact: {
        owner: "Owner: Benzo Doe, JohnPork@live.com",
        hr: "Hiring Manager: Casseta Johns, Johns@gmail.com",
        phone: "Phone: (555) 867-5309",
        address: "Address: 134 West St, West Side Brooklyn",
        hours: "Hours: Mon-Fri, 3pm - 9:30pm",
        socials: "Follow us: @perse_restaurant",
    }
}


function createHomePage() {
    const container = document.createElement("div");
    const obj = page.homepage;

    const { title, content, hours, location } = obj;

    // const header = document.createElement("h1");
    // header.textContent = title;

    const description = document.createElement("h2");
    description.textContent = content;

    const openTimes = document.createElement("p");
    openTimes.textContent = hours;

    const loc = document.createElement("p");
    loc.textContent = location;

    const img = document.createElement("img");
    img.src = homeImg;

    // container.append(img, header, description, openTimes, loc);
    container.append(img, description, openTimes, loc);
    return container;
}


function createMenu() {
    const container = document.createElement("div");
    container.style.padding = "1rem";
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


function createContact() {
    const container = document.createElement("div");
    container.style.padding = "1rem";
    const obj = page.contact;

    Object.values(obj).forEach((value) => {
        const div = document.createElement("p");
        div.textContent = value;
        container.appendChild(div);
    });

    return container;
}

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
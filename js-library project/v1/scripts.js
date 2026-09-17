// TODO:
// Rebuilding the whole DOM on every change is wasteful. displayAll() wipes and rebuilds every card even when only one book changed.

let library = [];
let display = document.querySelector("#display");
const dialog = document.querySelector("#book-dialog");
const body = document.querySelector("body");
const form = document.querySelector("form");
function Book(id, name, author) {
    this.id = id;
    this.name = name;
    this.author = author;
    this.read = false;
}

Book.prototype.readStatus = function () {
    this.read = !this.read;
}

function addBookToLibrary(name, author) {
    const id = crypto.randomUUID();
    library.push(new Book(id, name, author));
}

function createBookCard(book) {
    const card = document.createElement("div");
    card.classList.add("book-card");
    card.dataset.id = book.id;

    const name = document.createElement("p");
    name.textContent = `Name: ${book.name}`;

    const author = document.createElement("p");
    author.textContent = `Author: ${book.author}`;

    const id = document.createElement("p");
    id.textContent = `ID: ${book.id}`;

    const read = document.createElement("p");
    read.textContent = `read status: ${book.read}`;

    const readBtn = document.createElement("button");
    readBtn.textContent = "Toggle Read";
    readBtn.dataset.id = "read-btn";

    const deleteBtn = document.createElement("button");
    deleteBtn.dataset.id = "delete-btn";
    deleteBtn.textContent = "Delete";

    card.append(name, author, id, read, deleteBtn, readBtn);
    return card;
}

body.addEventListener("click", (e) => {
    const target = e.target;
    if (target.id === "open-dialog") {
        dialog.showModal();
    }
    if (target.id === "close-dialog") {
        dialog.close();
    }

    const card = target.closest(".book-card"); /*looks towards ancestors for .book-card*/
    const book = library.find(b => b.id === card.dataset.id); /*returns refernece to our object */

    // Future implement target.dataset.action?
    if (target.textContent === "Toggle Read") {
        book.readStatus();
        displayAll();
    }
    if (target.textContent === "Delete") {
        library = library.filter(b => b !== book); /*keep every book except the one matching the book reference */
        dialog.close();
        displayAll();
    }
});

function displayAll() {
    display.innerHTML = "";
    for (let i = 0; i < library.length; i++) {
        const bookCard = createBookCard(library[i]);
        display.append(bookCard);
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const name = formData.get("book");
    const author = formData.get("author");

    addBookToLibrary(name, author);
    displayAll();
    form.reset();
    dialog.close();
});
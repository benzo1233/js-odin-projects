let library = [];

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
    const book = new Book(id, name, author);
    library.push(book);
}

let display = document.querySelector("#display");

function displayAll() {
    display.innerHTML = "";

    for (let i = 0; i < library.length; i++) {
        let item = document.createElement("div");
        item.classList.add("book-card");

        let name = document.createElement("p");
        let author = document.createElement("p");
        let id = document.createElement("p");
        let read = document.createElement("p");
        let readBtn = document.createElement("button");
        let deleteBtn = document.createElement("button");
        const bookId = library[i].id;
        const book = library[i];

        name.textContent = `Name: ${library[i].name}`;
        author.textContent = `Author: ${library[i].author}`;
        id.textContent = `ID: ${library[i].id}`;
        read.textContent = `read status: ${library[i].read}`;
        readBtn.textContent = "Read";
        deleteBtn.textContent = "Delete";

        item.append(name, author, id, read, deleteBtn, readBtn);
        display.append(item);

        deleteBtn.addEventListener("click", ()=> {
            library = library.filter(book => book.id !== bookId);
            displayAll();
        });

        readBtn.addEventListener("click", ()=> {
            book.readStatus();
            displayAll();
        });
    }
}

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const name = formData.get("book");
    const author = formData.get("author")
    addBookToLibrary(name, author);    
    displayAll();
});


const dialog = document.querySelector("#book-dialog");
const openBtn = document.querySelector("#open-dialog");
const closeBtn = document.querySelector("#close-dialog");

openBtn.addEventListener("click", () => {
    dialog.show();
})

closeBtn.addEventListener("click", () => {
    dialog.close();
})

// TESTING
// addBookToLibrary("The World Wonders", "Ben");
// addBookToLibrary("The Stranger Things", "BeHenn");
// console.log(displayAll());
let library = [];

function Book(id, name, author) {
    this.id = id;
    this.name = name;
    this.author = author;
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

        name.textContent = `Name: ${library[i].name}`;
        author.textContent = `Author: ${library[i].author}`;
        id.textContent = `ID: ${library[i].id}`;

        item.append(name, author, id);
        display.append(item);
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


// TESTING
// addBookToLibrary("The World Wonders", "Ben");
// addBookToLibrary("The Stranger Things", "BeHenn");
// console.log(displayAll());
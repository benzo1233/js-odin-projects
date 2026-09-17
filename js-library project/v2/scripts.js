let display = document.querySelector("#display");
const dialog = document.querySelector("#book-dialog");
const body = document.querySelector("body");
const form = document.querySelector("form");

class Book {
    constructor(id, name, author) {
        this.id = id;
        this.name = name;
        this.author = author;
        this.read = false;
    }

    readStatus() {
        this.read = !this.read;
    }
}

class Library {
    #books = [];

    createBookCard(book) {
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

    addBookToLibrary(name, author) {
        const id = crypto.randomUUID();
        this.#books.push(new Book(id, name, author));
    }

    getLibrary() {
        return this.#books;
    }

    // setLibrary(books) {
    //     return this.#books = books;
    // }

    deleteBook(book) {
        this.#books = this.#books.filter(b => b !== book); /*keep every book except the one matching the book reference */
    }

    displayLibrary() {
        display.innerHTML = "";
        for (let i = 0; i < this.#books.length; i++) {
            const bookCard = this.createBookCard(this.#books[i]);
            display.append(bookCard);
        }
    }

}

// =============================================

const library = new Library();

body.addEventListener("click", (e) => {
    const target = e.target;

    if (target.id === "open-dialog") {
        dialog.showModal();
    }
    if (target.id === "close-dialog") {
        dialog.close();
    }

    const card = target.closest(".book-card"); /*looks towards ancestors for .book-card*/
    const myBooks = library.getLibrary();
    const book = myBooks.find(b => b.id === card.dataset.id); /*returns refernece to our object */

    // Future implement target.dataset.action?
    if (target.textContent === "Toggle Read") {
        book.readStatus();
        library.displayLibrary();
    }
    if (target.textContent === "Delete") {
        library.deleteBook(book);

        dialog.close();
        library.displayLibrary();
    }
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const name = formData.get("book");
    const author = formData.get("author");

    library.addBookToLibrary(name, author);
    library.displayLibrary();
    form.reset();
    dialog.close();
});
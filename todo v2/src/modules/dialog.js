import { createToDo } from './createItem.js'
import { addItemToView } from './dom.js'
import { saveTodos } from './localStorage.js'


export function initDialog(todos) {
    const dialog = document.querySelector("#todo-dialog");
    const form = document.querySelector("#todo-form");
    const openbtn = document.querySelector("#addTask")
    const closeBtn = document.querySelector("#closeBtn")

    openbtn.addEventListener("click", () => {
        dialog.showModal();
    });

    closeBtn.addEventListener("click", () => {
        dialog.close();
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        const todo = createToDo(
            formData.get("title"),
            formData.get('description'),
            formData.get('duedate'),
            Number(formData.get('priority')),
            formData.get('notes'),
        );

        todos.push(todo);
        saveTodos(todos);
        addItemToView(todo);


    });
}



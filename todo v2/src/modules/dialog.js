const dialog = document.querySelector("#todo-dialog");
const openbtn = document.querySelector("#addTask")
const closeBtn = document.querySelector("#closeBtn")

openbtn.addEventListener("click", () => {
    dialog.showModal();
});

closeBtn.addEventListener("click", () => {
    dialog.close();
});
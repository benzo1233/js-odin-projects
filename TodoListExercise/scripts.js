const form = document.querySelector("form");
const input = document.getElementById("item");
const ul = document.querySelector("ul");

form.addEventListener("submit", handleAddItem);

function handleAddItem (event) {
    event.preventDefault();

    const userInput = input.value.trim();

    if (userInput === "") {
        return;
    }

    createListItem(userInput);
    input.focus();    
}

function createListItem (text) {
    const li = document.createElement("li");
    const deleteButton = document.createElement("button");
  
    li.textContent = text;
    deleteButton.textContent = "Delete";

    ul.appendChild(li);
    li.appendChild(deleteButton);
    
    deleteButton.addEventListener("click", () => li.remove());
    input.value = "";
}




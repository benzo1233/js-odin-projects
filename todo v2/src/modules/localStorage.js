
export function saveTodos(todo) {
    localStorage.setItem("todos", JSON.stringify(todo));
}

export function loadTodos() {
  return JSON.parse(localStorage.getItem("todos")) || [];
}
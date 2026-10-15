export function createTodo (title, description, dueDate, priority, notes) {
    return {
        id: crypto.randomUUID(),
        title,
        description,
        dueDate,
        priority,
        notes
    }
}

export function createProject () {
    return {
        id: crypto.randomUUID(),
        title: "",
        description: "",
        todos: [],
    }
}
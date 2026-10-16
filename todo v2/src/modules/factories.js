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

export function createProject (title, description) {
    return {
        id: crypto.randomUUID(),
        title: title,
        description: description,
        todos: [],
    }
}
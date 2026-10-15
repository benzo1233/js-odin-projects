
export function createToDo (title, des, dueDate, priority, notes) {
    return {
        id: crypto.randomUUID(),
        title,
        des,
        dueDate,
        priority,
        notes
    }
}
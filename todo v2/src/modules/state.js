let activeProjectID = null;
let projects = [];

export function addProject(project) {
    projects.push(project);
}

export function getProject(id) {
    const project = projects.find(project => project.id === id);
    return project;
}

export function getAllProjects() {
    return projects;
}

export function getActiveProjectId() {
    return activeProjectID;
}

export function setActiveProject(id) {
    activeProjectID = id;
}

export function setProjects(p) {
    projects = p;
}

export function removeTodo(projectId, todoId) {
    const project = projects.find(project => project.id === projectId);
    if (!project.todos) { return }
    const newTodo = project.todos.filter(todo => todo.id !== todoId);
    project.todos = newTodo;
}

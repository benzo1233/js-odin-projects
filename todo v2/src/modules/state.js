let activeProjectID = null;
let projects = [];

export function addProject(project) {
    projects.push(project);
}

export function getProject (id) {
    const project = projects.find(project => project.id === id);
    return project;
}

export function getActiveProjectId() {
    return activeProjectID;
}

export function setActiveProject(id) {
    activeProjectID = id;
}

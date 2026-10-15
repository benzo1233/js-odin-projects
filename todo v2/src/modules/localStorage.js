export function saveProjectLocally(project) {
  localStorage.setItem("projects", JSON.stringify(project));
}

export function loadProjects() {
  const data = JSON.parse(localStorage.getItem("projects")) || [];
  return Array.isArray(data) ? data : [];

}
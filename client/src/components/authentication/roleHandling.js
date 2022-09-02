export async function setRoleToLocalStorage(role) {
    await localStorage.setItem("Job-Search-Role", role);
}

export function getRoleFromLocalStorage() {
    return localStorage.getItem("Job-Search-Role");
}

export async function removeRoleFromLocalStorage() {
    await localStorage.removeItem("Job-Search-Role");
}
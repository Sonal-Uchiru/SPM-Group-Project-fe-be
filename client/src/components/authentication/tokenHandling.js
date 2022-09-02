export async function setTokenToLocalStorage(token) {
  await localStorage.setItem("Job-Search-Token", token);
}

export function getTokenFromLocalStorage() {
  return localStorage.getItem("Job-Search-Token");
}

export async function removeTokenFromLocalStorage() {
  await localStorage.removeItem("Job-Search-Token");
}




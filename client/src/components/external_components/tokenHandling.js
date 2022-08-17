export async function setTokenToLocalStorage(token) {
    await localStorage.setItem('SLIIT-Research-Management-Token', token)
}

export function getTokenFromLocalStorage() {
    return localStorage.getItem('SLIIT-Research-Management-Token')
}

export async function removeTokenFromLocalStorage() {
    await localStorage.removeItem('SLIIT-Research-Management-Token')
}



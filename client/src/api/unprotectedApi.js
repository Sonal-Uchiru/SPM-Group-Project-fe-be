import axios from "axios";

export const unProtectedApi = (method, url, data) => {
    return new Promise(async (resolve, reject) => {
        await axios({
            url: `http://localhost:8080/api/${url}`,
            method,
            data,
        })
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            });
    })
}
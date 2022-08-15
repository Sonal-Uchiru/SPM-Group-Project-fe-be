import axios from "axios";

export const authApi = (data) => {
    return new Promise(async (resolve, reject) => {
        await axios({
            url: `http://localhost:8080/api/auth`,
            method: "POST",
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
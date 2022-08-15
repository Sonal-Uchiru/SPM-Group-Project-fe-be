import axios from "axios";
import {getTokenFromLocalStorage} from "../components/authentication/tokenHandling";


export const protectedApi = (method, url, data) => {
    return new Promise(async (resolve, reject) => {
        await axios({
            url: `http://localhost:8080/api/protected/${url}`,
            method,
            headers: {
                Authorization: "Bearer " + getTokenFromLocalStorage(),
            },
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
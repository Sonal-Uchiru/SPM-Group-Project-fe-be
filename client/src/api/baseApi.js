import axios from "axios";
import {getTokenFromLocalStorage} from "../components/external_components/tokenHandling";

export const baseApi = async (method, url, data) => {
    await axios({
        url: `http://localhost:8080/api/${url}`,
        method,
        headers: {
            Authorization: "Bearer " + getTokenFromLocalStorage(),
        },
        data,
    })
        .then((res) => {
            resolve(res)
        })
        .catch(async (err) => {
            reject(err)
        });
}
)
}
import {storage} from "./configuration";
import {ref, uploadBytesResumable, getDownloadURL} from "@firebase/storage";

export function uploadFile(file, url) {
    const storageRef = ref(storage, `${url}/${file[0].name}`);
    const uploadTask = uploadBytesResumable(storageRef, file[0]);
    return new Promise((resolve, reject) => {
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // add code if you want to track the file uploading progress
            },
            (error) => {
                reject(error);
            },
            function () {
                getDownloadURL(storageRef).then((url) => {
                    resolve(url);
                });
            }
        );
    });
}

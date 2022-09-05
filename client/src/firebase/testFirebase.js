import React, {useState} from 'react';
import {uploadFile} from "./uploadFile";

function TestFirebase(props) {
    const [file, setFile] = useState()
    const save = (e) => {
        e.preventDefault()
        uploadFile(file, 'test').then(response => console.log(response)
        ).catch(err => console.log(err))
    }
    return (
        <div>
            <form onSubmit={save}>
                <input type="file" name='image' onChange={(e) => setFile(e.target.files)}/>
                <button type="submit">submit</button>
            </form>
        </div>
    );
}

export default TestFirebase;
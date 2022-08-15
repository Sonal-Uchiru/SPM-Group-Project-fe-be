
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import React, {Component, useEffect} from 'react';
import {getAllJobApplicationsByToken} from "./api/managements/jobApplicationApi";

function App() {
    useEffect(async () => {
        console.log(await getAllJobApplicationsByToken())
    })
    return (
        <div>
            jh
        </div>
        // <Router>
        //     <Routes>
        //     </Routes>
        // </Router>
    );
}

export default App;

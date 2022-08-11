import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import React, {Component} from 'react';
import Login from "./components/authentication/loginPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}/>
            </Routes>
        </Router>
    );
}

export default App;

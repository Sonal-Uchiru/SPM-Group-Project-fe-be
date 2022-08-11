import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import React, {Component} from 'react';
import Login from "./components/authentication/loginPage";
import ProfileMain from "./components/cards/userProfileMain";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ProfileMain/>}/>
            </Routes>
        </Router>
    );
}

export default App;

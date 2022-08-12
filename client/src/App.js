import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import React, {Component} from 'react';
import Login from "./components/authentication/loginPage";
import Footer from "./components/Footer/footer";
import UserHeader from "./components/user/navigation/userHeader";

function App() {
    return (
        <Router>
            <UserHeader/>
            <Routes>
                <Route path="/" element={<Login/>}/>
            </Routes>
            {/*<Footer/>*/}
        </Router>
    );
}

export default App;

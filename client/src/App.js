import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import React, {Component} from 'react';
import Login from "./components/authentication/loginPage";
import Footer from "./components/Footer/footer";
import UserHeader from "./components/user/navigation/userHeader";
import CompanyHeader from "./components/company/navigation/companyHeader";
import AdminHeader from "./components/admin/navigation/adminHeader";

function App() {
    return (
        <Router>
            <AdminHeader/>
            <Routes>
                <Route path="/" element={<Login/>}/>
            </Routes>
            {/*<Footer/>*/}
        </Router>
    );
}

export default App;

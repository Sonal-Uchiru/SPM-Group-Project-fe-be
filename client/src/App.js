import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { Component } from "react";
import Login from "./components/authentication/loginPage";
import ProfileMain from "./components/cards/userProfileMain";
import UserSummary from "./components/cards/userSummary";
import UserDetails from "./components/cards/userDetails";
import CompanyDetails from "./components/cards/companyDetails";
import CompanyProfileMain from "./components/cards/companyProfileMain";
import CompanySummary from "./components/cards/companySummary";
import BaseModal from "./components/modals/baseModal";
import ConfirmModal from "./components/modals/confirmModal";
import ChangePasswordModal from "./components/modals/changePasswordModal";
import UserProfile from "./components/user/pages/userProfile";
import TestPdf from "./components/user/pages/testPdf";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TestPdf />} />
      </Routes>
    </Router>
  );
}

export default App;

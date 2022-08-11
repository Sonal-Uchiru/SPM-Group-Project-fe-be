import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { Component } from "react";
import Login from "./components/authentication/loginPage";
import ProfileMain from "./components/cards/userProfileMain";
import UserSummary from "./components/cards/userSummary";
import UserDetails from "./components/cards/userDetails";
import BaseModal from "./components/modals/baseModal";
import ConfirmModal from "./components/modals/confirmModal";
import ChangePasswordModal from "./components/modals/changePasswordModal";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BaseModal />} />
      </Routes>
    </Router>
  );
}

export default App;

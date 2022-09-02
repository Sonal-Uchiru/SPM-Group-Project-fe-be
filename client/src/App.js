import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import CompanyHeader from "./components/managements/company/navigation/companyHeader";
import Footer from "./components/external_components/navigation/footer";
import JobApplicationForm from "./components/managements/jobApplications/jobApplicationForm";
import UserSignUP from "./components/managements/user/pages/signup";
import CompanyRegistration from "./components/managements/company/pages/companyRegistration";
import Login from "./components/authentication/loginPage";
import CompanyProfile from "./components/managements/company/pages/companyProfile";
import ChangePasswordModal from "./components/external_components/modals/changePasswordModal";
import EditCompanyProfile from "./components/managements/company/modals/editCompanyProfile";

function App() {
  return (
    <Router>
      <CompanyHeader />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<EditCompanyProfile />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

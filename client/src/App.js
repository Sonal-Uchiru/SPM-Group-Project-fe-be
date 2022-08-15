import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { Component } from "react";
import Login from "./components/authentication/loginPage";
import Footer from "./components/Footer/footer";
import UserHeader from "./components/user/navigation/userHeader";
import CompanyHeader from "./components/company/navigation/companyHeader";
import AdminHeader from "./components/admin/navigation/adminHeader";
import AppliedJobCard from "./components/user/cards/appliedJobCard";
import ViewAppliedJobs from "./components/user/pages/viewAppliedJobs";
import AllJobsCard from "./components/user/cards/allJobsCard";
import ViewAllJobs from "./components/user/pages/viewAllJobs";
import AllJobsCardCompany from "./components/company/cards/allJobsCardCompany";
import ViewAllJobsCompany from "./components/company/pages/viewAllJobsCompany";
import UserSignUP from "./components/user/pages/signup";
import JobApplicationForm from "./components/jobApplications/jobApplicationForm";
import CompanyRegistration from "./components/company/pages/companyRegistration";
import AddNewJob from "./components/jobs/addNewJob";
import EditJob from "./components/jobs/editJob";
import AllJobApplications from "./components/admin/data_tables/listAllAppliedJobsApplications";
import ChangePasswordModal from "./components/modals/changePasswordModal";
import BaseModal from "./components/modals/baseModal";
import EditUserProfile from "./components/user/modals/editUserProfile";
import EditCompanyProfile from "./components/company/modals/editCompanyProfile";

function App() {
    return (
        <Router>
            <AdminHeader/>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/a" element={<UserSignUP/>}/>
                <Route path="/b" element={<CompanyRegistration/>}/>
                <Route path="/c" element={<ViewAllJobsCompany/>}/>
                <Route path="/d" element={<ViewAllJobs/>}/>
                <Route path="/e" element={<ViewAppliedJobs/>}/>
                <Route path="/f" element={<AddNewJob/>}/>
                <Route path="/g" element={<EditJob/>}/>
                <Route path="/h" element={<BaseModal/>}/>
                <Route path="/i" element={<EditUserProfile/>}/>
                <Route path="/j" element={<EditJob/>}/>
                <Route path="/k" element={<EditCompanyProfile/>}/>
            </Routes>
            <Footer/>
        </Router>
    );
}

export default App;

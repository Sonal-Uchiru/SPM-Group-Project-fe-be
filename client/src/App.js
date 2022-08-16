import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import React, {Component, useEffect} from 'react';
import Login from "./components/authentication/loginPage";
import UserSignUP from "./components/managements/user/pages/signup";
import CompanyRegistration from "./components/managements/company/pages/companyRegistration";
import UserHeader from "./components/managements/user/navigation/userHeader";
import CompanyProfile from "./components/managements/company/pages/companyProfile";
import CompanyHeader from "./components/managements/company/navigation/companyHeader";
import Footer from "./components/external_components/navigation/footer";
import UserProfile from "./components/managements/user/pages/userProfile";
import ViewAllJobsCompany from "./components/managements/company/pages/viewAllJobsCompany";
import ViewAllJobs from "./components/managements/user/pages/viewAllJobs";
import ViewAppliedJobs from "./components/managements/user/pages/viewAppliedJobs";
import EditCompanyProfile from "./components/managements/company/modals/editCompanyProfile";
import EditUserProfile from "./components/managements/user/modals/editUserProfile";
import AddNewJob from "./components/managements/jobs/addNewJob";
import EditJob from "./components/managements/jobs/editJob";
import JobApplicationForm from "./components/managements/jobApplications/jobApplicationForm";

function App() {
    return (
        <Router>
            <CompanyHeader/>
            <Routes>
                <Route path="/" element={<JobApplicationForm/>}/>
            </Routes>
            <Footer/>
        </Router>
    );
}

export default App;

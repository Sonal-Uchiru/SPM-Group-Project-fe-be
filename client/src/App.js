import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import React, {Component} from "react";
import Login from "./components/authentication/loginPage";
import Footer from "./components/external_components/navigation/footer";
import UserHeader from "./components/managements/user/navigation/userHeader";
import CompanyHeader from "./components/managements/company/navigation/companyHeader";
import AdminHeader from "./components/managements/admin/navigation/adminHeader";
import AppliedJobCard from "./components/managements/user/cards/appliedJobCard";
import ViewAppliedJobs from "./components/managements/user/pages/viewAppliedJobs";
import AllJobsCard from "./components/managements/user/cards/allJobsCard";
import ViewAllJobs from "./components/managements/user/pages/viewAllJobs";
import AllJobsCardCompany from "./components/managements/company/cards/allJobsCardCompany";
import ViewAllJobsCompany from "./components/managements/company/pages/viewAllJobsCompany";
import UserSignUP from "./components/managements/user/pages/signup";
import JobApplicationForm from "./components/managements/jobApplications/jobApplicationForm";
import CompanyRegistration from "./components/managements/company/pages/companyRegistration";
import AddNewJob from "./components/managements/jobs/addNewJob";
import EditJob from "./components/managements/jobs/editJob";
import AllJobApplications from "./components/managements/admin/data_tables/listAllAppliedJobsApplications";
import ChangePasswordModal from "./components/external_components/modals/changePasswordModal";
import EditUserProfile from "./components/managements/user/modals/editUserProfile";
import EditCompanyProfile from "./components/managements/company/modals/editCompanyProfile";
import UserProfile from "./components/managements/user/pages/userProfile";
import CompanyProfile from "./components/managements/company/pages/companyProfile";
import CompanySummary from "./components/managements/company/cards/companySummary";
import Loading from "./components/external_components/spinners/loading";

function App() {
    return (
        <Router>
            <CompanyHeader/>
            <Routes>
                <Route path="/" element={<UserProfile/>}/>
                {/*<Route path="/a" element={<UserSignUP/>}/>*/}
                {/*<Route path="/b" element={<CompanyRegistration/>}/>*/}
                {/*<Route path="/c" element={<ViewAllJobsCompany/>}/>*/}
                {/*<Route path="/d" element={<ViewAllJobs/>}/>*/}
                {/*<Route path="/e" element={<ViewAppliedJobs/>}/>*/}
                {/*<Route path="/f" element={<CompanyProfile/>}/>*/}
                {/*<Route path="/g" element={<EditJob/>}/>*/}
                {/*<Route path="/h" element={<BaseModal/>}/>*/}
                {/*<Route path="/i" element={<EditUserProfile/>}/>*/}
                {/*<Route path="/j" element={<EditJob/>}/>*/}
                {/*<Route path="/k" element={<EditCompanyProfile/>}/>*/}
                {/*<Route path="/l" element={<JobApplicationForm/>}/>*/}
            </Routes>
            <Footer/>
        </Router>
    );
}

export default App;

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import CompanyHeader from "./components/managements/company/navigation/companyHeader";
import Footer from "./components/external_components/navigation/footer";
import JobApplicationForm from "./components/managements/jobApplications/jobApplicationForm";
import ViewAppliedJobs from "./components/managements/jobApplications/viewAppliedJobs";
import ViewAllJobs from "./components/managements/user/pages/viewAllJobs";

function App() {
    return (
        <Router>
            <CompanyHeader/>
            <Routes>
                <Route path="/" element={<ViewAllJobs/>}/>
            </Routes>
            <Footer/>
        </Router>
    );
}

export default App;

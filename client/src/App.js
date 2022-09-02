import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import React from "react";
import CompanyHeader from "./components/managements/company/navigation/companyHeader";
import Footer from "./components/external_components/navigation/footer";
import JobApplicationForm from "./components/managements/jobApplications/jobApplicationForm";
import ViewAppliedJobs from "./components/managements/jobApplications/viewAppliedJobs";
import ViewAllJobsCompany from "./components/managements/jobs/pages/viewAllJobsCompany";
import ViewAllJobs from "./components/managements/jobs/pages/viewAllJobs";
import CompanyList from "./components/managements/admin/data_tables/companyList";
import AllJobApplications from "./components/managements/admin/data_tables/jobApplicationsList";
import AllJobApplicationsList from "./components/managements/admin/data_tables/jobApplicationsList";
import JobApplications from "./components/managements/jobApplications/jobApplications";
import ViewCoverLetter from "./components/managements/jobApplications/modals/viewCoverLetter";

function App() {
    return (
        <Router>
            <CompanyHeader/>
            <Routes>
                <Route path="/" element={<JobApplications/>}/>
            </Routes>
            <Footer/>
        </Router>
  );
}

export default App;

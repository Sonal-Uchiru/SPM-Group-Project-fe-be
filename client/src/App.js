import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import CompanyHeader from "./components/managements/company/navigation/companyHeader";
import Footer from "./components/external_components/navigation/footer";
import JobApplicationForm from "./components/managements/jobApplications/jobApplicationForm";
import AllJobApplications from "./components/managements/admin/data_tables/listAllAppliedJobsApplications";
import AllJobsAvailable from "./components/managements/admin/data_tables/listAllJobs";
import CompanyList from "./components/managements/admin/data_tables/companyList";
import UserList from "./components/managements/admin/data_tables/userList";
function App() {
  return (
    <Router>
      <CompanyHeader />
      <Routes>
        <Route path="/" element={<UserList />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

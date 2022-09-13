import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";

import { App_Routes, ID } from "./constant/appRoutes";
import { Private } from "./private/protectedRoute";

import Header from "./components/external_components/navigation/header";
import Footer from "./components/external_components/navigation/footer";
import Loading from "./components/external_components/spinners/loading";

import Login from "./components/authentication/loginPage";

import CompanyRegistration from "./components/managements/company/pages/companyRegistration";
import CompanyProfile from "./components/managements/company/pages/companyProfile";
import ViewAllJobsCompany from "./components/managements/jobs/pages/viewAllJobsCompany";

import ViewAllJobs from "./components/managements/jobs/pages/viewAllJobs";
import ViewAppliedJobs from "./components/managements/jobApplications/viewAppliedJobs";
import UserProfile from "./components/managements/user/pages/userProfile";
import UserSignUP from "./components/managements/user/pages/signup";
import NotFoundPage from "./components/external_components/404/notFound";
import JobApplications from "./components/managements/jobApplications/jobApplications";
import AllJobsAvailable from "./components/managements/admin/data_tables/listAllJobs";

function App() {
  return (
    <Router>
      <AllJobsAvailable />
    </Router>
  );
}

export default App;

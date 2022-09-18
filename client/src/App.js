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
import ChangePasswordModal from "./components/external_components/modals/changePasswordModal";
import {type} from "jquery";

import JobApplicationReport from "./components/managements/jobApplications/report/jobApplicationReport";
import CompanyList from "./components/managements/admin/data_tables/companyList";
import UserList from "./components/managements/admin/data_tables/userList";
import AllJobsAvailable from "./components/managements/admin/data_tables/listAllJobs";
import AllJobApplicationsList from "./components/managements/admin/data_tables/jobApplicationsList";
import ViewUserDetails from "./components/managements/admin/modals/viewUserDetails";
import ViewCompanyDetails from "./components/managements/admin/modals/viewCompanyDetails";
import Report from "./components/managements/jobApplications/report/report";

function App() {
    return (
        <Router>
            <Report/>
            {/*   <Suspense fallback={<Loading />}>*/}
            {/*  <Header />*/}
            {/*  <Routes>*/}

            {/*    <Route path={App_Routes.ROOT} element={<Login />} />*/}
            {/*    <Route path={App_Routes.USER_SIGN_UP} element={<UserSignUP />} />*/}
            {/*    <Route*/}
            {/*      path={App_Routes.COMPANY_SIGN_UP}*/}
            {/*      element={<CompanyRegistration />}*/}
            {/*    />*/}

            {/*    <Route*/}
            {/*      path={App_Routes.USER_PROFILE}*/}
            {/*      element={<Private Role={"user"} Component={UserProfile} />}*/}
            {/*    />*/}
            {/*    <Route*/}
            {/*      path={App_Routes.COMPANY_PROFILE}*/}
            {/*      element={<Private Role={"company"} Component={CompanyProfile} />}*/}
            {/*    />*/}
            {/*    <Route*/}
            {/*      path={App_Routes.VIEW_ALL_JOBS}*/}
            {/*      element={<Private Role={"user"} Component={ViewAllJobs} />}*/}
            {/*    />*/}
            {/*    <Route*/}
            {/*      path={App_Routes.VIEW_ALL_COMPANY_OWN_JOBS}*/}
            {/*      element={*/}
            {/*        <Private Role={"company"} Component={ViewAllJobsCompany} />*/}
            {/*      }*/}
            {/*    />*/}
            {/*    <Route*/}
            {/*      path={App_Routes.VIEW_USER_APPLIED_JOBS}*/}
            {/*      element={<Private Role={"user"} Component={ViewAppliedJobs} />}*/}
            {/*    />*/}
            {/*    <Route*/}
            {/*      path={App_Routes.VIEW_JOB_OWN_JOB_APPLICATIONS + ID}*/}
            {/*      element={<Private Role={"company"} Component={JobApplications} />}*/}
            {/*    />*/}
            {/*    <Route path={App_Routes.ERROR} element={<NotFoundPage />} />*/}
            {/*  </Routes>*/}
            {/*  <Footer />*/}
            {/*</Suspense>*/}
        </Router>
  );
}

export default App;

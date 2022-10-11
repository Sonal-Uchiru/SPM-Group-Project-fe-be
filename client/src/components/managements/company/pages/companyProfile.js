import React, { useState, useEffect } from "react";
import CompanyProfileMain from "../cards/companyProfileMain";
import CompanySummary from "../cards/companySummary";
import CompanyDetails from "../cards/companyDetails";
import "../css/companyProfile.css";
import { BsArrowLeft } from "react-icons/all";
import {
  getApplicantsOfCompany,
  getCompany,
  getJobPostingsOfCompany,
} from "../../../../api/managements/companyAPI";
import { useNavigate } from "react-router";
import { App_Routes } from "../../../../constant/appRoutes";

export default function CompanyProfile() {
  const [company, setCompany] = useState({});
  const [jobPostings, setJobPostings] = useState("");
  const [jobsApplications, setJobApplications] = useState("");
  const [isReload, setIsReload] = useState(false);

  useEffect(() => {
    const getCompanyDetails = async () => {
      const companyData = await getCompany();
      const jobs = await getJobPostingsOfCompany();
      const applicants = await getApplicantsOfCompany();
      setCompany(companyData.data);
      setJobPostings(jobs.data.noOfJobPosted);
      setJobApplications(applicants.data.noOfJobApplications);
    };
    getCompanyDetails();
  }, [isReload]);

  const parentFunction2 = () => {
    setIsReload(!isReload);
  };

  return (
    <div className="companyProfile">
      <h2 className="title">
        <BsArrowLeft /> My Company Profile
      </h2>
      <div className="coverImage">
        <img
          src={company.coverImage ? company.coverImage : `./images/cover.jpeg`}
          className="cover img-fluid container-fluid"
          alt="cover_image"
        />
      </div>
      <div className="about">
        <CompanyProfileMain company={company} />
      </div>
      <div className="row otherD">
        <div className="col-md-5">
          <CompanySummary jobs={jobPostings} applicants={jobsApplications} />
        </div>
        <div className="col-md-7">
          <CompanyDetails company={company} parentFunction2={parentFunction2} />
        </div>
      </div>
    </div>
  );
}

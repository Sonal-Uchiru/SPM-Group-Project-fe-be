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
export default function CompanyProfile() {
  const [company, setCompany] = useState({});
  const [jobPostings, setJobPostings] = useState("");
  const [jobsApplications, setJobApplications] = useState("");

  useEffect(() => {
    const getCompanyDetails = async () => {
      const companyData = await getCompany();
      const jobs = await getJobPostingsOfCompany();
      const applicants = await getApplicantsOfCompany();

      console.log(companyData.data);
      setCompany(companyData.data);
      setJobPostings(jobs.data.noOfJobPosted);
      setJobApplications(applicants.data.noOfJobApplications);
    };
    getCompanyDetails();
  }, []);

  return (
    <div className="companyProfile">
      <h2 className="title">
          <BsArrowLeft className="Back"/> My Company Profile
      </h2>
        <div className="coverImage">
            <img
                src="./images/cover.jpeg"
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
          <CompanyDetails company={company} />
        </div>
      </div>
    </div>
  );
}

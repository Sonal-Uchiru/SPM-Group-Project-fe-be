import React, { useEffect, useImperativeHandle, useState } from "react";
import "../css/allJobsCard.css";
import {
  getAppliedJobApplicationsByJobId,
  isApplied,
} from "../../../../api/managements/jobApplicationApi";

export default function AllJobsCard(props) {
  const jobContent = props.content;
  const [applicants, setApplicants] = useState("");
  const [isAppliedToJob, setIsAppliedToJob] = useState(false);
  const [logo, setLogo] = useState("");

  const [step1, setStep1] = useState(false);
  const [step2, setStep2] = useState(true);

  useEffect(async () => {
    const content = await isApplied(jobContent._id);
    setIsAppliedToJob(content.data.isApplied);
    await setCompanyLogo();
    await getJobsApplicants();
  }, []);

  async function setCompanyLogo() {
    jobContent.companyDetails[0].logo 
      ? setLogo(jobContent.companyDetails[0].logo)
      : setLogo('./images/user (8).png');
  }

  async function getJobsApplicants() {
    const response = await getAppliedJobApplicationsByJobId(jobContent._id);
    setApplicants(response.data.content.length);
  }

  useImperativeHandle(props.refs, () => ({
    updateCard() {
      setIsAppliedToJob(true);
      setApplicants((prev) => prev + 1);
    },
  }));

  return (
    <div className="container allJobsCard">
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-3">
            <div className="logoImage text-center">
              <img
                src={logo}
                className="img-fluid companyLogo"
                alt="company_logo"
              />
            </div>
          </div>
          <div className="col-md-7">
            <div className="card-body">
              <h4 className="card-title">{jobContent.position}</h4>
              <p className="card-text1">{jobContent.jobType}</p>
              <p className="card-text2">{applicants} Applicants</p>
            </div>
          </div>

          <div className="col-md-2">
            <div className="recImage text-center">
              {jobContent.status == 1 ? (
                <div>
                  <img
                    src="./images/accuracy.png"
                    className="img-fluid recruitingStatus"
                    alt="recruiting_status"
                  />
                  <p className="status1">Actively Recruiting</p>
                </div>
              ) : (
                <div>
                  <img
                    src="./images/close.png"
                    className="img-fluid recruitingStatus"
                    alt="recruiting_status"
                  />
                  <p className="status2">Closed</p>
                </div>
              )}
            </div>
          </div>

          <div className="text-center" hidden={step1}>
            <img
              src="./images/down-arrow.png"
              className="img-fluid showMore"
              alt="show_more"
              onClick={() => {
                setStep1(true);
                setStep2(false);
              }}
            />
          </div>
        </div>
        <div className="row g-0" hidden={step2}>
          <div className="col-md-6">
            <div className="">
              <h4 className="title">Role Overview</h4>
              <p className="description">{jobContent.roleOverview}</p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="">
              <h4 className="title">Responsibilities</h4>
              <p>{jobContent.responsibilities}</p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="">
              <h4 className="title">Requirements</h4>
              <p>{jobContent.requirements}</p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="">
              {jobContent.otherRequirements && (
                <h4 className="title">Other Requirements</h4>
              )}
              <p>{jobContent.otherRequirements}</p>
            </div>
          </div>

          <div className="text-center">
            {jobContent.status === 1 && (
              <button
                type="button"
                className="btn btn-primary apply"
                onClick={props.onModalOpen}
                disabled={isAppliedToJob}
              >
                {isAppliedToJob ? "Applied" : "Apply"}
              </button>
            )}

            <br />
            <img
              src="./images/arrow-up.png"
              className="img-fluid showLess"
              alt="show_less"
              onClick={() => {
                setStep1(false);
                setStep2(true);
              }}
            />
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}

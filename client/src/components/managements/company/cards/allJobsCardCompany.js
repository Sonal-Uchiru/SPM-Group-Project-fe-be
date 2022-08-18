import React, { useState } from "react";
import "../css/allJobsCardCompany.css";
import Icon from "../pages/test";

export default function AllJobsCardCompany(props) {
  const jobContent = props.content;
  const [step1, setStep1] = useState(false);
  const [step2, setStep2] = useState(true);

  return (
    <div className="container allJobsCardCompany">
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-3">
            <div className="logoImage text-center">
              <img
                src="./images/rootCode.png"
                className="img-fluid companyLogo"
                alt="company_logo"
              />
            </div>
          </div>
          <div className="col-md-7">
            <div className="card-body">
              <h4 className="card-title">{jobContent.position}</h4>
              <p className="card-text1">{jobContent.jobType}</p>
              <p className="card-text2">10 Applicants</p>
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
                  <p className="status2">Actively Recruiting</p>
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
              <h4 className="title">Other Requirements</h4>
              <p>{jobContent.otherRequirements}</p>
            </div>
          </div>

          <div className="text-center">
            <div className="text-center">
              <div className="btn-group me-2">
                <button type="button" className="btn btn-primary viewButton">
                  View Job Applications
                </button>
              </div>
              <div className="btn-group me-2">
                <button type="button" className="btn btn-primary editButton">
                  Edit
                </button>
              </div>
              <div className="btn-group me-2">
                <button type="button" className="btn btn-primary deleteButton">
                  Delete
                </button>
              </div>
            </div>
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

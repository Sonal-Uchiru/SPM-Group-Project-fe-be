import React from "react";
import "../css/companySummary.css";

export default function CompanySummary({ jobs, applicants }) {
  return (
    <div className="container company-summary">
      <div className="card">
        <div className="row m-4">
          <div>
            <h2 className="summary-topic">Summary</h2>
          </div>
          <div className="col-md-6">
            <div className="d-flex justify-content-center">
              <div className="text-center summary-div1">
                <p className="summary-text">{jobs}</p>
              </div>
            </div>
            <h5 className="text-center sub-text mt-3">
              Number of the Jobs posted
            </h5>
          </div>
          <div className="col-md-6">
            <div className="d-flex justify-content-center">
              <div className="text-center summary-div2">
                <p className="summary-text">{applicants}</p>
              </div>
            </div>
            <h5 className="text-center sub-text mt-3">
              Number of the Job Applicants
            </h5>
          </div>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}

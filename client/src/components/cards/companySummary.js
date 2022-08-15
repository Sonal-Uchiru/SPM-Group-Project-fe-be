import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./companySummary.css";

export default function CompanySummary() {
  return (
    <div className="container company-summary">
      <div className="card">
        <div className="row m-4">
          <div>
            <h2 className="summary-topic">Summary</h2>
          </div>
          <div class="col-md-6">
            <div className="d-flex justify-content-center">
              <div className="text-center summary-div1">
                <p className="summary-text">20</p>
              </div>
            </div>
            <h5 className="text-center sub-text mt-3">
              Number of the Jobs posted
            </h5>
          </div>
          <div class="col-md-6">
            <div className="d-flex justify-content-center">
              <div className="text-center summary-div2">
                <p className="summary-text">20</p>
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

// <div className="text-center summary-div2 p-5">
// <p className="summary-text">20</p>
// </div>

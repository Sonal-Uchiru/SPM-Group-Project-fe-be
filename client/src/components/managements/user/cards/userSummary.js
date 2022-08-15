import React, { useState } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "../css/userSummary.css";

export default function UserSummary() {
  return (
    <div className="container user-summary">
      <div className="card">
        <div className="row m-4">
          <div>
            <h2 className="summary-topic">Summary</h2>
          </div>
          <div className="d-flex justify-content-center">
            <div className="text-center summary-div p-5">
              <p className="summary-text">20</p>
            </div>
          </div>
          <h2 className="text-center sub-text mt-3">Number of Applied Jobs</h2>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}

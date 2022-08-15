import React, { useState } from "react";
import "./companyDetails.css";

export default function CompanyDetails() {
  return (
    <div className="container company-details">
      <div className="card">
        <div className="row m-4">
          <div className="row">
            <h3 className="summary-topic">Company Details</h3>
          </div>
          <div className="row mt-3">
            <div className="col-md-6 mt-2">
              <p className="profile-data">Phone Number: 077-8970847</p>
              <p className="profile-data ">
                Address : Calista Wise 7292 Dictum Av. San Antonio MI 47096
              </p>
            </div>
            <div className="col-md-6 mt-2">
              <p className="profile-data">Field : Information Technology</p>
              <p className="profile-data">Site URL :  www.calcey.com</p>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <button className="btn btn-primary btn-md btn-edit">
              Edit Details
            </button>
            <button className="btn btn-danger btn-md btn-delete">
              Delete Profile
            </button>
          </div>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}

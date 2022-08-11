import React, { useState } from "react";
import "./userDetails.css";

export default function UserDetails() {
  return (
    <div className="container user-details">
      <div className="card">
        <div className="row m-4">
          <div className="row">
            <h5 className="summary-topic">Personal Details</h5>
          </div>
          <div className="row mt-1">
            <div className="col-md-6">
              <p className="profile-data">Phone Number: 077-8970847</p>
              <p className="profile-data">
                Address : Calista Wise 7292 Dictum Av. San Antonio MI 47096
              </p>
            </div>
            <div className="col-md-6">
              <p className="profile-data">Date of Birth : 2001/01/28</p>
              <p className="profile-data">Gender : Female</p>
            </div>
          </div>
          <div className="row d-flex justify-content-center mt-1">
            <button className="btn btn-primary btn-md btn-edit me-3">
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

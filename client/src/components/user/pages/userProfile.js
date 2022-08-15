import React, { useState } from "react";
import UserDetails from "../../cards/userDetails";
import ProfileMain from "../../cards/userProfileMain";
import UserSummary from "../../cards/userSummary";
// import { BsArrowLeft, BsArrowRight } from "react-icons/all";

import "./userProfile.css";

export default function UserProfile() {
  return (
    <div className="user-profile">
      <div className="">
        <div>
          {/* <BsArrowLeft /> */}
          <h1 className="profileheader">My Profile</h1>
        </div>
        <div className="row">
          {" "}
          <ProfileMain />
        </div>
        <div className="row">
          <div className="col-md-6">
            <UserSummary />
          </div>
          <div className="col-md-6">
            <UserDetails />
          </div>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}

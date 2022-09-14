import React, { useState } from "react";
import "../css/companyDetails.css";
import EditCompanyProfile from "../modals/editCompanyProfile";

export default function CompanyDetails({ company }) {
  const [editModalOpen, setEditModalOpen] = useState(false);

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  return (
    <>
      <div className="container company-details">
        <div className="card">
          <div className="row m-4">
            <div className="row">
              <h3 className="summary-topic">Company Details</h3>
            </div>
            <div className="row mt-3">
              <div className="col-md-6 mt-2">
                <p className="profile-data">{`Phone Number: ${company.mobile}`}</p>
                <p className="profile-data ">{`Address : ${company.address}`}</p>
              </div>
              <div className="col-md-6 mt-2">
                <p className="profile-data">{`Field : ${company.field}`}</p>
                <p className="profile-data">{`Site URL : ${company.siteUrl}`}</p>
              </div>
            </div>
            <div className="row d-flex justify-content-center">
              <button
                className="btn btn-primary btn-md btn-edit"
                onClick={() => {
                  setEditModalOpen(true);
                }}
              >
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
      {editModalOpen && (
        <EditCompanyProfile
          company={company}
          closeModal={() => {
            closeEditModal();
          }}
        />
      )}
    </>
  );
}

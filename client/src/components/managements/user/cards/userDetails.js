import React, {useState} from "react";
import "../css/userDetails.css";

export default function UserDetails(props) {

    const user = props.personalDetails;

    return (
        <div className="container user-details">
            <div className="card">
                <div className="row m-4">
                    <div className="row">
                        <h3 className="summary-topic">Personal Details</h3>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-6 mt-2">
                            <p className="profile-data">Phone Number: {user.mobile}</p>
                            {user.address &&
                                <p className="profile-data ">
                                    Address : {user.address}
                                </p>
                            }
                        </div>
                        <div className="col-md-6 mt-2">
                            {user.dob &&
                                <p className="profile-data">Date of Birth : {user.dob}</p>
                            }
                            {user.gender &&
                                <p className="profile-data">Gender : {user.gender}</p>
                            }
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

import React, {useState} from "react";
import "../css/userProfileMain.css";

export default function ProfileMain(props) {

    const user = props.userDetails;

    return (
        <div className="usermain">
            <div className="card">
                <div className="row">
                    <div className="col-md-4">
                        {user.profilePicture &&
                            <div className="text-center m-4">
                                <img
                                    src={user.profilePicture}
                                    className="img-fluid user-img"
                                    alt="profile_image"
                                />
                            </div>
                        }

                        {!user.profilePicture &&
                            <div className="text-center m-4">
                                <img
                                    src="./images/user (8).png"
                                    className="img-fluid user-img"
                                    alt="profile_image"
                                />
                            </div>
                        }


                    </div>
                    <div className="col-md-8">
                        <div className="mt-3">
                            <div className={!user.aboutMe && "details"}>
                                <h3 className="text-center">{user.firstName} {user.lastName}</h3>
                                <h6 className="text-center" style={{color: "#808080"}}>
                                    {user.email}
                                </h6>
                            </div>
                            {user.aboutMe &&
                                <p className="pe-2 ps-3">
                                    {user.aboutMe}
                                </p>
                            }
                        </div>
          </div>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}

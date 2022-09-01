import React, {useState} from "react";
import "../css/userDetails.css";
import ConfirmModal from "../../../external_components/modals/confirmModal";
import EditUserProfile from "../modals/editUserProfile";
import moment from "moment";

export default function UserDetails(props) {

    const user = props.personalDetails;
    const [show, setShow] = useState(false)
    const [show2, setShow2] = useState(false)
    return (
        <>
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
                                    <p className="profile-data">Date of Birth
                                        : {moment(user.dob).format("YYYY-MM-DD")}</p>
                                }
                                {user.gender &&
                                    <p className="profile-data">Gender : {user.gender}</p>
                                }
                            </div>
                        </div>
                        <div className="row d-flex justify-content-center">
                            <button className="btn btn-primary btn-md btn-edit" onClick={() => setShow2(true)}>
                                Edit Details
                            </button>
                            <button className="btn btn-danger btn-md btn-delete" onClick={() => setShow(true)}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
                <br/>
                <br/>
            </div>
            {show && <ConfirmModal onCancel={() => setShow(false)}/>}
            {show2 && <EditUserProfile onCancel2={() => setShow2(false)}/>}
        </>
  );
}

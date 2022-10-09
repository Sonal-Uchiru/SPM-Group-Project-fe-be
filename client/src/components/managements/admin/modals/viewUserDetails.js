import React, {useEffect, useState} from 'react';
import {Modal} from "react-bootstrap";
import '../css/viewUserDetails.css'
import moment from "moment";
import ConfirmModal from "../../../external_components/modals/confirmModal";

function ViewUserDetails(props) {
    const [openModal, setOpenModal] = useState(true)
    // const users = props.users
    const userProfilePlaceHolder = 'https://firebasestorage.googleapis.com/v0/b/moon-cinema-rest-api.appspot.com/o/Additional%2Fuser%20(8).png?alt=media&token=9cef4e9b-1e8c-43ca-95b7-19c6e9ec8781'
    useEffect(() => {
        // console.log(users)
    })

    return (
        <>
            <div className="view-job-application">
                <div className="modal">
                    <Modal show={openModal} size="lg">
                        <Modal.Header>
                            <div>
                                <h4 className="modal-title">User Details</h4>
                            </div>
                            <button
                                type="button"
                                className="btn"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={() => props.onClose()}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="view-job-application-container">
                                <div className="text-center mb-3">
                                    <img

                                        src="../images/user (8).png"
                                        className="avatar rounded-circle mb-4"
                                        alt="Icon"/>
                                    <h2 className="mb-4">
                                        <b>Kaveen Sithija</b>
                                    </h2>
                                </div>
                                <div className="container">
                                    <div className="row mb-3">
                                        <div className="col-sm">
                                            <h5><b>Mobile</b> : 0765521210</h5>
                                        </div>
                                        <div className="col-sm">
                                            <h5><b>Date of Birth</b> : 10-25-2000</h5>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-sm">
                                            <h5><b>Email</b> : kaveensithija25@gmail.com</h5>
                                        </div>
                                        <div className="col-sm">
                                            <h5><b>Gender</b> : Male</h5>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <h5><b>Address</b> : No, 366/6, Galle Road, Kalutara North </h5>
                                    </div>

                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        </>
    );
}


export default ViewUserDetails;
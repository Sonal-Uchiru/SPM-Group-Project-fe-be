import React, {useEffect, useState} from 'react';
import {Modal} from "react-bootstrap";
import '../css/viewApplication.css'
import moment from "moment";

function ViewApplication(props) {
    const [openModal, setOpenModal] = useState(true)
    const jobApplication = props.jobApplication
    const userProfilePlaceHolder = 'https://firebasestorage.googleapis.com/v0/b/moon-cinema-rest-api.appspot.com/o/Additional%2Fuser%20(8).png?alt=media&token=9cef4e9b-1e8c-43ca-95b7-19c6e9ec8781'
    useEffect(() => {
        console.log(jobApplication)
    })
    return (
        <>
            <div className="view-job-application">
                <div className="modal">
                    <Modal show={openModal} size="lg">
                        <Modal.Header>
                            <div>
                                <h4 className="modal-title">Application</h4>
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
                                        src={jobApplication.userDetails[0].profilePicture ? jobApplication.userDetails[0].profilePicture : userProfilePlaceHolder}
                                        className="avatar rounded-circle mb-4"
                                        alt="Icon"/>
                                    <h2 className="mb-4">
                                        <b>{`${jobApplication.title}${jobApplication.userDetails[0].firstName} ${jobApplication.userDetails[0].lastName}`}</b>
                                    </h2>
                                </div>
                                <div className="container">
                                    <div className="row mb-3">
                                        <div className="col-sm">
                                            <h5><b>Mobile</b> : 0{jobApplication.userDetails[0].mobile}</h5>
                                        </div>

                                        <div className="col-sm">
                                            <h5><b>Address</b> : {jobApplication.userDetails[0].address ?
                                                jobApplication.userDetails[0].address : jobApplication.applicantOtherDetails.address}
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-sm">
                                            <h5><b>Postal Code</b> : {jobApplication.applicantOtherDetails.postalCode}
                                            </h5>
                                        </div>
                                        <div className="col-sm">
                                            <h5><b>Date of Birth</b> : {jobApplication.userDetails[0].dob ?
                                                moment(jobApplication.userDetails[0].dob).format("YYYY-MM-DD") : moment(jobApplication.applicantOtherDetails.dob).format("YYYY-MM-DD")}
                                            </h5>
                                        </div>

                                    </div>
                                    <div className="row mb-3">
                                        <h5 className="mb-2"><b>Have you ever worked for our company
                                            before?</b></h5>
                                        <h5 className="mb-3 mt-2 answer"> {jobApplication.companyWorked ? 'Yes' : 'No'}</h5>

                                        <h5 className="mb-2"><b>Are you currently employed by our company or one of
                                            our group
                                            companies?</b>
                                        </h5>
                                        <h5 className="mb-3 mt-2 answer">{jobApplication.employedWithCurrentCompany ? 'Yes' : 'No'}</h5>

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

export default ViewApplication;
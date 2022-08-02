import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import "../css/updateSubmissionModal.css";

export default function UpdateSubmissionModal() {
    const [openModal, setOpenModal] = useState(false);
    let data = [1, 2, 3, 4]

    function displayFiles() {
        document.getElementById('fileBrowser').click();
    }

    return (
        <div className="panel-details">
            <div>
                <button
                    type="button"
                    onClick={() => setOpenModal(true)}
                    className="btn modal-open-btn shadow-lg"
                >
                    Update Submission
                </button>
            </div>
            <div className="modal">
                <Modal show={openModal}>
                    <Modal.Header>
                        <div className="update-submission-div">
                            <div className="row">
                                <div className="top-div">
                                    <div className="box">
                                        <img
                                            src="./../images/check-list.png"
                                            className="profile-header-img"
                                            alt="ProfileHeaderImage"
                                        />
                                    </div>
                                    <div className="profile-header">
                                        <h4 className="profile-name">Update Submission</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <span></span>
                        <button
                            type="button"
                            className="btn close-btn"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={() => {
                                setOpenModal(false);
                            }}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="update-submission-div container">
                            <div className="row form-div">
                                <div className="col-md-12 mb-3">
                                    <label className="form-label fw-bold">Assignment name</label>
                                    <input placeholder="Input assignment name" id="assignmentname" type="text"
                                           name="assignmentname"
                                           className="form-control" required/>
                                </div>
                                <div className="col-md-12 mb-3">
                                    <label className="form-label fw-bold">Guidelines</label>
                                    <textarea placeholder="Input guidelines" className="form-control" id="guidelines"
                                              name="guidelines" rows="3"/>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-12">
                                        <label className="form-label fw-bold">Required Documents/Presentation Templates
                                            etc.</label>
                                    </div>
                                    <div className="row">

                                        {data.map((post) => {
                                            return (
                                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 mt-2">
                                                    <div className="input-group d-flex justify-content-center ">
                                                        <span className="" id=""><img className="submission-img me-3"
                                                                                      src="./../images/docs.png"
                                                                                      alt="fileImg"/></span>
                                                        <label className="label-text">WD2022_Grp_69</label>
                                                    </div>
                                                </div>
                                            )
                                        })}


                                    </div>
                                    <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 mt-4">
                                        <input type="file" className="form-control"/>
                                    </div>

                                </div>
                                <div className="col-md-12 mb-3">
                                    <label className="form-label fw-bold">Faculty</label>
                                    <select id="faculty" className="form-select">
                                        <option>Please select...</option>
                                        <option>Faculty Of Computing</option>
                                        <option>Faculty Of Science</option>
                                        <option>Faculty Of Buisness</option>
                                        <option>Faculty Of Computing</option>
                                    </select>
                                </div>
                                <div className="col-md-12 mb-3">
                                    <label className="form-label fw-bold">Type</label>
                                    <select id="type" name="type" className="form-select">
                                        <option>Please select...</option>
                                        <option>Presentation</option>
                                        <option>Viva</option>
                                        <option>Discussion</option>

                                    </select>
                                </div>
                                <div className="col-md-12 mb-3">
                                    <label className="form-label fw-bold">Deadline</label>
                                    <input placeholder="Deadline" id="deadline" type="date" name="deadline"
                                           className="form-control" required/>
                                </div>
                                <div className="col-md-12 mb-3">
                                    <label className="form-label fw-bold">Marking Scheme</label>
                                    <select id="markingscheme" name="markingscheme" className="form-select">
                                        <option>Please select...</option>
                                        <option>Presentation</option>
                                        <option>Viva</option>
                                        <option>Discussion</option>

                                    </select>
                                </div>

                                <div className="row d-flex justify-content-center">
                                    <button className="btn update-btn  mt-3">Update</button>
                                    <button className="btn delete-btn  mt-3">Delete</button>
                                </div>
                            </div>

                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
}

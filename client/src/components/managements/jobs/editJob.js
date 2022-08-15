import React, {useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import './editJob.css'

export default function EditJob() {

    const [openModal, setOpenModal] = useState(true)


    return (
        <div className="editJob">
            <div>
                <button
                    type="button"
                    onClick={() => {
                        setOpenModal(true)
                    }}
                    className="primary"
                >
                    Edit Job

                </button>
            </div>
            <div className="modal">
                <Modal show={openModal} size="lg">
                    <Modal.Header>
                        <div>
                            <h4 className="ms-4 modal-title"><b>Edit Job</b>
                            </h4>
                        </div>
                        <button
                            type="button"
                            className="btn"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={() => {
                                setOpenModal(false);
                            }}
                        >
                            <span aria-hidden="true"><b>&times;</b></span>
                        </button>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="edit-job">
                            <div className="container">
                                <div className="row">
                                    <div className="logo">
                                        <img
                                            src="https://www.ifs.com/-/media10/project/ifs/ifs/images/homepage/ifs-logo-2021-background.jpg"
                                            alt="company logo" className="rounded company-logo"
                                        />
                                    </div>
                                </div>
                                <br/>
                            </div>

                            <div>
                                <h3 className="blue-text-color ms-2">Job Details</h3>
                                <form className="ms-4 me-4 editJobForm">
                                    <div className="mb-2">
                                        <label htmlFor="exampleInputEmail1" className="form-label">
                                            <b>Position
                                                <mark className="required-icon">
                                                    *
                                                </mark>
                                            </b>
                                        </label>
                                        <input type="text" className="form-control custom-input-fields" id="position"
                                               placeholder="Position"/>
                                    </div>

                                    <div className="mb-2">
                                        <label htmlFor="exampleInputEmail1" className="form-label">
                                            <b>Development Area
                                                <mark className="required-icon">
                                                    *
                                                </mark>
                                            </b>
                                        </label>
                                        <input type="text" className="form-control custom-input-fields"
                                               id="developmentArea"
                                               placeholder="Development Area"/>
                                    </div>

                                    <div className="mb-2">
                                        <label htmlFor="exampleInputEmail1" className="form-label">
                                            <b>Job Type
                                                <mark className="required-icon">
                                                    *
                                                </mark>
                                            </b>
                                        </label>
                                        <select className="form-select custom-input-fields"
                                                aria-label="Default select example">
                                            <option selected value="Full Time">Full Time</option>
                                            <option value="Part Time">Part Time</option>
                                        </select>
                                    </div>

                                    <div className="mb-2">
                                        <label htmlFor="exampleInputEmail1" className="form-label">
                                            <b>Role Overview
                                                <mark className="required-icon">
                                                    *
                                                </mark>
                                            </b>
                                        </label>
                                        <textarea className="form-control" id="roleOverview" rows="2"
                                                  placeholder="Role Overview"/>
                                    </div>

                                    <div className="mb-2">
                                        <label htmlFor="exampleInputEmail1" className="form-label">
                                            <b>Responsibilities
                                                <mark className="required-icon">
                                                    *
                                                </mark>
                                            </b>
                                        </label>
                                        <textarea className="form-control" id="responsibilities" rows="2"
                                                  placeholder="Responsibilities"/>
                                    </div>

                                    <div className="mb-2">
                                        <label htmlFor="exampleInputEmail1" className="form-label">
                                            <b>Requirements
                                                <mark className="required-icon">
                                                    *
                                                </mark>
                                            </b>
                                        </label>
                                        <textarea className="form-control" id="requirements" rows="2"
                                                  placeholder="Requirements"/>
                                    </div>

                                    <div className="mb-2">
                                        <label htmlFor="exampleInputEmail1" className="form-label">
                                            <b>Other Requirements
                                                <mark className="required-icon">
                                                    *
                                                </mark>
                                            </b>
                                        </label>
                                        <textarea className="form-control" id="otherRequirements" rows="2"
                                                  placeholder="Other Requirements"/>
                                    </div>

                                    <div className="text-center mt-3">
                                        <label class="switch">
                                            <input type="checkbox"/>
                                            <span class="slider round"/>
                                        </label>
                                        <p className="status">Actively Recurting ?</p>
                                    </div>
                                    <div className="text-center mt-3">
                                        <div className="btn-group me-2">
                                            <button type="button" className="btn btn-primary saveButton">Save Changes
                                            </button>
                                        </div>
                                        <div className="btn-group me-2">
                                            <button type="button" className="btn btn-primary cancelButton">Cancel
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
}


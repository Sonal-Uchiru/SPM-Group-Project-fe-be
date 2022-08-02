import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import "../css/updateStudentModal.css";

export default function UpdateStudentModal() {
    const [openModal, setOpenModal] = useState(false);
    let data = [1, 2, 3, 4]

    function displayFiles() {
        document.getElementById('fileSelection').click();
    }

    return (
        <div className="panel-details">
            <div>
                <button
                    type="button"
                    onClick={() => setOpenModal(true)}
                    className="btn modal-open-btn shadow-lg"
                >
                    Update student
                </button>
            </div>
            <div className="modal">
                <Modal show={openModal}>
                    <Modal.Header>
                        <div className="row">
                            <h4 className="main-topic ">Update Student</h4>
                        </div>
                        <span> </span>
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
                        <div className="update-student-div container">
                            <div className="container">
                                <div className="col-md-12 d-flex justify-content-center">
                                    <span><img src="./../images/userlogo.jpeg" className="user-img" alt="userImg"/><img
                                        src="./../images/editing.png" className="edit-img"
                                        onClick={() => displayFiles()} alt="userImg"/></span>
                                    <input type="file" id="fileSelection" className="d-none"/>

                                </div>
                                <div className="row mb-3 mt-2">
                                    <div className="col-md-12">
                                        <label className="form-label">Name with initials</label>
                                        <input placeholder="Enter student name" id="name" type="text" name="name"
                                               className="form-control" required/>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Student ID</label>
                                        <input placeholder="Enter student ID" id="studentid" type="text"
                                               name="studentid"
                                               className="form-control" required/>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Email</label>
                                        <input placeholder="Eg:- IT2018xxxx" id="email" type="text" name="email"
                                               className="form-control" required/>
                                    </div>

                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-12">
                                        <label className="form-label">Phone Number</label>
                                        <input placeholder="Eg:- 076xxxxxxx" id="contact" type="text" name="contact"
                                               className="form-control" required/>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-12">
                                        <label className="form-label">Faculty</label>
                                        <select id="faculty" className="form-select">
                                            <option>Please select...</option>
                                            <option>Faculty Of Computing</option>
                                            <option>Faculty Of Science</option>
                                            <option>Faculty Of Buisness</option>
                                            <option>Faculty Of Computing</option>

                                        </select>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-12">
                                        <label className="form-label">Degree Program</label>
                                        <select id="degreeprogram" className="form-select">
                                            <option>Please select...</option>
                                            <option>B.Sc (Hons) Information Technology (SLIIT)</option>
                                            <option>Faculty Of Science</option>
                                            <option>Faculty Of Buisness</option>
                                            <option>Faculty Of Computing</option>

                                        </select>
                                    </div>
                                </div>
                                <div className="row d-flex justify-content-end">
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

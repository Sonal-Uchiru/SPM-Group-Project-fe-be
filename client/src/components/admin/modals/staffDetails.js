import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import "../css/staffDetails.css";

export default function StaffDetailsModal() {
    const [openModal, setOpenModal] = useState(false);
    const sample = [1, 2, 3, 4, 5];

    return (
        <div className="staff-details">
            <div>
                <button
                    type="button"
                    onClick={() => setOpenModal(true)}
                    className="btn modal-open-btn shadow-lg"
                >
                    Staff Details
                </button>
            </div>
            <div className="modal">
                <Modal show={openModal} size="md">
                    <Modal.Header>
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
                        <div className="container">
                            <div className="d-flex justify-content-center">
                                <img
                                    src="./../images/lecturerPro.webp"
                                    alt="Staff Image"
                                    className="staff-image rounded-circle"
                                />
                            </div>

                            <h3 className="mt-4 text-gold"> Personal Information</h3>

                            {/* Personal Information */}
                            <div className="d-flex flex-row mt-3">
                                <img
                                    src="./../images/user (1).png"
                                    alt="User Icon"
                                    className="icon-image"
                                />

                                <p className="fw-bold ms-2">Mr. Lahiru Liyanage(FOC)</p>
                            </div>

                            <div className="d-flex flex-row mt-1">
                                <img
                                    src="./../images/email (1).png"
                                    alt="Email Icon"
                                    className="icon-image"
                                />

                                <p className="fw-bold ms-2">liyanage.l@my.sliit.lk</p>
                            </div>

                            <div className="d-flex flex-row mt-1">
                                <img
                                    src="./../images/face-id (1).png"
                                    alt="Supervisor Icon"
                                    className="icon-image"
                                />

                                <p className="fw-bold ms-2">Supervisor</p>
                            </div>
                            <div className="d-flex flex-row mt-1">
                                <img
                                    src="./../images/mortarboard.png"
                                    alt="Lecturer Icon"
                                    className="icon-image"
                                />

                                <p className="fw-bold ms-2">Senior Lecturer</p>
                            </div>
                            <div className="d-flex flex-row mt-1">
                                <img
                                    src="./../images/mobile.png"
                                    alt="Mobile Icon"
                                    className="icon-image"
                                />

                                <p className="fw-bold ms-2">0765521257</p>
                            </div>

                            <h3 className="mt-2 text-gold"> Research Interests</h3>
                            <div className="d-flex justify-content-start">
                                <ul>
                                    <li>Machine Learning</li>
                                    <li>High Performance Computing</li>
                                    <li>
                                        Algorithm Design and Optimization in Parallel Computing
                                    </li>
                                    <li>eLearning</li>
                                </ul>
                            </div>

                            <h3 className="mt-2 text-gold"> Groups In-Charge of</h3>
                            {sample.map((item) => {
                                return (
                                    <div class="row group-row">
                                        <div class="col">
                                            <p>Group 1</p>
                                        </div>

                                        <div class="col">
                                            <p>G.A Dananjaya(Leader)</p>
                                        </div>
                                        <div class="col">
                                            <p>IT20179924</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
}

import React, {useEffect, useState} from 'react'
import Modal from "react-bootstrap/Modal";
import {Link} from "react-router-dom";
import "./../css/viewMoreSubmissons.css";

export default function ViewMoreSubmissionsModal(props) {
    const [openModal, setOpenModal] = useState(false);
    const samlple = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];


    let topic = props.details.name

    return (
        <div className="view-more-submissions">
            <div>
                <button
                    type="button"
                    id="viewMoreModal"
                    onClick={() => setOpenModal(true)}
                    className="btn modal-open-btn shadow-lg"
                >
                    Register Research Topic
                </button>
            </div>
            <div className="modal">
                <Modal show={openModal} size="lg">
                    <Modal.Header>
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
                        <div className="d-flex justify-content-center">
                            <h1 className="proposal-title text-blue">
                                {topic}
                            </h1>
                        </div>

                        <div className="container">
                            <br/>
                            <p className="text-blue">Faculty of Computing</p>
                            <h3 className="text-blue">Guidelines</h3>
                            <p>Having a client is compulsory</p>

                            <h3 className="text-blue document-text">
                                Required Documents/Presentation Templates etc
                            </h3>

                            {/*Documents Section */}
                            <div className="row mb-4 mt-4">
                                {samlple.map((item) => {
                                    return (
                                        <div className="col mb-3">
                                            <div className="d-flex flex-row">
                                                <img
                                                    src="./../images/docs.png"
                                                    alt="Document"
                                                    width="50"
                                                    height="50"
                                                />
                                                <Link className="ms-2 mt-2 text-gold" to="#">
                                                    WD2022_Grp_69
                                                </Link>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <h3 className="text-blue">Type</h3>
                            <p>Presentation</p>

                            <h3 className="text-blue">Deadline</h3>
                            <p>2022/05/23</p>

                            <h3 className="text-blue">Marking Scheme</h3>

                            <div class="d-flex justify-content-between">
                                <div>
                                    <p className="fw-bold">Proposal Marking Scheme</p>
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        className="btn shadow-lg view-scheme-btn"
                                    >
                                        View Marking Scheme
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
}

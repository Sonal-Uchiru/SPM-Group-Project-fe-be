import React, {useState} from 'react';
import {Modal} from "react-bootstrap";

function ViewApplication(props) {
    const [openModal, setOpenModal] = useState(true)
    const jobApplication = props.jobApplication

    return (
        <>
            <div className="cover-letter">
                <div className="modal">
                    <Modal show={openModal} size="lg">
                        <Modal.Header>
                            <div>
                                <h4>Application</h4>
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
                            <div className="cover-letter-container">

                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        </>
    );
}

export default ViewApplication;
import React, {useState} from 'react';
import {Modal} from "react-bootstrap";

function ViewCoverLetter(props) {
    const [openModal, setOpenModal] = useState(true)
    return (
        <>
            <div className="cover-letter">
                <div className="modal">
                    <Modal show={openModal} size="lg">
                        <Modal.Header>
                            <div>
                                <h4>Cover Letter</h4>
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
                                {props.coverLetter}
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        </>
    );
}

export default ViewCoverLetter;
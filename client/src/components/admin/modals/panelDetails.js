import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import "../css/panelDetails.css";

export default function PanelDetailsModal() {
    const [openModal, setOpenModal] = useState(false);

    return (
        <div className="panel-details">
            <div>
                <button
                    type="button"
                    onClick={() => setOpenModal(true)}
                    className="btn modal-open-btn shadow-lg"
                >
                    View Panel Details
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
                        <div className="container">
                            <h1 className="text-blue">Panel 01</h1>
                            <h3 className="text-blue">Faculty of Computing</h3>
                            <h3 className="text-gold">Member Details</h3>

                            {/* Member Details */}
                            <div>
                                <div class="row">
                                    <div class="col">
                                        <p>G.A Dananjaya(Incharge)</p>
                                    </div>

                                    <div class="col">
                                        <p className="text-center">disnetey.s@sliit.lk</p>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col">
                                        <p>G.A Dananjaya(Incharge)</p>
                                    </div>

                                    <div class="col">
                                        <p className="text-center">disnetey.s@sliit.lk</p>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col">
                                        <p>G.A Dananjaya(Incharge)</p>
                                    </div>

                                    <div class="col">
                                        <p className="text-center">disnetey.s@sliit.lk</p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <p>G.A Dananjaya(Incharge)</p>
                                    </div>

                                    <div class="col">
                                        <p className="text-center">disnetey.s@sliit.lk</p>
                                    </div>
                                </div>
                            </div>

                            <hr/>
                            <h3 className="text-gold">Assign Groups</h3>
                            {/*Assign Groups */}
                            <div>
                                <div class="row">
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
                                <div class="row">
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
                                <div class="row">
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
                                <div class="row">
                                    <div class="col">
                                        <p>Group 1</p>
                                    </div>

                                    <div class="col">
                                        <p>G.A Dananjaya(Leader)</p>
                                    </div>
                                    <div class="col">
                                        <p className>IT20179924</p>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex justify-content-center mt-4">
                                <button
                                    type="button"
                                    onClick={() => setOpenModal(true)}
                                    className="btn allocate-groups-btn shadow-lg"
                                >
                                    Allocate Groups
                                </button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
}

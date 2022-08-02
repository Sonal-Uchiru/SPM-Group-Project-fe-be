import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import "../css/selectInCharge.css";

export default function SelectInChargeModal() {
    const [openModal, setOpenModal] = useState(false);
    const samlple = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

    return (
        <div className="select-in-charge">
            <div>
                <button
                    type="button"
                    onClick={() => setOpenModal(true)}
                    className="btn modal-open-btn shadow-lg"
                >
                    Select In Charge
                </button>
            </div>
            <div className="modal">
                <Modal show={openModal} size="lg">
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
                            <h1 className="text-blue text-center"> Select Incharge</h1>
                            <br/>
                            <form>
                                <div className="sub-container">
                                    {samlple.map((item) => {
                                        return (
                                            <div
                                                className="form-check input-radio d-flex align-items-center justify-content-between mb-4 shadow">
                                                <label
                                                    className="form-check-label text-blue"
                                                    for="exampleRadios2"
                                                >
                                                    WE2022_47
                                                </label>
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="exampleRadios"
                                                    id="exampleRadios2"
                                                    value="option2"
                                                    style={{
                                                        marginRight: "20px",
                                                        height: "30px",
                                                        width: "30px",
                                                    }}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>

                                <button
                                    type="button "
                                    className="btn btn-lg shadow-lg finish-btn mt-3"
                                >
                                    Finish
                                </button>
                            </form>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
}

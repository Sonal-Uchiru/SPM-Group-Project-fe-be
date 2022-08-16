import React, {useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import {BsArrowLeft, BsArrowRight} from "react-icons/all";
import './jobApplicationFormStyles.css'

function JobApplicationForm(props) {
    const [openModal, setOpenModal] = useState(true)
    const [back, setBack] = useState(true)
    const [step1, setStep1] = useState(true)
    const [step2, setStep2] = useState(false)
    const [step3, setStep3] = useState(false)
    const fileRef = React.useRef();
    const fileRef2 = React.useRef();

    const nextStep = (step) => {
        if (step === '1') {
            setStep1(false)
            setStep2(true)
        }
        if (step === '2') {
            setStep2(false)
            setStep3(true)
        }
    }

    const closeModal = () => {
        setOpenModal(false)
    }

    const navigateBack = () => {
        if (step2) {
            setStep2(false)
            setStep1(true)
        }
        if (step3) {
            setStep3(false)
            setStep2(true)
        }
    }

    return (
        <div className="apply-job-application">
            <div>
                <button
                    type="button"
                    onClick={() => {
                        setOpenModal(true)
                        setStep1(true)
                        setStep2(false)
                        setStep3(false)
                    }}
                    className="primary"
                >
                    View Panel Details
                </button>
            </div>
            <div className="modal">
                <Modal show={openModal} size="lg">
                    <Modal.Header>
                        <div>
                            {!step1 && <BsArrowLeft onClick={navigateBack}/>}
                            <h4 className={`ms-4 modal-title ${!step1 && 'modal-title-edit'}`}><b>Apply for the Job</b>
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
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="job-application-form">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-auto logo">
                                        <img
                                            src="https://www.ifs.com/-/media10/project/ifs/ifs/images/homepage/ifs-logo-2021-background.jpg"
                                            alt="company logo" className="rounded float-left company-logo"
                                        />
                                    </div>
                                    <div className="col-sm">
                                        <h3 className="text-center blue-text-color">Software Engineer (Full Stack
                                            Developer)</h3>
                                        <h4 className="text-center grey-text-color">Full Time Job</h4>
                                    </div>
                                </div>
                                <br/>
                            </div>
                            {/*step 1*/}
                            {step1 && <div>
                                <h3 className="blue-text-color ms-2">Personal Details</h3>
                                <form className="me-4 ms-4">
                                    <div className="mb-2">
                                        <label htmlFor="exampleInputEmail1" className="form-label">
                                            <b>Title
                                                <mark className="required-icon">
                                                    *
                                                </mark>
                                            </b>
                                        </label>
                                        <select className="form-select custom-input-fields"
                                                aria-label="Default select example">
                                            <option selected value="Mr.">Mr.</option>
                                            <option value="Ms.">Ms.</option>
                                            <option value="Miss.">Miss.</option>
                                            <option value="Dr.">Dr.</option>
                                            <option value="Prof.">Prof.</option>
                                        </select>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm">
                                            <div className="mb-2">
                                                <label htmlFor="exampleInputEmail1" className="form-label">
                                                    <b>First Name
                                                        <mark className="required-icon">
                                                            *
                                                        </mark>
                                                    </b>
                                                </label>
                                                <input type="text" className="form-control custom-input-fields"
                                                       id="email"
                                                       placeholder="First Name"/>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="mb-2">
                                                <label htmlFor="exampleInputEmail1" className="form-label">
                                                    <b>Last Name
                                                        <mark className="required-icon">
                                                            *
                                                        </mark>
                                                    </b>
                                                </label>
                                                <input type="text" className="form-control custom-input-fields"
                                                       placeholder="Last Name"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="mb-2">
                                                <label htmlFor="exampleInputEmail1" className="form-label">
                                                    <b>Phone Number
                                                        <mark className="required-icon">
                                                            *
                                                        </mark>
                                                    </b>
                                                </label>
                                                <input type="number" className="form-control custom-input-fields"
                                                       id="email"
                                                       placeholder="Phone Number"/>
                                            </div>
                                        </div>
                                        <div className="col-sm">
                                            <div className="mb-2">
                                                <label htmlFor="exampleInputEmail1" className="form-label">
                                                    <b>Date of Birth
                                                        <mark className="required-icon">
                                                            *
                                                        </mark>
                                                    </b>
                                                </label>
                                                <input type="date" className="form-control custom-input-fields"
                                                       id="email"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="exampleInputEmail1" className="form-label">
                                            <b>Email
                                                <mark className="required-icon">
                                                    *
                                                </mark>
                                            </b>
                                        </label>
                                        <input type="email" className="form-control custom-input-fields" id="email"
                                               placeholder="Email"/>
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="exampleInputEmail1" className="form-label">
                                            <b>Address
                                                <mark className="required-icon">
                                                    *
                                                </mark>
                                            </b>
                                        </label>
                                        <input type="text" className="form-control custom-input-fields" id="email"
                                               placeholder="Address"/>
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="exampleInputEmail1" className="form-label">
                                            <b>Postal Code
                                                <mark className="required-icon">
                                                    *
                                                </mark>
                                            </b>
                                        </label>
                                        <input type="number" className="form-control custom-input-fields" id="email"
                                               placeholder="Postal Code"/>
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="exampleInputEmail1" className="form-label">
                                            <b>Gender
                                                <mark className="required-icon">
                                                    *
                                                </mark>
                                            </b>
                                        </label>
                                        <select className="form-select custom-input-fields"
                                                aria-label="Default select example">
                                            <option selected value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>
                                    <div className="text-center mt-2">
                                        <h6 className="blue-text-color">We are saving your time by auto filling your
                                            personal details</h6>
                                        <Button type="button" className="btn btn-success "
                                                onClick={() => nextStep('1')}>Next<BsArrowRight/></Button>
                                    </div>
                                </form>
                            </div>}
                            {/*step 2*/}
                            {step2 && <div>
                                <h3 className="blue-text-color ms-2 mb-3">Licenses and Certificates</h3>
                                <div className="text-center mb-4">
                                    <button type="button" id="licensesBtn"
                                            className="btn light-blue-btn btn-block"
                                            onClick={() => fileRef.current.click()}
                                    >ADD
                                        <input id="inputTagLicense" type="file" ref={fileRef} hidden/>
                                    </button>

                                    <h6 className="blue-text-color mt-2">Please provide details about your licenses and
                                        certificates.</h6>
                                </div>
                                <h3 className="blue-text-color ms-2 mb-3">Supporting Documents
                                    <mark className="required-icon">
                                        *
                                    </mark>
                                </h3>
                                <div className="text-center">
                                    <button type="button" className="btn light-blue-btn btn-block"
                                            onClick={() => fileRef2.current.click()}
                                    >ADD
                                        <input id="inputTagResume" type="file" ref={fileRef2} hidden/>
                                    </button>

                                    <h6 className="blue-text-color mt-2">Please add any supporting documents (Ex:
                                        Resume)</h6>
                                </div>
                                <h3 className="blue-text-color ms-2 mb-3 mt-4">Cover Letter</h3>
                                <div className="form-group me-4 ms-4">
                                    <textarea className="form-control " id="exampleFormControlTextarea1"
                                              rows="3"/>
                                </div>
                                <div className="text-center mt-2">
                                    <Button type="button" className="btn btn-success"
                                            onClick={() => nextStep('2')}>Next<BsArrowRight/></Button>
                                </div>
                            </div>}
                            {/*step 3 */}
                            {step3 && <div>
                                <h3 className="blue-text-color ms-2">Other Details</h3>
                                <form className="me-4 ms-4">
                                    <div className="mb-2">
                                        <label htmlFor="exampleInputEmail1" className="form-label">
                                            <b>Preferred Name</b>
                                        </label>
                                        <input type="text" className="form-control custom-input-fields" id="email"
                                               placeholder="Preferred Name"/>
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="exampleInputEmail1" className="form-label">
                                            <b>Have you ever worked for our company before?
                                                <mark className="required-icon">
                                                    *
                                                </mark>
                                            </b>
                                        </label>
                                        <select className="form-select custom-input-fields"
                                                aria-label="Default select example">
                                            <option selected value="yes">Yes</option>
                                            <option value="no">No</option>
                                        </select>
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="exampleInputEmail1" className="form-label">
                                            <b>Are you currently employed by IFS or one of the IFS group companies?
                                                <mark className="required-icon">
                                                    *
                                                </mark>
                                            </b>
                                        </label>
                                        <select className="form-select custom-input-fields"
                                                aria-label="Default select example">
                                            <option selected value="yes">Yes</option>
                                            <option value="no">No</option>
                                        </select>
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="exampleInputEmail1" className="form-label">
                                            <b>Portfolio Link
                                            </b>
                                        </label>
                                        <input type="text" className="form-control custom-input-fields" id="email"
                                               placeholder="Postal Code"/>
                                    </div>
                                    <div className="text-center mt-2">
                                        <Button type="button" className="btn btn-success saveChanges me-3">Save
                                            Changes</Button>
                                        <Button type="button" className="btn btn-danger cancel"
                                                onClick={closeModal}>Cancel</Button>
                                    </div>
                                </form>
                            </div>}
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
}

export default JobApplicationForm;
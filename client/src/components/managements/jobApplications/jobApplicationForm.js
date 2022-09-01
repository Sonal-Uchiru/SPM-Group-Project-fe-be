import React, {useEffect, useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import {BsArrowLeft, BsArrowRight} from "react-icons/all";
import './css/jobApplicationFormStyles.css'
import {handleKeyDown} from "../../external_components/validations/preventWhiteSpace";
import moment from 'moment';
import {validateNegative} from "./jobApplicationValidation";
import {getUser} from "../../../api/managements/userApi";
import {
    getJobApplicationById,
    saveJobApplication,
    updateJobApplication
} from "../../../api/managements/jobApplicationApi";
import {uploadFile} from "../../../firebase/uploadFile";
import {ErrorAlert} from "../../../sweet_alerts/error";
import {SaveChangesAlert} from "../../../sweet_alerts/saveChanges";
import {SuccessAlert} from "../../../sweet_alerts/success";
import Loading from "../../external_components/spinners/loading";
import {getJobById} from "../../../api/managements/jobApi";

export function JobApplicationForm(props) {
    const [openModal, setOpenModal] = useState(true)
    const [step1, setStep1] = useState(true)
    const [step2, setStep2] = useState(false)
    const [step3, setStep3] = useState(false)
    const [isDocRequired, setIsDocRequired] = useState(false)
    const [loading, setLoading] = useState(false)
    const [companyId, setCompanyId] = useState('')

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
        if (loading) return
        setOpenModal(false)
        props.onModalClose()
    }

    const navigateBack = () => {

        if (loading) return

        if (step2) {
            setStep2(false)
            setStep1(true)
            setIsDocRequired(false)
        }

        if (step3) {
            setStep3(false)
            setStep2(true)
            setIsDocRequired(false)
        }
    }

    const [jobApplication, setJobApplication] = useState({
        resume: "",
        coverLetter: "",
        title: "",
        preferredName: "",
        companyWorked: true,
        employedWithCurrentCompany: true,
        portfolioLink: "",
        licensesAndCertificates: []
    })

    const [applicantOtherDetails, setApplicantOtherDetails] = useState({
        dob: "",
        address: "",
        postalCode: "",
        gender: ""
    })

    const [supportingDocument, setSupportingDocument] = useState('')
    const [licensesAndCertificates, setLicensesAndCertificates] = useState('')

    const [currentUser, setCurrentUser] = useState('')

    const handleJobApplicationFormChange = (e) => {
        setJobApplication(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleUserChange = (e) => {
        setApplicantOtherDetails(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    useEffect(async () => {
        try {
            const content = await getUser()
            setCurrentUser(content.data)

        } catch (e) {
            await ErrorAlert("Something went wrong!")
        }
    }, [])

    useEffect(async () => {
        try {
            if (props.jobApplicationId) {
                const content = await getJobApplicationById(props.jobApplicationId)
                setApplicantOtherDetails(content.data.applicantOtherDetails)
                content.data.applicantOtherDetails = undefined
                setJobApplication(content.data)
                setCompanyId(content.data.companyId)
            }
        } catch (e) {
            await ErrorAlert("Something went wrong!")
        }
    }, [])

    const saveJobApplicationDB = async (e) => {
        try {
            e.preventDefault()

            if (!await SaveChangesAlert()) return

            setLoading(true)

            const supportingDocumentUrl = supportingDocument !== '' ? await uploadFile(supportingDocument, 'Resumes') : '';

            const licensesAndCertificatesUrl = licensesAndCertificates !== '' ? await uploadFile(licensesAndCertificates, 'Licenses and Certificates') : '';

            const data = {
                ...jobApplication,
                companyWorked: checkSelectedField(jobApplication.companyWorked),
                employedWithCurrentCompany: checkSelectedField(jobApplication.employedWithCurrentCompany),
                resume: props.jobApplicationId ? jobApplication.resume : supportingDocumentUrl,
                licensesAndCertificates: [licensesAndCertificatesUrl],
                jobId: props.jobApplicationId ? '' : props.jobId,
                companyId: props.jobApplicationId ? '' : props.companyId
            }

            if (props.jobApplicationId) {
                data._id = ''
                data.createdDate = ''
                data.updatedDate = ''
                data.applicant = ''
                data.status = ''
                data.__v = ''
                data.applicantOtherDetails = ''
            }

            if (data.modifiedUser) data.modifiedUser = ''

            const cleanJobApplication = Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== ''))
            const cleanApplicantDetails = Object.fromEntries(Object.entries(applicantOtherDetails).filter(([_, v]) => v !== ''))

            const content = {
                applicantOtherDetails: {
                    ...cleanApplicantDetails
                },
                ...cleanJobApplication
            }


            if (props.jobApplicationId) {
                const result = await updateJobApplication(content, props.jobApplicationId)
                setLoading(false)
                if (result) await SuccessAlert("Job application updated successfully!")
                props.onSave()
                return
            }

            const result = await saveJobApplication(content)
            setLoading(false)
            if (result) await SuccessAlert("You applied for the job successfully!")
            props.onSave()

        } catch (e) {
            setLoading(false)
            await ErrorAlert("Something went wrong!")
        }
    }

    const checkSelectedField = (data) => {
        if (typeof data != "boolean") return data === 'yes'
        return true
    }

    useEffect(() => {
        setOpenModal(true)
        setStep1(true)
        setStep2(false)
        setStep3(false)
        setIsDocRequired(false)
        setLoading(false)
    }, [])

    const handleQuestion = (ans) => {
        if (ans) return "yes"
        return "no"
    }
    return (
        <div className="apply-job-application">
            <div className="modal">
                <Modal show={openModal} size="lg">
                    <Modal.Header>
                        <div>
                            {!step1 && <BsArrowLeft onClick={navigateBack}/>}
                            <h4 className={`ms-4 modal-title ${!step1 && 'modal-title-edit'}`}>
                                <b>{props.jobApplicationId ? 'Edit Application' : 'Apply for the Job'}</b>
                            </h4>
                        </div>
                        <button
                            type="button"
                            className="btn"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={closeModal}
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
                                            src={props.otherDetails.logo}
                                            alt="company logo" className="rounded float-left company-logo"
                                        />
                                    </div>
                                    <div className="col-sm">
                                        <h3 className="text-center blue-text-color">{`${props.otherDetails.position}
                                        (${props.otherDetails.developmentArea})`}</h3>
                                        <h4 className="text-center grey-text-color">{props.otherDetails.jobType}</h4>
                                    </div>
                                </div>
                                <br/>
                            </div>
                            {/*step 1*/}
                            {step1 && <div>
                                <h3 className="blue-text-color ms-2">Personal Details</h3>
                                <form className="me-4 ms-4" onSubmit={(e) => {
                                    e.preventDefault();
                                    nextStep('1')
                                }}>
                                    <div className="mb-2">
                                        <label htmlFor="exampleInputEmail1" className="form-label">
                                            <b>Title
                                                <mark className="required-icon">
                                                    *
                                                </mark>
                                            </b>
                                        </label>
                                        <select className="form-select custom-input-fields" name="title"
                                                onChange={handleJobApplicationFormChange} value={jobApplication.title}
                                                aria-label="Default select example" required>
                                            <option selected value={""}>Select Your Title</option>
                                            <option value="Mr.">Mr.</option>
                                            <option value="Ms.">Ms.</option>
                                            <option value="Miss.">Miss.</option>
                                            <option value="Dr.">Dr.</option>
                                            <option value="Prof.">Prof.</option>
                                        </select>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm">
                                            <div className="mb-2">
                                                <label htmlFor="exampleInputFistName" className="form-label">
                                                    <b>First Name
                                                        <mark className="required-icon">
                                                            *
                                                        </mark>
                                                    </b>
                                                </label>
                                                <input type="text" className="form-control custom-input-fields" readOnly
                                                       Value={currentUser.firstName}
                                                       placeholder="First Name" required/>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="mb-2">
                                                <label htmlFor="exampleInputLastName" className="form-label">
                                                    <b>Last Name
                                                        <mark className="required-icon">
                                                            *
                                                        </mark>
                                                    </b>
                                                </label>
                                                <input type="text" className="form-control custom-input-fields" readOnly
                                                       Value={currentUser.lastName}
                                                       placeholder="Last Name" required/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="mb-2">
                                                <label htmlFor="exampleInputPhoneNumber" className="form-label">
                                                    <b>Phone Number
                                                        <mark className="required-icon">
                                                            *
                                                        </mark>
                                                    </b>
                                                </label>
                                                <input type="number" className="form-control custom-input-fields"
                                                       readOnly Value={currentUser.mobile}
                                                       placeholder="Phone Number" required/>
                                            </div>
                                        </div>
                                        <div className="col-sm">
                                            <div className="mb-2">
                                                <label htmlFor="exampleInputDob" className="form-label">
                                                    <b>Date of Birth
                                                        <mark className="required-icon">
                                                            *
                                                        </mark>
                                                    </b>
                                                </label>
                                                <input type="date" className="form-control custom-input-fields"
                                                       onChange={handleUserChange} name="dob"
                                                       readOnly={!!(currentUser.dob || (props.jobApplicationId && applicantOtherDetails.dob))}
                                                       max={moment().format("YYYY-MM-DD")} required
                                                       Value={
                                                           currentUser.dob ? moment(currentUser.dob).format("YYYY-MM-DD") :
                                                               props.jobApplicationId && moment(applicantOtherDetails.dob).format("YYYY-MM-DD")}
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
                                               readOnly Value={currentUser.email}
                                               placeholder="Email" maxLength={100} required/>
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="exampleInputAddress" className="form-label">
                                            <b>Address
                                                <mark className="required-icon">
                                                    *
                                                </mark>
                                            </b>
                                        </label>
                                        <input type="text" className="form-control custom-input-fields"
                                               onChange={handleUserChange} readOnly={!!currentUser.address}
                                               name="address" placeholder="Address" maxLength={200} required
                                               Value={currentUser.address ? currentUser.address : props.jobApplicationId && applicantOtherDetails.address}/>
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="exampleInputPostalCode" className="form-label">
                                            <b>Postal Code
                                                <mark className="required-icon">
                                                    *
                                                </mark>
                                            </b>
                                        </label>
                                        <input type="number" className="form-control custom-input-fields"
                                               name="postalCode" onChange={handleUserChange}
                                               Value={props.jobApplicationId && applicantOtherDetails.postalCode}
                                               placeholder="Postal Code" onKeyPress={validateNegative} required/>
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="exampleInputGender" className="form-label">
                                            <b>Gender
                                                <mark className="required-icon">
                                                    *
                                                </mark>
                                            </b>
                                        </label>
                                        <select className="form-select custom-input-fields" onChange={handleUserChange}
                                                name="gender" disabled={!!currentUser.gender}
                                                aria-label="Default select example" required
                                                value={currentUser.gender ? currentUser.gender :
                                                    props.jobApplicationId && applicantOtherDetails.gender}>
                                            <option selected value={""}>Select Your Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>
                                    <div className="text-center mt-2">
                                        <h6 className="blue-text-color">We are saving your time by auto filling your
                                            personal details</h6>
                                        <Button type="submit" className="btn btn-success ">Next<BsArrowRight/></Button>
                                    </div>
                                </form>
                            </div>}
                            {/*step 2*/}
                            {step2 && <div>
                                <form onSubmit={(e) => {
                                    e.preventDefault()
                                    if (supportingDocument === '' && !props.jobApplicationId) {
                                        setIsDocRequired(true)
                                        return
                                    }
                                    nextStep('2')

                                }}>
                                    <h3 className="blue-text-color ms-2 mb-3">Licenses and Certificates</h3>
                                    <div className="text-center mb-4">
                                        <button type="button" id="licensesBtn"
                                                className="btn light-blue-btn btn-block"
                                                onClick={() => fileRef.current.click()}
                                        >ADD
                                            <input id="inputTagLicense" type="file" ref={fileRef} hidden
                                                   accept="application/msword, application/pdf"
                                                   onChange={(e) => setLicensesAndCertificates(e.target.files)}/>
                                        </button>

                                        <h6 className="blue-text-color mt-2">Please provide details about your licenses
                                            and
                                            certificates.</h6>
                                    </div>
                                    {(props.jobApplicationId && jobApplication.licensesAndCertificates[0] !== '') && (
                                        <div className="text-center mb-4">
                                            <button type="button" id="licensesBtn"
                                                    className="btn light-blue-btn btn-block"
                                                    onClick={() => {
                                                        window.open(jobApplication.licensesAndCertificates[0], '_blank')
                                                    }}
                                            >Download
                                            </button>
                                        </div>)
                                    }

                                    <h3 className="blue-text-color ms-2 mb-3">Supporting Documents
                                        <mark className="required-icon">
                                            *
                                        </mark>
                                    </h3>
                                    <div className="text-center">
                                        <button type="button" className="btn light-blue-btn btn-block"
                                                onClick={() => fileRef2.current.click()}
                                        >ADD
                                            <input id="inputTagResume" type="file"
                                                   onChange={(e) => setSupportingDocument(e.target.files)}
                                                   ref={fileRef2} hidden accept="application/msword, application/pdf"/>
                                        </button>

                                        <h6 className="blue-text-color mt-2">Please add any supporting documents (Ex:
                                            Resume)</h6>
                                        {isDocRequired &&
                                            <p className="red-text-color mt-2">Supporting Document is required
                                            </p>}
                                    </div>

                                    {props.jobApplicationId && (
                                        <div className="text-center mb-4">
                                            <button type="button" id="licensesBtn"
                                                    className="btn light-blue-btn btn-block"
                                                    onClick={() => {
                                                        window.open(jobApplication.resume, '_blank')
                                                    }}
                                            >Download
                                            </button>
                                        </div>)
                                    }


                                    <h3 className="blue-text-color ms-2 mb-3 mt-4">Cover Letter</h3>
                                    <div className="form-group me-4 ms-4">
                                    <textarea className="form-control " id="exampleFormControlTextarea1"
                                              Value={jobApplication.coverLetter}
                                              name="coverLetter"
                                              rows="3" maxLength={250} onChange={handleJobApplicationFormChange}/>
                                    </div>
                                    <div className="text-center mt-2">
                                        <Button type="submit" className="btn btn-success">Next<BsArrowRight/></Button>
                                    </div>
                                </form>
                            </div>}
                            {/*step 3 */}
                            {step3 && <div>
                                <h3 className="blue-text-color ms-2">Other Details</h3>
                                <form className="me-4 ms-4" onSubmit={saveJobApplicationDB}>
                                    <div className="mb-2">
                                        <label htmlFor="exampleInputEmail1" className="form-label">
                                            <b>Preferred Name</b>
                                        </label>
                                        <input type="text" className="form-control custom-input-fields"
                                               name="preferredName" onChange={handleJobApplicationFormChange}
                                               Value={jobApplication.preferredName}
                                               placeholder="Preferred Name" onKeyPress={handleKeyDown} maxLength={50}
                                               minLength={3}/>
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="exampleInputQ1" className="form-label">
                                            <b>Have you ever worked for our company before?
                                                <mark className="required-icon">
                                                    *
                                                </mark>
                                            </b>
                                        </label>
                                        <select className="form-select custom-input-fields" name="companyWorked"
                                                onChange={handleJobApplicationFormChange}
                                                defaultValue={props.jobApplicationId ? handleQuestion(jobApplication.companyWorked) : ''}
                                                aria-label="Default select example" required>
                                            <option selected value="yes">Yes</option>
                                            <option value="no">No</option>
                                        </select>
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="exampleInputQ2" className="form-label">
                                            <b>Are you currently employed by {props.otherDetails.companyName} or one of
                                                the {props.otherDetails.companyName} group companies?
                                                <mark className="required-icon">
                                                    *
                                                </mark>
                                            </b>
                                        </label>
                                        <select className="form-select custom-input-fields"
                                                defaultValue={props.jobApplicationId ? handleQuestion(jobApplication.employedWithCurrentCompany) : ''}
                                                name="employedWithCurrentCompany"
                                                aria-label="Default select example" required
                                                onChange={handleJobApplicationFormChange}
                                        >
                                            <option selected value="yes">Yes</option>
                                            <option value="no">No</option>
                                        </select>
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="exampleInputPortFolio" className="form-label">
                                            <b>Portfolio Link
                                            </b>
                                        </label>
                                        <input type="url" className="form-control custom-input-fields"
                                               name="portfolioLink" Value={jobApplication.portfolioLink}
                                               placeholder="Portfolio Link" onChange={handleJobApplicationFormChange}/>
                                    </div>
                                    {loading && <Loading/>}

                                    <div className="text-center mt-2">
                                        <Button type="submit" className="btn btn-success saveChanges me-3">Save
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
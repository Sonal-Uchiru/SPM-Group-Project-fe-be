import React, {useEffect, useState} from 'react'
import Modal from "react-bootstrap/Modal";
import "../css/createSubmissionModal.css";
import axios from 'axios'
import showAlerts from '../../external_components/sweetAlerts'
import {uploadSubmission} from "../../../firebase/uploadFile";
import Loading from '../../external_components/loading'
import {getTokenFromLocalStorage} from '../../external_components/tokenHandling'

export default function CreateSubmissionModal(props) {
    let token = getTokenFromLocalStorage()


    const [openModal, setOpenModal] = useState(false);
    let [assignmentName, setAssignmentName] = useState('')
    let [guidelines, setGuidelines] = useState('')
    let [documentFile, setDocumentFile] = useState('')
    let [faculty, setFaculty] = useState('')
    let [type, setType] = useState('')
    let [deadline, setDeadline] = useState('')
    let [markingScheme, setMarkingScheme] = useState('')
    let [loadStatus, setLoadingStatus] = useState(true)
    let [allSceheme, setAllSceheme] = useState([])

    useEffect(async () => {
        await getMarkingSchemes()
    }, [])

    async function getMarkingSchemes() {
        await axios({
            url: `http://localhost:8080/api/markingSchemes`,
            method: "GET",
            headers: {Authorization: `Bearer ${token}`}
        }).then(async (res) => {
            console.log(res.data)
            console.log(res.data.markingSchemeList)

            await setAllSceheme(res.data.markingSchemeList)


        }).catch((err) => {
            showAlerts(2, err)
        })
    }

    async function createSubmission(links) {
        let submissionObj = {
            assignment_name: assignmentName,
            guidelines: guidelines,
            documents_links: links,
            faculty: faculty,
            type: type,
            deadline: deadline,
            marking_scheme_id: markingScheme,
            status: 0
        }

        await axios({
            url: "http://localhost:8080/api/submissionType",
            method: "POST",
            headers: {Authorization: `Bearer ${token}`},
            data: submissionObj
        }).then((res) => {
            showAlerts(1, "Submission created successfully")
            // document.getElementById('createModalCloseBtn').click()
            setOpenModal(false)
            setLoadingStatus(true)
            props.viewAllData()
        }).catch((err) => {
            showAlerts(2, err)
        })

    }

    async function setLinks1(e) {
        e.preventDefault()

        setLoadingStatus(false)
        let links = []
        let files = documentFile.target.files;
        for (let i = 0; i < files.length; i++) {
            links.push(await uploadSubmission(files[i], "SubmissionType(Templates)"))
        }

        await createSubmission(links)
    }

    function checkValidity() {
        document.getElementById('hiddenUpdate1').click()
    }

    return (
        <div className="panel-details">
            <div>
                <button
                    type="button"
                    id="displayModalBtn"
                    onClick={() => setOpenModal(true)}
                    className="btn modal-open-btn shadow-lg d-none"
                >
                    Create New Submission
                </button>
            </div>
            <div className="modal">
                <Modal show={openModal}>
                    <Modal.Header>
                        <div className="create-submission-div">
                            <div className="row">
                                <div className="top-div">
                                    <div className="box">
                                        <img
                                            src="./../images/check-list.png"
                                            className="profile-header-img"
                                            alt="ProfileHeaderImage"
                                        />
                                    </div>
                                    <div className="profile-header">
                                        <h4 className="profile-name">Create New Submission</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                        <div className="create-submission-div container">
                            <form onSubmit={setLinks1}>
                                <div className="row form-div">
                                    <div className="col-md-12 mb-3">
                                        <label className="form-label fw-bold">Assignment name</label>
                                        <input placeholder="Input assignment name" id="assignmentname" type="text"
                                               name="assignmentname"
                                               className="form-control" onKeyUp={(e) => {
                                            setAssignmentName(e.target.value)
                                        }} required/>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label className="form-label fw-bold">Guidelines</label>
                                        <textarea placeholder="Input guidelines" className="form-control"
                                                  id="guidelines" onKeyUp={(e) => {
                                            setGuidelines(e.target.value)
                                        }} name="guidelines" rows="3"/>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-12">
                                            <label className="form-label fw-bold">Required Documents/Presentation
                                                Templates etc.</label>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 mt-2">
                                            <input
                                                type="file"
                                                className="form-control browse-file"
                                                placeholder="Search Submission"
                                                onChange={(e) => {
                                                    setDocumentFile(e)
                                                }}
                                                multiple
                                            />

                                        </div>


                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label className="form-label fw-bold">Faculty</label>
                                        <select id="faculty" onChange={(e) => {
                                            setFaculty(e.target.value)
                                        }} className="form-select">
                                            <option value="Faculty of Computing">Faculty of Computing</option>
                                            <option value="Faculty of Engineering">Faculty of Engineering</option>
                                            <option value="Faculty of Business">Faculty of Business</option>
                                        </select>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label className="form-label fw-bold">Type</label>
                                        <select id="type" name="type" onChange={(e) => {
                                            setType(e.target.value)
                                        }} className="form-select">
                                            <option>Please select...</option>
                                            <option>Presentation</option>
                                            <option>Viva</option>
                                            <option>Discussion</option>

                                        </select>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label className="form-label fw-bold">Deadline</label>
                                        <input placeholder="Deadline" id="deadline" onChange={(e) => {
                                            setDeadline(e.target.value)
                                        }} type="date" name="deadline"
                                               className="form-control" required/>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label className="form-label fw-bold">Marking Scheme</label>
                                        <select id="markingscheme" name="markingscheme" onChange={(e) => {
                                            setMarkingScheme(e.target.value)
                                        }} className="form-select">
                                            <option>Please select...</option>
                                            {allSceheme.map((post) => {
                                                return (
                                                    <option key={post._id} value={post._id}>{post.name}</option>
                                                )
                                            })}

                                        </select>
                                    </div>
                                    <div hidden={loadStatus}>
                                        <div className="d-flex justify-content-center ">
                                            <Loading color="#DB7F38"/>
                                        </div>
                                    </div>
                                    <div className="row d-flex justify-content-center">
                                        <button type="submit" className="btn create-btn mt-3">Create</button>
                                    </div>

                                </div>
                            </form>

                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
}

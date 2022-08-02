import React, {useEffect, useState} from 'react'
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import "../css/viewSubmissions.css";
import CreateSubmissionModal from '../modals/createSubmission'
import axios from 'axios'
import showAlerts from '../../external_components/sweetAlerts'
import Modal from 'react-bootstrap/Modal'
import {Link} from 'react-router-dom'
import ViewMoreMarkingSchemasModal from '../modals/viewMoreMarkingSchemas'
import Loading from '../../external_components/loading'
import Swal from "sweetalert2";
import {uploadSubmission} from '../../../firebase/uploadFile'
import {getTokenFromLocalStorage} from '../../external_components/tokenHandling'
import "../css/updateSubmissionModal.css";
import "./../css/viewMoreSubmissons.css";


export default function ViewSubmissions() {

    let token = getTokenFromLocalStorage()


    let [loadStatus, setLoadStatus] = useState(false);
    let [submissionData, setSubmissionData] = useState([])
    let [submissionDataHolder, setSubmissionDataHolder] = useState([])
    let [searchError, setSearchError] = useState('')
    let [submissionObj, setSubmissionObj] = useState([])
    let [markingScheme, setMarkingScheme] = useState([])
    let [openModalUpdate, setOpenModalUpdate] = useState(false)

    let [updateAssignmentName, setUpdateAssignmentName] = useState('')
    let [updateGuidelines, setUpdateGuidelines] = useState('')
    let [updateDocumentLinks, setUpdateDocumentLinks] = useState([])
    let [updateFaculty, setUpdateFaculty] = useState('')
    let [updateType, setUpdateType] = useState('')
    let [updateDeadline, setUpdateDeadline] = useState('')
    let [updateMarkingScheme, setUpdateMarkingScheme] = useState('')
    let [typeID, setTypeID] = useState('')
    let [fileHolder, setFileHolder] = useState('')
    let [allSceheme, setAllSceheme] = useState([])
    let [documentFile, setDocumentFile] = useState('')

    let [updateloadStatus, setUpdateLoadingStatus] = useState(true)
    const [openModal, setOpenModal] = useState(false);

    let [modal, setModal] = useState('')
    useEffect(async () => {
        await loadPageData()


    }, []);

    async function loadPageData() {
        await viewSubmissionType()
        await getMarkingSchemes()
    }

    function displayModal() {
        document.getElementById('displayModalBtn').click()
    }

    async function getMarkingSchemes() {
        await axios({
            url: `http://localhost:8080/api/markingSchemes`,
            method: "GET",
            headers: {Authorization: `Bearer ${token}`}
        }).then(async (res) => {
            console.log(submissionObj)
            await setAllSceheme(res.data.markingSchemeList)


        }).catch((err) => {
            showAlerts(2, err)
        })
    }

    async function viewSubmissionType() {
        await axios({
            url: `http://localhost:8080/api/submissionType`,
            method: "GET",
            headers: {Authorization: `Bearer ${token}`}
        }).then(async (res) => {
            await setSubmissionData(res.data.submissionList)
            setSubmissionDataHolder(res.data.submissionList)
            setLoadStatus(true)

            $("#groupTable").DataTable();


        }).catch((err) => {
            showAlerts(2, err)
        })
    }

    async function filterData(searchText) {

        let filteredContent = submissionDataHolder.filter((post) =>
            post.faculty.toLowerCase().includes(searchText.toLowerCase())
        )
        if (searchText === "All") {
            await setSubmissionData(submissionDataHolder)
            setSearchError('')
        } else {
            if (filteredContent.length > 0) {
                setSearchError('')
            } else {
                setSearchError('No submissions by ' + searchText)
            }
            await setSubmissionData(filteredContent)
        }
    }

    function viewDetails(data) {
        setSubmissionObj({})
        console.log(data)
        setSubmissionObj(data)

        loadSubData(data)


        getMarkingScheme(data.marking_scheme_id)
    }

    async function getMarkingScheme(markingSchemeID) {
        await axios({
            url: `http://localhost:8080/api/markingSchemes/${markingSchemeID}`,
            method: "GET",
            headers: {Authorization: `Bearer ${token}`}
        }).then(async (res) => {

            setMarkingScheme(res.data.markingScheme[0])

        }).catch((err) => {
            showAlerts(2, err)
        })
    }

    async function viewMoreSchema(typeid, schemaid) {
        let divObj = (
            <ViewMoreMarkingSchemasModal submissionType={typeid} schemaID={schemaid}/>
        )
        await setModal(divObj)
        document.getElementById(`${typeid}`).click()
    }

    async function openUpdateModal(data) {
        // console.log(data)
        setUpdateAssignmentName(data.assignment_name)
        setUpdateDeadline(data.deadline)
        setUpdateDocumentLinks(data.documents_links)
        setUpdateFaculty(data.faculty)
        setUpdateGuidelines(data.guidelines)
        setUpdateMarkingScheme(data.marking_scheme_id)
        setUpdateType(data.type)
        setTypeID(data._id)

        await setSubmissionObj(data)
        setOpenModalUpdate(true)

    }

    function loadSubData(data) {
        let divHolder = (
            data.documents_links.map((post) => {
                return (
                    <div className="col mb-3">
                        <div className="d-flex flex-row">
                            <a href={post}>
                                <img
                                    src="./../images/docs.png"
                                    alt="Document"
                                    width="30"
                                    height="30"
                                />

                                <Link className="ms-2 mt-2 text-gold" to="#">
                                    WD2022_Grp_69
                                </Link>
                            </a>
                        </div>
                    </div>
                );
            })
        )
        console.log(divHolder)
        setFileHolder(divHolder)
        setOpenModal(true)


    }

    function deleteSubmission() {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {

                await axios({
                    url: `http://localhost:8080/api/submissionType/${typeID}`,
                    method: "DELETE",
                    headers: {Authorization: `Bearer ${token}`},
                    data: submissionObj
                }).then((res) => {
                    showAlerts(1, 'Your file has deleted successfully')

                    setOpenModalUpdate(false)
                    loadPageData()
                }).catch((err) => {
                    showAlerts(2, err)
                })

            }
        })
    }

    async function updateModal(links) {
        let updateObj;
        if (links.length > 0) {
            updateObj = {
                assignment_name: updateAssignmentName,
                guidelines: updateGuidelines,
                documents_links: links,
                faculty: updateFaculty,
                type: updateType,
                deadline: updateDeadline,
                marking_scheme_id: updateMarkingScheme,
            }
        } else {
            updateObj = {
                assignment_name: updateAssignmentName,
                guidelines: updateGuidelines,
                faculty: updateFaculty,
                type: updateType,
                deadline: updateDeadline,
                marking_scheme_id: updateMarkingScheme,
            }
        }


        await axios({
            url: `http://localhost:8080/api/submissionType/${typeID}`,
            method: "PUT",
            headers: {Authorization: `Bearer ${token}`},
            data: updateObj
        }).then((res) => {
            showAlerts(1, 'Your file has updated successfully')

            setOpenModalUpdate(false)
            loadPageData()
        }).catch((err) => {
            showAlerts(2, err)
        })


        setUpdateLoadingStatus(true)

        console.log(updateObj)

    }

    async function setLinks(e) {
        e.preventDefault()
        let links = []

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                setUpdateLoadingStatus(false)
                if (documentFile !== '') {
                    let files = documentFile.target.files;
                    for (let i = 0; i < files.length; i++) {
                        links.push(await uploadSubmission(files[i], "SubmissionType(Templates)"))
                    }
                    console.log(links)
                }

                updateModal(links)

            }
        })
    }

    function checkValidity() {
        document.getElementById('hiddenUpdate').click()
    }

    return (
        <div className="submissions-div">
            <div className="top-div row mt-5">
                <div className="col-md-12">
                    <div className="d-flex justify-content-center">
                        <div className="col-md-4">
                            <select
                                className="form-control form-control-sm "
                                name="faculty"
                                id="faculty"
                                required
                                onChange={(e) => {
                                    filterData(e.target.value)
                                }}
                            >
                                <option value="All">All</option>
                                <option value="Faculty of Computing">Faculty of Computing</option>
                                <option value="Faculty of Engineering">Faculty of Engineering</option>
                                <option value="Faculty of Business">Faculty of Business</option>
                            </select>
                        </div>

                    </div>
                    <br/>
                    <button onClick={() => displayModal()} className="btn createbtn float-end">
                        + Create Submission
                    </button>
                </div>
            </div>
            <div className="col-md-12 submissions-table-div mt-5">
                <div hidden={loadStatus}>
                    <div className="d-flex justify-content-center ">
                        <Loading color="#DB7F38"/>
                    </div>
                </div>
                <div className="scrollbar">
                    <h6 className="text-danger d-flex justify-content-center">{searchError}</h6>
                    <table
                        id="groupTable"
                        className="table table-bordered table-sm nowrap table-hover submissions-table"
                    >
                        <thead>
                        <tr>
                            <th>Assignment Name</th>
                            <th>Deadline</th>
                            <th>No of Document</th>
                            <th>Type</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {submissionData.map((post) => {
                            return (
                                <tr>
                                    <td>{post.assignment_name}</td>
                                    <td>{post.deadline.split('', 10)}</td>
                                    <td>{post.documents_links.length}</td>
                                    <td>{post.type}</td>
                                    <td>
                                        {/*<button className="btn">*/}
                                        {/*  <img*/}
                                        {/*    src="./../images/download-free-icon-font.png"*/}
                                        {/*    className="tableEdit"*/}
                                        {/*   alt="downloadIcon"/>*/}
                                        {/*</button>*/}
                                        <button className="btn">
                                            <img
                                                src="./../images/editing.png"
                                                className="tableEdit"
                                                onClick={() => openUpdateModal(post)}
                                                alt="editIcon"/>
                                        </button>
                                        <button className="btn">
                                            <img src="./../images/view.png" className="tableEdit"
                                                 onClick={() => viewDetails(post)} alt="viewIcon"/>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
            <CreateSubmissionModal viewAllData={loadPageData}/>
            {/*View more details modal*/}
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
                            <h3 className="proposal-title text-blue">
                                {submissionObj.assignment_name}
                            </h3>
                        </div>

                        <div className="container">
                            <br/>
                            <h4 className="text-blue">{submissionObj.faculty}</h4>
                            <h5 className="text-blue">Guidelines</h5>
                            <p>{submissionObj.guidelines}</p>

                            <h5 className="text-blue document-text">
                                Required Documents/Presentation Templates etc
                            </h5>

                            {/*Documents Section */}
                            <div className="row mb-4 mt-4">
                                {fileHolder}
                                {/*{submissionObj.documents_links.map((post) => {*/}
                                {/*  return (*/}
                                {/*      <div className="col mb-3">*/}
                                {/*        <div className="d-flex flex-row">*/}
                                {/*          <a href = {post}>*/}
                                {/*            <img*/}
                                {/*                src="./../images/docs.png"*/}
                                {/*                alt="Document"*/}
                                {/*                width="30"*/}
                                {/*                height="30"*/}
                                {/*            />*/}

                                {/*            <Link className="ms-2 mt-2 text-gold" to="#">*/}
                                {/*              WD2022_Grp_69*/}
                                {/*            </Link>*/}
                                {/*          </a>*/}
                                {/*        </div>*/}
                                {/*      </div>*/}
                                {/*  );*/}
                                {/*})}*/}

                            </div>

                            <h5 className="text-blue">Type</h5>
                            <p>{submissionObj.type}</p>

                            <h5 className="text-blue">Deadline</h5>
                            <p>{submissionObj.marking_scheme_id}</p>

                            <h5 className="text-blue">Marking Scheme</h5>

                            <div className="d-flex justify-content-between">
                                <div>
                                    <p className="fw-bold">{markingScheme.name}</p>
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        className="btn shadow-lg view-scheme-btn"
                                        onClick={() => viewMoreSchema(submissionObj._id, submissionObj.marking_scheme_id)}
                                    >
                                        View Marking Scheme
                                    </button>
                                    {modal}

                                </div>
                            </div>
                        </div>


                    </Modal.Body>
                </Modal>
            </div>
            {/*Update submission Modal*/}
            <div className="modal">
                <Modal show={openModalUpdate}>
                    <Modal.Header>
                        <div className="update-submission-div">
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
                                        <h4 className="profile-name">Update Submission</h4>
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
                                setOpenModalUpdate(false);
                            }}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="update-submission-div container">
                            <form onSubmit={(e) => setLinks(e)}>
                                <div className="row form-div">
                                    <div className="col-md-12 mb-3">
                                        <label className="form-label fw-bold">Assignment name</label>
                                        <input placeholder="Input assignment name" id="assignmentname" type="text"
                                               name="assignmentname"
                                               value={updateAssignmentName} onChange={(e) => {
                                            setUpdateAssignmentName(e.target.value)
                                        }} className="form-control" required/>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label className="form-label fw-bold">Guidelines</label>
                                        <textarea placeholder="Input guidelines" value={updateGuidelines}
                                                  onChange={(e) => {
                                                      setUpdateGuidelines(e.target.value)
                                                  }} className="form-control" id="guidelines" name="guidelines"
                                                  rows="3"/>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-12">
                                            <label className="form-label fw-bold">Required Documents/Presentation
                                                Templates etc.</label>
                                        </div>
                                        <div className="row">

                                            {updateDocumentLinks.map((post) => {
                                                return (
                                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 mt-2">
                                                        <div className="input-group d-flex justify-content-center ">
                                                            <span className="" id=""><img
                                                                className="submission-img me-3"
                                                                src="./../images/docs.png" alt="fileImg"/></span>
                                                            <label className="label-text">WD2022_Grp_69</label>
                                                        </div>
                                                    </div>
                                                )
                                            })}


                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 mt-4">
                                            <input type="file" className="form-control" onChange={(e) => {
                                                setDocumentFile(e)
                                            }}
                                                   multiple/>
                                        </div>

                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label className="form-label fw-bold">Faculty</label>
                                        <select value={updateFaculty} onChange={(e) => {
                                            setUpdateFaculty(e.target.value)
                                        }} id="faculty" className="form-select">
                                            <option>Please select...</option>
                                            <option value="Faculty of Computing">Faculty of Computing</option>
                                            <option value="Faculty of Engineering">Faculty of Engineering</option>
                                            <option value="Faculty of Business">Faculty of Business</option>
                                        </select>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label className="form-label fw-bold">Type</label>
                                        <select id="type" name="type" onChange={(e) => {
                                            setUpdateType(e.target.value)
                                        }} className="form-select">
                                            <option>Please select...</option>
                                            <option value="Presentation">Presentation</option>
                                            <option value="Viva">Viva</option>
                                            <option value="Discussion">Discussion</option>

                                        </select>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label className="form-label fw-bold">Deadline</label>
                                        <input placeholder="Deadline" id="deadline" type="date" name="deadline"
                                               value={updateDeadline} onChange={(e) => {
                                            setUpdateDeadline(e.target.value)
                                        }} className="form-control" required/>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label className="form-label fw-bold">Marking Scheme</label>
                                        <select id="markingscheme" value={updateMarkingScheme} onChange={(e) => {
                                            setUpdateMarkingScheme(e.target.value)
                                        }} name="markingscheme" className="form-select">
                                            <option>Please select...</option>
                                            {allSceheme.map((post) => {
                                                return (
                                                    <option key={post._id} value={post._id}>{post.name}</option>
                                                )
                                            })}

                                        </select>
                                    </div>

                                    <div className="row d-flex justify-content-center">
                                        <div hidden={updateloadStatus}>
                                            <div className="d-flex justify-content-center ">
                                                <Loading color="#DB7F38"/>
                                            </div>
                                        </div>
                                        <button type="submit" class="d-none" id="hiddenUpdate">Submit</button>
                                        <button className="btn update-btn mt-3" onClick={() => checkValidity()}>Update
                                        </button>
                                        <button className="btn delete-btn  mt-3"
                                                onClick={() => deleteSubmission()}>Delete
                                        </button>
                                    </div>
                                </div>
                            </form>


                        </div>
                    </Modal.Body>
                </Modal>
            </div>
            <br/>
        </div>
    );
}

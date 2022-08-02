import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import "../css/createPanel.css";
import LecturerSelect from '../../student/cards/lecturerSelect'
import axios from 'axios'
import $ from 'jquery'
import showAlerts from '../../external_components/sweetAlerts'
import {getTokenFromLocalStorage} from '../../external_components/tokenHandling'


function CreatePanel(props) {
    let token = getTokenFromLocalStorage()

    const [stageStatus, setStageStatus] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [primaryHeaderTxt, setPrimaryHeaderTxt] = useState("Create Panel");
    const [secondaryHeaderTxt, setSecondaryHeaderTxt] = useState("");

    let [panelName, setPanelName] = useState('')
    let [panelType, setPanelType] = useState('')
    let [panelFaculty, setPanelFaculty] = useState('')
    let [researchField, setResearchField] = useState('')
    let [staffData, setStaffData] = useState([])
    let [staffDataHolder, setStaffDataHolder] = useState([])

    let [error, setError] = useState('')
    let [searchError, setSearchError] = useState('')
    let [staffHolder, setStaffHolder] = useState([])


    async function nextStep(e) {
        e.preventDefault()
        loadStaffData()

        setStageStatus(false);
        setPrimaryHeaderTxt("Add members to panel");
        setSecondaryHeaderTxt("You can select 3 only supervisors");
        document.getElementById("primaryHeader").className = "text-center txt-blue";
    }

    async function loadStaffData() {
        await axios({
            url: `http://localhost:8080/api/staffs/get`,
            method: "GET",
            headers: {Authorization: `Bearer ${token}`}
        }).then((res) => {
            console.log(res.data)
            setStaffData(res.data.staff)
            setStaffDataHolder(res.data.staff)
        }).catch((err) => {
            showAlerts(2, err)
        })
    }

    function previousStep() {
        setStageStatus(true);
        setPrimaryHeaderTxt("Create panel");
        setSecondaryHeaderTxt("");
        document.getElementById("primaryHeader").className = "text-center txt-blue";
    }

    function checkFormValidity() {
        document.getElementById('hiddensubmit').click()
    }

    function assignStaffMembers(staffID, type) {

        if (type === 2) {
            var dataHolder = [...staffHolder]; //Making a copy of the array
            var index = dataHolder.indexOf(staffID)
            if (index !== -1) {
                dataHolder.splice(index, 1);
                staffHolder = dataHolder
                setStaffHolder(dataHolder)
            }
        }

        if (staffHolder.length > 2) {
            document.getElementById(`${staffID}`).click()
            setError('You cant select more than 3 lectures')
            return 0
        }

        if (type === 1) {
            setError('')
            // console.log(staffHolder)
            setStaffHolder([...staffHolder].concat(staffID))

        }
    }

    async function createPanel() {

        let panelObj = {
            name: panelName,
            panel_type: panelType,
            research_field: researchField,
            in_charge_id: staffHolder[0],
            faculty: panelFaculty,
            member_array: staffHolder,
            status: 0
        }
        console.log(panelObj)

        let result = await axios({
            url: "http://localhost:8080/api/panels",
            method: "POST",
            headers: {Authorization: `Bearer ${token}`},
            data: panelObj
        }).then((res) => {
            showAlerts(1, "Panel created successfully")
            document.getElementById('createModalCloseBtn').click()
            previousStep()

            setStaffDataHolder([])
            props.getDetails()
        }).catch((err) => {
            showAlerts(2, err)
        })
        console.log(result)


    }

    async function searchStaff(e) {
        let searchText = e

        let filteredContent = staffDataHolder.filter((post) =>
            post.first_name.toLowerCase().includes(searchText.toLowerCase()) || post.last_name.toLowerCase().includes(searchText.toLowerCase())
        )
        if (!searchText) {
            await setStaffData(staffDataHolder)
            setSearchError('')
            checkSelected(staffDataHolder)
        } else {
            if (filteredContent.length > 0) {
                setSearchError('')
            } else {
                setSearchError('No supervisors by name ' + searchText)
            }
            await setStaffData(filteredContent)


            checkSelected(filteredContent)
        }

    }

    function checkSelected(data) {
        console.log(data)
        data.map((post) => {
            if (staffHolder.includes(post._id)) {
                document.getElementById(`${post._id}`).checked = true
            }
        })
    }

    return (
        <div>
            <div className="create-panel">
                <div>
                    <button
                        type="button"
                        id="modalShowBtn"
                        onClick={() => setOpenModal(true)}
                        className="btn modal-open-btn shadow-lg d-none"
                    >
                        &#43; Create Panel
                    </button>
                </div>
                <div className="modal">
                    <Modal show={openModal} size="">
                        <Modal.Header>
                            <span> </span>
                            <button
                                type="button"
                                id="createModalCloseBtn"
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
                                <h3 id="primaryHeader" className="d-flex justify-content-center txt-blue">
                                    {primaryHeaderTxt}
                                </h3>
                                <div className="text-center">
                                    <h6 className=" text-danger">{secondaryHeaderTxt}</h6>
                                </div>
                                {/*stage 1 */}
                                <div className="input-field" hidden={!stageStatus}>
                                    <form onSubmit={(e) => nextStep(e)} id="stage1">
                                        <div className="form-group mb-3">
                                            <label htmlFor="InputPanelName" className="mb-2">
                                                <b>Panel Name</b>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="InputPanelName"
                                                placeholder="Enter the Panel Name"
                                                onKeyUp={(e) => {
                                                    setPanelName(e.target.value)
                                                }}
                                                required
                                            />
                                        </div>
                                        <label className="form-label" id="panelType">
                                            {" "}
                                            <b>Panel Type </b>
                                        </label>
                                        <select
                                            className="form-select mb-3 dropdown-custom"
                                            aria-label=".form-select-lg example"
                                            onChange={(e) => {
                                                setPanelType(e.target.value)
                                            }}
                                            required
                                        >
                                            <option selected>Select The Panel Type</option>
                                            <option value="Evaluation">Evaluation</option>
                                            <option value="Presentation">Presentation</option>
                                        </select>
                                        <label className="form-label" id="faculty">
                                            {" "}
                                            <b>Faculty </b>
                                        </label>
                                        <select
                                            className="form-select mb-3 dropdown-custom"
                                            aria-label=".form-select-lg example"
                                            onChange={(e) => {
                                                setPanelFaculty(e.target.value)
                                            }}
                                            required
                                        >
                                            <option selected>Select The Faculty</option>
                                            <option value="Faculty of Computing">Faculty of Computing</option>
                                            <option value="Faculty of Engineering">Faculty of Engineering</option>
                                            <option value="Faculty of Business">Faculty of Business</option>

                                        </select>
                                        <label className="form-label" id="researchField">
                                            {" "}
                                            <b>Research Field</b>{" "}
                                        </label>
                                        <select
                                            className="form-select mb-3 dropdown-custom"
                                            aria-label=".form-select-lg example"
                                            onChange={(e) => {
                                                setResearchField(e.target.value)
                                            }}
                                            required
                                        >
                                            <option selected>
                                                Select Your Interested Research Field
                                            </option>
                                            <option value='Human Computer Interaction (HCI)'>Human Computer Interaction
                                                (HCI)
                                            </option>
                                            <option
                                                value='Machine Learning, Health Informatics, and Computer Linguistics'>
                                                Machine Learning, Health Informatics, and Computer
                                                Linguistics
                                            </option>
                                            <option value='Teaching and Learning, Data Analytics'>
                                                Teaching and Learning, Data Analytics
                                            </option>
                                            <option value='Mechatronics; Integrated and Automated Design'>
                                                Mechatronics; Integrated and Automated Design
                                            </option>
                                            <option value='High temperature materials'>
                                                High temperature materials
                                            </option>
                                            <option value='Stream, river and urban waterways rehabilitation'>
                                                Stream, river and urban waterways rehabilitation
                                            </option>
                                            <option value='Business Process Management (BPM)'>
                                                Business Process Management (BPM)
                                            </option>
                                            <option value='Social media Marketing'>
                                                Social media Marketing
                                            </option>
                                            <option value='eLearning'>
                                                eLearning {' '}
                                            </option>
                                        </select>

                                        <button id="hiddensubmit" className="d-none" type="submit">
                                            Submit
                                        </button>
                                    </form>
                                </div>
                                {/*stage 2*/}
                                <div className="group-members mt-3" hidden={stageStatus}>
                                    <div className="main">

                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control search-field"
                                                placeholder="Search Staff by Name, Email or Academic Rank"
                                                onKeyUp={(e) => searchStaff(e.target.value)}
                                            />
                                            <div className="input-group-append">
                                                <button className="btn search-btn" type="button">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="20"
                                                        height="20"
                                                        fill="#DB7F38"
                                                        className="bi bi-search icon"
                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path
                                                            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="notify-container">
                                        <h6 className="txt-yellow text-center mt-3 mb-2">
                                            The supervisors were shown according to your faculty and the research fields
                                        </h6>
                                        {/*<p className="text-danger d-flex justify-content-center">{error}</p>*/}
                                        <p className="text-danger d-flex justify-content-center">{searchError}</p>

                                    </div>
                                    <div className="members-container">
                                        {staffData.map((post) => {
                                            return <LecturerSelect details={post} assignMembers={assignStaffMembers}/>;
                                        })}
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <button
                                type="button"
                                className="btn shadow-lg next-btn"
                                onClick={checkFormValidity}
                                hidden={!stageStatus}
                            >
                                Next <span aria-hidden="true">&rarr;</span>
                            </button>
                            <a className="footer-secondary-btn me-3"
                               onClick={previousStep}
                               hidden={stageStatus}>
                                back
                            </a>
                            <button
                                type="button"
                                className="btn shadow-lg footer-primary-btn"
                                onClick={createPanel}
                                hidden={stageStatus}
                            >
                                Submit
                            </button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default CreatePanel;

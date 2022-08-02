import React, {useEffect, useState} from 'react'
import Modal from "react-bootstrap/Modal";
import "../css/allocateGroups.css";
import axios from 'axios'
import $ from 'jquery'
import showAlerts from '../../external_components/sweetAlerts'
import {getTokenFromLocalStorage} from '../../external_components/tokenHandling'

export default function AllocateGroupsModal(props) {
    const [openModal, setOpenModal] = useState(false);
    let token = getTokenFromLocalStorage()

    let [groupData, setGroupData] = useState([])
    let [groupDataHolder, setGroupDataHolder] = useState([])
    let [searchError, setSearchError] = useState('')
    let [groupHolder, setGroupHolder] = useState([])

    let panelDetails = props.panelDetails;

    useEffect(() => {
        getGroupDetails()
    }, []);

    async function getGroupDetails() {
        await axios({
            url: `http://localhost:8080/api/studentGroups/`,
            method: "GET",
            headers: {Authorization: `Bearer ${token}`}
        }).then((res) => {
            setGroupData(res.data.studentGroups)
            setGroupDataHolder(res.data.studentGroups)
            $("#groupTable").DataTable();

        }).catch((err) => {
            showAlerts(2, err)
        })
    }

    async function searchGroup(e) {
        let searchText = e

        let filteredContent = groupDataHolder.filter((post) =>
            post.group_id.toLowerCase().includes(searchText.toLowerCase())
        )
        if (!searchText) {
            await setGroupData(groupDataHolder)
            setSearchError('')
            checkSelected(groupDataHolder)
        } else {
            if (filteredContent.length > 0) {
                setSearchError('')
            } else {
                setSearchError('No groups by name ' + searchText)
            }
            await setGroupData(filteredContent)


            checkSelected(filteredContent)
        }

    }

    function checkSelected(data) {
        console.log(data)
        console.log(groupHolder)
        data.map((post) => {
            if (groupHolder.includes(post._id)) {
                document.getElementById(`${post._id}`).checked = true
            }
        })
    }

    function assign(groupID, e) {
        const checked = e.target.checked;
        let type = 2
        if (checked)
            type = 1

        if (type === 2) {
            var dataHolder = [...groupHolder]; //Making a copy of the array
            var index = dataHolder.indexOf(groupID)
            if (index !== -1) {
                dataHolder.splice(index, 1);
                groupHolder = dataHolder
                setGroupHolder(dataHolder)
            }
        }

        if (type === 1) {
            setGroupHolder([...groupHolder].concat(groupID))
        }

        console.log(groupHolder)

    }

    async function allocateGroups() {
        let panelObj = {
            PanelType: panelDetails.panelObj[0].panel_type,
            group_array: groupHolder
        }

        console.log(panelObj)
        console.log(panelDetails)
        let result = await axios({
            url: `http://localhost:8080/api/panels/${panelDetails.panelObj[0]._id}`,
            method: "PATCH",
            headers: {Authorization: `Bearer ${token}`},
            data: panelObj
        }).then((res) => {
            showAlerts(1, "Groups allocated successfully")
            document.getElementById('groupModalCloseBtn').click()
            document.getElementById('detailsCloseBtn').click()

        }).catch((err) => {
            showAlerts(2, err)
        })
    }

    return (
        <div className="allocate-groups">
            <div>
                <button
                    type="button"
                    id="allocateModalBtn"
                    onClick={() => setOpenModal(true)}
                    className="btn modal-open-btn shadow-lg d-none"
                >
                    Allocate Groups
                </button>
            </div>
            <div className="modal">
                <Modal show={openModal}>
                    <Modal.Header>
                        <span> </span>

                        <button
                            type="button"
                            className="btn close-btn"
                            data-dismiss="modal"
                            aria-label="Close"
                            id="groupModalCloseBtn"
                            onClick={() => {
                                setOpenModal(false);
                            }}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <h1 className="text-blue text-center"> Allocate Groups</h1>
                            <br/>
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control search-field"
                                    placeholder="Search Student Group by ID"
                                    onKeyUp={(e) => searchGroup(e.target.value)}

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
                            {/*<p className="text-center text-gold mt-2">*/}
                            {/*  The supervisors were shown according to your faculty and the*/}
                            {/*  research fields*/}
                            {/*</p>*/}
                            <br/>
                            <form>
                                <div className="sub-container">
                                    <h6 className="text-danger d-flex justify-content-center">{searchError}</h6>
                                    {groupData.map((post) => {
                                        return (
                                            <div key={post._id}
                                                 className="form-check input-radio d-flex align-items-center justify-content-between mb-4">
                                                <label
                                                    className="form-check-label text-blue"
                                                    for="exampleRadios2"
                                                >
                                                    {post.group_id}

                                                </label>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value="option2"
                                                    style={{
                                                        marginRight: "20px",
                                                        height: "30px",
                                                        width: "30px",
                                                    }}
                                                    id={post._id}
                                                    onClick={(e) => assign(post._id, e)}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-lg shadow-lg finish-btn mt-4"
                                    onClick={() => allocateGroups()}
                                >
                                    Allocate
                                </button>
                            </form>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
}

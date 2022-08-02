import React, {useEffect, useState} from 'react'
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import "../css/viewPanels.css";
import PanelSummary from "../cards/panelSummary";
import CreatePanel from '../modals/createPanel'
import axios from 'axios'
import showAlerts from '../../external_components/sweetAlerts'
import Loading from '../../external_components/loading'
import Modal from 'react-bootstrap/Modal'
import "../css/panelDetails.css";
import AllocateGroupsModal from '../modals/allocateGroups'
import {getTokenFromLocalStorage} from '../../external_components/tokenHandling'

export default function ViewPanel() {


    let token = getTokenFromLocalStorage()
    var [panelData, setPanelData] = useState([])
    var [loadStatus, setLoadStatus] = useState(false);
    var [detailsModal, setDetailsModal] = useState(false)

    var [panel, setPanel] = useState([])
    var [panelName, setPanelName] = useState("")
    var [panelFaculty, setPanelFaculty] = useState("")
    var [memberArray, setMemberArray] = useState([])
    var [groupArray, setGroupArray] = useState([])
    var [presentationArray, setPresentationArray] = useState([])

    var [computingCount, setComputingCount] = useState(0)
    var [buisnessCount, setBuisnessCount] = useState(0)
    var [engineeringCount, setEngineeringCount] = useState(0)
    var [errorText, setErrorText] = useState('')
    let [cMonthCount, setCMonthCount] = useState(0)
    let [eMonthCount, setEMonthCount] = useState(0)
    let [bMonthCount, setBMonthCount] = useState(0)

    useEffect(() => {
        getPanelData()
    }, []);

    async function getPanelData() {
        await axios({
            url: `http://localhost:8080/api/panels`,
            method: "GET",
            headers: {Authorization: `Bearer ${token}`}
        }).then(async (res) => {
            await setPanelData(res.data.panelList)
            setLoadStatus(true)
            countPanelData(res.data.panelList)


        }).catch((err) => {
            showAlerts(2, err)
        })
    }

    function countPanelData(data) {
        let thisMonth = new Date().getMonth() + 1
        console.log(thisMonth)
        let computing = 0
        let cmonth = 0
        let business = 0;
        let bmonth = 0
        let engineering = 0;
        let emonth = 0

        console.log(data)
        data.map((post) => {
            let createDate = new Date(post.create_date)
            let createMonth = createDate.getMonth() + 1;
            if (post.faculty === "Faculty of Computing") {
                if (thisMonth === createMonth)
                    cmonth++
                computing++
            } else if (post.faculty === "Faculty of Engineering") {
                if (thisMonth === createMonth)
                    emonth++
                engineering++
            } else {
                if (thisMonth === createMonth)
                    bmonth++
                business++
            }
        })

        setEngineeringCount(engineering)
        setComputingCount(computing)
        setBuisnessCount(business)
        setEMonthCount(emonth)
        setBMonthCount(bmonth)
        setCMonthCount(cmonth)
        $("#panelTable").DataTable();
    }

    async function getOnePanel(panelID) {
        await axios({
            url: `http://localhost:8080/api/panels/${panelID}`,
            method: "GET",
            headers: {Authorization: `Bearer ${token}`}
        }).then((res) => {
            console.log(res.data)
            setPanel(res.data)
            setPanelName(res.data.panelObj[0].name)
            setPanelFaculty(res.data.panelObj[0].faculty)
            setMemberArray(res.data.panelObj[0].memberResult)
            setGroupArray(res.data.panelObj[0].groupResult)
            setPresentationArray(res.data.panelObj[0].presentationResult)

            if (res.data.panelObj[0].groupResult.length <= 0 && res.data.panelObj[0].presentationResult.length <= 0) {
                setErrorText("No Groups assigned to this panel yet")
            } else {
                setErrorText('')
            }

            setDetailsModal(true)


        }).catch((err) => {
            showAlerts(2, err)
        })
    }

    function openModal() {
        document.getElementById('modalShowBtn').click()
    }

    function openAllocateGroup() {
        document.getElementById('allocateModalBtn').click()
    }

    return (
        <div className="all-panel-div">
            <div className="top-div row mt-3">
                <div className="col-md-4">
                    <PanelSummary
                        monthlyReg={cMonthCount}
                        panelNum={computingCount}
                        faculty={"Faculty of Computing"}
                    />
                </div>
                <div className="col-md-4">
                    <PanelSummary
                        monthlyReg={eMonthCount}
                        panelNum={engineeringCount}
                        faculty={"Faculty of Engineering"}
                    />
                </div>
                <div className="col-md-4">
                    <PanelSummary
                        monthlyReg={bMonthCount}
                        panelNum={buisnessCount}
                        faculty={"Faculty of Business"}
                    />
                </div>
            </div>
            <div className="col-12">
                <button onClick={() => openModal()} className="btn createbtn mt-5 mb-5 ">+ Create Panel</button>
                <br/>

            </div>


            <div className="col-md-12 all-panel-table-div mt-5 ">
                <div hidden={loadStatus}>
                    <div className="d-flex justify-content-center ">
                        <Loading color="#DB7F38"/>
                    </div>
                </div>
                <div className="scrollbar">
                    <table
                        id="panelTable"
                        className="table table-bordered table-sm nowrap table-hover panel-table"
                    >
                        <thead>
                        <tr>
                            <th>Panel Name</th>
                            <th>Panel Incharge</th>
                            <th>Faculty</th>
                            <th>Type</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {panelData.map((post) => {
                            return (
                                <tr key={post._id}>
                                    <td>{post.name}</td>
                                    <td>{post.panelIncharge[0].first_name} {post.panelIncharge[0].last_name}</td>
                                    <td>{post.faculty}</td>
                                    <td>{post.panel_type}</td>

                                    <td>
                                        <button className="btn">
                                            <img src="./../images/view.png" onClick={() => getOnePanel(post._id)}
                                                 className="tableEdit" alt="viewImg"/>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
            <br/>
            {/*Panel Details Modal*/}
            <div className="modal">
                <Modal show={detailsModal}>
                    <Modal.Header>
                        <span></span>
                        <button
                            type="button"
                            className="btn close-btn"
                            data-dismiss="modal"
                            aria-label="Close"
                            id="detailsCloseBtn"
                            onClick={() => {
                                setDetailsModal(false);
                            }}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <h3 className="text-blue">{panelName}</h3>
                            <h4 className="text-blue">{panelFaculty}</h4>
                            <h4 className="text-gold">Member Details</h4>

                            {/* Member Details */}
                            <div>
                                {memberArray.map((post, i) => {
                                    return (
                                        <div key={post._id} className="row">
                                            <div className="col">
                                                {i === 0 ? <p>{post.first_name} {post.last_name}(Incharge)</p> :
                                                    <p>{post.first_name} {post.last_name} </p>}

                                            </div>

                                            <div className="col">
                                                <p className="text-center">{post.email}</p>
                                            </div>
                                        </div>
                                    )
                                })}

                            </div>

                            <hr/>
                            <h4 className="text-gold">Assign Groups</h4>
                            {/*Assign Groups */}
                            <div>
                                <p className="d-flex justify-content-center text-danger">{errorText}</p>
                                {groupArray.map((post) => {
                                    return (
                                        <div className="row">
                                            <div className="col">
                                                <p>{post.group_id}</p>
                                            </div>

                                            {/*<div className="col">*/}
                                            {/*  <p>G.A Dananjaya(Leader)</p>*/}
                                            {/*</div>*/}
                                            {/*<div className="col">*/}
                                            {/*  <p>IT20179924</p>*/}
                                            {/*</div>*/}
                                        </div>

                                    )
                                })}
                                {presentationArray.map((post) => {
                                    return (
                                        <div className="row">
                                            <div className="col">
                                                <p>{post.group_id}</p>
                                            </div>

                                            {/*<div className="col">*/}
                                            {/*  <p>G.A Dananjaya(Leader)</p>*/}
                                            {/*</div>*/}
                                            {/*<div className="col">*/}
                                            {/*  <p>IT20179924</p>*/}
                                            {/*</div>*/}
                                        </div>

                                    )
                                })}

                            </div>

                            <div className="d-flex justify-content-center mt-4">
                                <button
                                    type="button"
                                    onClick={() => openAllocateGroup(true)}
                                    className="btn allocate-groups-btn shadow-lg"
                                >
                                    Allocate Groups
                                </button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>

            </div>

            {/*  Assign groups to panel modal*/}
            <AllocateGroupsModal getDetails={getPanelData} panelDetails={panel}/>
            {/*Create panel modal*/}
            <CreatePanel getDetails={getPanelData}/>
        </div>
    );
}

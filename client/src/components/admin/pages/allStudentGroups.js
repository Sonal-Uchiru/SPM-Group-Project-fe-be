import React, {useState, useEffect} from "react";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import "../css/allStudentGroups.css";
import GroupSummary from "../cards/groupSummary";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import showAlerts from "../../external_components/sweetAlerts";
import {getTokenFromLocalStorage} from "../../external_components/tokenHandling";

export default function AllStudentGroups() {
    let array = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, -1, 1, 2, 3, 4,
        5, 6, 7, 7, 8, 9,
    ];

    let [modalOpen, setModalOpen] = useState(false);

    const [groupData, setGroupData] = useState([]);
    const [studentGroup, setStudentGroup] = useState([]);
    const [supervisor, setSupervisor] = useState([]);
    const [coSupervisor, setCoSupervisor] = useState([]);
    const [groupLeader, setGroupLeader] = useState([]);
    const [submissions, setSubmission] = useState([]);

    const [computingCount, setComputingCount] = useState(0);
    const [buisnessCount, setBuisnessCount] = useState(0);
    const [engineeringCount, setEngineeringCount] = useState(0);
    const [errorText, setErrorText] = useState("");
    let [cMonthCount, setCMonthCount] = useState(0);
    let [eMonthCount, setEMonthCount] = useState(0);
    let [bMonthCount, setBMonthCount] = useState(0);

    useEffect(() => {
        getPanelData();
    }, []);

    async function getPanelData() {
        await axios({
            url: `http://localhost:8080/api/studentGroups`,
            method: "GET",
            headers: {Authorization: "Bearer " + getTokenFromLocalStorage()},
        })
            .then(async (res) => {
                console.log(res.data);
                await setGroupData(res.data.studentGroups);
                countGroupData(res.data.studentGroups);
            })
            .catch((err) => {
                showAlerts(2, err);
            });
    }

    function countGroupData(data) {
        let thisMonth = new Date().getMonth() + 1;
        console.log(thisMonth);
        let computing = 0;
        let cmonth = 0;
        let business = 0;
        let bmonth = 0;
        let engineering = 0;
        let emonth = 0;

        console.log(data);
        data.map((post) => {
            let createDate = new Date(post.created_date);
            let createMonth = createDate.getMonth() + 1;
            if (post.faculty === "Faculty of Computing") {
                if (thisMonth === createMonth) cmonth++;
                computing++;
            } else if (post.faculty === "Faculty of Engineering") {
                if (thisMonth === createMonth) emonth++;
                engineering++;
            } else {
                if (thisMonth === createMonth) bmonth++;
                business++;
            }
        });

        setEngineeringCount(engineering);
        setComputingCount(computing);
        setBuisnessCount(business);
        setEMonthCount(emonth);
        setBMonthCount(bmonth);
        setCMonthCount(cmonth);
        $("#groupTable").DataTable();
    }

    async function getOneGroup(groupID) {
        await axios({
            url: `http://localhost:8080/api/studentGroups/${groupID}`,
            method: "GET",
            headers: {Authorization: "Bearer " + getTokenFromLocalStorage()},
        })
            .then((res) => {
                console.log(res.data.studentGroup);
                setStudentGroup(res.data.studentGroup[0]);
                setSupervisor(res.data.studentGroup[0].supervisorDetails[0]);
                setCoSupervisor(res.data.studentGroup[0].coSupervisorDetails[0]);
                setGroupLeader(res.data.studentGroup[0].groupLeaderDetails[0]);
                setSubmission(res.data.studentGroup[0].submissionDetails);
                console.log(res.data.studentGroup[0].submissionDetails.length);
                setModalOpen(true);
            })
            .catch((err) => {
                showAlerts(2, err);
            });
    }

    function viewGroupDetails(data) {
        setModalOpen(true);
    }

    return (
        <div className="all-group-div">
            {/*<div className="row">*/}
            {/*  <div className="col-md-4">*/}
            {/*    <GroupSummary*/}
            {/*      monthlyReg={cMonthCount}*/}
            {/*      groupNum={computingCount}*/}
            {/*      faculty={"Faculty of Computing"}*/}
            {/*    />*/}
            {/*  </div>*/}
            {/*  <div className="col-md-4">*/}
            {/*    <GroupSummary*/}
            {/*      monthlyReg={eMonthCount}*/}
            {/*      groupNum={engineeringCount}*/}
            {/*      faculty={"Faculty of Engineering"}*/}
            {/*    />*/}
            {/*  </div>*/}
            {/*  <div className="col-md-4">*/}
            {/*    <GroupSummary*/}
            {/*      monthlyReg={bMonthCount}*/}
            {/*      groupNum={buisnessCount}*/}
            {/*      faculty={"Faculty of Buisness"}*/}
            {/*    />*/}
            {/*  </div>*/}
            {/*</div>*/}
            {/*<div className="col-md-12 all-group-table-div mt-5">*/}
            {/*  <div className="scrollbar">*/}
            {/*    <table*/}
            {/*      id="groupTable"*/}
            {/*      className="table table-bordered table-sm nowrap table-hover group-table"*/}
            {/*    >*/}
            {/*      <thead>*/}
            {/*        <tr>*/}
            {/*          <th>Group</th>*/}
            {/*          <th>Leader</th>*/}
            {/*          <th>Faculty</th>*/}
            {/*          <th>Contact</th>*/}
            {/*          /!* <th>Progress</th> *!/*/}
            {/*          <th>Action</th>*/}
            {/*        </tr>*/}
            {/*      </thead>*/}
            {/*      <tbody>*/}
            {/*        {groupData.map((group) => {*/}
            {/*          return (*/}
            {/*            <tr>*/}
            {/*              <td>{group.group_id}</td>*/}
            {/*              <td>{group?.groupLeaderDetails[0]?.name}</td>*/}
            {/*              <td>{group?.groupLeaderDetails[0]?.faculty}</td>*/}
            {/*              <td>{group?.groupLeaderDetails[0]?.phone_number}</td>*/}
            {/*              /!* <td>80%</td> *!/*/}
            {/*              <td>*/}
            {/*                <button*/}
            {/*                  className="btn"*/}
            {/*                  onClick={() => {*/}
            {/*                    getOneGroup(group._id);*/}
            {/*                  }}*/}
            {/*                >*/}
            {/*                  <img src="./../images/view.png" className="tableEdit" />*/}
            {/*                </button>*/}
            {/*              </td>*/}
            {/*            </tr>*/}
            {/*          );*/}
            {/*        })}*/}
            {/*      </tbody>*/}
            {/*    </table>*/}
            {/*  </div>*/}
            {/*</div>*/}
            {/*<br />*/}

            {/*/!*  Group details Modal*!/*/}
            {/*<Modal show={modalOpen} size="lg">*/}
            {/*  <Modal.Header>*/}
            {/*    <span> </span>*/}
            {/*    <button*/}
            {/*      type="button"*/}
            {/*      className="btn"*/}
            {/*      data-dismiss="modal"*/}
            {/*      aria-label="close"*/}
            {/*      onClick={() => {*/}
            {/*        setModalOpen(false);*/}
            {/*      }}*/}
            {/*    >*/}
            {/*      <span aria-hidden="true">&times;</span>*/}
            {/*    </button>*/}
            {/*  </Modal.Header>*/}

            {/*  <Modal.Body>*/}
            {/*    <div className="container modal-div">*/}
            {/*      <h2 className="head-topic">{studentGroup.group_id}</h2>*/}

            {/*      <h6 className="sub-topic">Faculty Of Computing</h6>*/}
            {/*      <h4 className="group-topic">Member Details</h4>*/}
            {/*      <div className="row">*/}
            {/*        <div className="col-md-7">*/}
            {/*          <h5>{`${groupLeader.name} (Leader)`}</h5>*/}
            {/*        </div>*/}
            {/*        <div className="col-md-5">*/}
            {/*          <h5>{groupLeader.student_id}</h5>*/}
            {/*        </div>*/}
            {/*        {studentGroup?.groupMembers?.map((member) => {*/}
            {/*          if (member.student_id !== groupLeader.student_id) {*/}
            {/*            return (*/}
            {/*              <>*/}
            {/*                <div className="col-md-7">*/}
            {/*                  <h5>{member.name}</h5>*/}
            {/*                </div>*/}
            {/*                <div className="col-md-5">*/}
            {/*                  <h5>{member.student_id}</h5>*/}
            {/*                </div>*/}
            {/*              </>*/}
            {/*            );*/}
            {/*          }*/}
            {/*        })}*/}
            {/*      </div>*/}
            {/*      <hr />*/}
            {/*      <h4 className="group-topic">Supervisor Details</h4>*/}

            {/*      <div className="row">*/}
            {/*        <div className="col-md-7">*/}
            {/*          <h5>{`${supervisor.first_name} ${supervisor.last_name}(Supervisor)`}</h5>*/}
            {/*        </div>*/}
            {/*        <div className="col-md-5">*/}
            {/*          <h5>{supervisor.email}</h5>*/}
            {/*        </div>*/}
            {/*        <div className="col-md-7">*/}
            {/*          <h5>{`${coSupervisor.first_name} ${coSupervisor.last_name} (Co-Supervisor)`}</h5>*/}
            {/*        </div>*/}
            {/*        <div className="col-md-5">*/}
            {/*          <h5>{coSupervisor.email}</h5>*/}
            {/*        </div>*/}
            {/*      </div>*/}
            {/*      <hr />*/}
            {/*      <h4 className="group-topic">Submissions Status</h4>*/}
            {/*      <div className="row">*/}
            {/*        {submissions?.length > 0 ? (*/}
            {/*          <div className="col-md-7">*/}
            {/*            <h5 className="completed-label">Completed</h5>*/}
            {/*          </div>*/}
            {/*        ) : (*/}
            {/*          <div className="col-md-7">*/}
            {/*            <h5 className="rejected-label">Rejected</h5>*/}
            {/*          </div>*/}
            {/*        )}*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*  </Modal.Body>*/}
            {/*</Modal>*/}
        </div>
    );
}

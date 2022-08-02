import React, {useEffect, useState} from "react";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import "../css/viewMarkingScheme.css";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {getTokenFromLocalStorage} from "../../external_components/tokenHandling";
import showAlerts from "../../external_components/sweetAlerts";
import ViewMoreMarkingSchemasModal from "../modals/viewMoreMarkingSchemas";
import Modal from "react-bootstrap/Modal";

export default function ViewMarkingScheme() {
    let navigate = useNavigate();
    const [markingSchemeList, setMarkingSchemeList] = useState([]);
    const [duplicateMarkingSchemeList, setDuplicateMarkingSchemeList] = useState(
        []
    );
    const [openModal, setOpenModal] = useState(false);
    const [distributionList, setDistributionList] = useState([]);
    const [error, setError] = useState("");
    useEffect(() => {
        function getMarkingSchemeList() {
            axios({
                url: `http://localhost:8080/api/markingSchemes/`,
                method: "GET",
                headers: {Authorization: "Bearer " + getTokenFromLocalStorage()},
            })
                .then((res) => {
                    setMarkingSchemeList(res.data.markingSchemeList);
                    setDuplicateMarkingSchemeList(res.data.markingSchemeList);
                    $("#groupTable").DataTable();
                })
                .catch((err) => {
                    showAlerts(2, "Something went wrong!");
                });
        }

        getMarkingSchemeList();
    }, []);

    async function getDistributionDetails(schemeId) {
        setError("");
        await axios({
            url: `http://localhost:8080/api/markingDistribution/${schemeId}`,
            method: "GET",
            headers: {Authorization: "Bearer " + getTokenFromLocalStorage()},
        }).then((res) => {
            if (res.data.markingDistributionList <= 0) {
                setError("Marking Distributions are currently empty!");
            }
            setDistributionList(res.data.markingDistributionList);
            setOpenModal(true);
        });
    }

    function filterByFaculty() {
        const faculty = document
            .getElementById("facultyDropdown")
            .value.toLowerCase();
        if (faculty === "select") {
            setMarkingSchemeList(duplicateMarkingSchemeList);
            return;
        }
        const result = duplicateMarkingSchemeList.filter((post) => {
            return post.faculty.toLowerCase().includes(faculty);
        });
        setMarkingSchemeList(result);
    }

    return (
        <div className="marking-scheme-div">
            <div className="top-div row mt-5 d-flex">
                <div className="col-md-12">
                    <div className="d-flex justify-content-center">
                        <div className="col-md-4">
                            <select
                                className="form-select"
                                aria-label="Default select example"
                                id="facultyDropdown"
                                onChange={filterByFaculty}
                            >
                                <option selected value="select">
                                    Select By Faculty
                                </option>
                                <option value="Faculty of Computing">
                                    Faculty of Computing
                                </option>
                                <option value="Faculty of Engineering">
                                    Faculty of Engineering
                                </option>
                                <option value="Faculty of Business">Faculty of Business</option>
                            </select>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="btn createbtn mt-4 float-end"
                        onClick={() => navigate("/createMarkingScheme")}
                    >
                        + Create Marking Scheme
                    </button>
                </div>
            </div>
            <div className="col-md-12 marking-scheme-table-div mt-5">
                <div className="scrollbar">
                    <table
                        id="groupTable"
                        className="table table-bordered table-sm nowrap table-hover marking-scheme-table"
                    >
                        <thead>
                        <tr>
                            <th>Marking Scheme Name</th>
                            <th>Total Marks</th>
                            <th>Faculty</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {markingSchemeList.map((markingScheme) => {
                            return (
                                <tr>
                                    <td>{markingScheme.name}</td>
                                    <td>{markingScheme.total_marks}</td>
                                    <td>{markingScheme.faculty}</td>

                                    <td>
                                        <button
                                            className="btn"
                                            onClick={() =>
                                                navigate(`/editMarkingScheme/${markingScheme._id}`)
                                            }
                                        >
                                            <img
                                                src="./../images/editing.png"
                                                className="tableEdit"
                                            />
                                        </button>
                                        <button
                                            className="btn"
                                            onClick={async () => {
                                                await getDistributionDetails(markingScheme._id);
                                            }}
                                        >
                                            <img src="./../images/view.png" className="tableEdit"/>
                                        </button>
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
                                                        <h1 className="proposal-title ">
                                                            {" "}
                                                            View More Marking Scheme{" "}
                                                        </h1>

                                                        <table className="table border border-dark text-center">
                                                            <thead>
                                                            <tr>
                                                                <th scope="col">No</th>
                                                                <th scope="col">Criteria</th>
                                                                <th scope="col">Marks</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            {distributionList.map((post, i) => {
                                                                return (
                                                                    <tr>
                                                                        <td>{i + 1}</td>
                                                                        <td>{post.criteria}</td>
                                                                        <td>{post.mark}</td>
                                                                    </tr>
                                                                );
                                                            })}
                                                            </tbody>
                                                        </table>
                                                        <h6 className="text-danger text-center">
                                                            {error}
                                                        </h6>
                                                        <h2 className="totalMarks marks-area">
                                                            Total Marks
                                                        </h2>
                                                        <h2 className="marks marks-area">
                                                            {markingScheme.total_marks}
                                                        </h2>
                                                    </div>
                                                </Modal.Body>
                                            </Modal>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
            <br/>
        </div>
    );
}

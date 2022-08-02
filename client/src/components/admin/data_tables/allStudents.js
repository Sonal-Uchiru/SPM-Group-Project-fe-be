import React, {useState, useEffect} from "react";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import "../css/allUserTable.css";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import showAlerts from "../../external_components/sweetAlerts";
import "../css/updateStaffModal.css";
import Swal from "sweetalert2";
import {uploadFile} from "../../../firebase/uploadFile";
import {getTokenFromLocalStorage} from "../../external_components/tokenHandling";

export default function AllStudents() {
    let [modalOpen, setModalOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [updateStudetID, setUpdateStudentID] = useState("");
    const [updateName, setUpdateName] = useState("");
    const [updateEmail, setUpdateEmail] = useState("");
    const [updatePhone, setUpdatePhone] = useState("");
    const [updateFaculty, setUpdateFaculty] = useState("");
    const [updateDegree, setUpdateDegree] = useState("");
    const [id, setID] = useState("");
    const [imgData, setImgData] = useState("");
    const [picture, setPicture] = useState("");
    let [moviePlaceHolder, setMoviePlaceHolder] = useState(true);
    const [faculty, setFaculty] = useState("");
    let [subType, setSubType] = useState([]);
    const faculties = [
        "Faculty of Computing",
        "Faculty of Engineering",
        "Faculty of Business",
    ];
    const computing = [
        "B.Sc (Hons) Information Technology (SLIIT)",
        "B.Sc (Hons) Information Technology (SLIIT)/ Cyber Security",
        " B.Sc (Hons) Information Technology (SLIIT)/ Software\n" + "Engineering",
        "B.Sc (Hons) Information Technology (SLIIT)/Interactive Media",
        "B.Sc (Hons) Information Technology (SLIIT)/Data Science",
    ];
    const engineering = [
        "B.Sc (Hons) Engineering (SLIIT)/Civil Engineering",
        "B.Sc (Hons) Engineering (SLIIT)/Mechanical Engineering",
        "B.Sc (Hons) Engineering (SLIIT)/Mechatronics Engineering",
        "B.Sc (Hons) Engineering (SLIIT)/Materials Engineering",
    ];
    const business = [
        "BBA (Hons) Business Management(SLIIT)/Accounting & Finance",
        "BBA (Hons) Business Management(SLIIT)/Business Analytics",
        "BBA (Hons) Business Management(SLIIT)/Business Management",
        "BBA (Hons) Business Management(SLIIT)/Marketing Management",
        "BBA (Hons) Business Management(SLIIT)/Quality Management",
    ];

    let token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjkyM2ZmMmY3M2Q2MWFlZWVmYjIxNWEiLCJpYXQiOjE2NTM3NTE5NDMsImV4cCI6MTY1NDM1Njc0M30.r1B_e2TCjXRqymh5plYypl4YBUtBBqgY0YfouUxySAA";

    const [allStudents, setAllStudents] = useState([]);
    const [degree_program, setDegreeProgram] = useState("");
    const [loadingStatus, setLoadingStatus] = useState(true);

    function displayModal() {
        setModalOpen(true);
    }

    useEffect(() => {
        getStudentData();
    }, []);

    async function getStudentData() {
        await axios({
            url: `http://localhost:8080/api/students/get`,
            method: "GET",
            headers: {Authorization: `Bearer ${token}`},
        })
            .then(async (res) => {
                console.log(res.data.student);
                await setAllStudents(res.data.student);
                $("#studentTable").DataTable();
            })
            .catch((err) => {
                showAlerts(2, err);
            });
    }

    const onChangePicture = (e) => {
        if (e.target.files[0]) {
            setMoviePlaceHolder(true);
            setPicture(e.target.files);
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImgData(reader.result);
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    function updateStudentModalOpen(data) {
        setUpdateStudentID(data.student_id);
        setUpdateName(data.name);
        setUpdateEmail(data.email);
        setUpdatePhone(data.phone_number);
        setUpdateFaculty(data.faculty);
        setImgData(data.profile_image_url);
        setUpdateDegree(data.degree_program);
        setID(data._id);
        setOpenModal(true);
        console.log(data);
    }

    function displayFiles() {
        document.getElementById("fileSelection").click();
    }

    function assignSubFaculty(e) {
        setFaculty(e.target.value);
        let type = e.target.value;

        if (type === "Faculty of Computing") {
            setSubType(computing);
        } else if (type === "Faculty of Engineering") {
            setSubType(engineering);
        } else {
            setSubType(business);
        }
    }

    async function updateStudentProfile(id) {
        // console.log(id)
        setLoadingStatus(false);
        if (inputValidation()) {
            setLoadingStatus(true);
            return false;
        }
        await Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`,
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                if (picture) {
                    uploadFile(picture, "StaffProfile(images)")
                        .then(async (res) => {
                            await updateDB(res, id);
                        })
                        .catch(async (err) => {
                            await showAlerts(2, "Something went wrong!");
                        });
                    return;
                }
                await updateDB(null, id);
            } else if (result.isDenied) {
                await Swal.fire("Changes are not saved", "", "info");
                setLoadingStatus(false);
            }
        });
    }

    function inputValidation() {
        let firstname = document.getElementById("firstname").value;
        let studentID = document.getElementById("studentID").value;
        let email = document.getElementById("email").value;
        let phone = document.getElementById("Mobile").value;

        if (firstname.length === 0) {
            Swal.fire("Student Name is required");
            return true;
        }

        if (studentID.length === 0) {
            Swal.fire("Student ID is required");
            return true;
        }

        if (email.length === 0) {
            Swal.fire("Email is required");
            return true;
        }

        if (phone.length === 0) {
            Swal.fire("Phone Number is required");
            return true;
        } else if (phone.length !== 10) {
            Swal.fire("Phone Number must be 10 digit");
            return true;
        }
    }

    async function updateDB(imageUrl, id) {
        if (!imageUrl) {
            imageUrl = imgData;
        }

        const content = {
            name: document.getElementById("firstname").value,
            student_id: document.getElementById("studentID").value,
            phone_number: document.getElementById("Mobile").value,
            email: document.getElementById("email").value,
            faculty: document.getElementById("faculty").value,
            degree_program: document.getElementById("degree_program").value,
            profile_image_url: imageUrl,
        };

        console.log(content);
        await axios({
            url: "http://localhost:8080/api/students/" + id,
            method: "PUT",
            data: content,
            headers: {
                Authorization: "Bearer " + getTokenFromLocalStorage(),
            },
        })
            .then(async (res) => {
                await Swal.fire("Successfully Updated!", "", "success");
                window.location.reload();
            })
            .catch(async (err) => {
                await showAlerts(2, "Something went wrong!");
            });
        setLoadingStatus(true);
    }

    async function deleteStudentMember(id) {
        axios({
            url: "http://localhost:8080/api/students/" + id,
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + getTokenFromLocalStorage(),
            },
        })
            .then(async (res) => {
                await Swal.fire("Successfully Deleted!", "", "success");
                window.location.reload();
            })
            .catch(async (err) => {
                await showAlerts(2, "Something went wrong!");
            });
    }

    return (
        <div className="all-user-table">
            <div className="col-md-12 student-table-div">
                <div className="scrollbar">
                    <table
                        id="studentTable"
                        className="table table-bordered table-sm nowrap table-hover student-table"
                    >
                        <thead>
                        <tr>
                            <th>User Profile</th>
                            <th>Student ID</th>
                            <th>Full Name</th>
                            <th>Faculty</th>
                            <th>Degree Program</th>
                            <th>Contact</th>
                            {/*<th>Group</th>*/}
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {allStudents.map((student) => {
                            return (
                                <tr>
                                    <td>
                                        <img
                                            src={student.profile_image_url}
                                            className="tableImg"
                                        />
                                    </td>
                                    <td>{student.student_id}</td>
                                    <td>{student.name}</td>
                                    <td>{student.faculty}</td>
                                    <td>{student.degree_program}</td>
                                    <td>{student.phone_number}</td>
                                    {/*<td>{student.group_id}</td>*/}
                                    <td>
                                        <img
                                            src="./../images/editing.png"
                                            onClick={() => updateStudentModalOpen(student)}
                                            className="tableEdit"
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
            <br/>

            {/*  Modal*/}

            <Modal show={openModal}>
                <Modal.Header>
                    <div className="row">
                        <h4 className="main-topic">Update Student</h4>
                    </div>
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
                    <div className="update-staff container">
                        <div className="container">
                            <div className="col-md-12 d-flex justify-content-center">
                <span>
                  <img
                      src={imgData}
                      className="user-img rounded-circle"
                      alt="userImg"
                      hidden={!moviePlaceHolder}
                  />
                  <img
                      src="./../images/editing.png"
                      className="edit-img"
                      onClick={() => displayFiles()}
                      alt="userImg"
                  />
                </span>
                                <input
                                    type="file"
                                    id="fileSelection"
                                    className="d-none"
                                    onChange={onChangePicture}
                                />
                            </div>
                            <div className="row mb-3 mt-3">
                                <div className="col-md-12 mb-3">
                                    <label className="form-label">Name</label>
                                    <input
                                        placeholder="Student Name"
                                        id="firstname"
                                        type="text"
                                        name="firstname"
                                        className="form-control"
                                        Value={updateName}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Student ID</label>
                                    <input
                                        placeholder="SLIIT ID"
                                        id="studentID"
                                        type="text"
                                        name="email"
                                        className="form-control"
                                        Value={updateStudetID}
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        placeholder="SLIIT Email"
                                        id="email"
                                        type="text"
                                        name="email"
                                        className="form-control"
                                        Value={updateEmail}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-12">
                                    <label className="form-label">Phone Number</label>
                                    <input
                                        placeholder="076521xxx"
                                        id="Mobile"
                                        type="text"
                                        name="contact"
                                        className="form-control"
                                        Value={updatePhone}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-12">
                                    <label className="form-label">Faculty</label>
                                    <select
                                        className="form-select"
                                        aria-label=".form-select-lg example"
                                        id="faculty"
                                        onChange={(e) => {
                                            assignSubFaculty(e);
                                        }}
                                    >
                                        <option value={updateFaculty} selected disabled>
                                            {updateFaculty}
                                        </option>
                                        <option value="Faculty of Computing">
                                            Faculty of Computing
                                        </option>
                                        <option value="Faculty of Engineering">
                                            Faculty of Engineering
                                        </option>
                                        <option value="Faculty of Business">
                                            Faculty of Business
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <label className="form-label" id="faculty">
                                        {" "}
                                        Degree Program{" "}
                                    </label>
                                    <select
                                        className="form-select mb-3"
                                        aria-label=".form-select-lg example"
                                        id="degree_program"
                                        onChange={(e) => {
                                            setDegreeProgram(e.target.value);
                                        }}
                                    >
                                        <option selected disabled value={updateDegree}>
                                            {updateDegree}
                                        </option>
                                        {subType.map((post) => {
                                            return <option value={post}>{post}</option>;
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <div className="row d-flex justify-content-end buttns">
                    <button
                        className="btn update-btn  mt-3 "
                        onClick={() => {
                            updateStudentProfile(id);
                        }}
                    >
                        Update
                    </button>
                    <button
                        className="btn delete-btn  mt-3"
                        onClick={() => {
                            deleteStudentMember(id);
                        }}
                    >
                        Delete
                    </button>
                </div>
            </Modal>
        </div>
    );
}

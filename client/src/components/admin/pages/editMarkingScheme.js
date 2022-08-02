import React, {useEffect, useState} from "react";
import "../css/editMarkingScheme.css";
import showAlerts from "../../external_components/sweetAlerts";
import axios from "axios";
import {getTokenFromLocalStorage} from "../../external_components/tokenHandling";
import Swal from "sweetalert2";
import {useLocation, useNavigate} from 'react-router-dom'

function EditMarkingScheme() {

    let navigate = useNavigate()
    const [name, setName] = useState("");
    const [totalMarks, setTotalMarks] = useState(100);
    let faculty = "";

    const [marksList, setMarksList] = useState([]);

    const [marks, setMarks] = useState(0);
    const [tempMarksList, setTempMarksList] = useState([]);

    let location = useLocation()

    useEffect(() => {

        function getMarkingScheme() {
            axios({
                url: `http://localhost:8080/api/markingSchemes/${location.pathname.substring(19)}`,
                method: "GET",
                headers: {
                    Authorization: "Bearer " + getTokenFromLocalStorage(),
                },
            })
                .then((res) => {
                    setName(res.data.markingScheme[0].name);
                    setTotalMarks(res.data.markingScheme[0].total_marks);
                    setMarks(res.data.markingScheme[0].total_marks);
                    document.getElementById("InputFaculty").value =
                        res.data.markingScheme[0].faculty;
                    setMarksList(res.data.markingScheme[0].distributionList);
                    setTempMarksList(res.data.markingScheme[0].distributionList);
                })
                .catch(async (err) => {
                    await showAlerts(2, "Something went wrong!");
                });
        }

        getMarkingScheme();
    }, []);

    async function saveMarkingScheme(e) {
        e.preventDefault();

        if (!validateFaculty()) {
            await showAlerts(2, "Select a Faculty");
            return;
        }

        if (!validateTotalMark()) {
            await showAlerts(
                2,
                "Total Marks must be equal to all the distribution marks"
            );
        }
        Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`,
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const data = {
                    name,
                    faculty: document.getElementById("InputFaculty").value,
                    total_marks: totalMarks,
                };
                await axios({
                    url: `http://localhost:8080/api/markingSchemes/${location.pathname.substring(19)}`,
                    method: "PUT",
                    data,
                    headers: {
                        Authorization: "Bearer " + getTokenFromLocalStorage(),
                    },
                })
                    .then(async (res) => {
                        await saveMarkingDistributions(location.pathname.substring(19));
                        navigate('/allMarkingScheme')
                    })
                    .catch(async (err) => {
                        await showAlerts(2, "Something went wrong!");
                    });
            } else if (result.isDenied) {
                await Swal.fire("Changes are not saved", "", "info");
            }
        });
    }

    async function saveMarkingDistributions(marking_scheme_id) {
        marksList.map(async (mark, index) => {
            const data = {
                criteria: document.getElementById(`InputCriteria${index}`).value,
                mark: document.getElementById(`InputMark${index}`).value,
                marking_scheme_id,
            };

            await axios({
                url: `http://localhost:8080/api/markingDistribution/${mark._id}`,
                method: "PUT",
                data,
                headers: {
                    Authorization: "Bearer " + getTokenFromLocalStorage(),
                },
            });
        });

        await showAlerts(1, "Marking Scheme updated Successfully!");
    }

    function validateFaculty() {
        faculty = document.getElementById("InputFaculty").value;
        if (faculty !== "Select the Faculty") {
            return true;
        }
    }

    function createNewField() {
        let mark = {
            index: tempMarksList.length,
            criteria: "",
            mark: 0,
        };
        tempMarksList.push(mark);
        setMarksList(tempMarksList);
        setTempMarksList(marksList);
    }

    function removeField(id) {
        const result = tempMarksList.filter((mark, index) => mark.index !== id);
        setMarksList(result);
        setTempMarksList(marksList);
    }

    function calculateMarks() {
        let tempMark = 0;
        marksList.map((mark, index) => {
            tempMark += Number(document.getElementById(`InputMark${index}`).value);
        });
        setMarks(tempMark);
    }

    function validateTotalMark() {
        return totalMarks === marks;
    }

    async function deleteMarkingScheme() {
        await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios({
                    url: `http://localhost:8080/api/markingSchemes/${location.pathname.substring(19)}`,
                    method: 'DELETE',
                    headers: {
                        Authorization: "Bearer " + getTokenFromLocalStorage(),
                    },
                }).then(async () => {
                    await deleteDistribution()
                    navigate('/allMarkingScheme')

                }).catch(async (err) => {
                    await showAlerts(2, "Something went wrong!")
                })
            }
        });
    }

    async function deleteDistribution() {
        marksList.map(async (mark) => {
            await axios({
                url: `http://localhost:8080/api/markingDistribution/${mark._id}`,
                method: "DELETE",
                headers: {
                    Authorization: "Bearer " + getTokenFromLocalStorage(),
                },
            })

        })
        await Swal.fire("Deleted!", "Your file has been deleted.", "success");
    }

    return (
        <div>
            <div className="edit-marking-scheme">
                <div className="top-div mb-4 shadow">
                    <div className="box">
                        <img
                            src="./../images/markingScheme.png"
                            className="profile-header-img"
                            alt="submissionHeaderImg"
                        />
                    </div>
                    <div className="profile-header">
                        <h1 className="profile-name">Edit a Marking Scheme</h1>
                    </div>
                </div>

                <div className="row align-items-start ms-3 me-3">
                    <div className="col">
                        <form onSubmit={saveMarkingScheme}>
                            <div className="form-group">
                                <label htmlFor="InputMarkingSchemeName">
                                    <b>Marking Scheme Name</b>
                                </label>
                                <input
                                    type="text"
                                    className="form-control mt-2 inputFields"
                                    id="InputMarkingSchemeName"
                                    placeholder="Enter Marking Scheme Name"
                                    required
                                    Value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="InputFaculty">
                                    <b>Faculty</b>
                                </label>
                                <select
                                    id="InputFaculty"
                                    className="form-select mt-2 custom-select"
                                    aria-label="Default select example"
                                    required
                                >
                                    <option selected value={null}>
                                        Select the Faculty
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
                            <div className="form-group mt-3">
                                <label htmlFor="InputTotalMarks">
                                    <b>Total Marks</b>
                                </label>
                                <input
                                    type="text"
                                    className="form-control mt-2 inputFields"
                                    id="InputTotalMarks"
                                    placeholder="Enter the Total Mark"
                                    required
                                    Value={totalMarks}
                                    onChange={(e) => {
                                        setTotalMarks(Number(e.target.value));
                                    }}
                                />
                            </div>
                            <br/>
                            <h4 className="sub-header">
                                <b>
                                    <u>Marking Distribution</u>
                                </b>
                            </h4>
                            <br/>
                            {/*marking distribution */}
                            {marksList.map((mark, index) => {
                                return (
                                    <div id={`container${index}`} className="sub-container mt-3">
                                        <div className="row align-items-start">
                                            <div className="col">
                                                <div className="form-group">
                                                    <label htmlFor="InputCriteria">
                                                        <b>Criteria</b>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id={`InputCriteria${index}`}
                                                        className="form-control mt-2 inputFields"
                                                        placeholder="Enter the Criteria"
                                                        Value={mark.criteria}
                                                        onChange={(e) => {
                                                            mark.criteria = e.target.value;
                                                        }}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="form-group">
                                                    <label htmlFor="InputMark">
                                                        <b>Mark</b>
                                                    </label>
                                                    <input
                                                        type="number"
                                                        id={`InputMark${index}`}
                                                        className="form-control mt-2 inputFields"
                                                        placeholder="Allocated Mark"
                                                        Value={mark.mark}
                                                        onChange={calculateMarks}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col mt-4">
                                                <button
                                                    type="button"
                                                    className="removeBtn"
                                                    onClick={() => removeField(index)}
                                                >
                                                    <img
                                                        src="./../images/remove.png"
                                                        alt="removeIcon"
                                                        className="removeIcon"
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                            {/************/}
                            <br/>
                            <div className="container">
                                <h2 className="d-inline sub-header">Total Marks</h2>
                                <h2 className="float-end sub-header">
                                    <u>{marks}</u>
                                </h2>
                                <br/>
                                <br/>
                                <h2 className="float-end sub-header total-marks-txt">
                                    {totalMarks}
                                </h2>
                            </div>
                            <div className="mt-4 mb-4">
                                <button
                                    type="button"
                                    className="btn form-custom-btn"
                                    onClick={createNewField}
                                >
                                    Create New Field
                                </button>

                                <button
                                    type="submit"
                                    className="btn form-custom-btn save-custom-btn ms-2"
                                >
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger save-custom-btn mb-2"
                                    onClick={deleteMarkingScheme}
                                >
                                    Delete
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditMarkingScheme;

import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { protectedApi } from "../../../api/protectedApi";
import { ErrorAlert } from "../../../sweet_alerts/error";
import { SuccessAlert } from "../../../sweet_alerts/success";
import "./editJob.css";

export default function EditJob(props) {
  const jobContent = props.content;
  const [position, setPosition] = useState("");
  const [developmentArea, setDevelopmentArea] = useState("");
  const [jobType, setJobType] = useState("");
  const [roleOverview, setRoleOverview] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [requirements, setRequirements] = useState("");
  const [otherRequirements, setOtherRequirements] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    assignData();
  }, []);

  function assignData() {
    console.log(jobContent.position);
    setPosition(jobContent.position);
    setDevelopmentArea(jobContent.developmentArea);
    setJobType(jobContent.jobType);
    setRoleOverview(jobContent.roleOverview);
    setResponsibilities(jobContent.responsibilities);
    setRequirements(jobContent.requirements);
    setOtherRequirements(jobContent.otherRequirements);
    setStatus(jobContent.status);
  }

  async function editJob(e) {
    e.preventDefault();

    const jobData = {
      position: position,
      developmentArea: developmentArea,
      jobType: jobType,
      roleOverview: roleOverview,
      responsibilities: responsibilities,
      requirements: requirements,
      otherRequirements: otherRequirements,
      status: status,
    };
    try {
      const response = await protectedApi(
        "PUT",
        `jobs/${jobContent._id}`,
        jobData
      );
      SuccessAlert("Job updated successfully");
      props.editFunction();
    } catch (e) {
      console.log(e);
      ErrorAlert(e);
    }
  }

  async function changeStatus() {
    if (status == 1) {
      setStatus(2);
    } else {
      setStatus(1);
    }
  }
  return (
    <div className="editJob">
      <div className="">
        <Modal.Body>
          <div className="edit-job">
            <div className="container">
              <div className="row">
                <div className="logo">
                  <img
                    src="https://www.ifs.com/-/media10/project/ifs/ifs/images/homepage/ifs-logo-2021-background.jpg"
                    alt="company logo"
                    className="rounded company-logo"
                  />
                </div>
              </div>
              <br />
            </div>

            <div>
              <h3 className="blue-text-color ms-2">Job Details</h3>
              <form
                className="ms-4 me-4 editJobForm"
                onSubmit={(e) => {
                  editJob(e);
                }}
              >
                <div className="mb-2">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    <b>
                      Position
                      <mark className="required-icon">*</mark>
                    </b>
                  </label>
                  <input
                    type="text"
                    className="form-control custom-input-fields"
                    placeholder="Position"
                    id="position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-2">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    <b>
                      Development Area
                      <mark className="required-icon">*</mark>
                    </b>
                  </label>
                  <input
                    type="text"
                    className="form-control custom-input-fields"
                    id="developmentArea"
                    placeholder="Development Area"
                    value={developmentArea}
                    onChange={(e) => setDevelopmentArea(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-2">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    <b>
                      Job Type
                      <mark className="required-icon">*</mark>
                    </b>
                  </label>
                  <select
                    className="form-select custom-input-fields"
                    aria-label="Default select example"
                    onChange={(e) => setJobType(e.target.value)}
                    required
                  >
                    <option selected value={jobType}>
                      Full Time
                    </option>
                    <option value="Full time">Full Time</option>
                    <option value="Part time">Part Time</option>
                  </select>
                </div>

                <div className="mb-2">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    <b>
                      Role Overview
                      <mark className="required-icon">*</mark>
                    </b>
                  </label>
                  <textarea
                    className="form-control"
                    id="roleOverview"
                    rows="2"
                    placeholder="Role Overview"
                    value={roleOverview}
                    onChange={(e) => setRoleOverview(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-2">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    <b>
                      Responsibilities
                      <mark className="required-icon">*</mark>
                    </b>
                  </label>
                  <textarea
                    className="form-control"
                    id="responsibilities"
                    rows="2"
                    placeholder="Responsibilities"
                    value={responsibilities}
                    onChange={(e) => setResponsibilities(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-2">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    <b>
                      Requirements
                      <mark className="required-icon">*</mark>
                    </b>
                  </label>
                  <textarea
                    className="form-control"
                    id="requirements"
                    rows="2"
                    placeholder="Requirements"
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-2">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    <b>
                      Other Requirements
                      <mark className="required-icon">*</mark>
                    </b>
                  </label>
                  <textarea
                    className="form-control"
                    id="otherRequirements"
                    rows="2"
                    placeholder="Other Requirements"
                    value={otherRequirements}
                    onChange={(e) => setOtherRequirements(e.target.value)}
                  />
                </div>

                <div className="text-center mt-3">
                  <label class="switch">
                    {status == "1" ? (
                      <input
                        type="checkbox"
                        onClick={() => changeStatus()}
                        checked="checked"
                      />
                    ) : (
                      <input
                        type="checkbox"
                        onClick={(e) => {
                          changeStatus();
                        }}
                      />
                    )}
                    <span class="slider round" />
                  </label>
                  <p className="status">Actively Recurting ?</p>
                </div>
                <div className="text-center mt-3">
                  <div className="btn-group me-2">
                    <button
                      type="submit"
                      className="btn btn-primary saveButton"
                    >
                      Save Changes
                    </button>
                  </div>
                  <div className="btn-group me-2">
                    <button
                      type="button"
                      className="btn btn-primary cancelButton"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
      </div>
    </div>
  );
}

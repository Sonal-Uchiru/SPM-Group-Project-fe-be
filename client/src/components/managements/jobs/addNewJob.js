import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { protectedApi } from "../../../api/protectedApi";
import "./addNewJob.css";
import { SuccessAlert } from "../../../sweet_alerts/success";
import { ErrorAlert } from "../../../sweet_alerts/error";

export default function AddNewJob(props) {
  const [position, setPosition] = useState("");
  const [developmentArea, setDevelopmentArea] = useState("");
  const [jobType, setJobType] = useState("");
  const [roleOverview, setRoleOverview] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [requirements, setRequirements] = useState("");
  const [otherRequirements, setOtherRequirements] = useState("");
  const [openModal, setOpenModal] = useState(props.modalStatus);

  async function createJob(e) {
    e.preventDefault();

    const jobData = {
      position: position,
      developmentArea: developmentArea,
      jobType: jobType,
      roleOverview: roleOverview,
      responsibilities: responsibilities,
      requirements: requirements,
      otherRequirements: otherRequirements,
      //   companyId: "62f9e742d06c6643a5f74e65",
    };
    try {
      const response = await protectedApi("POST", "jobs", jobData);
      if (response.status == 201) {
        SuccessAlert("Job added successfully");
        props.addedFunction();
      } else {
        ErrorAlert("Something went wrong");
      }
    } catch (e) {
      ErrorAlert(e);
    }
  }

  return (
    <div className="addNewJob">
      <div className="">
        <Modal.Body>
          <div className="add-new-job">
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
                className="ms-4 me-4 addNewJobForm"
                onSubmit={(e) => createJob(e)}
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
                    id="position"
                    placeholder="Position"
                    onChange={(e) => {
                      setPosition(e.target.value);
                    }}
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
                    onChange={(e) => {
                      setDevelopmentArea(e.target.value);
                    }}
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
                    onChange={(e) => {
                      setJobType(e.target.value);
                    }}
                    required
                  >
                    <option selected value="Full time">
                      Full Time
                    </option>
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
                    onChange={(e) => {
                      setRoleOverview(e.target.value);
                    }}
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
                    onChange={(e) => {
                      setResponsibilities(e.target.value);
                    }}
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
                    onChange={(e) => {
                      setRequirements(e.target.value);
                    }}
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
                    onChange={(e) => {
                      setOtherRequirements(e.target.value);
                    }}
                  />
                </div>

                <div className="text-center mt-3">
                  <Button type="submit" className="btn btn-success">
                    Create Job
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import "../css/viewAllJobsCompany.css";
import AllJobsCardCompany from "../cards/allJobsCardCompany";
import AddNewJob from "../../jobs/addNewJob";
import { protectedApi } from "../../../../api/protectedApi";

export default function ViewAllJobsCompany() {
  const [openModal, setOpenModal] = useState(false);
  const [jobsArray, setJobdArray] = useState([]);
  useEffect(() => {
    getAllJobs();
  }, []);

  function createJob() {
    setOpenModal(true);
  }

  async function getAllJobs() {
    const content = await protectedApi("GET", "jobs", "");
    console.log(content.data);
    setJobdArray(content.data);
  }

  function uponAdded() {
    setOpenModal(false);
    getAllJobs();
  }

  return (
    <div className="viewAllJobsCompany">
      <div className="searchBar text-center container">
        <form className="form-inline">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search Applied Jobs"
            aria-label="Search"
          />
          <span className="p-viewer">
            <img
              src="./images/search (3).png"
              className="searchIcon"
              alt="search_icon"
            />
          </span>
        </form>
      </div>
      <br />
      <div className="container">
        <div className="btn-group me-2 btns">
          <button
            type="button"
            className="btn btn-primary createJobButton"
            onClick={createJob}
          >
            <i className="fa fa-plus-circle" />
            Create Job
          </button>
        </div>
        <div className="btn-group me-2 btns">
          <button
            type="button"
            className="btn btn-primary downloadReportButton"
          >
            <i className="fa fa-download" />
            Download Report
          </button>
        </div>
        <br />
        <br />
      </div>

      <div className="pageBody">
        {jobsArray.map((post) => {
          return <AllJobsCardCompany content={post} />;
        })}
      </div>

      <Modal show={openModal} size="lg">
        <Modal.Header>
          <div>
            <h4 className="ms-4 modal-title">
              <b>Create New Job </b>
            </h4>
          </div>
          <button
            type="button"
            className="btn"
            data-dismiss="modal"
            aria-label="Close"
            onClick={() => {
              setOpenModal(false);
            }}
          >
            <span aria-hidden="true">
              <b>&times;</b>
            </span>
          </button>
        </Modal.Header>
        <AddNewJob addedFunction={uponAdded} />
      </Modal>
    </div>
  );
}

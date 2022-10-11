import React, {useState, useEffect} from "react";
import {Modal} from "react-bootstrap";
import "../css/viewAllJobsCompany.css";
import AllJobsCardCompany from "../cards/allJobsCardCompany";
import AddNewJob from "../modals/addNewJob";
import Loading from "../../../external_components/spinners/loading";
import {getAllJobsByToken} from "../../../../api/managements/jobApi";
import {useNavigate} from "react-router";
import {App_Routes} from "../../../../constant/appRoutes";
import {getTokenFromLocalStorage} from "../../../authentication/tokenHandling";

export default function ViewAllJobsCompany() {
  const [openModal, setOpenModal] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [jobsArray, setJobsArray] = useState([]);
  const [duplicateJobsArray, setDuplicateJobsArray] = useState([]);
  const [errorText, setErrorText] = useState("");
  const navigate = useNavigate();

  useEffect(async () => {
    await getAllJobs();
  }, []);

  function createJob() {
    setOpenModal(true);
  }

  async function getAllJobs() {
    const content = await getAllJobsByToken();
    setJobsArray(content.data);
    setDuplicateJobsArray(content.data);
    if (!content.data.length) {
      setErrorText("No jobs available");
    } else {
      setErrorText("");
    }

    setLoadingStatus(false);
  }

  function onCrud() {
    setOpenModal(false);
    getAllJobs();
  }

  function handleSearch(userIn) {
    if (!duplicateJobsArray.length) return;

    setLoadingStatus(true);
    const result = duplicateJobsArray.filter((job) =>
      job.position.toLowerCase().includes(userIn.toLowerCase())
    );
    if (result.length > 0) {
      setJobsArray(result);
      setErrorText("");
    } else {
      setJobsArray(result);
      setErrorText(`No Jobs by name ${userIn}`);
    }
    setLoadingStatus(false);
  }

  return (
    <div className="viewAllJobsCompany">
      <div className="searchBar text-center container">
        <form className="form-inline">
          <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search Jobs"
              aria-label="Search"
              onChange={(e) => handleSearch(e.target.value)}
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
              onClick={() => navigate(App_Routes.JOB_LIST_REPORT)}
          >
            <i className="fa fa-download"/>
            View Report
          </button>
        </div>
        <br />
        <br />
      </div>
      {loadingStatus && <Loading />}
      <div className="pageBody">
        <center>
          <h4 class="text-danger mb-5">{errorText}</h4>
        </center>
        {jobsArray.map((post) => {
          return (
            <AllJobsCardCompany
              key={post._id}
              changeFunction={onCrud}
              content={post}
            />
          );
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
        <AddNewJob addedFunction={onCrud} />
      </Modal>
    </div>
  );
}

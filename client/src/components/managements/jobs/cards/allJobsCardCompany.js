import React, { useEffect, useState } from "react";
import "../css/allJobsCardCompany.css";
import { Modal } from "react-bootstrap";
import EditJob from "../modals/editJob";
import { SuccessAlert } from "../../../../sweet_alerts/success";
import { ErrorAlert } from "../../../../sweet_alerts/error";
import {
  deleteJob,
  getCompanyDataForJob,
  getJobsApplicants,
} from "../../../../api/managements/jobApi";
import { getAppliedJobApplicationsByJobId } from "../../../../api/managements/jobApplicationApi";
import { useNavigate } from "react-router";
import { App_Routes } from "../../../../constant/appRoutes";
import { DeleteConfirm } from "../../../../sweet_alerts/deleteConfirm";

export default function AllJobsCardCompany(props) {
  const jobContent = props.content;
  const [step1, setStep1] = useState(false);
  const [step2, setStep2] = useState(true);
  const [applicants, setApplicants] = useState("");
  const [image, setImage] = useState("");
  const [openModal, setOpenModal] = useState(props.modalStatus);
  const navigate = useNavigate();

  useEffect(async () => {
    //Change this route to correct one
    await getJobApplicants();
    await getCompanyData();
  }, []);

  async function getJobApplicants() {
    const response = await getAppliedJobApplicationsByJobId(jobContent._id);
    setApplicants(response.data.content.length);
  }

  async function getCompanyData() {
    const content = await getCompanyDataForJob();
    content.data.logo
      ? setImage(content.data.logo)
      : setImage("./images/user (8).png");
  }

  async function deleteSelectedJob() {
    try {
      if (!(await DeleteConfirm())) return;

      const content = await deleteJob(jobContent._id);
      if (content) {
        await SuccessAlert("Job Deleted Successfully");
      }
    } catch (e) {
      ErrorAlert(e);
    }
    props.changeFunction();
  }

  function editedFunction() {
    setOpenModal(false);
    props.changeFunction();
  }
  function editJob() {
    setOpenModal(true);
  }

  return (
    <div className="container allJobsCardCompany">
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-3">
            <div className="logoImage text-center">
              <img
                src={image}
                className="img-fluid companyLogo"
                alt="company_logo"
              />
            </div>
          </div>
          <div className="col-md-7">
            <div className="card-body">
              <h4 className="card-title">{jobContent.position}</h4>
              <p className="card-text1">{jobContent.jobType}</p>
              <p className="card-text2">{applicants} Applicants</p>
            </div>
          </div>

          <div className="col-md-2">
            <div className="recImage text-center">
              <div>
                <img
                  src={
                    jobContent.status == 1
                      ? "./images/accuracy.png"
                      : "./images/close.png"
                  }
                  className="img-fluid recruitingStatus"
                  alt="recruiting_status"
                />
                <p className={jobContent.status === 1 ? "status1" : "status2"}>
                  {jobContent.status === 1 ? "Actively Recruiting" : "Closed"}
                </p>
              </div>
            </div>
          </div>

          <div className="text-center" hidden={step1}>
            <img
              src="./images/down-arrow.png"
              className="img-fluid showMore"
              alt="show_more"
              onClick={() => {
                setStep1(true);
                setStep2(false);
              }}
            />
          </div>
        </div>
        <div className="row g-0" hidden={step2}>
          <div className="col-md-6">
            <div className="">
              <h4 className="title">Role Overview</h4>
              <p className="description">{jobContent.roleOverview}</p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="">
              <h4 className="title">Responsibilities</h4>
              <p>{jobContent.responsibilities}</p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="">
              <h4 className="title">Requirements</h4>
              <p>{jobContent.requirements}</p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="">
              {jobContent.otherRequirements && (
                <h4 className="title">Other Requirements</h4>
              )}
              <p>{jobContent.otherRequirements}</p>
            </div>
          </div>

          <div className="text-center">
            <div className="text-center">
              <div className="btn-group me-2">
                <button
                  type="button"
                  className="btn btn-primary viewButton"
                  onClick={() =>
                    navigate(
                      `${App_Routes.VIEW_JOB_OWN_JOB_APPLICATIONS}/${jobContent._id}`
                    )
                  }
                >
                  View Job Applications
                </button>
              </div>
              <div className="btn-group me-2">
                <button
                  type="button"
                  onClick={() => editJob()}
                  className="btn btn-primary editButton"
                >
                  Edit
                </button>
              </div>
              <div className="btn-group me-2">
                <button
                  type="button"
                  onClick={() => deleteSelectedJob()}
                  className="btn btn-primary deleteButton"
                >
                  Delete
                </button>
              </div>
            </div>
            <br />
            <img
              src="./images/arrow-up.png"
              className="img-fluid showLess"
              alt="show_less"
              onClick={() => {
                setStep1(false);
                setStep2(true);
              }}
            />
          </div>
        </div>
      </div>
      <br />
      <Modal show={openModal} size="lg">
        <Modal.Header>
          <div>
            <h4 className="ms-4 modal-title">
              <b>Edit Job </b>
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
        <EditJob editFunction={editedFunction} content={jobContent} onClose={() => setOpenModal(false)}/>
      </Modal>
    </div>
  );
}

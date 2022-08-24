import React, {useState, useEffect} from "react";
import {getAllJobs, getAllJobsByToken} from "../../../../api/managements/jobApi";
import Loading from "../../../external_components/spinners/loading";
import AllJobsCard from "../cards/allJobsCard";
import "../css/viewAllJobs.css";
import JobApplicationForm from "../../jobApplications/jobApplicationForm";

export default function ViewAllJobs() {
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [jobsArray, setJobsArray] = useState([]);
  const [duplicateJobsArray, setDuplicateJobsArray] = useState([]);
  const [errorText, setErrorText] = useState("");
  const [show, setShow] = useState(false)
  const [jobId, setJobId] = useState('')
  const [companyId, setCompanyId] = useState('')
  const [jobDetails, setJobDetails] = useState({
    logo: '',
    jobType: '',
    position: '',
    developmentArea: ''
  })

  useEffect(async () => {
    const content = await getAllJobs();
    if (content) {
      setJobsArray(content.data.content);
      setDuplicateJobsArray(content.data.content);
    }
  }, []);


  function handleSearch(userIn) {
    setLoadingStatus(false);
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
    setLoadingStatus(true);
  }

  const openModal = (job) => {
    setJobId(job._id)
    setCompanyId(job.companyDetails[0]._id)
    setJobDetails({
      logo: job.companyDetails[0].logo,
      jobType: job.jobType,
      position: job.position,
      developmentArea: job.developmentArea
    })
    setShow(true)
  }

  const closeModal = () => {
    setShow(false)
  }

  return (
      <>
        <div className="viewAllJobs">
          <div className="searchBar text-center container">
            <form className="form-inline">
              <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search Applied Jobs"
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
          <div hidden={loadingStatus}>
            <Loading />
          </div>
          <div className="pageBody">
            <center>
              <h4 className="text-danger mb-5">{errorText}</h4>
            </center>
            {jobsArray.map((post) => {
              return <AllJobsCard key={post._id} content={post} onModalOpen={() => openModal(post)}/>;
            })}
          </div>
        </div>
        {show && <JobApplicationForm onModalClose={closeModal} jobId={jobId} companyId={companyId}
                                     otherDetails={jobDetails}/>}
      </>
  );
}

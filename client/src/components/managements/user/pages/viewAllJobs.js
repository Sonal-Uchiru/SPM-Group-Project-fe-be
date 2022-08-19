import React, { useState, useEffect } from "react";
import { protectedApi } from "../../../../api/protectedApi";
import Loading from "../../../external_components/spinners/loading";
import AllJobsCard from "../cards/allJobsCard";
import "../css/viewAllJobs.css";
export default function ViewAllJobs() {
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [jobsArray, setJobsArray] = useState([]);
  const [duplicateJobsArray, setDuplicateJobsArray] = useState([]);
  const [errorText, setErrorText] = useState("");
  useEffect(() => {
    getAllJobs();
  }, []);

  async function getAllJobs() {
    const content = await protectedApi("GET", "jobs", "");
    setJobsArray(content.data);
    setDuplicateJobsArray(content.data);
  }

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

  return (
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
          return <AllJobsCard key={post._id} content={post} />;
        })}
      </div>
    </div>
  );
}

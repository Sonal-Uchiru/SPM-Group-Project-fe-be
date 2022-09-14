import React, { useState, useEffect } from "react";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import "../css/listAllJobs.css";
import SummaryCard from "../cards/summaryCard";
import { getAllJobs } from "../../../../api/managements/jobApi";
import { ErrorAlert } from "../../../../sweet_alerts/error";
import Loading from "../../../external_components/spinners/loading";
import moment from "moment";

export default function AllJobsAvailable() {
  const [jobsArray, setJobsArray] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [active, setActive] = useState("0");
  const [deactive, setDeactive] = useState("0");

  useEffect(async () => {
    await allJobs();
    $(document).ready(function () {
      $("#allJobApplicationsTable").DataTable();
    });
  }, []);

  const allJobs = async () => {
    try {
      let i = 0;
      let activeval = 0;
      let deactiveval = 0;
      const content = await getAllJobs();
      while (i < content.data.content.length) {
        content.data.content[i].status == 1 ? activeval++ : deactiveval++;
        i++;
      }

      setActive(activeval);
      setDeactive(deactiveval);

      if (content) {
        setJobsArray(content.data.content);
      }
      setLoadingStatus(false);
    } catch (e) {
      await ErrorAlert(e);
    }
  };

  return (
    <div className="allJobsAvailable">
      <h2 className="pageTitle">
        <i className="fa fa-arrow-left" />
        Calcey Technologies Job List
      </h2>
      <div className="row d-flex justify-content-center">
        <div className="col-md-4">
          <SummaryCard topic="Actively Reqruiting" count={active} />
        </div>
        <div className="col-md-4">
          <SummaryCard topic="Closed" count={deactive} />
        </div>
      </div>

      {loadingStatus && <Loading />}

      <div className="col-md-12 job-available-table-div">
        <div className="scrollbar">
          <table
            id="allJobApplicationsTable"
            className="table table-bordered table-sm nowrap table-hover job-available-table"
          >
            <thead>
              <tr>
                <th>No</th>
                <th>Position</th>
                <th>Development Area</th>
                <th>Job Type</th>
                <th>Created date</th>
                <th>Last Updated Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobsArray.map((post, i) => {
                return (
                  <tr>
                    <td>{post.status}</td>
                    <td>{post.position}</td>
                    <td>{post.developmentArea}</td>
                    <td>{post.jobType}</td>
                    <td>
                      {moment(post.createdDate).format("YYYY-MM-DD HH:mm:ss")}
                    </td>
                    <td>
                      {moment(post.updatedDate).format("YYYY-MM-DD HH:mm:ss")}
                    </td>

                    <td>
                      <img
                        src="./../images/resume.png"
                        className="tableEdit"
                        alt=""
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <br />
    </div>
  );
}

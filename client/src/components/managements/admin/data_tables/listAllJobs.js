import React from "react";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import "../css/listAllJobs.css";
import SummaryCard from "../cards/summaryCard";

export default function AllJobsAvailable() {
  $(document).ready(function () {
    $("#allJobApplicationsTable").DataTable();
  });

  return (
    <div className="allJobsAvailable">
      <h2 className="pageTitle">
        <i className="fa fa-arrow-left" />
        Calcey Technologies Job List
      </h2>
      <div className="row d-flex justify-content-center">
          <SummaryCard topic="Actively Reqruiting" count="10" />
          <SummaryCard topic="Closed" count="5" />
      </div>

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
              <tr>
                <td>1</td>
                <td>Software Engineer</td>
                <td>Front End</td>
                <td>Full Time</td>
                <td>18/12/2012, 03:00:00</td>
                <td>20/12/2012, 03:00:00</td>
                <td>
                  <img
                    src="./../images/resume.png"
                    className="tableEdit"
                    alt=""
                  />
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>Software Engineer</td>
                <td>Front End</td>
                <td>Full Time</td>
                <td>18/12/2012, 03:00:00</td>
                <td>20/12/2012, 03:00:00</td>
                <td>
                  <img
                      src="./../images/resume.png"
                      className="tableEdit"
                      alt=""
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <br/>
      </div>
      <br />
    </div>
  );
}

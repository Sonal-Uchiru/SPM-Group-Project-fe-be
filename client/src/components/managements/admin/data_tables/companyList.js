import React from "react";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import "../css/companyList.css";
import SummaryCard from "../cards/summaryCard";

export default function CompanyList() {
  $(document).ready(function () {
    $("#allJobApplicationsTable").DataTable();
  });

  return (
    <div className="companyLists">
      <h2 className="pageTitle">
        <i className="fa fa-arrow-left" />
        Company List
      </h2>
      <div className="row d-flex justify-content-center">
        <div className="col-md-4">
          <SummaryCard topic="Information Technology" count="40" />
        </div>
        <div className="col-md-4">
          <SummaryCard topic="Banking" count="30" />
        </div>
        <div className="col-md-4">
          <SummaryCard topic="Other" count="30" />
        </div>
      </div>
      <div className="report mt-2">
        <button type="button" className="btn btn-primary downloadReportButton">
          <i className="fa fa-download" />
          Download Report
        </button>
      </div>
      <div className="col-md-12 company-list-table-div">
        <div className="scrollbar">
          <table
            id="allJobApplicationsTable"
            className="table table-bordered table-sm nowrap table-hover company-list-table"
          >
            <thead>
              <tr>
                <th />
                <th>Name</th>
                <th>Field type</th>
                <th>Mobile</th>
                <th>Site Url</th>
                <th>Last Updated Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img
                    src="./images/calcey-logo-1-1.jpeg"
                    className="tableImg"
                    alt=""
                  />
                </td>
                <td>Calcey Technologies</td>
                <td>IT</td>
                <td>0778899384</td>
                <td>Calcey.com</td>
                <td>18/12/2012, 03:00:00</td>
                <td>
                  <img
                    src="./../images/view.png"
                    className="tableEdit me-2"
                    alt=""
                  />
                  <img
                    src="./../images/resume.png"
                    className="tableEdit"
                    alt=""
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <img
                    src="./images/calcey-logo-1-1.jpeg"
                    className="tableImg"
                    alt=""
                  />
                </td>
                <td>Calcey Technologies</td>
                <td>IT</td>
                <td>0778899384</td>
                <td>Calcey.com</td>
                <td>18/12/2012, 03:00:00</td>
                <td>
                  <img
                    src="./../images/view.png"
                    className="tableEdit me-2"
                    alt=""
                  />
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
      </div>
      <br />
    </div>
  );
}

import React, {useEffect, useState} from "react";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import "../css/companyList.css";
import SummaryCard from "../cards/summaryCard";
import {getAllCompanies} from "../../../../api/managements/companyAPI";
import {useNavigate} from "react-router";
import {App_Routes} from "../../../../constant/appRoutes";

export default function CompanyList() {
    const [companies, setCompanies] = useState([]);
    const [statistics, setStatistics] = useState({
        statType1: 0,
        statType2: 0,
        statType3: 0,
    });

    const navigate = useNavigate();

    const filterStatistics = (payload, type1, type2) => {
        const category1 = payload.filter((company) => {
            return company.field.toLowerCase() === type1;
        }).length;
        const category2 = payload.filter((company) => {
            return company.field.toLowerCase() === type2;
        }).length;

        setStatistics({
      statType1: category1,
      statType2: category2,
      statType3: payload.length - (category1 + category2),
    });
  };

  useEffect(() => {
    const getCompanyDetails = async () => {
      const companies = await getAllCompanies();
      setCompanies(companies.data);
      filterStatistics(companies.data, "information technology", "banking");
      $(document).ready(function () {
        $("#allJobApplicationsTable").DataTable();
      });
    };

    getCompanyDetails();
  }, []);

  return (
    <div className="companyLists">
      <h2 className="pageTitle">
          Company List
      </h2>
        <div className="row d-flex justify-content-center">
            <SummaryCard
                topic="Information Technology"
                count={statistics.statType1}
            />
            <SummaryCard topic="Banking" count={statistics.statType2}/>
            <SummaryCard topic="Other" count={statistics.statType3}/>
        </div>
        <div className="report mt-4 mb-4">
            <button type="button" className="btn btn-primary downloadReportButton"
                    onClick={() => navigate(App_Routes.COMPANY_LIST_REPORT)}>
                <i className="fa fa-download"/>
                View Report
            </button>
        </div>
        <br/><br/>
        <div className="col-md-12 company-list-table-div">
            <div className="scrollbar">
                <table
                    id="allJobApplicationsTable"
                    className="table table-bordered table-sm nowrap table-hover company-list-table"
                >
                    <thead>
                    <tr>
                        <th>Name</th>
                <th>Field type</th>
                <th>Mobile</th>
                <th>Site Url</th>
                <th>Last Updated Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company, index) => {
                return (
                  <tr key={index}>
                    {/*<td>*/}
                    {/*  <img src={company.logo} className="tableImg" alt="" />*/}
                    {/*</td>*/}
                    <td>{company.name}</td>
                    <td>{company.field}</td>
                    <td>{company.mobile}</td>
                    <td>{company.siteUrl ? company.siteUrl : "-"}</td>
                    <td>{company.updatedDate}</td>
                    <td>
                        <img
                            src="./../images/resume.png"
                            className="tableEdit"
                            alt="view jobs"
                            onClick={() => navigate(App_Routes.JOB_LIST + `/${company._id}`)}
                        />
                    </td>
                  </tr>
                );
              })}
            </tbody>
                </table>
            </div>
            <br/>
        </div>
        <br/>
    </div>
  );
}

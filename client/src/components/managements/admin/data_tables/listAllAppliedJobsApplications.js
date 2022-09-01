import React, {useEffect, useState} from "react";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import "../css/listAllJobApplications.css";
import SummaryCard from "../cards/summaryCard";
import {getAppliedJobApplicationsByJobId} from "../../../../api/managements/jobApplicationApi";
import {ErrorAlert} from "../../../../sweet_alerts/error";
import moment from "moment";
import {getJobById} from "../../../../api/managements/jobApi";

export default function AllJobApplications() {
    const [jobApplications, setJobApplications] = useState([])
    const [job, setJob] = useState([])
    const [selectedJobApplications, setSelectedJobApplications] = useState(0)
    const [rejectedJobApplications, setRejectedJobApplications] = useState(0)

    const jobId = "62f9e781d06c6643a5f74e69";
    const userProfilePlaceHolder = "https://firebasestorage.googleapis.com/v0/b/moon-cinema-rest-api.appspot.com/o/Additional%2Fuser%20(8).png?alt=media&token=9cef4e9b-1e8c-43ca-95b7-19c6e9ec8781"

    useEffect(() => {
        getAppliedJobApplicationsByJobId(jobId).then((res) => {
            if (res.data.content) {
                setJobApplications(res.data.content)
                setSelectedJobApplications(jobApplicationsCount(res.data.content, 1))
                setRejectedJobApplications(jobApplicationsCount(res.data.content, 2))
                $(document).ready(function () {
                    $("#allJobApplicationsTable").DataTable();
                });
            }
        }).catch(async (err) => {
            console.log(err)
            await ErrorAlert('Something went wrong!')
        })
    }, [])


    useEffect(() => {
        getJobById(jobId).then((res) => {
            if (res.data) setJob(res.data)
        }).catch(async (err) => {
            console.log(err)
            await ErrorAlert('Something went wrong!')
        })
    }, [])

    const jobApplicationsCount = (arr, status) => {
        return arr.filter(obj => {
            return obj.status === status;
        }).length;
    }

    return (
        <div className="allJobApplications">
            <h2 className="pageTitle">
                <i className="fa fa-arrow-left"/>
                Job Applications ({`${job.position} (${job.developmentArea})`})
            </h2>
            <div className="row d-flex justify-content-center">
                <div className="col-md-4">
                    <SummaryCard topic="Selected Applications" count={selectedJobApplications}/>
                </div>
                <div className="col-md-4">
                    <SummaryCard topic="Rejected Applications" count={rejectedJobApplications}/>
                </div>
            </div>
            <div className="col-md-12 job-applications-table-div">
                <div className="scrollbar">
                    <table
                        id="allJobApplicationsTable"
                        className="table table-bordered table-sm nowrap table-hover job-applications-table"
                    >
                        <thead>
                        <tr>
                            <th/>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Mobile</th>
                            <th>Applied Date</th>
                            <th>Last Updated Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {jobApplications.map((jobApplication, index) => {
                            return (
                                <>
                                    <tr key={index}>
                                        <td>
                                            <img
                                                src={!jobApplication.userDetails[0].profilePicture ? userProfilePlaceHolder : jobApplication.userDetails[0].profilePicture}
                                                className="tableImg" alt=""/>
                                        </td>
                                        <td>{`${jobApplication.userDetails[0].firstName} ${jobApplication.userDetails[0].lastName}`}</td>
                                        <td>{!jobApplication.userDetails[0].gender ? jobApplication.applicantOtherDetails.gender : jobApplication.userDetails[0].gender}</td>
                                        <td>{`0${jobApplication.userDetails[0].mobile}`}</td>
                                        <td>{moment(jobApplication.createdDate).format('YYYY-MM-DD HH:mm:ss')}</td>
                                        <td>{jobApplication.updatedDate ? moment(jobApplication.updatedDate).format('YYYY-MM-DD HH:mm:ss') : 'Not Updated!'}</td>
                                    </tr>
                                </>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
            <br/>
        </div>
    );
}

import React, {useEffect, useState} from "react";
import "../css/appliedJobCard.css"
import {deleteJobApplication, getAppliedJobApplicationsByJobId} from "../../../../api/managements/jobApplicationApi";
import {ErrorAlert} from "../../../../sweet_alerts/error";
import {SuccessAlert} from "../../../../sweet_alerts/success";
import {DeleteConfirm} from "../../../../sweet_alerts/deleteConfirm";

export default function AppliedJobCard(props) {
    const [noOfApplicants, setNoOfApplicants] = useState(0)

    const statusImages = {
        approved: 'approved.png',
        pending: 'wall-clock.png',
        rejected: 'cross-button.png'
    }

    useEffect(async () => {
        const content = await getAppliedJobApplicationsByJobId(props.jobApplicationDetails.jobId)
        setNoOfApplicants(content.data.content.length)
    }, [])

    const deleteSelectedJobApplication = async () => {
        try {
            if (!await DeleteConfirm()) return

            const content = await deleteJobApplication(props.jobApplicationDetails._id)

            if (content) {
                await SuccessAlert("Job Application deleted successfully!")
                props.onDelete()
            }
        } catch (e) {
            await ErrorAlert("Something went wrong!")
        }
    }

    const setStatus = () => {

        if (props.jobApplicationDetails.status === 1) return statusImages.approved

        if (props.jobApplicationDetails.status === 2) return statusImages.rejected

        return statusImages.pending
    }
    return (
        <div className="container appliedJobCard">
            <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-3">
                        <div className="logoImage text-center">
                            <img src={props.jobApplicationDetails.companyDetails[0].logo}
                                 className="img-fluid companyLogo" alt="company_logo"/>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="card-body">
                            <h4 className="card-title">{props.jobApplicationDetails.jobDetails[0].position}</h4>
                            <p className="card-text1">{props.jobApplicationDetails.jobDetails[0].jobType}</p>
                            <p className="card-text2">{noOfApplicants} Applicants</p>
                        </div>
                    </div>

                    <div className="col-md-2">
                        <div className="recImage text-center">
                            <img src={`./images/${setStatus()}`} className="img-fluid recruitingStatus"
                                 alt="recruiting_status"/>
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="btn-group me-2">
                            <button type="button" className="btn btn-primary editButton">Edit</button>
                        </div>
                        <div className="btn-group me-2">
                            <button type="button" className="btn btn-primary deleteButton"
                                    onClick={deleteSelectedJobApplication}>Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <br/>
        </div>
    )
}
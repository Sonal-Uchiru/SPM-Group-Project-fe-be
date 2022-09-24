import React, {useEffect, useRef, useState} from 'react';
import PdfGenerator from "../../../../generators/pdfGenerator";
import {getAllJobs, getJobById} from "../../../../api/managements/jobApi";
import JobApplicationReportTemplate from "./jobApplicationReportTemplate";
import "../css/report.css";
import {getAppliedJobApplicationsByJobId} from "../../../../api/managements/jobApplicationApi";
import {getCompanyById} from "../../../../api/managements/companyAPI";
import moment from "moment";

function JobApplicationReport(props) {
    const [items, setItems] = useState([])
    const [gen, setGen] = useState(false)
    const [company, setCompany] = useState([])
    const ref = useRef(null)
    const jobId = "63139786d20b38ecbd1721fe";
    const generatePDF = () => {
        ref.current.exportPDF()
    }

    const [summaryCards, setSummaryCards] = useState([])

    useEffect(() => {
        getAppliedJobApplicationsByJobId(jobId).then((res) => {
            const filteredData = res.data.content.filter(content => moment(content.createdDate).format('MMMM')
                === moment(new Date).format('MMMM'))
            setItems(filteredData)
            genSummaryData(filteredData)
            getCompanyDetails(res.data.content)
        }).catch((err) => {
            console.log(err)
        })

    }, [])

    const getCompanyDetails = (content) => {
        if (content.length) {
            getCompanyById(content[0].companyId).then((res) => {
                setCompany(res.data)
            }).catch(err => {
                console.log(err)
            })
        }
    }

    const jobApplicationsCount = (arr, status) => {
        return arr.filter(obj => {
            return obj.status === status;
        }).length;
    }

    const genSummaryData = (data) => {
        if (data.length) {
            const selectedCount = jobApplicationsCount(data, 1)
            const rejectedCount = jobApplicationsCount(data, 2)
            setSummaryCards([{
                name: "Selected Applications",
                count: selectedCount
            }, {
                name: "Rejected Applications",
                count: rejectedCount
            }])
        }
    }

    const tableHeaders = ["", "Name", "Gender", "Mobile", "Applied Date", "Last Updated Date"]

    return (
        <>
            <div className="d-flex justify-content-end me-5 mt-2">
                <button className="btn downloadReportBtn" onClick={generatePDF}>
                    <i className="fa fa-download me-2"/>
                    Download Report
                </button>
            </div>
            <PdfGenerator childComponent={<JobApplicationReportTemplate
                companyDetails={company} summaryCards={summaryCards}
                tableHeaders={tableHeaders}
                tableMetaData={items}/>} refs={ref} fileName={"apple.pdf"}/>
        </>
    );
}

export default JobApplicationReport;
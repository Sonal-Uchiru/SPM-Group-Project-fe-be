import React, {useEffect, useRef, useState} from 'react';
import PdfGenerator from "../../../../generators/pdfGenerator";
import {getAllJobs, getAllJobsByToken, getJobById} from "../../../../api/managements/jobApi";
import CompanyReportTemplate from "./companyReportTemplate";
import "../css/report.css";
import {getAppliedJobApplicationsByJobId} from "../../../../api/managements/jobApplicationApi";
import {getAllCompanies, getCompanyById} from "../../../../api/managements/companyAPI";
import moment from "moment";

function CompanyReport(props) {
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
        getAllCompanies().then((res) => {
            console.log(res)
            const filteredData = res.data.filter(content => moment(content.createdDate).format('MMMM')
                === moment(new Date).format('MMMM'))
            setItems(filteredData)
            genSummaryData(filteredData)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    const companyTypeCount = (arr, type) => {
        return arr.filter(obj => {
            return obj.field === type;
        }).length;
    }

    const genSummaryData = (data) => {
        if (data.length) {
            const it = companyTypeCount(data, "Information Technology")
            const banking = companyTypeCount(data, "Banking")
            const other = companyTypeCount(data, "Other")
            setSummaryCards([{
                name: "Information Technology",
                count: it
            }, {
                name: "Banking",
                count: banking
            }, {
                name: "Other",
                count: other
            }])

        }
    }

    const tableHeaders = ["Name", "Field Type", "Mobile", "Site URL", "Last Updated Date"]

    return (
        <>
            <div className="d-flex justify-content-end me-5 mt-2">
                <button className="btn downloadReportBtn" onClick={generatePDF}>
                    <i className="fa fa-download me-2"/>
                    Download Report
                </button>
            </div>
            <PdfGenerator childComponent={<CompanyReportTemplate
                companyDetails={company} summaryCards={summaryCards}
                tableHeaders={tableHeaders}
                tableMetaData={items}/>} refs={ref} fileName={`${moment(new Date()).format('MMMM-YYYY')}-monthly-companies-report.pdf`}/>
        </>
    );
}

export default CompanyReport;
import React, {useState} from "react";
import "../css/allJobsCard.css"

export default function AllJobsCard() {

    const [step1, setStep1] = useState(false)
    const [step2, setStep2] = useState(true)

    return (
        <div className="container allJobsCard">
            <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-3">
                        <div className="logoImage text-center">
                            <img src="./images/rootCode.png" className="img-fluid companyLogo" alt="company_logo"/>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="card-body">
                            <h4 className="card-title">Software Engineer (Full Stack Developer)</h4>
                            <p className="card-text1">Full Time Job</p>
                            <p className="card-text2">10 Applicants</p>
                        </div>
                    </div>

                    <div className="col-md-2">
                        <div className="recImage text-center">
                            <img src="./images/accuracy.png" className="img-fluid recruitingStatus"
                                 alt="recruiting_status"/>
                            <p className="status">Actively Recruiting</p>
                        </div>
                    </div>

                    <div className="text-center" hidden={step1}>
                        <img src="./images/down-arrow.png" className="img-fluid showMore"
                             alt="show_more" onClick={() => {
                            setStep1(true)
                            setStep2(false)
                        }}/>
                    </div>

                </div>
                <div className="row g-0" hidden={step2}>
                    <div className="col-md-6">
                        <div className="">
                            <h4 className="title">Role Overview</h4>
                            <p className="description">Bloomberg's profile proves the company knows its audience,
                                because they offer a few quick statistics, and then link to other areas of the site,
                                such as Careers and Tech. While other businesses might do well in offering a creative,
                                long-form story, Bloomberg's typical demographic is likely more.</p>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="">
                            <h4 className="title">Responsibilities</h4>
                            <p>Bloomberg's profile proves the company knows its audience, because they offer a few quick
                                statistics, and then link to other areas of the site, such as Careers and Tech. While
                                other businesses might do well in offering a creative, long-form story, Bloomberg's
                                typical demographic is likely more.</p>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="">
                            <h4 className="title">Requirements</h4>
                            <p>Bloomberg's profile proves the company knows its audience, because they offer a few quick
                                statistics, and then link to other areas of the site, such as Careers and Tech. While
                                other businesses might do well in offering a creative, long-form story, Bloomberg's
                                typical demographic is likely more.</p>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="">
                            <h4 className="title">Other Requirements</h4>
                            <p>Bloomberg's profile proves the company knows its audience, because they offer a few quick
                                statistics, and then link to other areas of the site, such as Careers and Tech. While
                                other businesses might do well in offering a creative, long-form story, Bloomberg's
                                typical demographic is likely more.</p>
                        </div>
                    </div>

                    <div className="text-center">
                        <button type="button" className="btn btn-primary apply">Apply</button>
                        <br/>
                        <img src="./images/arrow-up.png" className="img-fluid showLess"
                             alt="show_less" onClick={() => {
                            setStep1(false)
                            setStep2(true)
                        }}/>
                    </div>
                </div>
            </div>
            <br/>
        </div>
    )
}
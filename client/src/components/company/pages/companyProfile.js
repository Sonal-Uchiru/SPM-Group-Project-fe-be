import React from "react";
import CompanyProfileMain from "../../cards/companyProfileMain";
import CompanySummary from "../../cards/companySummary";
import CompanyDetails from "../../cards/companyDetails";
import '../css/companyProfile.css'
import {BsArrowLeft, BsArrowRight} from "react-icons/all";

export default function CompanyProfile() {
    return (
        <div className="companyProfile">
            <h2 className="title"><BsArrowLeft/> My Company Profile</h2>
            <div className="coverImage">
                <img src="./images/cover.jpeg" className="cover img-fluid container-fluid" alt="cover_image"/>
            </div>
            <div className="about">
                <CompanyProfileMain/>
            </div>
            <div className="row otherD">
                <div className="col-md-5">
                    <CompanySummary/>
                </div>
                <div className="col-md-7">
                    <CompanyDetails/>
                </div>
            </div>
        </div>
    )
}
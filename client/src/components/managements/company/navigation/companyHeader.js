import React from "react";
import "../css/companyHeader.css"

export default function CompanyHeader() {
    return (
        <div className="companyHeader">
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src="./images/SPMNEW.png" className="siteLogo" width="160" height="20" alt="site_logo"/>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Jobs</a>
                            </li>
                        </ul>
                        <div className="d-flex">
                            <p className="companyName">Rootcode Labs</p>
                            <img src="./images/rootCode.png" className="companyLogo" alt="company_logo"/>
                            <img src="./images/logout.png" className="logout" alt="logout"/>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}
import React from 'react';
import {Link} from "react-router-dom";
import {App_Routes} from "../../../../constant/appRoutes";

function CompanyHeader(props) {
    return (
        <>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link className="nav-link " aria-current="page" to={App_Routes.VIEW_ALL_COMPANY_OWN_JOBS}>
                        Jobs</Link>
                </li>
            </ul>
        </>
    );
}

export default CompanyHeader;
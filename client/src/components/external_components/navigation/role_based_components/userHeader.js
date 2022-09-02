import React from 'react';
import '../../css/header.css';
import {Link} from "react-router-dom";
import {App_Routes} from "../../../../constant/appRoutes";

function UserHeader(props) {
    return (
        <>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to={App_Routes.VIEW_ALL_JOBS}>Jobs</Link>

                </li>
                <li className="nav-item">
                    <Link className="nav-link " aria-current="page" to={App_Routes.VIEW_USER_APPLIED_JOBS}>Applied
                        Jobs</Link>
                </li>
            </ul>
        </>
    );
}

export default UserHeader;
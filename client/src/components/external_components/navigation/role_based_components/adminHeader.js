import React from 'react';
import {Link} from "react-router-dom";
import {App_Routes} from "../../../../constant/appRoutes";

function AdminHeader(props) {
    return (
        <>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link className="nav-link " aria-current="page" to={App_Routes.USER_LIST}>
                        Users</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link " aria-current="page" to={App_Routes.COMPANY_LIST}>
                        Companies</Link>
                </li>
            </ul>
        </>
    );
}

export default AdminHeader;
import React, {useEffect, useState} from "react";
import "../css/header.css"

import {useLocation, useNavigate} from "react-router";
import {getTokenFromLocalStorage, removeTokenFromLocalStorage} from "../../authentication/tokenHandling";
import {getRoleFromLocalStorage, removeRoleFromLocalStorage} from "../../authentication/roleHandling";
import {App_Routes} from "../../../constant/appRoutes";
import UserHeader from "./role_based_components/userHeader";
import CompanyHeader from "./role_based_components/companyHeader";
import AdminHeader from "./role_based_components/adminHeader";
import {ErrorAlert} from "../../../sweet_alerts/error";
import {getUserDetails} from "../../../api/managements/userApi";
import {getCompany} from "../../../api/managements/companyAPI";


export default function Header() {
    const [authenticated, setAuthenticated] = useState(false)
    const auth = getTokenFromLocalStorage()
    const role = getRoleFromLocalStorage()
    const location = useLocation();
    const navigate = useNavigate();
    const imagePlaceholder = 'https://firebasestorage.googleapis.com/v0/b/moon-cinema-rest-api.appspot.com/o/Additional%2Fuser%20(8).png?alt=media&token=9cef4e9b-1e8c-43ca-95b7-19c6e9ec8781'
    const [name, setName] = useState('')
    const [image, setImage] = useState(imagePlaceholder)

    const isRestricted = () => {
        return !(location.pathname === App_Routes.ROOT || location.pathname === App_Routes.USER_SIGN_UP
            || location.pathname === App_Routes.COMPANY_SIGN_UP);
    }

    useEffect(() => {
        if (auth && isRestricted()) return setAuthenticated(true)
        setAuthenticated(false)
    }, [location]);

    useEffect(() => {
        if (!auth) return

        if (role === 'user') {
            getUserDetails().then((res) => {
                setName(`${res.data.firstName} ${res.data.lastName}`)

                if (res.data.profilePicture) setImage(res.data.profilePicture)
            }).catch(async (err) => {
                await ErrorAlert('Something went wrong!')
            })
            return
        }

        if (role === 'company') {
            getCompany().then((res) => {
                setName(res.data.name)

                if (res.data.logo) setImage(res.data.logo)
            }).catch(async (err) => {
                await ErrorAlert('Something went wrong!')
            })
        }
    }, [authenticated])

    const logout = async () => {
        setName('')
        setImage(imagePlaceholder)
        await removeRoleFromLocalStorage()
        await removeTokenFromLocalStorage()
        navigate(App_Routes.ROOT)
    }

    const navigateProfile = () => {
        if (role === 'user') return navigate(App_Routes.USER_PROFILE)
        if (role === 'company') navigate(App_Routes.COMPANY_PROFILE)
    }

    return (
        <>
            {(authenticated) &&
                <div className="companyHeader">
                    <nav className="navbar navbar-expand-lg">
                        <div className="container-fluid">
                            <a className="navbar-brand">
                                <img src="./images/SPMNEW.png" className="siteLogo" width="160" height="20"
                                     alt="site_logo"/>
                            </a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                    aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"/>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                {role === 'user' && <UserHeader/>}
                                {role === 'company' && <CompanyHeader/>}
                                {role === 'admin' && <AdminHeader/>}
                                <div className="d-flex">
                                    {role !== 'admin' && <><p className="companyName"
                                                              onClick={() => navigateProfile()}>{name}</p>
                                        <img src={image} className="companyLogo"
                                             alt="company_logo" onClick={() => navigateProfile()}/></>}
                                    {role === 'admin' &&
                                        <img src="./images/admin.png" className="adminImage" alt="admin_image"/>}
                                    <img src="./images/logout.png" className="logout" alt="logout"
                                         onClick={() => logout()}/>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            }
        </>
    )
}
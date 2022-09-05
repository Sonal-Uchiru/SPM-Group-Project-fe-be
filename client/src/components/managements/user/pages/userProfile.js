import React, {useEffect, useState} from "react";
import UserDetails from "../cards/userDetails";
import ProfileMain from "../cards/userProfileMain";
import UserSummary from "../cards/userSummary";
import "../css/userProfile.css";
import {BsArrowLeft} from "react-icons/all";
import {getUserDetails} from "../../../../api/managements/userApi";
import {App_Routes} from "../../../../constant/appRoutes";
import {useNavigate} from "react-router";


export default function UserProfile(props) {

    const [user, setUser] = useState("");

    useEffect(() => {
        getUser();
    }, []);

    async function getUser() {
        const content = await getUserDetails()
        setUser(content.data)
        // console.log(content.data)
    }


    return (
        <div className="userProfile">
            <h2 className="title"><BsArrowLeft/> User Profile</h2>
            <div className="container-fluid">
                <div className="coverImage container-fluid">
                </div>
            </div>
            <div className="about">
                <ProfileMain userDetails={user}/>
            </div>
            <div className="row otherD">
                <div className="col-md-5">
                    <UserSummary/>
                </div>
                <div className="col-md-7">
                    <UserDetails personalDetails={user}/>
                </div>
            </div>
        </div>

    );
}


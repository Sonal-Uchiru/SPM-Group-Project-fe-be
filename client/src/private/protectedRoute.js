import {Navigate} from 'react-router-dom';
import React, {Component} from 'react';
import {getTokenFromLocalStorage} from "../components/authentication/tokenHandling";
import {getRoleFromLocalStorage} from "../components/authentication/roleHandling";
import {useUserRoles} from "../components/authentication/userRoles";

export const Private = ({Role, Component}) => {
    const auth = getTokenFromLocalStorage();
    const role = getRoleFromLocalStorage();
    return (auth && isRoleValid() && role === Role) ? <Component/> : <Navigate to="/"/>
}

const isRoleValid = (role) => {
    const roles = useUserRoles()
    return roles.map(item => item === role)
}
import {Navigate} from 'react-router-dom';
import React, {Component} from 'react';

export const Private = ({Component}) => {
    const auth = localStorage.getItem('SLIIT-Research-Management-Token');

    return auth ? <Component/> : <Navigate to="/"/>
}
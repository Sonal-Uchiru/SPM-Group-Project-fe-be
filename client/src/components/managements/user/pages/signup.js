import React, {useState} from "react";
import "../css/signUp.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import {faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import PasswordStrengthMeter from "../../../external_components/validations/passwordStrengthIndecator";

const eye = <FontAwesomeIcon icon={faEye}/>;
const sleye = <FontAwesomeIcon icon={faEyeSlash}/>;

export default function UserSignUP() {
    const [passwordShown, setPasswordShown] = useState(false);
    const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
    const [password, setPassword] = useState("");
    // Password toggle handler
    const togglePasswordVisibility = () => {
        setPasswordShown(!passwordShown);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordShown(!confirmPasswordShown);
    };

    // const isNumberRegx = /\d/
    // const specialCharacterRegx = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/


    return (
        <div className="userSignUp">
            <section className=''>
                <div className='container-fluid'>
                    <div className='row d-flex justify-content-center align-items-center row1'>
                        <div className='col-md-9 col-lg-6 col-xl-4'>
                            <div className="text-center">
                                <img
                                    src='./../images/SPMLogo.png'
                                    className='img-fluid SiteLogo'
                                    alt='site_logo'
                                />
                            </div>
                            <br/><br/>
                            <h2 className="text-center quote">“The only way to do great work is to do what you love. If
                                you haven’t found it yet, keep looking, Don’t settle.” </h2>
                            <br/>
                        </div>

                        <br/>

                        <div className='col-md-8 col-lg-6 col-xl-5 offset-xl-1 rightSide'>
                            <h1 className='signup'>Sign Up</h1>
                            <br/>

                            <form>
                                <div className='step1'>
                                    <br/>
                                    <div className='form-outline'>
                                        <div className='row'>
                                            <div className='col-md-6 mb-3'>
                                                <div className='form-outline'>
                                                    <label className='form-label' htmlFor='firstName'>
                                                        First Name
                                                    </label>
                                                    <input
                                                        type='text'
                                                        id='firstName'
                                                        className='form-control'
                                                        placeholder='First Name'
                                                    />
                                                </div>
                                            </div>

                                            <div className='col-md-6 mb-3'>
                                                <div className='form-outline'>
                                                    <label className='form-label' htmlFor='lastName'>
                                                        Last Name
                                                    </label>
                                                    <input
                                                        type='text'
                                                        id='lastname'
                                                        className='form-control'
                                                        placeholder='Last Name'
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='form-outline mb-3'>
                                        <label
                                            className='form-label'
                                            form='form3Example3'
                                            id='email'
                                        >
                                            Email
                                        </label>
                                        <input
                                            type='email'
                                            id='email'
                                            className='form-control form-control-lg'
                                            placeholder='Email'
                                        />
                                    </div>

                                    <div className='form-outline mb-3'>
                                        <label
                                            className='form-label'
                                            form='form3Example3'
                                            id='phoneNumber'
                                        >
                                            Phone Number
                                        </label>
                                        <input
                                            type='text'
                                            id='form3Example3'
                                            className='form-control form-control-lg'
                                            placeholder='Phone Number'
                                        />
                                    </div>

                                    <div className='form-outline mb-3'>
                                        <label
                                            className='form-label'
                                            form='form3Example3'
                                            id='password'
                                        >
                                            Password
                                        </label>
                                        <input
                                            type={passwordShown ? "text" : "password"}
                                            id='form3Example3'
                                            className='form-control form-control-lg'
                                            placeholder='Password'
                                            onChange={(e) => {
                                                setPassword(e.target.value)
                                            }}
                                        />
                                        <span className="p-viewer">
                                        <i
                                            id="eyeIcon"
                                            className={`fa ${
                                                passwordShown ? "fa-eye" : "fa-eye-slash"
                                            } password-icon`}
                                            onClick={togglePasswordVisibility}
                                        >
                                          {" "}
                                        </i>
                                      </span>
                                    </div>
                                    <PasswordStrengthMeter password={password}/>
                                    <div className='form-outline mb-3'>
                                        <label
                                            className='form-label'
                                            form='form3Example3'
                                            id='password'
                                        >
                                            Confirm Password
                                        </label>
                                        <input
                                            type={confirmPasswordShown ? "text" : "password"}
                                            id='form3Example3'
                                            className='form-control form-control-lg'
                                            placeholder='Confirm Password'
                                        />
                                        <span className="p-viewer">
                                        <i
                                            id="eyeIcon"
                                            className={`fa ${
                                                confirmPasswordShown ? "fa-eye" : "fa-eye-slash"
                                            } password-icon`}
                                            onClick={toggleConfirmPasswordVisibility}
                                        >
                                          {" "}
                                        </i>
                                      </span>
                                    </div>

                                    <button
                                        type='button'
                                        className='btn rounded signupBtn'
                                    >
                                        Sign Up
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
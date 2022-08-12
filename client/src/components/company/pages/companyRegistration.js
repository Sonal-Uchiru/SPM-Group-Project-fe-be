import React, {useState} from "react";
import "../css/companyRegistration.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import {faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import PasswordStrengthIndicator from '../../external_components/passwordStrengthIndecator'

const eye = <FontAwesomeIcon icon={faEye}/>;
const sleye = <FontAwesomeIcon icon={faEyeSlash}/>;

export default function CompanyRegistration() {

    const [passwordShown, setPasswordShown] = useState(false);
    const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
    const [step1, setStep1] = useState(false)
    const [step2, setStep2] = useState(true)

    const [imgData, setImgData] = useState('')
    const [picture, setPicture] = useState('')
    let [moviePlaceHolder, setMoviePlaceHolder] = useState(false)
    // Password toggle handler
    const togglePasswordVisibility = () => {
        setPasswordShown(!passwordShown);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordShown(!confirmPasswordShown);
    };

    const [passwordValidity, setPasswordValidity] = useState({
        minChar: null,
        number: null,
        specialChar: null,
    })
    const isNumberRegx = /\d/
    const specialCharacterRegx = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/

    function validatePassword() {
        if (
            passwordValidity.minChar &&
            passwordValidity.number &&
            passwordValidity.specialChar
        ) {
            return true
        }
    }

    const onChangePicture = (e) => {
        if (e.target.files[0]) {
            setMoviePlaceHolder(true)
            setPicture(e.target.files)
            const reader = new FileReader()
            reader.addEventListener('load', () => {
                setImgData(reader.result)
            })
            reader.readAsDataURL(e.target.files[0])
        }
    }

    return (
        <div className="companyRegistration">
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
                            <h1 className='signup'>Start Hiring</h1>
                            <br/>
                            <form>

                                <div className='step1' hidden={step1}>
                                    <br/>
                                    <span>
                    <center>
                      <div className='box'>
                        <img
                            className='z-depth-2 Img1'
                            alt='pro_image'
                            src='./../images/user (7).png'
                            data-holder-rendered='true'
                            hidden={moviePlaceHolder}
                        />

                        <img
                            className='z-depth-2 Img1'
                            alt='movie_image'
                            src={imgData}
                            id='movieImage'
                            data-holder-rendered='true'
                            hidden={!moviePlaceHolder}
                        />

                        <div className='image-upload'>
                          <label htmlFor='file-input'>
                            <img
                                src='./../images/camera.png'
                                className='Img2'
                                id='image-upload-btn'
                                alt='camera image'
                            />
                          </label>
                          <input
                              id='file-input'
                              type='file'
                              onChange={onChangePicture}
                          />
                        </div>
                      </div>
                    </center>
                  </span>
                                    <br/>

                                    <div className='form-outline mb-3'>
                                        <label
                                            className='form-label'
                                            form='form3Example3'
                                            id='companyName'
                                        >
                                            Company Name
                                        </label>
                                        <input
                                            type='text'
                                            id='companyName'
                                            className='form-control form-control-lg'
                                            placeholder='Company Name'
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
                                            id='address'
                                        >
                                            Address
                                        </label>
                                        <input
                                            type='text'
                                            id='address'
                                            className='form-control form-control-lg'
                                            placeholder='Address'
                                        />
                                    </div>

                                    <div className='form-outline mb-3'>
                                        <label
                                            className='form-label'
                                            form='form3Example3'
                                            id='field'
                                        >
                                            Field
                                        </label>
                                        <select
                                            className='form-select mb-3'
                                            aria-label='.form-select-lg example'
                                        >
                                            <option selected disabled>Field</option>
                                            <option value='Information Technology'>Information Technology</option>
                                            <option value='Banking'>Banking</option>
                                            <option value='Business Management'>Business Management</option>
                                        </select>
                                    </div>


                                    <button
                                        type='button'
                                        className='btn rounded next'
                                        onClick={() => {
                                            setStep1(true)
                                            setStep2(false)
                                        }}
                                    >
                                        Next
                                        <i className='fa fa-arrow-right arrow' aria-hidden='true'/>
                                    </button>
                                </div>

                                <div className='step2' hidden={step2}>
                                    <h3 className="almostThere">Almost There...</h3>
                                    <br/>

                                    <div className='form-outline mb-3'>
                                        <label
                                            className='form-label'
                                            form='form3Example3'
                                            id='phoneNumber'
                                        >
                                            Site URL
                                        </label>
                                        <input
                                            type='text'
                                            id='form3Example3'
                                            className='form-control form-control-lg'
                                            placeholder='Site URL'
                                        />
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
                                                setPasswordValidity({
                                                    minChar: e.target.value.length >= 8,
                                                    number: isNumberRegx.test(e.target.value),
                                                    specialChar: specialCharacterRegx.test(
                                                        e.target.value,
                                                    ),
                                                })
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
                                    <PasswordStrengthIndicator validity={passwordValidity}/>
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
                                    <p className='back'>
                                        <a
                                            onClick={() => {
                                                setStep1(false)
                                                setStep2(true)
                                            }}
                                        >
                                            {' '}
                                            Back
                                        </a>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
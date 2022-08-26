import React, {useState} from "react";
import "../css/signUp.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import {faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {
    isPasswordStrong, PasswordStrengthMeter
} from "../../../external_components/validations/passwordStrengthIndecator";
import {ErrorAlert} from "../../../../sweet_alerts/error";
import {SuccessAlert} from "../../../../sweet_alerts/success";
import {saveUser} from "../../../../api/managements/userApi";
import {useNavigate} from "react-router";
import Loading from "../../../external_components/spinners/loading";


const eye = <FontAwesomeIcon icon={faEye}/>;
const sleye = <FontAwesomeIcon icon={faEyeSlash}/>;

export default function UserSignUP() {
    const [passwordShown, setPasswordShown] = useState(false);
    const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
    const [loading, setLoading] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    // Password toggle handler
    const togglePasswordVisibility = () => {
        setPasswordShown(!passwordShown);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordShown(!confirmPasswordShown);
    };


    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        password: "",
        role: "user"
    })

    const handleUserSignUp = (e) => {
        setUser(prev => ({...prev, [e.target.name]: e.target.value}))
    }


    const saveUserToDB = async (e) => {
        try {
            e.preventDefault();

            console.log(user)
            console.log(confirmPassword)

            if (!isPasswordStrong(user.password)) {
                await ErrorAlert("Not a Strong Password!")
                return
            }

            if (user.password !== confirmPassword) {
                await ErrorAlert("Password Mismatch!")
                return
            }

            setLoading(true)

            const content = await saveUser(user)

            if (content) {
                await SuccessAlert("Successfully Created Account!")
                // navigate("/login")
            }

            setLoading(false)

        } catch (e) {
            setLoading(false)
            await ErrorAlert("Something went wrong!")
        }
    }


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

                            <form onSubmit={saveUserToDB}>
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
                                                        name='firstName'
                                                        placeholder='First Name'
                                                        onChange={handleUserSignUp} value={user.firstName}
                                                        required
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
                                                        name='lastName'
                                                        className='form-control'
                                                        placeholder='Last Name'
                                                        onChange={handleUserSignUp} value={user.lastName}
                                                        required
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
                                            name='email'
                                            className='form-control form-control-lg'
                                            placeholder='Email'
                                            onChange={handleUserSignUp} value={user.email}
                                            required
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
                                            name='mobile'
                                            className='form-control form-control-lg'
                                            placeholder='Phone Number'
                                            onChange={handleUserSignUp} value={user.mobile}
                                            required

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
                                            name='password'
                                            className='form-control form-control-lg'
                                            placeholder='Password'
                                            onChange={handleUserSignUp} value={user.password}
                                            required

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
                                    <PasswordStrengthMeter password={user.password}/>
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
                                            name="confirmPassword"
                                            className='form-control form-control-lg'
                                            placeholder='Confirm Password'
                                            onChange={(e) => {
                                                setConfirmPassword(e.target.value)
                                            }}
                                            required
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
                                    {loading && <Loading/>}
                                    <button
                                        type='submit'
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
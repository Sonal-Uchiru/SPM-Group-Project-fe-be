import React, {useState} from "react";
import "../css/signUp.css"

export default function UserSignUP() {

    return (
        <div className="userSignUp">
            <section className=''>
                <div className='container-fluid'>
                    <div className='row d-flex justify-content-center align-items-center row1'>
                        <div className='col-md-9 col-lg-6 col-xl-4'>
                            <img
                                src='./../images/reg.svg'
                                className='img-fluid Img'
                                alt='Sample image'
                            />
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
                                            <div className='col-md-6 mb-4'>
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

                                            <div className='col-md-6 mb-4'>
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

                                    <div className='form-outline mb-4'>
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

                                    <div className='form-outline mb-4'>
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
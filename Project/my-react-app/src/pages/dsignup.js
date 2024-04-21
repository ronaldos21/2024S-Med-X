<<<<<<< HEAD
import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/img/Logo.png';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import Doctor from '../components/img/doctor il.png';
import { db } from '../firebase'; // Import your Firebase configuration
import { setDoc, doc } from 'firebase/firestore';
import { useAuth } from '../components/session/AuthContext';

const DoctorSignup = () => {
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(null); //Separate state for email errors
    const [passwordError, setPasswordError] = useState(null); //Separate state for password errors
    const [showPassword, setShowPassword] = useState(false); // State to control password visibility
    const { setUser, setUserType } = useAuth(); // Access setUser and setUserType from AuthContext

    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    const handlingSignUp = async (e) => {
        e.preventDefault();

        // Test Case: Empty Email and Password Fields
        if (email.trim() === '' || password.trim() === '') {
            setEmailError("Email and password are required fields.");
            return;
        }

        // Test Case: Mismatched Email and Confirm Email
        if (email !== confirmEmail) {
            setEmailError("Emails don't match");
            return;
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{6,})/;
        if (!passwordRegex.test(password)) {
            setPasswordError("Password must contain at least one uppercase letter, one special character, and be at least 6 characters long.");
            return;
        }


        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const type = "doctor"
            console.log('User signed up:', user.uid)
            let doctorData = {
                mp_email: email,
                mp_password: password,
                p_name: email,
                user_type: "0"
            };
            const reportDocRef = doc(db, 'Medical Professional', user.uid);
            await setDoc(reportDocRef, doctorData);
            setUser(user);
            setUserType(type); // Set the user type after successful sign-in
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('userType', type);
            navigate('/', { replace: true });

            // Step 2: Submit the Form
            const form = e.target;
            form.submit();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setEmailError("This email address is already in use.");
            } else {
                setPasswordError(error.message);
            }
        }

    };

    return (
        <div className="Preview w-full h-screen flex flex-row">

            <form className="w-1/2 h-full flex flex-col justify-center items-center gap-2.5 bg-primary" onSubmit={handlingSignUp}>
                <div className="Doctor text-white text-4xl font-normal font-['Inter']">Sign Up Here!</div>
                <div className="input-container">

                    <input className="w-[355px] h-[50px] bg-zinc-300 rounded-[20px] mb-2.5" type="email" id="grid-first-email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {/* Display error message under the email input */}
                    {emailError && <p className="text-red-500 text-xs italic">{emailError}</p>}
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3" htmlFor="grid-first-email">
                        Email
                    </label>
                </div>
                <div className="input-container">
                    <input className="w-[355px] h-[50px] bg-zinc-300 rounded-[20px] mb-2.5" type="email" id="grid-confirm-email" placeholder="Confirm Email" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)}
                        required
                    />
                    {emailError && <p className="text-red-500 text-xs italic">{emailError}</p>}
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3" htmlFor="grid-confirm-email">
                        Confirm Email
                    </label>

                </div>

                <div className="input-container relative">
                    <input className="w-[355px] h-[50px] bg-zinc-300 rounded-[20px] mb-2.5 pr-12" type={showPassword ? 'text' : 'password'} id="grid-password" placeholder="Enter a password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    {/* Display error message under the password input */}
                    {passwordError && <p className="text-red-500 text-xs italic">{passwordError}</p>}
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3" htmlFor="grid-password">Enter a password</label>
                    <button type="button" className="absolute top-1/4 transform -translate-y-1/4 right-1 text-blue-500 w-8 h-8" onClick={togglePasswordVisibility}>
                        {showPassword ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7a2 2 0 00-2 2m0 8a2 2 0 002 2m8-10a2 2 0 012-2m0 8a2 2 0 01-2 2m-4-4a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        )}

                    </button>
                </div>


                <div className="w-[156px] h-[38px] bg-zinc-300 rounded-[20px] relative">
                    <button className="w-full h-full absolute inset-0 group-hover:bg-slate-800 active:bg-green-700 focus:ring focus:ring-gray-700" type="submit">Sign Up</button>
                </div>
            </form>
            <div className="w-1/2 h-full flex-col justify-center items-center gap-2.5 inline-flex bg-primary">
                <img className="w-26 h-24 absolute top-0 left-0 m-4" src={Logo} alt='' />
            </div>
            <div className="w-1/2 h-full flex-col justify-center items-center gap-5  bg-primary">
                <div className="Doctor grow shrink basis-0 self-stretch p-2.5 flex-col justify-center items-center gap-5 inline-flex">
                    <img className="Image1 w-48 h-72 mr-20" src={Doctor} alt="Doctor" />

                </div>
                {/* Left half Side*/}
            </div>
        </div>


    );
};

export default DoctorSignup
=======
import React, {useState} from "react";

import {useNavigate} from 'react-router-dom';
import Logo from '../components/img/Logo.png';
import DoctorImage from "../components/img/doctor il2.png";
const DoctorSignUp = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    
    const [confirmEmail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleclick = () => {
        navigate("/doctorlogin")
    };
    return (
        <div
            className="MacbookPro141 w-full  h-screen bg-stone-900 flex justify-between items-center">
            <div
                className="Signup bg-primary flex-grow flex-shrink flex-basis-0 self-stretch justify-center items-center gap-2.5 flex h-full">
                <div
                    className="w-full h-full px-7 py-5 flex-col justify-center items-center gap-5 inline-flex">
                    <div className="Frame7 py-5 px-5 w-64 flex justify-center items-center gap-2.5 ">
                        <div
                            className="Login text-white text-5xl font-normal flex justify-center items-center">Signup</div>
                        <div className="As text-white text-5xl font-normal">As</div>
                        <div className="Patient text-white text-5xl font-normal">Doctor</div>
                    </div>
                    <div className="Emailflex w-full justify-start items-center gap-2.5">
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            placeholder="example@gmail.com"
                            className="w-full flex h-12 px-5 py-px bg-white rounded-2xl  flex-grow flex-shrink flex-basis-0 self-stretch text-zinc-800 text-opacity-80 text-base font-normal"/>
                    </div>
                    <div className="Emailflex w-full justify-start items-center gap-2.5">
                        <input
                            value={confirmEmail}
                            onChange={(e) => setConfirmEmail(e.target.value)}
                            type="text"
                            placeholder="Confirm Email"
                            className="w-full flex h-12 px-5 py-px bg-white rounded-2xl  flex-grow flex-shrink flex-basis-0 self-stretch text-zinc-800 text-opacity-80 text-base font-normal"/>
                    </div>
                    <div className="Password w-full justify-start items-center gap-2.5">
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="********"
                            className="flex py-px h-12 w-full px-5 bg-white rounded-2xl flex-grow flex-shrink flex-basis-0 self-stretch text-zinc-800 text-opacity-80 text-base font-normal"/>
                    </div>
                    {<div className="text-red-500">{""}</div>}
                    <button
                        className="Frame8 w-36 p-2.5 bg-purple-500 rounded-2xl flex justify-center items-center">
                        <div
                            className="Loginbutton text-white text-base font-normal flex justify-center items-center">Signup</div>
                    </button>
                    <div
                        className="DontHaveAnAccountClickHere text-center text-white text-base font-normal">HAVE AN ACCOUNT ?
                        <br/>
                        <button className="underline" onClick={handleclick}>Click here</button>
                    </div>
                </div>
            </div>
            <div
                className="Bg  w-[70%] h-full p-7 flex-col justify-end items-end inline-flex">
                <div className="Logo w-48 h-48 justify-center items-center inline-flex">
                    <img className="Logo" src={Logo}/>
                </div>
                <div
                    className="Frame6 self-stretch grow shrink basis-0 justify-center items-center gap-2.5 inline-flex">
                    <img className="Image4 h-full" src={DoctorImage}/>
                </div>
            </div>

        </div>
    )
}

export default DoctorSignUp;
>>>>>>> feat/login

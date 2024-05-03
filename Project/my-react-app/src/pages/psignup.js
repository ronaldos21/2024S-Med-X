import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/img/Logo.png';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { db } from '../firebase'; // Import your Firebase configuration
import { setDoc, doc } from 'firebase/firestore';
import { useAuth } from '../components/session/AuthContext';
import PatientImage from "../components/img/patient il2.png";
import Hide from "../components/img/icons/hide.svg";
import UnHide from "../components/img/icons/unhide.svg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SignedUpNotification = () => toast.success("Signed Up Successfully!", {
    theme: 'colored',
    position: 'top-right',
    dismiss: true,
    autoClose: 8000,

});

const PatientSignUp = () => {

    const [name, setName] = useState('');
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
            setPasswordError(
                "Password must contain at least one uppercase letter, one special character, an" +
                "be at least 6 characters long."
            );
            return;
        }

        console.log('Starting sign-up process...');


        try {
            console.log('Attempting to create user...');
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log('User created successfully:', userCredential.user.uid);

            const user = userCredential.user;
            const type = "patient"
            console.log('User signed up:', user.uid)
            let patientData = {
                p_name: name,
                p_email: email,
                p_password: password,
                user_type: "0"
            };
            const reportDocRef = doc(db, 'Patient', user.uid);
            await setDoc(reportDocRef, patientData);
            console.log('User data stored successfully:', patientData);

            setUser(user);
            setUserType(type); // Set the user type after successful sign-in
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('userType', type);


            console.log('Redirecting to homepage...');
            navigate('/', { replace: true });

            // Step 2: Submit the Form
            const form = e.target;
            form.submit();

            //WelcomeNotification();


        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setEmailError("This email address is already in use.");
            } else {
                setPasswordError(error.message);
            }
        }

    };

    const ReturnLandingPage = () => {
        navigate("/")
    };

    const handleclick = () => {
        navigate("/patientlogin")
    };


    return (<div
        className="MacbookPro141 w-full  h-screen bg-stone-900 flex justify-between items-center">
        <div
            className="Bg  w-[70%] h-full p-7 flex-col justify-start items-start inline-flex">
            <div className="Logo w-48 h-48 justify-center items-center inline-flex">
                <img alt="Logo" src={Logo} />
            </div>
            <div
                className="Frame6 self-stretch grow shrink basis-0 justify-center items-center gap-2.5 inline-flex">
                <img alt="Image4 h-full" src={PatientImage} />
            </div>
        </div>
        <form
            className="Signup bg-primary flex-grow flex-shrink flex-basis-0 self-stretch justify-center items-center gap-2.5 flex h-full"
            onSubmit={handlingSignUp}>
            <div
                className="w-full h-full px-7 py-5 flex-col justify-center items-center gap-5 inline-flex">
                <div
                    className="ReturnHome h-50 w-40  text-white">Return Home?
                    <br />
                    <button className="underline" onClick={ReturnLandingPage}>click here</button>
                </div>
                <div className="Frame7 w-64 flex justify-center items-center gap-2.5 ">
                    <div
                        className="Login text-white text-2xl font-normal flex justify-center items-center">Sign Up As a Patient</div>

                </div>
                <div className="FirstNameflex w-full justify-start items-center gap-2.5">
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required="required"
                        type="text"
                        placeholder="Enter your Full Name"
                        id="grid-first-name"
                        className="w-full flex h-12 px-5 py-px bg-white rounded-2xl  flex-grow flex-shrink flex-basis-0 self-stretch text-zinc-800 text-opacity-80 text-base font-normal" />

                </div>

                <div className="Email flex w-full justify-start items-center gap-2.5">
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required="required"
                        type="email"
                        placeholder="Enter an email"
                        className="w-full flex h-12 px-5 py-px bg-white rounded-2xl  flex-grow flex-shrink flex-basis-0 self-stretch text-zinc-800 text-opacity-80 text-base font-normal" />

                </div>

                <div className="Email flex w-full justify-start items-center gap-2.5">
                    <input
                        value={confirmEmail}
                        onChange={(e) => setConfirmEmail(e.target.value)}
                        required="required"
                        type="email"
                        id="grid-confirm-email"
                        placeholder="Confirm email"
                        className="w-full flex h-12 px-5 py-px bg-white rounded-2xl  flex-grow flex-shrink flex-basis-0 self-stretch text-zinc-800 text-opacity-80 text-base font-normal" />

                </div>

                <div className="Password flex flex-row w-full justify-start items-center ">
                    <div
                        className="flex  justify-between py-px h-12 w-full px-5 bg-white rounded-l-2xl flex-grow flex-shrink flex-basis-0 self-stretch text-zinc-800 text-opacity-80 text-base font-normal">

                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required="required"
                            type={showPassword
                                ? 'text'
                                : 'password'}
                            placeholder="Enter a password"
                            className="w-full" />

                    </div>  <div className="h-full w-10 flex justify-center items-center rounded-r-2xl  bg-customWhite py-px">
                        <button
                            type="button"
                            className="text-customPurple"
                            onClick={togglePasswordVisibility}>
                            {showPassword ? (
                                <img src={Hide} alt="Hide" className="w-7 h-w-7" />
                            ) : (
                                <img src={UnHide} alt="Unhide" className="w-7 h-w-7" />
                            )}
                        </button></div>


                </div>
                {<div className="text-red-500">{emailError}</div>}
                {<div className="text-red-500">{passwordError}</div>}


                <button
                    className="Frame8 w-36 p-2.5 bg-purple-500 rounded-2xl flex justify-center items-center"
                    onClick={SignedUpNotification}>
                    <div className="Loginbutton text-white text-base font-normal flex justify-center items-center">
                        Sign Up
                    </div>
                </button>

                <ToastContainer />

                <div
                    className="DontHaveAnAccountClickHere text-center text-white text-base font-normal">Already a user?
                    <br />
                    <button className="underline" onClick={handleclick}>LOGIN</button>
                </div>
            </div>
        </form>
    </div>
    )
}

export default PatientSignUp;
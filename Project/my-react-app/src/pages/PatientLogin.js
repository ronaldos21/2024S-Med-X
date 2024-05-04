import React, { useState } from "react";
import Logo from "../components/img/Logo.png";
import PatientImage from "../components/img/patient il2.png";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useAuth } from '../components/session/AuthContext'; // Import useAuth hook
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';

import { doc, getDoc } from "firebase/firestore";

import Hide from "../components/img/icons/hide.svg";
import UnHide from "../components/img/icons/unhide.svg";
const PatientLogin = () => {

    const { setUser, setUserType } = useAuth(); // Access setUser and setUserType from AuthContext
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const handleLogin = async (email, password, type) => {
        try {
            console.log(email, password);
            const auth = getAuth();
            // Sign in user
            await signInWithEmailAndPassword(auth, email, password);

            // Get current user
            const currentUser = auth.currentUser;

            if (currentUser) {
                // Get user document from Firestore
                const patientDoc = doc(db, 'Patient', currentUser.uid);
                const userDoc = await getDoc(patientDoc);
                console.log(userDoc._document);
                if (userDoc.exists()) {
                    setUser(currentUser);
                    setUserType(type); // Set the user type after successful sign-in
                    localStorage.setItem('user', JSON.stringify(currentUser));
                    localStorage.setItem('userType', type);
                    navigate('/');
                } else {
                    // User document does not exist
                    setError("You are not authorized to log in as a patient.");
                    await signOut(auth);
                }
            } else {
                console.log("No user signed in");
                // No user signed in
                // Handle this case
            }
        } catch (error) {
            // Handle errors
            console.error("Error handling patient login:", error);
            setError(error.message); // Display error message to user
        }
    };

    const ReturnLandingPage = () => {
        navigate("/")
    };




    const handleclick = () => {
        navigate("/patientsignup");
    };

    return (
        <div
            className="MacbookPro141 w-full  h-screen bg-stone-900 flex justify-between items-center">
            <div
                className="Bg  w-[70%] h-full p-7 flex-col justify-start items-start inline-flex">
                <div className="Logo w-48 h-48 justify-center items-center inline-flex">
                    <img className="Logo" src={Logo} alt="" />
                </div>
                <div
                    className="Frame6 self-stretch grow shrink basis-0 justify-center items-center gap-2.5 inline-flex">
                    <img className="Image4 h-full" src={PatientImage} alt="" />
                </div>

            </div>
            <div
                className="Signup bg-primary flex-grow flex-shrink flex-basis-0 self-stretch justify-center items-center gap-2.5 flex h-full">
                <div
                    className="w-full h-full px-7 py-5 flex-col justify-center items-center gap-5 inline-flex">
                    <div
                        className="ReturnHome h-50 w-40  text-white">Return Home?
                        <br />
                        <button className="underline" onClick={ReturnLandingPage}>click here</button>
                    </div>
                    <div className="Frame7 w-64 flex justify-center items-center gap-2.5 ">

                        <div
                            className="Login text-white text-3xl font-normal flex justify-center items-center">Login As Patient</div>

                    </div>
                    <div className="Emailflex w-full justify-start items-center gap-2.5">
                        <input value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            placeholder="Enter an email account"
                            className="w-full flex h-12 px-5 py-px bg-white rounded-2xl  flex-grow flex-shrink flex-basis-0 self-stretch text-zinc-800 text-opacity-80 text-base font-normal" />
                    </div>
                    <div className="Password flex-row flex w-full justify-between items-center focus:outline-none ">
                        <div className="flex py-px h-12 w-full px-5 justify-between bg-white rounded-l-2xl flex-grow flex-shrink flex-basis-0 self-stretch text-zinc-800 text-opacity-80 text-base font-normal focus:ring-0">
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter a password"
                                className="w-full outline-none"
                            />
                        </div>
                        <div className="h-full w-10 flex justify-center items-center rounded-r-2xl bg-customWhite py-px">
                            <button
                                type="button"
                                className="text-customPurple focus:outline-none"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? (
                                    <img src={Hide} alt="Hide" className="w-7 h-w-7" />
                                ) : (
                                    <img src={UnHide} alt="Unhide" className="w-7 h-w-7" />
                                )}
                            </button>
                        </div>
                    </div> {error && <div className="text-red-500">{error}</div>}
                    <button
                        className="Frame8 w-36 p-2.5 bg-purple-500 rounded-2xl flex justify-center items-center" onClick={() => handleLogin(email, password, "patient")}>
                        <div
                            className="Loginbutton text-white text-base font-normal flex justify-center items-center">Login</div>
                    </button>
                    <div
                        className="DontHaveAnAccountClickHere text-center text-white text-base font-normal">Need an Account?
                        <br />
                        <button className="underline" onClick={handleclick}>SIGN UP</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PatientLogin;

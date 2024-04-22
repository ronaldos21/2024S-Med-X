import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/img/Logo.png';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { db } from '../firebase'; // Import your Firebase configuration
import { setDoc, doc } from 'firebase/firestore';
import { useAuth } from '../components/session/AuthContext';
import PatientImage from "../components/img/patient il2.png";
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
            setPasswordError("Password must contain at least one uppercase letter, one special character, and be at least 6 characters long.");
            return;
        }


        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
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
    const handleclick = () => {
        navigate("/patientlogin")
    };
    return (
        <div
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
                className="Signup bg-primary flex-grow flex-shrink flex-basis-0 self-stretch justify-center items-center gap-2.5 flex h-full" onSubmit={handlingSignUp}>
                <div
                    className="w-full h-full px-7 py-5 flex-col justify-center items-center gap-5 inline-flex">
                    <div className="Frame7 w-64 flex justify-center items-center gap-2.5 ">
                        <div
                            className="Login text-white text-2xl font-normal flex justify-center items-center">Sign Up As a Patient</div>

                    </div>
                    <div className="FirstNameflex w-full justify-start items-center gap-2.5">
                        <input value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            type="text"
                            placeholder="Enter your First Name"
                            id="grid-first-name"
                            className="w-full flex h-12 px-5 py-px bg-white rounded-2xl  flex-grow flex-shrink flex-basis-0 self-stretch text-zinc-800 text-opacity-80 text-base font-normal" />
                        <label className="block uppercase tracking-wide text-gray-500 text-sm font-bold mb-3 m-2.5" htmlFor="grid-first-name">
                            First Name
                        </label>
                    </div>

                    <div className="Emailflex w-full justify-start items-center gap-2.5">
                        <input value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            type="email"
                            placeholder="Enter an email"
                            className="w-full flex h-12 px-5 py-px bg-white rounded-2xl  flex-grow flex-shrink flex-basis-0 self-stretch text-zinc-800 text-opacity-80 text-base font-normal"
                        />
                        {emailError && <p className="text-red-500 text-sm italic">{emailError}</p>}
                        <label className="block uppercase tracking-wide text-gray-500 text-sm font-bold mb-3 m-2.5" htmlFor="grid-first-email">
                            Email
                        </label>
                    </div>

                    <div className="Emailflex w-full justify-start items-center gap-2.5">
                        <input
                            value={confirmEmail}
                            onChange={(e) => setConfirmEmail(e.target.value)}
                            required
                            type="email"
                            id="grid-confirm-email"
                            placeholder="Confirm email"
                            className="w-full flex h-12 px-5 py-px bg-white rounded-2xl  flex-grow flex-shrink flex-basis-0 self-stretch text-zinc-800 text-opacity-80 text-base font-normal" />
                        {emailError && <p className="text-red-500 text-sm italic">{emailError}</p>}
                        <label className="block uppercase tracking-wide text-gray-500 text-sm font-bold mb-3 m-2.5" htmlFor="grid-confirm-email">
                            Confirm Email
                        </label>
                    </div>

                    <div className="Password w-full justify-start items-center gap-2.5">
                        <input value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter a password"
                            className="flex py-px h-12 w-full px-5 bg-white rounded-2xl flex-grow flex-shrink flex-basis-0 self-stretch text-zinc-800 text-opacity-80 text-base font-normal" />

                        {/* Display error message under the password input */}
                        {passwordError && <p className="text-red-500 text-sm italic">{passwordError}</p>}
                        <label className="block uppercase tracking-wide text-gray-500 text-sm font-bold mb-3 m-2.5" htmlFor="grid-password">Enter a password</label>

                        <button type="button" className="text-blue-500 " onClick={togglePasswordVisibility}>
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
                    
                    <button
                        className="Frame8 w-36 p-2.5 bg-purple-500 rounded-2xl flex justify-center items-center" >
                        <div
                            className="Loginbutton text-white text-base font-normal flex justify-center items-center">Sign Up</div>
                    </button>
                    <div
                        className="DontHaveAnAccountClickHere text-center text-white text-base font-normal">HAVE AN ACCOUNT?
                        <br />
                        <button className="underline" onClick={handleclick}>Click here</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PatientSignUp;

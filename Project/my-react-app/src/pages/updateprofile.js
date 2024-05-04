import {useNavigate} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import ProfileIcon from '../components/img/Profile.png';
import {useAuth} from '../components/session/AuthContext';
import {auth, db} from '../firebase';
import {getAuth} from 'firebase/auth';
// import {getAuth, onAuthStateChanged} from '../firebase/auth';
import {
    collection,
    query,
    onSnapshot,
    doc,
    getDoc,
    updateDoc
} from "firebase/firestore";

const Profile = () => {
    const navigate = useNavigate();
    const {userType, user} = useAuth();
    const [userData, setUserData] = useState({
        mp_b_date: '', mp_sex: '', mp_number: '',
        mp_email: '',
        mp_name: '',
        p_b_date: '',
        p_sex: '',
        p_number: '',
        p_email: '',
        p_name:''
    });

    useEffect(() => {
        if (user) {
            const fetchData = async () => { //async makes function return promise
                try {
                    let userData;
                    if (userType === "doctor") {
                        const doctorDoc = doc(db, 'Medical Professional', user.uid);
                        const doctorSnap = await getDoc(doctorDoc); //await makes async function wait for a promise
                        userData = doctorSnap.data();
                        setUserData(userData); //gets current data in Firebase, so it shows on the page.
                    }else{
                        const doctorDoc = doc(db, 'Patient', user.uid);
                        const doctorSnap = await getDoc(doctorDoc); //await makes async function wait for a promise
                        userData = doctorSnap.data();
                        setUserData(userData); 
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            };

            fetchData();
        }
    }, [user, userType]);

    const handleChange = (event) => { //allows you to update values
        const {name, value} = event.target; //from input/select, etc.
        setUserData((pastUserData) => ({
            ...pastUserData, ///spread operator. this is userData before we update the value in the form
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const auth = getAuth();

            if (userType === "doctor") {
                const doctorDoc = doc(db, 'Medical Professional', user.uid);

                const updatedUserData = { // should I do this updatedUserData for patientprofile as well?
                    mp_name: userData.mp_name || '', // if they didn't put anything, it stays blank
                    // mp_email: userData.mp_email || '',
                    mp_b_date: userData.mp_b_date || '',
                    mp_sex: userData.mp_sex || '',
                    mp_number: userData.mp_number || '',
                };
                await updateDoc(doctorDoc, updatedUserData);
            }

            if(userType === "patient") {
                const patientDoc = doc(db, 'Patient', user.uid);
                const updatedUserData = {
                    p_name: userData.p_name || '',
                    // p_email: userData.p_email || '',
                    p_b_date: userData.p_b_date || '',
                    p_sex: userData.p_sex || '',
                    p_number: userData.p_number || '',
                }
                await updateDoc(patientDoc, updatedUserData);
            }
            alert("Your information has been updated!")
            navigate('/profile');
        } catch (error) {
            console.error(`Error code: ${error.code}`);
            console.error(`Error message: ${error.message}`);
        }
    };

if (userType ==="doctor"){

    return (
        <form
            className="Form w-full h-full p-7 flex-col justify-start items-start gap-2.5 inline-flex"
            onSubmit={handleSubmit}>
            <div className="p-10 Profile justify-start items-center gap-2.5 inline-flex">
               {/* <div className="Rectangle5 w-36 h-36 bg-zinc-300 rounded-full"/> */}
                <div className="bg-opacity-30 rounded-full shadow-inner overflow-hidden  w-36 h-36">
                    <img className="object-cover w-full h-full bg-blend-overlay bg-primary" src={ProfileIcon} alt="profile" />
                </div>
                <div
                    className="Frame34 flex-col justify-center items-start gap-2.5 inline-flex">
                    <div className="ProfileUpdate text-white text-5xl font-normal font-['Inter']">{userData.mp_name}</div>
                    <div className="DrName text-white text-base font-normal font-['Inter']">{userData.mp_prof}</div>
                </div>
            </div>
            <div
                className="Frame39 self-stretch h-96 flex-col justify-center items-center gap-2.5 flex">
                <div className="Form flex-col justify-center items-center gap-5 flex">
                <div
                        className="Details self-stretch justify-start items-center gap-5 inline-flex">
                        <div
                            className="Name flex-col justify-center items-start gap-5 inline-flex w-full">
                            <div className="FirstName text-white text-base font-normal font-['Inter']">Email</div>
                            <input
                                type="text"
                                id="name"
                                name="mp_email"
                                value={userData.mp_email}
                                className="Frame38 w-full h-12 p-2.5 bg-white rounded-2xl"></input>
                        </div>
                    </div>
                    <div
                        className="Details self-stretch justify-start items-center gap-5 inline-flex">
                        <div
                            className="Name flex-col justify-center items-start gap-5 inline-flex w-full">
                            <div className="FirstName text-white text-base font-normal font-['Inter']">Full Name</div>
                            <input
                                type="text"
                                id="name"
                                name="mp_name"
                                onChange={handleChange}
                                value={userData.mp_name}
                                className="Frame38 w-full h-12 p-2.5 bg-white rounded-2xl"></input>
                        </div>
                    </div>
                    <div
                        className="Details self-stretch justify-start items-center gap-5 inline-flex">
                        <div className="Name flex-col justify-center items-start gap-5 inline-flex">
                            <div className="DateOfBirth text-white text-base font-normal font-['Inter']">Date of Birth</div>
                            <input
                                id="p_b_date"
                                name="mp_b_date"
                                type="date"
                                onChange={handleChange}
                                value={userData.mp_b_date}
                                className="Frame38 w-72 h-12 p-2.5 bg-white rounded-2xl"/>
                        </div>
                        <div className="Name flex-col justify-center items-start gap-5 inline-flex">
                            <div className="Sex text-white text-base font-normal font-['Inter']">Sex</div>
                            <select
                                name="mp_sex"
                                id="mp_sex"
                                onChange={handleChange}
                                value={userData.mp_sex}
                                className="Frame38 w-72 h-12 p-2.5 bg-white rounded-2xl">
                                <option value="">Please choose an option</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                    <div
                        className="Details self-stretch justify-start items-center gap-5 inline-flex">
                        <div className="Name flex-col justify-center items-start gap-5 inline-flex">
                            <div className="ContactNumber text-white text-base font-normal font-['Inter']">Contact Number</div>
                            <input type="tel" id="mp_number" name="mp_number" onChange={handleChange} value={userData.mp_number} placeholder="718-123-7698" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" className="Frame38 w-72 h-12 p-2.5 bg-white rounded-2xl"/>
                        </div>
                    </div>
                    <button
                        className="Frame38 w-36 h-12 p-2.5 bg-black bg-opacity-20 rounded-2xl flex-col justify-center items-center gap-2.5 flex">
                        <div
                            className="Submit text-center text-white text-base font-normal font-['Inter']">Submit</div>
                    </button>
                </div>
            </div>
        </form>
    )}else {
        return(
             <form
            className="Form w-full h-full p-7 flex-col justify-start items-start gap-2.5 inline-flex"
            onSubmit={handleSubmit}>
            <div className="p-10 Profile justify-start items-center gap-2.5 inline-flex">
                <div className="bg-opacity-30 rounded-full shadow-inner overflow-hidden  w-36 h-36">
                    <img className="object-cover w-full h-full bg-blend-overlay bg-primary" src={ProfileIcon} alt="profile" />
                </div>
                <div
                    className="Frame34 flex-col justify-center items-start gap-2.5 inline-flex">
                    <div className="ProfileUpdate text-white text-5xl font-normal font-['Inter']">{userData.p_name}</div>
                    <div className="DrName text-white text-base font-normal font-['Inter']">{userType}</div>
                </div>
            </div>
            <div
                className="Frame39 self-stretch h-96 flex-col justify-center items-center gap-2.5 flex">
                <div className="Form flex-col justify-center items-center gap-5 flex">
                <div
                        className="Details self-stretch justify-start items-center gap-5 inline-flex">
                        <div
                            className="Name flex-col justify-center items-start gap-5 inline-flex w-full">
                            <div className="FirstName text-white text-base font-normal font-['Inter']">Email</div>
                            <input
                                type="text"
                                id="p_email"
                                name="p_email"
                                value={userData.p_email}
                                className="Frame38 w-full h-12 p-2.5 bg-white rounded-2xl"></input>
                        </div>
                    </div>
                    <div
                        className="Details self-stretch justify-start items-center gap-5 inline-flex">
                        <div
                            className="Name flex-col justify-center items-start gap-5 inline-flex w-full">
                            <div className="FirstName text-white text-base font-normal font-['Inter']">Full Name</div>
                            <input
                                type="text"
                                id="p_name"
                                name="p_name"
                                onChange={handleChange}
                                value={userData.p_name}
                                className="Frame38 w-full h-12 p-2.5 bg-white rounded-2xl"></input>
                        </div>
                    </div>
                    <div
                        className="Details self-stretch justify-start items-center gap-5 inline-flex">
                        <div className="Name flex-col justify-center items-start gap-5 inline-flex">
                            <div className="DateOfBirth text-white text-base font-normal font-['Inter']">Date of Birth</div>
                            <input
                                id="p_b_date"
                                name="p_b_date"
                                type="date"
                                onChange={handleChange}
                                value={userData.p_b_date}
                                className="Frame38 w-72 h-12 p-2.5 bg-white rounded-2xl"/>
                        </div>
                        <div className="Name flex-col justify-center items-start gap-5 inline-flex">
                            <div className="Sex text-white text-base font-normal font-['Inter']">Sex</div>
                            <select
                                name="p_sex"
                                id="p_sex"
                                onChange={handleChange}
                                value={userData.p_sex}
                                className="Frame38 w-72 h-12 p-2.5 bg-white rounded-2xl">
                                <option value="">Please choose an option</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                    <div
                        className="Details self-stretch justify-start items-center gap-5 inline-flex">
                        <div className="Name flex-col justify-center items-start gap-5 inline-flex">
                            <div className="ContactNumber text-white text-base font-normal font-['Inter']">Contact Number</div>
                            <input type="tel" id="p_number" name="p_number" onChange={handleChange} value={userData.p_number} placeholder="718-123-7698" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" className="Frame38 w-72 h-12 p-2.5 bg-white rounded-2xl"/>
                        </div>
                    </div>
                    <button
                        className="Frame38 w-36 h-14 p-2.5 bg-black bg-opacity-20 rounded-2xl flex-col justify-center items-center gap-2.5 flex">
                        <div
                            className="Submit text-center text-white text-base font-normal font-['Inter']">Submit</div>
                    </button>
                </div>
            </div>
        </form>)
    }
};

export default Profile

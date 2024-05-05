import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { useAuth } from '../components/session/AuthContext';
import { getDoc, collection, query, orderBy, limit, getDocs, where, doc } from 'firebase/firestore';
import StatusButton from '../components/button/StatusButton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WelcomeNotification = (userName) => toast.info(`Welcome to Med-X AI, ${userName ? userName + ", " : ""}Please complete your profile page`, {
    theme: 'colored',
    position: 'top-right',
    dismiss: true,
    autoClose: 10000,

});

const Dashboard = () => {
    const { userType, user } = useAuth();
    const [lastScan, setLastScan] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state  
    // const [welcome, setWelcome] = useState(false)  default value should be false (it will be changed to true when prop as true coming from signup page) @ronaldos21
    // add line 63 here with condition if welcome = true(this value is coming from singup as prop refer exapmle screen shot) {line 63} @ronaldos21
    useEffect(() => {
        const fetchLastScan = async () => {
            try {
                const scansRef = collection(db, 'X-ray');
                let q;
                if (userType === "patient") {
                    q = query(scansRef, where("p_id", "==", user.uid), orderBy('scan_date', 'desc'), limit(1));
                } else if (userType === "doctor") {
                    q = query(scansRef, orderBy('scan_date', 'desc'), limit(1));
                }
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach(doc => {
                    setLastScan({ id: doc.id, ...doc.data() });



                });

                // Fetch data from the 'Patient' collection

            } catch (error) {
                console.error("Error fetching last scan:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLastScan();
    }, [user.uid, userType]);

    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                const docRef = doc(db, "Patient", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const patientName = docSnap.data().p_name; // Corrected typo here
                    console.log("Document data:", docSnap.data());
                    console.log(patientName);
                    //WelcomeNotification(patientName);//remove this from here       @ronaldos21
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching patient data:", error);
            }
        };

        fetchPatientData();
    }, [user.uid]);


    if (loading) {
        return <div className='h-full w-full text-white inline-flex justify-center items-center'>Loading...</div>; // Render loading indicator
    }

    if (userType === "patient") {
        return (
            <div className="h-full flex-col inline-flex gap-10 pl-5 pr-5 pt-5">
                <div className='flex-col items-start inline-flex gap-5'>
                    <div className="text-center text-white text-4xl font-normal font-['Inter']">Dashboard</div>
                </div>{lastScan ? <div className="justify-center items-center gap-10 inline-flex p-5">
                    <div className="self-stretch flex-col justify-start items-start inline-flex">
                        <div className="flex-col justify-center items-start gap-5 flex w-[200px] h-[300px]">
                            <img
                                className="rounded-[10px] object-cover w-full h-full"
                                src={lastScan ? lastScan.xr_image : "https://via.placeholder.com/200x600"}
                                alt="Placeholder" />
                        </div>
                    </div>
                    <div className="grow shrink basis-0 self-stretch flex-col justify-center items-center gap-5 inline-flex">
                        <div className="w-1/2 self-stretch h-12 justify-between items-center inline-flex">
                            <div className="text-center text-white text-3xl font-normal font-['Inter']">Report #{lastScan ? lastScan.id : ""}</div>
                            <div className="text-customGreen font-normal font-['Inter']">{lastScan ? lastScan.scan_date.toDate().toLocaleString() : ""}</div>
                        </div>
                        <div className="self-stretch flex-col justify-start items-start flex">
                            <div className="text-center text-customPurple text-xl font-normal font-['Inter']">{lastScan ? lastScan.medical_term : ""}</div>
                            <div className="self-stretch text-justify text-white font-normal font-['Inter'] text-wrap w-1/2">{lastScan ? lastScan.medical_description : ""}</div>
                        </div>
                        <div className="self-stretch flex-col justify-start items-start flex gap-5">
                            <div className="text-center text-white text-xl font-normal font-['Inter']">Doctors Message:</div>
                            <div className="self-stretch text-justify text-white font-normal font-['Inter'] text-wrap w-1/2">
                                {lastScan && lastScan.mp_comment !== "" ? lastScan.mp_comment : "the report is yet to be reviewed"}
                            </div>
                            <StatusButton status={lastScan ? lastScan.status : null} />
                        </div>
                    </div>
                </div> : "please upload a report"}


                <ToastContainer />

            </div>
        );
    } else if (userType === "doctor") {
        return (
            <div className="h-full flex-col inline-flex gap-10 pl-5 pr-5 pt-5">
                <div className='flex-col items-start inline-flex gap-5'>
                    <div className="text-center text-white text-4xl font-normal font-['Inter']">Dashboard</div>
                </div>
                <div className="justify-center items-center gap-10 inline-flex p-5">
                    <div className="self-stretch flex-col justify-start items-start inline-flex">
                        <div className="flex-col justify-center items-start gap-5 flex w-[200px] h-[300px]">
                            <img
                                className="rounded-[10px] object-cover w-full h-full"
                                src={lastScan ? lastScan.xr_image : "https://via.placeholder.com/200x600"}
                                alt="Placeholder" />
                        </div>
                    </div>
                    <div className="grow shrink basis-0 self-stretch flex-col justify-center items-center gap-5 inline-flex">
                        <div className="w-1/2 self-stretch h-12 justify-between items-center inline-flex">
                            <div className="text-center text-white text-3xl font-normal font-['Inter']">Report #{lastScan ? lastScan.id : ""}</div>
                            <div className="text-customGreen font-normal font-['Inter']">{lastScan ? lastScan.scan_date.toDate().toLocaleString() : ""}</div>
                        </div>
                        <div className="self-stretch flex-col justify-start items-start flex">
                            <div className="text-center text-customPurple text-xl font-normal font-['Inter']">{lastScan ? lastScan.medical_term : ""}</div>
                            <div className="self-stretch text-justify text-white font-normal font-['Inter'] text-wrap w-1/2">{lastScan ? lastScan.medical_description : ""}</div>
                        </div>
                        <div className="self-stretch flex-col justify-start items-start flex gap-5">
                            <div className="text-center text-white text-xl font-normal font-['Inter']">Doctors Message:</div>
                            <div className="self-stretch text-justify text-white font-normal font-['Inter'] text-wrap w-1/2">
                                {lastScan && lastScan.mp_comment !== "" ? lastScan.mp_comment : "the report is yet to be reviewed"}
                            </div>
                            <StatusButton status={lastScan.status} />
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return null;
    }
};

export default Dashboard;
/*

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../components/session/AuthContext';
import { useNavigate } from 'react-router-dom';

const ReportPage = () => {
    const { reportId } = useParams();
    const { user, userType } = useAuth();
    const [report, setReport] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/'); // Navigate to home if user is not logged in
            return;
        }

        const fetchReport = async () => {
            try {
                const reportsRef = collection(db, 'X-ray');
                let q;
                if (reportId) {
                    q = query(reportsRef, where("id", "==", reportId));
                } else {
                    if (userType === 'doctor') {
                        // Fetch the first report if userType is doctor
                        q = query(reportsRef);
                    } else if (userType === 'patient') {
                        // Fetch the patient's report if userType is patient
                        q = query(reportsRef, where("p_id", "==", user.uid));
                    }
                }
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    setReport({ id: doc.id, data: doc.data() });
                    // Break the loop after setting the first report if reportId is provided
                    if (reportId) {
                        return;
                    }
                });
            } catch (error) {
                console.error("Error fetching reports:", error);
                // Display an error message to the user
                // You can use a state variable to manage this
            }
        };

        fetchReport();
    }, [userType, user, reportId, navigate]);

    return (
        <div className="Frame31 w-full h-full p-7 flex-col justify-start items-start gap-2.5 inline-flex">
            <div className="Report text-white text-5xl font-normal">Report</div>
            <div className="Gallery flex justify-start items-start flex-wrap gap-2 p-2 ">
                {report && (
                    <div
                        key={report.id}
                        className="Frame34 flex-col justify-start items-center inline-flex gap-5 bg-primary p-5 rounded-[10px]"
                    >
                        <div className="Frame32 w-32 h-48 flex-col justify-start items-center flex ">
                            <img
                                className="Image3 object-cover w-full h-full rounded-2xl"
                                src={report.data.xr_image}
                                alt="Report_image"
                            />
                        </div>

                        <div className="Frame33 justify-start items-center  inline-flex flex-col gap-1">
                            <div className="Details text-white text-base font-normal">#{report.id}</div>
                            <div className="Details text-customPurple text-base font-normal">
                                {report.data.medical_term}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReportPage;
*/

import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Import your Firebase configuration
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../components/session/AuthContext';
import { useParams } from 'react-router-dom';
import StatusButton from '../components/button/StatusButton';
import PrintableReport from "../test/printpdf";

const ReportPage = () => {
    const { reportId } = useParams();
    const { userType } = useAuth();
    const [report, setReport] = useState(null);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const reportRef = doc(db, 'X-ray', reportId);
                const reportSnapshot = await getDoc(reportRef);
                if (reportSnapshot.exists()) {
                    setReport({ id: reportSnapshot.id, data: reportSnapshot.data() });
                } else {
                    console.log('Report not found');
                }
            } catch (error) {
                console.error('Error fetching report:', error);
                // Display an error message to the user
                // You can use a state variable to manage this
            }
        };

        if (reportId) {
            fetchReport();
        }
    }, [reportId]);

    if (!report) {
        return <div>Loading...</div>; // Add loading state while fetching report
    }

 
 
    if (userType === "patient") {
        return (
            <div className="w-full h-full pl-[30px] pr-[15px] pt-[15px] pb-[30px] justify-start items-start gap-5 inline-flex">
                <div className="self-stretch p-5 flex-col justify-start items-start gap-5 inline-flex">
                    <div className="Report text-white text-5xl font-normal">
                   
                    </div>
                    <div className="w-[314px] h-[418px] rounded-[20px] flex-col justify-center items-start gap-5 flex">
                        <img className="rounded-[20px] object-cover w-full h-full"
                            src={report.data.xr_image}
                          
                            alt="Report_image"
                        />
                    </div>
                </div>
                <div className="grow shrink basis-0 self-stretch flex-col justify-center items-center gap-5 inline-flex">
                    <div className="self-stretch p-5 flex-col justify-center items-center gap-5 flex">
                        <div className="self-stretch h-12 justify-between items-center inline-flex">
                            <div className="text-center text-white text-3xl font-normal font-['Inter']">Report ID: #{report.id}</div>
                            <div className="text-indigo-300 text-2xl font-normal font-['Inter']">
                                {report.data.scan_date.toDate().toLocaleString()} 
                            </div>
                        </div>
                        <div className="self-stretch h-full flex-col justify-start items-start gap-5 flex">
                            <div className="text-center text-indigo-300 text-5xl font-normal font-['Inter']">  {report.data.medical_term}
                              
                            </div>
                        </div>
                    </div>
                    <div className="self-stretch h-full flex-col justify-center items-end gap-5 flex">
                        <div className="self-stretch justify-start items-center gap-5 inline-flex">
                            <div className="text-center text-white text-3xl font-normal font-['Inter']">Report status:</div>
                            <StatusButton status={report.data.status}/> 
                        </div>
                    </div>
                    <div className="self-stretch h-full flex-col justify-center items-end gap-5 flex">
                        <div className="self-stretch h-full flex-col justify-center items-start gap-5 flex">
                            <div className="text-center text-white text-3xl font-normal font-['Inter']">Doctor's Message:</div>
                            <div className="self-stretch h-full p-2.5 bg-neutral-900 rounded-[20px] flex-col justify-center items-center gap-2.5 flex">
                                <div className="self-stretch grow shrink basis-0 text-justify text-white text-2xl font-normal font-['Inter']">Horefm ipsum dolor sit amet, consectetur
                                     {report.data.mp_comment} 
                                </div>
                            </div>
                        </div>
                        <div className="justify-end items-center gap-5 inline-flex">
                            <div className="px-5 py-2.5 bg-customGreen bg-opacity-50 rounded-[10px] justify-start items-start gap-2.5 flex">
                                <div className="text-center text-white text-2xl font-normal font-['Inter']">Print Report</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else if (userType === "doctor") {
        return (
            <div className="w-full h-full pl-[30px] pr-[15px] pt-[15px] pb-[30px] justify-start items-start gap-5 inline-flex">
                <div className="self-stretch p-5 flex-col justify-start items-start gap-5 inline-flex">
                    <div className="Report text-white text-5xl font-normal">Report: #12345
                        {/* {report.id} */}
                    </div>
                    <div className="w-[314px] h-[418px] rounded-[20px] flex-col justify-center items-start gap-5 flex">
                        <img className="rounded-[20px] object-cover w-full h-full"
                            src="https://via.placeholder.com/314x418"
                            // {report.data.xr_image}
                            alt="Report_image"
                        />
                    </div>
                </div>
                <div className="grow shrink basis-0 self-stretch flex-col justify-center items-center gap-5 inline-flex">
                    <div className="self-stretch p-5 flex-col justify-center items-center gap-5 flex">
                        <div className="self-stretch h-12 justify-between items-center inline-flex">
                            <div className="text-center text-white text-3xl font-normal font-['Inter']">Resultsdoctor</div>
                            <div className="text-indigo-300 text-2xl font-normal font-['Inter']">18th January 2014 4:30pm
                                {/* {report.data.scan_date.toDate().toLocaleString()} */}
                            </div>
                        </div>
                        <div className="self-stretch h-full flex-col justify-start items-start gap-5 flex">
                            <div className="text-center text-indigo-300 text-5xl font-normal font-['Inter']">Hernia
                                {/* {report.data.medical_term} */}
                            </div>
                        </div>
                    </div>
                    <div className="self-stretch h-full flex-col justify-center items-end gap-5 flex">
                        <div className="self-stretch justify-start items-center gap-5 inline-flex">
                            <div className="text-center text-white text-3xl font-normal font-['Inter']">Report status:</div>
                            {/* <StatusButton status={report.data.status}/> */}
                        </div>
                    </div>
                    <div className="self-stretch h-full flex-col justify-center items-end gap-5 flex">
                        <div className="self-stretch h-full flex-col justify-center items-start gap-5 flex">
                            <div className="text-center text-white text-3xl font-normal font-['Inter']">Your Comment:</div>
                            <div className="self-stretch h-full p-2.5 bg-neutral-900 rounded-[20px] flex-col justify-center items-center gap-2.5 flex">
                                <div className="self-stretch grow shrink basis-0 text-justify text-white text-2xl font-normal font-['Inter']">Hello World
                                    {/* {report.data.mp_comment} */}
                                </div>
                            </div>
                        </div>
                        <div className="justify-end items-center gap-5 inline-flex">
                            <div className="px-5 py-2.5 bg-customGreen bg-opacity-50 rounded-[10px] justify-start items-start gap-2.5 flex">
                                <div className="text-center text-white text-2xl font-normal font-['Inter']">Print Report</div>
                            </div>
                            <div className="px-5 py-2.5 bg-indigo-300 bg-opacity-50 rounded-[10px] justify-start items-start gap-2.5 flex">
                                <div className="text-center text-white text-2xl font-normal font-['Inter']">Update Report</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return null;
    }
};

export default ReportPage;
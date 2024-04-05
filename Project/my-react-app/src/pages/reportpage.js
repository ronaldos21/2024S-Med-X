import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; //useLocation
import { db } from '../firebase'; // Import your Firebase configuration
import { collection, query, where, getDocs } from 'firebase/firestore';
//import { collection, setDoc, doc, getDocs } from 'firebase/firestore';
//import { collection, query, orderBy, limit, getDocs, where } from 'firebase/firestore';
import { Timestamp } from "firebase/firestore";
import { useAuth } from '../components/session/AuthContext';

import StatusButton from '../components/button/StatusButton';
import PrintableReport from "../test/printpdf";

const ReportPage = () => {
    const [report, setReport] = useState([]);
    const { user, userType } = useAuth();
    //const navigate = useNavigate();  //Navigate to home if user is not logged in

    //Fetch report selected from report gallery or search bar

    useEffect(() => {
        if (user) {
            const fetchReport = async () => {
                try {
                    const reportRef = collection(db, 'X-ray');
                    let q;
                    if (userType === 'doctor') {
                        // Fetch report associated with the doctor
                        q = query(reportRef);
                    } else if (userType === 'patient') {
                        // Fetch report associated with the patient
                        q = query(reportRef, where("p_id", "==", user.uid));
                    }
                    const querySnapshot = await getDocs(q);
                    const fetchedReport = [];
                    querySnapshot.forEach((doc) => {
                        fetchedReport.push({ id: doc.id, data: doc.data() });   //id is the X-ray report id????
                    });
                    setReport(fetchedReport);
                } catch (error) {
                    console.error("Error fetching the report:", error);
                    // Handle error fetching the report
                }
            };

            fetchReport();
        }
    }, [user, userType]);

    if (userType === "patient") {
        return (
            <div className="w-[1134px] h-[835px] pl-[30px] pr-[15px] pt-[15px] pb-[30px] justify-start items-start gap-5 inline-flex">
    <div className="w-[440px] self-stretch p-5 flex-col justify-start items-start gap-5 inline-flex">
        <div className="text-center text-white text-[64px] font-normal font-['Inter']">Report</div>
        <div className="w-[400px] h-[488px] rounded-[20px] flex-col justify-center items-start gap-5 flex">
            <img className="w-[314px] h-[418px] rounded-[20px]" src="https://via.placeholder.com/314x418" />
        </div>
    </div>
    <div className="grow shrink basis-0 self-stretch flex-col justify-center items-end gap-5 inline-flex">
        <div className="self-stretch h-12 justify-between items-center inline-flex">
            <div className="text-center text-white text-[40px] font-normal font-['Inter']">Results</div>
            <div className="text-indigo-300 text-2xl font-normal font-['Inter']">18th January 2014 4:30pm</div>
        </div>
        <div className="self-stretch h-[154px] flex-col justify-start items-start gap-5 flex">
            <div className="text-center text-indigo-300 text-[64px] font-normal font-['Inter']">Hernia<br/></div>
        </div>
        <div className="justify-end items-center gap-5 inline-flex">
            <div className="px-5 py-2.5 bg-black bg-opacity-20 rounded-[10px] justify-start items-start gap-2.5 flex">
                <div className="text-center text-white text-2xl font-normal font-['Inter']">Print Report</div>
            </div>
            <div className="px-5 py-2.5 bg-black bg-opacity-20 rounded-[10px] justify-start items-start gap-2.5 flex">
                <div className="text-center text-white text-2xl font-normal font-['Inter']">Submit for Review</div>
            </div>
        </div>
    </div>
</div>
        );
    } else if (userType === "doctor") {
        return (
            <div className="w-[1134px] h-[835px] pl-[30px] pr-[15px] pt-[15px] pb-[30px] justify-start items-start gap-5 inline-flex">
    <div className="self-stretch p-5 flex-col justify-start items-start gap-5 inline-flex">
        <div className="text-center text-white text-[64px] font-normal font-['Inter']">Report: #12345</div>
        <div className="w-[400px] h-[488px] rounded-[20px] flex-col justify-center items-start gap-5 flex">
            <img className="w-[314px] h-[418px] rounded-[20px]" src="https://via.placeholder.com/314x418" />
        </div>
    </div>
    <div className="grow shrink basis-0 self-stretch flex-col justify-center items-center gap-5 inline-flex">
        <div className="self-stretch h-[145px] flex-col justify-center items-center gap-5 flex">
            <div className="self-stretch h-12 justify-between items-center inline-flex">
                <div className="text-center text-white text-[40px] font-normal font-['Inter']">Results</div>
                <div className="text-indigo-300 text-2xl font-normal font-['Inter']">18th January 2014 4:30pm</div>
            </div>
            <div className="self-stretch h-[77px] flex-col justify-start items-start gap-5 flex">
                <div className="text-center text-indigo-300 text-[64px] font-normal font-['Inter']">Hernia</div>
            </div>
        </div>
        <div className="self-stretch h-[50px] flex-col justify-center items-end gap-5 flex">
            <div className="self-stretch justify-start items-center gap-5 inline-flex">
                <div className="text-center text-white text-[40px] font-normal font-['Inter']">Report status:</div>
                <div className="w-[150px] h-[50px] p-2.5 bg-green-600 rounded-[10px] flex-col justify-center items-center gap-5 inline-flex">
                    <div className="text-white text-2xl font-normal font-['Inter']">Reviewed</div>
                </div>
            </div>
        </div>
        <div className="self-stretch h-[244px] flex-col justify-center items-end gap-5 flex">
            <div className="self-stretch h-[175px] flex-col justify-center items-start gap-5 flex">
                <div className="text-center text-white text-[40px] font-normal font-['Inter']">Your Comment:</div>
                <div className="self-stretch h-[107px] p-2.5 bg-neutral-900 rounded-[20px] flex-col justify-center items-center gap-2.5 flex">
                    <div className="self-stretch grow shrink basis-0 text-justify text-white text-2xl font-normal font-['Inter']">Horefm ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. </div>
                </div>
            </div>
            <div className="px-5 py-2.5 bg-black bg-opacity-20 rounded-[10px] justify-start items-start gap-2.5 inline-flex">
                <div className="text-center text-white text-2xl font-normal font-['Inter']">Update Report</div>
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
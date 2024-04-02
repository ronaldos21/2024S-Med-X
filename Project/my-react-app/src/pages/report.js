import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from '../firebase'; // Import your Firebase configuration
import { collection, setDoc, doc, getDocs } from 'firebase/firestore';
import { useAuth } from '../components/session/AuthContext';

import { Timestamp } from "firebase/firestore";

const Report = () => {
  const { user } = useAuth();
  const location = useLocation();
  const result = location.state.result;
  const url = location.state.img;
  const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility
  const [nextReportId, setNextReportId] = useState(null); // State to store the next report ID
  const navigate = useNavigate(); // Get the navigate function

  // Get the current date and time
  const currentDate = new Date();
  
  // Create a Firestore Timestamp object from the current date
  const formattedDate = Timestamp.fromDate(currentDate);

  // Function to insert data into Firestore
  const addReportToFirestore = async (e) => {
    e.preventDefault();
    try {
      // Fetch the number of existing reports
      const reportsRef = collection(db, 'X-ray');
      const reportsSnapshot = await getDocs(reportsRef);
      const numReports = reportsSnapshot.size;

      // Generate the next report ID
      const nextId = String(numReports).padStart(5, '0');

      // Construct the document path and set the data
      const reportDocRef = doc(db, 'X-ray', nextId);
      await setDoc(reportDocRef, {
        p_id: user.uid,
        xr_image: url,
        scan_date: formattedDate,
        medical_term: result,
        status:"0",
        mp_comment:"",
        mp_id:"",
        mp_review_date:"",
        medical_description:"",
        h_id:""
      });

      console.log("Report added successfully to Firestore.");
      setNextReportId(nextId); // Update the nextReportId state
      setShowPopup(true); // Show the popup
    } catch (err) {
      console.error("Error adding report to Firestore:", err);
      alert(err);
    }
  };

  const handleOKClick = () => {
    navigate("/"); // Redirect to "/"
  };

  return (
    <div className="h-full flex-col inline-flex gap-10 pl-5 pr-5 pt-5 relative">
      <div className='flex-col items-start inline-flex gap-5'>
        <div className="text-center text-white text-4xl font-normal font-['Inter']">Report</div>
      </div>
      <div className="justify-center items-center gap-10 inline-flex p-5">
        <div className="self-stretch flex-col justify-start items-start inline-flex">
          <div className="flex-col justify-center items-start gap-5 flex w-[200px] h-[300px]">
            <img
              className="rounded-[10px] object-cover w-full h-full"
              src={url}
              alt="Placeholder" />
          </div>
        </div>
        <div className="grow shrink basis-0 self-stretch flex-col justify-center items-center gap-5 inline-flex">
          <div className="w-1/2 self-stretch h-12 justify-between items-center inline-flex">
            <div className="text-center text-white text-xl font-normal font-['Inter']">Results</div>
            <div className="text-customGreen font-normal font-['Inter']">{formattedDate.toDate().toLocaleString()}</div>
          </div>
          <div className="self-stretch flex-col justify-start items-start flex">
            <div className="text-center text-customPurple text-3xl font-normal font-['Inter']">{result}</div>
          </div>
          <div className="self-stretch flex-col justify-end items-end flex">
            <div className="DownloadReport  h-12 px-5 py-2.5 bg-black bg-opacity-20 rounded-lg justify-start items-start gap-2.5 inline-flex">
              <button className="PrintReport text-center text-white text-2xl font-normal font-['Inter']" onClick={addReportToFirestore}>Submit Report</button>
            </div>
          </div>
        </div>
      </div>
       {/* Popup */}
       {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="Frame1 w-96 h-48 p-7 bg-stone-900 rounded-lg shadow flex-col justify-center items-center gap-2.5 inline-flex">
            <div className="ReportIsSubmitted text-white text-3xl font-normal font-['Inter']">Report is Submitted</div>
            <div className="ReportId text-white text-base font-normal font-['Inter']">Report ID: {nextReportId}</div>
            <div className="StatusButton h-12 p-2.5 bg-yellow-500 rounded-lg flex-col justify-center items-center gap-5 flex">
              <div className="Reviewing text-white text-2xl font-normal font-['Inter']">Reviewing</div>
            </div>
            <button className="group-hover:bg-slate-700 px-5 py-2.5 text-primary bg-white bg-opacity-80 rounded-[5px] justify-start items-start gap-2.5 inline-flex active:bg-slate-700 focus:ring focus:ring-gray-700"  onClick={handleOKClick}>
                                <div className='group-hover:text-white'>OK</div>
                            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Report;

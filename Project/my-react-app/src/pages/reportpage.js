import React, {useState, useEffect} from 'react';
import {db} from '../firebase'; // Import your Firebase configuration
import {doc, getDoc, updateDoc, collection} from 'firebase/firestore';
import {useAuth} from '../components/session/AuthContext';
import {useParams} from 'react-router-dom';
import StatusButton from '../components/button/StatusButton';
import PrintableReport from "../test/printpdf";
import {useLocation, useNavigate} from "react-router-dom";

import {Timestamp} from "firebase/firestore";
const ReportPage = () => {
    const {reportId} = useParams();
    const {user, userType} = useAuth();
    const [report, setReport] = useState(null);
    const navigate = useNavigate(); // Get the navigate function

    const xrayRef = collection(db, "X-ray");
    const currentDate = new Date();

    // Create a Firestore Timestamp object from the current date
    const formattedDate = Timestamp.fromDate(currentDate);

    const [refreshKey, setRefreshKey] = useState(0);
    const [comment, setComment] = useState("");
    useEffect(() => {
        const fetchReport = async () => {
            try {
                const reportRef = doc(db, 'X-ray', reportId);
                const reportSnapshot = await getDoc(reportRef);
                if (reportSnapshot.exists()) {
                    const reportData = reportSnapshot.data();

                    // Fetch patient name
                    const patientId = reportData.p_id; // Assuming p_id is the field in the report data containing the patient ID
                    const patientRef = doc(db, 'Patient', patientId);
                    const patientSnapshot = await getDoc(patientRef);
                    let patientName = '';
                    if (patientSnapshot.exists()) {
                        const patientData = patientSnapshot.data();
                        patientName = patientData.p_name; // Assuming p_name is the field in the patient data containing the patient name
                    } else {
                        console.log('Patient not found');
                    }

                    // Add patient name to report data
                    const updatedReportData = {
                        ...reportData,
                        patientName
                    };

                    // Set the report with updated data
                    setReport({id: reportSnapshot.id, data: updatedReportData});
                } else {
                    console.log('Report not found');
                }
            } catch (error) {
                console.error('Error fetching report:', error);
                // Display an error message to the user You can use a state variable to manage
                // this
            }
        };

        if (reportId) {
            fetchReport();
        }
    }, [reportId])

    //fillipos comment feature
    const handleSubmit = async (e, reportId, comment) => {
        e.preventDefault();
        alert("comment submitted");

        //update specific record's field
        const testData = doc(xrayRef, reportId); //pass here X-ray report id from report page
        await updateDoc(testData, {
            mp_comment: comment,
            status: "1",
            mp_review_date: formattedDate,
            mp_id: user.uid
        });
        navigate("/");
    };

    if (!report) {
        return <div>Loading...</div>; // Add loading state while fetching report
    }

    if (userType === "patient") {
        return (
            <div className='flex h-full items-start flex-col'>

                <div className="Report text-white text-4xl p-5 justify-start">Results</div>

                <div className='flex flex-row p-5 gap-5'>
                    <div
                        className="w-[200px] h-[300px] rounded-[20px] flex-col justify-center items-start  flex">
                        <img
                            className="rounded-[10px] object-cover w-full h-full"
                            src={report.data.xr_image}
                            alt="Report_image"/>
                    </div>
                    <div className='flex-col flex gap-5'>
                        <div className='flex flex-row gap-5 items-center justify-between'>
                            <div className="text-center text-white text-3xl">Report ID: #{report.id}</div>
                            <div className="text-customGreen font-normal">{
                                    report
                                        .data
                                        .scan_date
                                        .toDate()
                                        .toLocaleString()
                                }</div>
                        </div>
                        <div className='flex flex-col justify-start items-start '>
                            <div className='text-customPurple text-xl'>
                                {report.data.medical_term}
                            </div>

                            <div className='text-white'>
                                {report.data.medical_description}
                            </div>
                        </div>
                        <div className='flex flex-row gap-5 items-center'>
                            <div className='text-white '>Report Status:</div>

                            <StatusButton status={report.data.status}/>

                        </div>
                        <div className='flex flex-col text-white items-start'>
                            <div>Doctor's Message:
                            </div>
                            <div>{report.data.mp_comment}</div>
                        </div>

                    </div>
             

                
                </div>
                <div className='flex w-full justify-end items-end pr-5 h-full'>
                <div >
                        <PrintableReport
                            result={report.data.medical_term}
                            url={report.data.xr_image}
                            nextReportId={report.id}
                            formattedDate={report.data.scan_date}
                            comment={report.data.mp_comment}
                            pname={report.data.patientName}
                            desc={report.data.medical_description}
                            />
                    </div>
                </div>
              
            </div>
        );
    } else if (userType === "doctor") {
        return (
            <div className='flex h-full items-start flex-col'>
                <div className="Report text-white text-4xl p-5 justify-start">Results</div>
                <div className="flex flex-row p-5 gap-5">
                    <div 
                        className="w-[200px] h-[300px] rounded-[20px] flex-col justify-center items-start  flex">
                        <img
                            className="rounded-[10px] object-cover w-full h-full"
                            src={report.data.xr_image}
                            alt="Report_image"/>
                    </div>
                    <div className='flex-col flex gap-5'>
                        <div className='flex flex-row gap-5 items-center justify-between'>
                                <div className="text-center text-white text-3xl">Report ID: #{report.id}</div>
                                <div className="text-customGreen font-normal">{
                                        report
                                            .data
                                            .scan_date
                                            .toDate()
                                            .toLocaleString()
                                }</div>
                        </div>
                        <div className='flex flex-col justify-start items-start '>
                            <div className='text-customPurple text-xl'>
                                {report.data.medical_term}
                            </div>

                            <div className='text-white'>
                                {report.data.medical_description}
                            </div>
                        </div>
                        <div className='flex flex-row gap-5 items-center'>
                            <div className='text-white '>Report Status:</div>

                            <StatusButton status={report.data.status}/>

                        </div>
                        <div className='flex flex-col text-white items-start gap-2'>
                                <div>Medical Practitioner's Comment:</div>
                                <div className="flex self-stretch p-4 bg-neutral-900 rounded flex-col">
                                    <div
                                        className="text-white text-l">
                                        <form onSubmit={(e) => handleSubmit(e, report.id, comment)}>
                                         <label
                                            htmlFor="comment">
                                         </label>
                                            <textarea
                                                id="comment"
                                                className="w-full bg-neutral-800 text-white rounded p-3"
                                                rows="4"
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                placeholder="Enter your comment here...">
                                            </textarea>
                                        </form>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
                <div className='flex w-full justify-end items-end pr-5 h-full'>
                    <div className='flex flex-row gap-3'>
                        <PrintableReport
                                result={report.data.medical_term}
                                url={report.data.xr_image}
                                nextReportId={report.id}
                                formattedDate={report.data.scan_date}
                                comment={report.data.mp_comment}
                                pname={report.data.patientName}
                                desc={report.data.medical_description}
                                />
                        <div className='group'>
                            <button
                                className="group-hover:bg-slate-700 px-5 py-2.5 text-primary bg-white bg-opacity-80 rounded-[5px] justify-start items-start gap-2.5 inline-flex active:bg-green-700 focus:ring focus:ring-gray-700"
                                onClick={(e) => handleSubmit(e, report.id, comment)}>
                                <div className='group-hover:text-white'>Update Report</div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
           // <div
             //   className="w-full h-full pl-[30px] pr-[15px] pt-[15px] pb-[30px] justify-start items-start  inline-flex"
               // key={refreshKey}>
               // <div
                 //   className="self-stretch p-5 flex-col justify-start items-start  inline-flex">
                   // <div
                     //   className="Report text-center text-white text-4xl  font-normal font-['Inter']">Results</div>
                   // <div
                     //   className="w-[200px] h-[300px] rounded-[20px] flex-col justify-center items-start  flex">
                       // <img
                         //   className="rounded-[10px] object-cover w-full h-full"
                           // src={report.data.xr_image}
                           // alt="Report_image"/>
                   // </div>
               // </div>
               // <div
                 //   className="grow shrink basis-0 self-stretch flex-col justify-center items-center  inline-flex">
                   // <div className="self-stretch p-5 flex-col justify-center items-center  flex">
                     //   <div className="self-stretch h-12 justify-between items-center inline-flex">
                       //     <div className="text-center text-white text-3xl font-normal font-['Inter']">Report ID: #{report.id}</div>
                         //   <div className="text-customGreen font-normal font-['Inter']">
                           //     {
                             //       report
                               //         .data
                                 //       .scan_date
                                   //     .toDate()
                                     //   .toLocaleString()
                               // }

                           // </div>
                       // </div>
                       // <div className="self-stretch h-full flex-col justify-start items-start  flex">
                         //   <div
                           //     className="text-center text-customPurple text-xl font-normal font-['Inter']">
                             //   {report.data.medical_term}
                           // </div>
                           // <div
                             //   className="self-stretch text-justify text-white font-normal font-['Inter'] text-wrap w-1/2">
                               // {report.data.medical_description}
                            // </div>
                       // </div>
                   // </div>
                   // <div className="self-stretch h-full flex-col justify-center items-end  flex">
                     //   <div className="self-stretch justify-start items-center  inline-flex">
                        //    <div className="text-center text-white text-xl font-normal font-['Inter']">Report status:</div>
                          //  <StatusButton status={report.data.status}/>
                      //  </div>
                  //  </div>
                  //  <div className="self-stretch h-full flex-col justify-center items-end  flex">
                    //    <div className="self-stretch h-full flex-col justify-center items-start  flex">
                        //    <div className="text-center text-white text-xl font-normal font-['Inter']">Your Comment:</div>
                          //  <div
                            //    className="self-stretch h-full p-2.5 bg-neutral-900 rounded-[20px] flex-col justify-center items-center gap-2.5 flex">
                              //  <div
                                //    className="self-stretch grow shrink basis-0 text-justify text-white text-2xl font-normal font-['Inter']">
                                  //  <form onSubmit={(e) => handleSubmit(e, report.id, comment)}>
                                    //    <label
                                      //      htmlFor="comment"
                                        //    className="block text-white text-xl font-normal font-['Inter']">Medical Practitioner's comment:</label>
                                    //    <textarea
                                      //      id="comment"
                                        //    className="w-full bg-neutral-800 text-white rounded p-2"
                                          //  rows="4"
                                          //  value={comment}
                                          //  onChange={(e) => setComment(e.target.value)}
                                          //  placeholder="Enter your comment here..."></textarea>
                                 //   </form>
                             //   </div>
                        //    </div>
                    //    </div>
                      //  <div className="justify-end items-center  inline-flex">

                        //    <PrintableReport
                          //      result={report.data.medical_term}
                            //    url={report.data.xr_image}
                              //  nextReportId={report.id}
                               // formattedDate={report.data.scan_date}
                               // comment={report.data.mp_comment}
                               // pname={report.data.patientName}/>
                         //   <div className='group'>
                           //     <button
                             //       className="group-hover:bg-slate-700 px-5 py-2.5 text-primary bg-white bg-opacity-80 rounded-[5px] justify-start items-start gap-2.5 inline-flex active:bg-green-700 focus:ring focus:ring-gray-700"
                               //     onClick={(e) => handleSubmit(e, report.id, comment)}>
                                 //   <div className='group-hover:text-white'>Update Report</div>
                            //   </button>
                          //  </div>
                       // </div>
               //     </div>
             //   </div>
           // </div>
                            
        );
    } else {
        return null;
    }
};

export default ReportPage;
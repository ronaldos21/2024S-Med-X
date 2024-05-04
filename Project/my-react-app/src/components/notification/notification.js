import React, { useState, useEffect, useRef } from 'react';
import { GoBellFill } from "react-icons/go";
import { useAuth } from '../../components/session/AuthContext';
import { db } from '../../firebase';
import { collection, query, onSnapshot } from "firebase/firestore";
import { Link } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Notification = () => {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const dropdownRef = useRef(null);
    const { user, userType } = useAuth();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false); 
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (!user) return;
    
        const xrayRef = collection(db, "X-ray");
        const q = query(xrayRef);
    
        const unsubscribe = onSnapshot(q, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                const modifiedData = change.doc.data();
                const documentId = change.doc.id;
                if (change.type === "modified") {
                    const newNotification = {
                        id: documentId,
                        message: modifiedData.mp_comment,
                        date: modifiedData.mp_review_date.toDate().toLocaleDateString(),
                        status: modifiedData.status
                    };
                    // Append the new notification to the existing list
                    setNotifications(prevNotifications => [...prevNotifications, newNotification]);
                }
            });
        });
    
        return () => unsubscribe();
    }, [user]);
   const handlenavigate=(url)=> {
        navigate('reportdetails/'+ url)
    }
    return (
        
        <div className="relative h-full" ref={dropdownRef}>
            <div className="flex justify-center items-center gap-1 bg-neutral-900 rounded-full h-full p-1.5">
            <GoBellFill
    className=" w-12 h-8 text-white"
    onClick={notifications.length > 0 ? toggleDropdown : () => {}} 
/>
                <div />
           

                {notifications.length > 0 && (
           <div style={{ position: 'absolute', top: '10px', right: '14px', width: '8px', height: '8px', borderRadius: '50%', background: 'linear-gradient(180deg, rgba(166, 252, 175, 1), rgba(181, 167, 247, 1), rgba(88, 84, 129, 1))' }} />

                )}
            </div>
     
            {isDropdownOpen && (
                <div className="absolute top-full right-2 mt-1 w-[400px] bg-primary p-3 shadow-lg rounded-lg">
                    <ul className='gap-2.5'>
                        {notifications.map(notification => (
                          <li key={notification.id} > 
                                <div onClick={handlenavigate(notification.id)} className="Notification w-full h-16 justify-center items-center gap-2.5 inline-flex">
                                    <div className="NotificationBell p-2.5 bg-stone-900 rounded-2xl justify-center items-center gap-2.5 flex">
                                        <div className="Icon rounded-2xl justify-center items-center flex">
                                            <div className="Bell w-11 h-11 relative bg-black bg-opacity-0" />
                                        </div>
                                    </div>
                                    <div className="Details grow shrink basis-0 p-2.5 bg-stone-900 rounded-2xl flex-col justify-center items-start gap-1 inline-flex">
                                        <div className="Frame7 self-stretch justify-between items-center inline-flex">
                                            <div className="Frame5 justify-start items-start gap-2.5 flex">
                                                <div>
                                                    <span className="text-indigo-300 text-base font-normal">Report: </span>
                                                    <span className="text-white text-base font-normal">{notification.id}</span>
                                                    <span className="text-indigo-300 text-base font-normal"> </span>
                                                </div>
                                                <div className="Report text-indigo-300 text-base font-normal">{notification.date}</div>
                                                
                                                <div className="ReportStatus text-base font-normal text-white">{notification.status === "1" ? "Reviewed" : "Reviewing"}</div>
                                            </div>
                                            <div className="Frame6" />
                                        </div>
                                        <div className="self-stretch text-white text-base font-normal">You have a message from the Doctor</div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Notification;

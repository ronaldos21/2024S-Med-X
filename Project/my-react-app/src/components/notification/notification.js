//import React from 'react'
//import NotificationIcon from '../img/icons/nbell.png';
import { IoIosNotifications } from "react-icons/io";
import React, { useState, useEffect, useRef } from 'react';
//import { FaChevronDown } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import { useAuth } from '../../components/session/AuthContext';
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { collection, query, onSnapshot, doc, getDoc } from "firebase/firestore";

const Notification = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

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

    const handleChange = () => {

    };

                //<div className="inline-flex justify-center items-center w-[50px] h-[50px] cursor-pointer">
                //<IoIosNotifications style={{ fontSize: '30px', color: 'white' }}/>
                //</div>

                //<div />
               // <IoIosNotifications
                //    className="h-5 w-5 cursor-pointer"
                 //   style={{ fontSize: '30px', color: 'white' }}
                 //   onClick={toggleDropdown}
               // />


  
  return (
    <div className="relative h-full" ref={dropdownRef}>
        <div className="flex justify-center items-center gap-2.5 bg-neutral-900 rounded-full h-full p-2.5">
                <div />
                <IoIosNotifications
                    className="inline-flex justify-center items-center w-[50px] h-[50px] cursor-pointer"
                    style={{ fontSize: '30px', color: 'white' }}
                    onClick={toggleDropdown}
                />
        </div>
        {isDropdownOpen && (
                <div className="absolute top-full right-2 mt-1  w-48 bg-primary shadow-lg rounded-lg">
                    <ul>
                        <li className="py-2 px-4 hover:bg-secondary rounded-lg text-white">
                            <button className="LogoutButton text-white text-lg bg-red-600 px-4 py-2 rounded-md">
                                test
                            </button>
                        </li>
                    </ul>
                </div>
        )}
    </div>
  );
};

export default Notification 

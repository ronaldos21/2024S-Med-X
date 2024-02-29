import React, { useState } from 'react';
import ProfileIcon from '../img/Profile.png';
import { FaChevronDown } from "react-icons/fa";
import { Link } from 'react-router-dom';
const Profile = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="relative h-full">
            <div className="flex justify-start items-center gap-2.5 h-full rounded-full bg-primary p-2.5 ">
                <div className="bg-opacity-30 rounded-full shadow-inner overflow-hidden h-full w-[45px]">
                    <img className="object-cover w-full h-full bg-blend-overlay bg-primary" src={ProfileIcon} alt="profile" />
                </div>
                <div />
                <FaChevronDown className="h-5 w-5 cursor-pointer" style={{ color: 'white' }} onClick={toggleDropdown} />
            </div>
            {isDropdownOpen && (
                <div className="absolute top-full right-2 mt-1  w-48 bg-primary shadow-lg rounded-lg">
                    {/* Dropdown content here */}
                    <ul >
                        <li className="py-2 px-4 hover:bg-secondary rounded-lg text-white">
                          <Link >Option 1</Link>
                            </li>
                        <li className="py-2 px-4 hover:bg-secondary rounded-lg text-white">   <Link >Option 2</Link></li>
                        <li className="py-2 px-4 hover:bg-secondary rounded-lg text-white">   <Link >Option 3</Link></li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Profile;
import React from "react";
import { useAuth } from "../components/session/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { Navigate } from "react-router-dom";

const Usertype = ()=>{
    
    const { userType,user } = useAuth();
    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                console.log("User signed out successfully.");
                Navigate('/', { replace: true });
                window.location.reload();
            })
            .catch((error) => {
                console.error("Error occurred while signing out:", error);
            });
    };
    return(<div className="flex w-full h-full justify-center items-center text-white flex-col">
        hi {userType}<br/>{user.uid}
        <button className="LogoutButton text-white text-lg bg-red-600 px-4 py-2 rounded-md" onClick={handleLogout}>
                                Logout
                            </button>
    </div>);
}
export default Usertype;
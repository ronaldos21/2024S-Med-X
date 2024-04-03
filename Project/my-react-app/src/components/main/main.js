import React from 'react';
import Navbar from '../navbar/navbar';
import Submain from '../submain/submain';
import Test from '../../test/usertype'
const Main = () => {
    return (
        <div className="h-screen w-screen bg-secondary justify-start items-center inline-flex">
        <Navbar/>
        <Submain/>
        
         {/* <Test/> */}
    </div>
    );
};

export default Main;

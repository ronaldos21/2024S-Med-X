import React from "react";
import { useLocation } from "react-router-dom"; /*explain this*/
const Report = () => {
  const location = useLocation(); /*explain this*/
  const result = location.state.result; /*explain this*/
  const url = location.state.img; /*explain this*/


  const currentDate = new Date();

  // Get the current date in a desired format (e.g., "18th January 2014 4:30pm")
  const formattedDate = currentDate.toLocaleString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  return (

    <div
      className=" h-full flex-col   inline-flex gap-10 pl-5 pr-5 pt-5">
      <div className='flex-col  items-start inline-flex gap-5'>
        <div className="text-center text-white text-4xl font-normal font-['Inter']">Report</div>

      </div>
      <div className="justify-center items-center gap-10 inline-flex p-5">

        <div className="self-stretch flex-col justify-start items-start inline-flex">

          <div
            className="flex-col justify-center items-start gap-5 flex w-[200px] h-[300px]">

            <img
              className="rounded-[10px] object-cover w-full h-full"
              src={url}
              alt="Placeholder" />
          </div>
        </div>
        <div
          className="grow shrink basis-0 self-stretch flex-col justify-center items-center gap-5 inline-flex">
          <div
            className=" w-1/2 self-stretch h-12 justify-between items-center inline-flex">
            <div className="text-center  text-white text-xl font-normal font-['Inter']">Results</div>

            <div className=" text-customGreen font-normal font-['Inter']">{formattedDate}</div>
          </div>
          <div className="self-stretch  flex-col justify-start items-start  flex">
            <div
              className="text-center text-customPurple  text-3xl font-normal font-['Inter']">{result}</div>
          </div>

        </div>
      </div>
    </div>

  );
};

export default Report;

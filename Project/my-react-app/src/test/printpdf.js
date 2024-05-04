import React from 'react';

import Logo from '../components/img/Logo.png';
class PrintableReport extends React.Component {
  render() {
    const { result, url, formattedDate, userType, user, nextReportId, showPopup, handleOKClick,comment,status,pname,desc } = this.props;

    return (
           <div className='group'>
           <button className="group-hover:bg-slate-700 px-5 py-2.5 text-primary bg-white bg-opacity-80 rounded-[5px] justify-start items-start gap-2.5 inline-flex active:bg-green-700 focus:ring focus:ring-gray-700" onClick={this.handlePrint} >
               <div className='group-hover:text-white'>Print Report</div>
           </button>
       </div>
    );
  }

  handlePrint = () => {
    
    const { result, url, formattedDate, userType, user, nextReportId, showPopup, handleOKClick,comment,status,pname,desc } = this.props;
    let statusText = status === "1" ? "Reviewed" : "Reviewing";
    const pdfContent = `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Printable Report</title>
    <style>
        body {
            margin: 0;
            padding: 0;
        }
        .A41 {
            position: relative;
            width: 210mm;
            min-height: 297mm;
            padding: 20px;
            background: #1E1E1E;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;
            display: flex;
            font-family: Inter;
            color: white;
        }
        .Footer {
            position: absolute;
            bottom: 10px;
            left: 20px;
            right: 20px;
            padding: 10px;
            justify-content: center;
            align-items: center;
            display: flex;
        }
    </style>
    </head>
    <body style="margin: 0 0;">
    <div class="A41" style="width: 210mm; height: 297mm; padding: 20px; background: #1E1E1E; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 10px; display: inline-flex; font-family: Inter; color: rgb(0, 0, 0);">
        <div class="Header" style="align-self: stretch; justify-content: space-between; align-items: center; display: inline-flex;">
            <div class="Logo" style="width: 100px; height: 100px; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); justify-content: center; align-items: center; display: flex;">
                <img class="Logo" style="width: 100px; height: 100px" src=${Logo} />
            </div>
            <div class="Frame1" style="padding: 10px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 10px; display: inline-flex;">
                <div class="Id00000" style=" font-size: 16px; word-wrap: break-word;">ID: ${nextReportId}</div>
                <div class="NamePatientName" style="font-size: 16px; word-wrap: break-word;">Name : ${pname} </div>
            </div>
        </div>
        <div class="ResultHeader" style="align-self: stretch; padding: 20px; justify-content: space-between; align-items: center; display: inline-flex;">
            <div class="Results" style="text-align: center; font-size: 32px; word-wrap: break-word;">Report</div>
            <div class="Results" style="text-align: center; font-size: 16px; word-wrap: break-word;">${formattedDate.toDate().toLocaleString()}</div>
        </div>
        <div class="Results" style="align-self: stretch; justify-content: flex-start; align-items: center; gap: 10px; display: inline-flex;">
            <div class="Frame4" style="flex: 1 1 0; align-self: stretch; justify-content: space-between; align-items: center; display: flex;">
                <div class="XrayImage" style="width: 150px; height: 200px; padding: 20px; border-radius: 20px; overflow: hidden; flex-direction: column; justify-content: center; align-items: flex-start; gap: 20px; display: inline-flex;">
                    <img class="Image3" style="align-self: stretch; border-radius: 20px;" src="${url}" />
                </div>
                <div class="ResultRow" style="flex: 1 1 0; align-self: stretch; padding: 20px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 10px; display: inline-flex;">
                    <div class="Results" style="text-align: center; font-size: 32px; word-wrap: break-word;">${result}</div>
                    <div class="" style="text-align: justify; font-size: 16px; word-wrap: break-word;">${desc}</div>
                </div>
            </div>
        </div>
        <div class="ReviewHeading" style="align-self: stretch; padding: 20px; justify-content: space-between; align-items: center; display: inline-flex;">
            <div class="Results" style="text-align: center; font-size: 32px; word-wrap: break-word;">Status:${statusText}</div>
            <div class="Results" style="text-align: center; font-size: 16px; word-wrap: break-word;"></div>
        </div>
        <div class="HospitalDetails" style="align-self: stretch; padding: 20px; justify-content: space-between; align-items: flex-start; display: inline-flex;">
            <div class="HospitalName" style="width: 111px; align-self: stretch; text-align: center; font-size: 16px; word-wrap: break-word;">Hospital Name</div>
            <div class="Frame10" style="align-self: stretch; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 10px; display: inline-flex;">
                <div class="HospitalGmailCom" style="text-align: justify; font-size: 16px; word-wrap: break-word;">hospital@gmail.com</div>
                <div class="Number" style="text-align: center; font-size: 16px; word-wrap: break-word;">999-1232-31232</div>
            </div>
        </div>
        <div class="DoctorsComment" style="align-self: stretch; height: 145px; padding: 20px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 10px; display: flex;">
            <div class="DoctorsName" style="align-self: stretch; font-size: 16px; word-wrap: break-word;">Doctors Comment:</div>
            <div class="comment" style="align-self: stretch; text-align: justify; font-size: 16px; word-wrap: break-word;">${comment}</div>
        </div>
        <div class="Footer" style="align-self: stretch; padding: 10px; justify-content: space-between; align-items: center; display: inline-flex;">
            <div class="CopyrightMedxai" style="text-align: justify; font-size: 12px; word-wrap: break-word;">Copyright @ medxai</div>
        </div>
    </div>
    </body>
    </html>
    `;

    const newWindow = window.open('', '_blank');
    newWindow.document.write(pdfContent);
    newWindow.document.close();
    newWindow.print();
  };
}

export default PrintableReport;

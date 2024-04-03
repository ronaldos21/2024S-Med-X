import React from 'react';

class PrintableReport extends React.Component {
  render() {
    return (
      <div className="flex justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={this.handlePrint}>
          Print PDF
        </button>
      </div>
    );
  }

  handlePrint = () => {
    // Generate PDF content here
    // You can use any method to generate PDF content
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
                <img class="Logo" style="width: 100px; height: 100px" src="https://via.placeholder.com/100x100" />
            </div>
            <div class="Frame1" style="padding: 10px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 10px; display: inline-flex;">
                <div class="Id00000" style="color: white; font-size: 16px; word-wrap: break-word;">ID: #00000</div>
                <div class="NamePatientName" style="color: white; font-size: 16px; word-wrap: break-word;">Name : Patient Name </div>
            </div>
        </div>
        <div class="ResultHeader" style="align-self: stretch; padding: 20px; justify-content: space-between; align-items: center; display: inline-flex;">
            <div class="Results" style="text-align: center; font-size: 32px; word-wrap: break-word;">Results</div>
            <div class="Results" style="text-align: center; font-size: 16px; word-wrap: break-word;">18th January 2014 4:30pm</div>
        </div>
        <div class="Results" style="align-self: stretch; justify-content: flex-start; align-items: center; gap: 10px; display: inline-flex;">
            <div class="Frame4" style="flex: 1 1 0; align-self: stretch; justify-content: space-between; align-items: center; display: flex;">
                <div class="XrayImage" style="width: 150px; height: 200px; padding: 20px; border-radius: 20px; overflow: hidden; flex-direction: column; justify-content: center; align-items: flex-start; gap: 20px; display: inline-flex;">
                    <img class="Image3" style="align-self: stretch; border-radius: 20px;" src="https://via.placeholder.com/110x160" />
                </div>
                <div class="ResultRow" style="flex: 1 1 0; align-self: stretch; padding: 20px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 10px; display: inline-flex;">
                    <div class="Results" style="text-align: center; font-size: 32px; word-wrap: break-word;">Hernia</div>
                    <div class="HoremIpsumDolorSitAmetConsecteturAdipiscingElitEtiamEuTurpisMolestieDictumEstAMattisTellusSedDignissimMetusNecFringillaAccumsanRisusSemSollicitudinLacusUtInterdumTellusElitSedRisusMaecenasEgetCondimentumVelit" style="text-align: justify; font-size: 16px; word-wrap: break-word;">Horem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit</div>
                </div>
            </div>
        </div>
        <div class="ReviewHeading" style="align-self: stretch; padding: 20px; justify-content: space-between; align-items: center; display: inline-flex;">
            <div class="Results" style="text-align: center; font-size: 32px; word-wrap: break-word;">Review</div>
            <div class="Results" style="text-align: center; font-size: 16px; word-wrap: break-word;">18th January 2014 4:30pm</div>
        </div>
        <div class="HospitalDetails" style="align-self: stretch; padding: 20px; justify-content: space-between; align-items: flex-start; display: inline-flex;">
            <div class="HospitalName" style="width: 111px; align-self: stretch; text-align: center; font-size: 16px; word-wrap: break-word;">Hospital Name</div>
            <div class="Frame10" style="align-self: stretch; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 10px; display: inline-flex;">
                <div class="HospitalGmailCom" style="text-align: justify; font-size: 16px; word-wrap: break-word;">hospital@gmail.com</div>
                <div class="Number" style="text-align: center; font-size: 16px; word-wrap: break-word;">999-1232-31232</div>
            </div>
        </div>
        <div class="DoctorsComment" style="align-self: stretch; height: 145px; padding: 20px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 10px; display: flex;">
            <div class="DoctorsName" style="align-self: stretch; font-size: 16px; word-wrap: break-word;">Doctors Name</div>
            <div class="HoremIpsumDolorSitAmetConsecteturAdipiscingElitEtiamEuTurpisMolestieDictumEstAMattisTellusSedDignissimMetusNecFringillaAccumsanRisusSemSollicitudinLacusUtInterdumTellusElitSedRisusMaecenasEgetCondimentumVelit" style="align-self: stretch; text-align: justify; font-size: 16px; word-wrap: break-word;">Horem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit</div>
        </div>
        <div class="Footer" style="align-self: stretch; padding: 10px; justify-content: space-between; align-items: center; display: inline-flex;">
            <div class="CopyrightMedxai" style="text-align: justify; font-size: 12px; word-wrap: break-word;">Copyright @ medxai</div>
        </div>
    </div>
    </body>
    </html>
     `;

    // Create a new window to open the PDF
    const newWindow = window.open('', '_blank');

    // Write the PDF content into the new window
    newWindow.document.write(pdfContent);

    // Close the document for proper rendering
    newWindow.document.close();
    newWindow.print();
  };
}

export default PrintableReport;

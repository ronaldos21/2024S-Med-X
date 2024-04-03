import React from 'react';
import { useReactToPrint } from 'react-to-print';
import PrintableReport from'./printpdf';

function ReportPagepdf() {
  const componentRef = React.useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <PrintableReport ref={componentRef}/>
    </div>
  );
}

export default ReportPagepdf;

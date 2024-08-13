import React from 'react';
import XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const ExportExcelButton  = ({ data, fileName }) => {
  const exportExcel = () => {
    // Convert data to workbook
    const workbook = XLSX.utils.book_new();
    const sheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, sheet, 'Sheet1');

    // Convert workbook to blob
    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'blob' });

    // Save blob to file using FileSaver.js
    saveAs(wbout, fileName + '.xlsx');
  };

  return (
    <button onClick={exportExcel}>
      Export to Excel
    </button>
  );
}

export default ExportExcelButton;

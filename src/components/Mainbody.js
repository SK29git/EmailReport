import React, { useEffect, useState } from "react";
import { GetEmailReportApi, GetFormDataApi } from "../config/api";
import { render } from "react-dom";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Mainbody({
    fromDate,
    onFromDateChange,
    onToDateChange,
    onGenerateReport,
}) {
    const [isReportGenerated, setIsReportGenerated] = useState(false);
    const [data, setData] = useState([]);
    const [dataform, setDataform] = useState([]);
    const [toDate, setToDate] = useState('');
    const [reportType, setReportType] = useState('start');

    const maxDate = new Date(fromDate);
    maxDate.setDate(maxDate.getDate() + 31);

    const exportExcel = () => {
        if (data.length == 0) {
            toast.warning("No data available to export!", { autoClose: 5000 });
            return;
        }
        let d = new Date();
        let dformat = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}_${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}`;

        const fileName = "EmailReport_ " + dformat;
        // Convert data to workbook
        const workbook = XLSX.utils.book_new();
        const sheet = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(workbook, sheet, 'Sheet1');

        // Convert workbook to blob
        const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

        // Save blob to file using FileSaver.js
        saveAs(new Blob([wbout]), fileName + '.xlsx');
        toast.success("Exporting to Excel, please wait...", { autoClose: 1000 });
    };


    const handleGenerateReport = () => {

        const reportData = {
            "beginDate": fromDate,
            "endDate": toDate,
            

        };

        console.log(reportData);
        if (reportData.beginDate == "") {
            toast.warning("Please select From Date", { autoClose: 5000 });
            return;
        }
        if (reportData.endDate == "") {
            toast.warning("Please select To Date", { autoClose: 5000 });
            return;
        }

        GetEmailReportApi(reportData).then(async (resp) => {

            console.log("GetEmailReportApi : " + resp);
            console.log("GetEmailReportApi resp.status 1 : " + resp.status);
            if (resp.status === 200) {
                resp
                    .json()
                    .then((obj) => {
                        console.log("GetEmailReportApi obj : " + obj);
                        console.log("GetEmailReportApi obj 1 : " + JSON.stringify(obj));
                        setData(obj);
                    })
                    .catch((error) => {
                        console.error(error);

                    });
            }
        });

        onGenerateReport(reportData);
        setIsReportGenerated(true);
    };

    const resetReport = () => {
        setIsReportGenerated(false);
    };

    return (
        <div className="Main">
            <div className="Main-cont" >
                <div className="container" >
                    <div className="form-container">
                    <div className="form-control" style={{ paddingLeft: '20px' }}>
                            <label htmlFor="reportType">Report Type</label>
                            <select id="reportType" value={reportType} onChange={(e) => setReportType(e.target.value)}>
                                <option value="start">Start Report</option>
                                <option value="end">End Report</option>
                            </select>
                            </div>
                            {reportType === 'start' && (
                            <>
                                <div className="form-control">
                                    <label htmlFor="fromDate">From Date</label>
                                    <input type="date" id="fromDate" value={fromDate} onChange={(e) => onFromDateChange(e.target.value)} />
                                </div>
                                <div className="form-control" style={{ paddingLeft: '20px' }}>
                                    <label htmlFor="toDate">To Date</label>
                                    <input type="date" id="toDate" value={toDate} onChange={(e) => {
                                        const selectedDate = new Date(e.target.value);
                                        if (selectedDate.getTime() < maxDate.getTime() && selectedDate >= new Date(fromDate)) {
                                            setToDate(e.target.value);
                                            onToDateChange(e.target.value);
                                        } else {
                                            toast.warning("Please select a date within 31 days from the fromDate and not before fromDate", { autoClose: 5000 });
                                        }
                                    }} />
                                </div>
                            </>
                        )}
                        {reportType === 'end' && (
                            <>   
                            <div className="form-control">
                                <label htmlFor="toDate">To Date</label>
                                <input type="date" id="toDate" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                            </div>
                            <div className="form-control" style={{ paddingLeft: '20px' }}>
                                <label htmlFor="fromDate">From Date</label>
                                <input type="date" id="fromDate" value={fromDate} onChange={(e) => onFromDateChange(e.target.value)} />
                            </div>
                        </>
                    )}
                   
                        {/* <div className="form-control">
                            <label htmlFor="fromDate">From Date</label>
                            <input type="date" date-format="dd-MM-yyyy" id="fromDate" value={fromDate} onChange={(e) => onFromDateChange(e.target.value)} />
                        </div>
                        <div className="form-control" style={{ paddingLeft: '20px' }}>
                            <label htmlFor="toDate">To Date</label>
                            <input type="date" date-format="dd-MM-yyyy" id="toDate" value={toDate} onChange={(e) => {
                                const selectedDate = new Date(e.target.value);
                                if (selectedDate.getTime() < maxDate.getTime() && selectedDate >= new Date(fromDate)) {
                                    setToDate(e.target.value);
                                    onToDateChange(e.target.value);
                                } else {
                                    toast.warning("Please select a date within 31 days from the fromDate and not before fromDate", { autoClose: 5000 });
                                    return;

                                    // Reset toDate value or handle invalid selection
                                }
                            }}
                            />
                        </div> */}
                        <div className="form-control" style={{ paddingLeft: '50px' }}>
                            <button onClick={isReportGenerated ? resetReport : handleGenerateReport} style={{
                                fontSize: '13px',
                                border: 'none',
                                height: '26px',
                                width: '120px',
                                backgroundColor: isReportGenerated ? 'green' : '#176dc2',
                                color: 'white',
                                borderRadius: '0.1cm'
                            }}>
                                {isReportGenerated ? 'Report Generated' : 'Generate Report'}
                            </button>
                        </div>
                        <div className="form-control" style={{ paddingLeft: '50px' }}>
                            <button onClick={exportExcel}>Export to Excel</button>
                        </div>

                    </div>

                    {isReportGenerated && <ReportTable reportData={data} />}

                </div>
                <div />

            </div>
            <ToastContainer position="top-center" />
        </div>
    )
}

const ReportTable = ({ reportData }) => {
    const columns = reportData.length > 0 ? Object.keys(reportData[0]) : [];
    return (
        <div className="report-table">
            <table className="custom-table">
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index}>{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody style={{ minHeight: '300px' }}>
                    {reportData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((column, colIndex) => (
                                <td key={colIndex}>{row[column]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Mainbody;
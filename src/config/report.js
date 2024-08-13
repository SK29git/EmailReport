import React, { useEffect, useState } from 'react';
// import ReportService from './ReportService';

function ReportComponent() {
    const [reportData, setReportData] = useState(null);
    const [formsData, setFormsData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const reportResponse = await ReportService.getSpeechminerDumpReport({ /* your request data */ });
                const formsResponse = await ReportService.getForms();
                setReportData(reportResponse);
                setFormsData(formsResponse);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    return (
        <div>
            {/* Render reportData and formsData */}
        </div>
    );
}

export default ReportComponent;

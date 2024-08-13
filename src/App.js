import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Mainbody from './components/Mainbody';
import Footer from './components/Footer';
function App() {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate,] = useState('');
  const [reportData, handleGenerateReport] = useState([]);
  return (
    <div className="App">
        <Header />
        <Mainbody 
        fromDate={fromDate}
        toDate={toDate}
        onFromDateChange={setFromDate}
        onToDateChange={setToDate}
        onGenerateReport={handleGenerateReport} />

        <Footer />
    </div>
  );
}

export default App;

import React from 'react';
import CBlogo from '../img/centralbank-logo1.png'

function header() {

    return (
        <div className='head'>
            <header>
                <h1>EMAIL Report</h1>
                <div className='cbl'>
                    <img src={CBlogo} alt="" />
                </div>

            </header>
        </div>

    );
}

export default header;
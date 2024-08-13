import React from "react";
import CSI from '../img/logo_CSI_white.svg'

function Footer() {
    return (
        <div className="Foot">
            <h4>
                Email Report  | powered by <img src={CSI} alt="" style={{width: '70px'}} />
            </h4>
        </div>
    )
}

export default Footer; z
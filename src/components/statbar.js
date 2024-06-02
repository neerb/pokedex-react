import React from 'react'
import './statbar.css'
import { ProgressBar } from 'react-bootstrap'

const StatBar = (props) => {
    const fillerStyles = {
        width: `${props.stat.base_stat / 2.55}%`,
    }

    const labelStyles = {
        padding: 5,
        color: 'black',
        fontWeight: 'bold'
    }

    return (
        <div className="statbar-wrapper" key={props.stat.stat.name}>
            <div
                style={{ background: props.color, height: "12px", width: "12px", borderRadius: "100%", border: "2px solid #000", margin: "auto 4px 0 0", verticalAlign: "middle" }}>

            </div>

            <label>
                {props.stat.stat.name.replace("special-", 'SP.').toUpperCase()}
            </label>

            {/* <hr className='stat-spacer'></hr> */}

            <div className="container-wrapper">
                <div className="filler-styles" style={fillerStyles}>
                    {
                        props.stat.base_stat < 30 ?
                            <span className="stat-num">{`${props.stat.base_stat}`}</span>
                            :
                            <span className="stat-num">{`${props.stat.base_stat}`}</span>

                    }
                </div>
            </div>
            {/* <span className="stat-num">{`${props.stat.base_stat}`}/255</span> */}
            {/* <div className="bar-wrapper"> */}
            {/* <ProgressBar className='bar-fill' striped variant="success" now={props.stat.base_stat / 2} /> */}
            {/* </div> */}
            <span></span>
        </div>
    )
}

export default StatBar

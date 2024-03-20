"use client"

import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Rating = ({ score }) => {

    return (
        <div style={{ width: 150, height: 150 }}>
            <CircularProgressbar value={score} maxValue={10.00} text={score}
                styles={buildStyles({
                    textSize: '24px',
                    pathTransitionDuration: 0.5,
                    pathColor: score < 6 ? "#D26152" : score < 7.50 ? "#D2CC52" : "#52D27B",
                    textColor: '#fff',
                    trailColor: '#d6d6d6',
                    backgroundColor: '#3e98c7',

                })} />
        </div>
    )
}

export default Rating
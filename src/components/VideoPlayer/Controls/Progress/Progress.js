import React, { useState, useRef } from 'react';

import classes from './Progress.module.scss';

const Progress = (props) => {
    const [posX, setPosX] = useState(0);

    let backgroundRef = useRef(null);

    let foregroundStyle = {
        left: `${0}%`,
        width: `${posX}%`
    }
    return (
        <div className={classes.Progress}>
            <div className={classes.Progress__Background} ref={backgroundRef}></div>
            <div className={classes.Progress__Foreground} style={foregroundStyle}></div>
        </div>
    )
}

export default Progress;
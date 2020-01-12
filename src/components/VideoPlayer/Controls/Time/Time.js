import React from 'react';

import classes from './Time.module.scss';

const Time = (props) => {

    // current / whole_duration
    return (
        <span className={classes.Time}>
            0:46 / 1:22
        </span>
    )
}

export default Time;
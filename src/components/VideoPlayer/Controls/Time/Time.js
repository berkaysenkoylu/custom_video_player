import React from 'react';

import classes from './Time.module.scss';

const Time = (props) => {
    const formatTime = (seconds) => {
        let formattedTime = new Date(seconds * 1000).toISOString().substr(11, 8)

        return formattedTime;
    }

    let timeContent = null;
    if(props.duration) {
        timeContent = `${props.played ? formatTime(props.played) : '00:00:00'} / ${formatTime(props.duration)}`
    }

    // current / whole_duration
    return (
        <span className={classes.Time}>
            {timeContent}
        </span>
    )
}

export default Time;
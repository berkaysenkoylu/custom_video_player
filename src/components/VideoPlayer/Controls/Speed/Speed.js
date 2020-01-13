import React, { useState } from 'react';

import classes from './Speed.module.scss';

const Speed = (props) => {
    const [playbackRates] = useState([1, 1.5, 2]);
    const [index, setIndex] = useState(0);

    const changePlaybackHandler = () => {
        setIndex(index => {
            if(index >= 2) {
                index = 0;
            } else {
                index = index + 1;
            }

            props.setPlayback(playbackRates[index]);
            return index;
        });
    }

    return (
        <div className={classes.Speed} onClick={changePlaybackHandler}>
            <span className={classes.SelectedSpeed}>Speed {`${playbackRates[index]}`}x</span>
        </div>
    )
}

export default Speed;
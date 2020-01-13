import React from 'react';

import classes from './Controls.module.scss';
import PlayButton from './PlayButton/PlayButton';
import Time from './Time/Time';
import Speed from './Speed/Speed';
import Volume from './Volume/Volume';
import Progress from './Progress/Progress';

const Controls = (props) => {

    let classList = [classes.Controls];
    if(props.visible) {
        classList = [classes.Controls, classes.Controls__Revealed];
    }
    else {
        classList = [classes.Controls];
    }

    return (
        <div className={classList.join(' ')}>
            <Progress 
                progressValue={props.played / props.duration * 100}
                seeking={props.seeking}
                seekTo={props.seekTo}
            />

            <PlayButton playing={props.playing} clicked={props.onPlayed} />

            <Time duration={props.duration} played={props.played} />

            <Speed setPlayback={props.playbackChange} />

            <Volume volumeChanged={props.volumeChange} />
        </div>
    )
}

export default Controls;
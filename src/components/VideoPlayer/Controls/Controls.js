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
            <Progress />

            <PlayButton playing={props.playing} />

            <Time />

            <Speed />

            <Volume />
        </div>
    )
}

export default Controls;
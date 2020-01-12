import React from 'react';

import svg from '../../../../assets/images/sprite.svg';
import classes from './PlayButton.module.scss';

const PlayButton = (props) => {
    return (
        <button className={classes.PlayButton} onClick={props.clicked}>
            <svg className={classes.PlayButton__Icon}>
                <use xlinkHref={`${svg}#icon-${props.playing ? 'pause2' : 'play3'}`}></use>
            </svg>
        </button>
    )
}

export default PlayButton;
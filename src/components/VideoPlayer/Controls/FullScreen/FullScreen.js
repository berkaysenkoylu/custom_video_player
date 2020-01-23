import React from 'react';

import svg from '../../../../assets/images/sprite.svg';
import classes from './FullScreen.module.scss';

const FullScreen = (props) => {
    return (
        <button className={classes.FullScreen} onClick={props.clicked}>
            <svg className={classes.FullScreen__Icon}>
                <use xlinkHref={`${svg}#icon-${props.fullscreen ? 'shrink' : 'enlarge'}`}></use>
            </svg>
        </button>
    )
}

export default FullScreen;